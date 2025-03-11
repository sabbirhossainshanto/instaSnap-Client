"use client";

import { Logo } from "@/src/components/shared/Icon";
import { SubmitHandler } from "react-hook-form";
import { GenericForm } from "@/src/lib/ISForm/GenericForm";
import TextField from "@/src/lib/ISForm/fields/TextField";
import { TRegister, TRegisterData, TResponse } from "@/src/types";
import { useUserRegister } from "@/src/hooks/login";
import Link from "next/link";
import { RegisterSchema } from "@/src/schemas";
import { useRouter } from "next/navigation";
import { notification } from "@/src/utils/notification";
import ISButton from "@/src/lib/ISButton/ISButton";
import ISDivider from "@/src/lib/ISDivider/ISDivider";

const Register = () => {
  const { mutate: handleRegister } = useUserRegister();
  const router = useRouter();

  const onSubmit: SubmitHandler<TRegister> = (data) => {
    handleRegister(data, {
      onSuccess: (data: TResponse<TRegisterData>) => {
        if (data?.success) {
          notification({ message: data?.message });
          router.push("/");
        } else {
          notification({ message: data?.message, color: "warning" });
        }
      },
    });
  };
  return (
    <div className={`w-full  flex flex-col items-center justify-center `}>
      <div className="w-[350px]  border-secondary/25 border-[0.5px] flex flex-col items-center p-10 space-y-3 mt-5">
        <Logo />
        <p className="max-w-[30ch] text-center text-secondary  text-base">
          Sign up to see photos and videos from your friends.
        </p>
        <ISButton radius="sm" className="w-full">
          Login With Facebook
        </ISButton>
        <div className="flex items-center justify-center gap-3 w-full text-secondary text-xs">
          <ISDivider className="flex-1" />
          <div>OR</div>
          <ISDivider className="flex-1" />
        </div>
        <GenericForm onSubmit={onSubmit} schema={RegisterSchema}>
          <div className="space-y-10 w-full">
            <TextField<TRegister>
              placeholder="Enter Email"
              type="text"
              name="email"
              label="Email"
            />
            <TextField<TRegister>
              labelPlacement="outside"
              placeholder="Enter Full Name"
              type="text"
              name="fullName"
              label="Full Name"
            />
            <TextField<TRegister>
              placeholder="Enter Password"
              type="text"
              name="password"
              label="Password"
            />
            <TextField<TRegister>
              placeholder="Enter User Name"
              type="text"
              name="userName"
              label="User Name"
            />
            <ISButton className="w-full" type="submit">
              Sign up
            </ISButton>
          </div>
        </GenericForm>
      </div>
      <div className="w-[350px]  border-secondary/25 border-[0.5px] flex flex-col items-center p-5 space-y-1 my-5">
        <p className="text-sm">Have an account?</p>
        <Link href="/login" className="text-default font-medium">
          Login
        </Link>
      </div>
    </div>
  );
};

export default Register;
