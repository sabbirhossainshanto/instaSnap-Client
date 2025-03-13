"use client";

import images from "@/src/assets/images";
import ISButton from "@/src/lib/ISButton/ISButton";
import TextAreaField from "@/src/lib/ISForm/fields/TextAreaField";
import TextField from "@/src/lib/ISForm/fields/TextField";
import { GenericForm } from "@/src/lib/ISForm/GenericForm";
import { useUser } from "@/src/providers/user.provider";
import { ProfileEdit } from "@/src/schemas";
import { Radio, RadioGroup } from "@heroui/react";
import Image from "next/image";
import { useState } from "react";

const EditProfile = () => {
  const { user } = useUser();
  const [gender, setGender] = useState("");
  return (
    <div className="w-full pt-5 xl:pt-10 px-5">
      <div className="w-full max-w-[700px] mx-auto">
        <h3 className="text-xl font-semibold">Edit Profile</h3>
        <GenericForm onSubmit={() => {}} schema={ProfileEdit}>
          <div className="space-y-12 mt-10">
            <div className="h-[80px] w-full bg-highlight rounded-2xl flex items-center justify-between px-6">
              <div className="flex items-center gap-2">
                <Image
                  className="rounded-full"
                  src={images.user}
                  height={50}
                  width={50}
                  alt="user"
                />
                <div>
                  <p>{user?.userName}</p>
                  <p className="text-secondary text-sm">{user?.fullName}</p>
                </div>
              </div>
              <ISButton size="sm" radius="sm">
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
              <ISButton radius="sm" size="lg" className="px-20">
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
