"use client";

import images from "@/src/assets/images";
import { useUpdateProfile } from "@/src/hooks/profile.hook";
import ISButton from "@/src/lib/ISButton/ISButton";
import TextAreaField from "@/src/lib/ISForm/fields/TextAreaField";
import TextField from "@/src/lib/ISForm/fields/TextField";
import { GenericForm } from "@/src/lib/ISForm/GenericForm";
import { useUser } from "@/src/providers/user.provider";
import { ProfileEdit } from "@/src/schemas";
import { logOut } from "@/src/services/auth";
import { TResponse, TUser } from "@/src/types";
import { notification } from "@/src/utils/notification";
import { Radio, RadioGroup } from "@heroui/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";

const EditProfile = () => {
  const router = useRouter();
  const { mutate: handleUpdateProfile } = useUpdateProfile();
  const [image, setImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState("");
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const { user } = useUser();
  const [gender, setGender] = useState("");

  const handleOpenImage = () => {
    fileInputRef.current!.click();
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImage(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    if (!gender) {
      return notification({ message: "Gender is required", color: "warning" });
    }
    const payload = {
      bio: data?.bio,
      website: data?.website,
      gender: gender,
    };

    const formData = new FormData();
    formData.append("data", JSON.stringify(payload));
    if (image) {
      formData.append("file", image);
    }
    handleUpdateProfile(formData, {
      onSuccess: async (data: TResponse<TUser>) => {
        if (data?.success) {
          notification({ message: data?.message });
          await logOut();
          router.push("/login");
        } else {
          notification({ message: data?.message, color: "warning" });
        }
      },
    });
  };

  useEffect(() => {
    if (user) {
      if (user?.gender) {
        setGender(user?.gender);
      }
    }
  }, [user]);

  if (!user) {
    return null;
  }

  return (
    <div className="w-full pt-5 xl:pt-10 px-5">
      <div className="w-full max-w-[700px] mx-auto">
        <h3 className="text-xl font-semibold">Edit Profile</h3>
        <GenericForm
          initialValues={{
            bio: user?.bio,
            website: user?.website,
          }}
          onSubmit={onSubmit}
          schema={ProfileEdit}
        >
          <div className="space-y-12 mt-10">
            <div className="h-[80px] w-full bg-highlight rounded-2xl flex items-center justify-between px-6">
              <div className="flex items-center gap-2">
                <Image
                  className="rounded-full"
                  src={
                    previewImage
                      ? previewImage
                      : user?.profilePhoto
                        ? user?.profilePhoto
                        : images.user
                  }
                  height={50}
                  width={50}
                  alt="user"
                />
                <div>
                  <p>{user?.userName}</p>
                  <p className="text-secondary text-sm">{user?.fullName}</p>
                </div>
              </div>
              <ISButton onPress={handleOpenImage} size="sm" radius="sm">
                <input
                  onChange={handleImageChange}
                  hidden
                  ref={fileInputRef}
                  type="file"
                />
                Change Photo
              </ISButton>
            </div>
            <TextField
              size="lg"
              variant="bordered"
              labelPlacement="outside"
              placeholder="Website"
              label="Website"
              name="website"
            />
            <TextAreaField
              variant="bordered"
              size="lg"
              labelPlacement="outside"
              placeholder="Bio"
              label="Bio"
              name="bio"
            />
            <RadioGroup
              orientation="horizontal"
              value={gender}
              onValueChange={(gender) => setGender(gender)}
              className="flex gap-5"
            >
              <Radio value="male" color="secondary">
                Male
              </Radio>
              <Radio value="female" color="secondary">
                Female
              </Radio>
              <Radio value="other" color="secondary">
                Other
              </Radio>
            </RadioGroup>
            <div className="flex justify-end w-full">
              {" "}
              <ISButton type="submit" radius="sm" size="lg" className="px-20">
                Submit
              </ISButton>
            </div>
          </div>
        </GenericForm>
      </div>
    </div>
  );
};

export default EditProfile;
