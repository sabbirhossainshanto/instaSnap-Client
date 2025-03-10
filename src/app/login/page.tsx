"use client";

import { Logo } from "@/src/components/shared/Icon";
import { Button } from "@heroui/button";
import { addToast, Divider } from "@heroui/react";
import { useTheme } from "next-themes";
import { SubmitHandler } from "react-hook-form";
import { GenericForm } from "@/src/components/ISForm/GenericForm";
import TextField from "@/src/components/ISForm/fields/TextField";
import { LoginSchema } from "@/src/schemas";
import { TRegister, TResponse } from "@/src/types";
import { useUserLogin } from "@/src/hooks/login";
import Link from "next/link";
import { TLoginPayload, TLoginResponse } from "@/src/types/login.type";

const Login = () => {
  const { theme } = useTheme();
  const { mutate: handleLogin } = useUserLogin();

  const onSubmit: SubmitHandler<TLoginPayload> = (data) => {
    handleLogin(data, {
      onSuccess: (data: TResponse<TLoginResponse>) => {
        if (data?.success) {
          addToast({
            description: data?.message,
            color: "success",
          });
        } else {
          addToast({
            description: data?.message,
            color: "warning",
          });
        }
      },
    });
  };
  return (
    <div
      className={`w-full  flex flex-col items-center justify-center ${theme === "light" ? "light-bg" : "dark-bg"}`}
    >
      <div className="w-[350px]  border-secondary/25 border-[0.5px] flex flex-col items-center p-10 space-y-3 mt-5">
        <Logo />

        <GenericForm onSubmit={onSubmit} schema={LoginSchema}>
          <div className="space-y-10 w-full">
            <TextField<TRegister>
              radius="none"
              placeholder="Enter Email"
              type="text"
              name="email"
              label="Email"
            />

            <TextField<TRegister>
              radius="none"
              placeholder="Enter Password"
              type="text"
              name="password"
              label="Password"
            />

            <Button className="w-full" radius="sm" type="submit">
              Log in
            </Button>
          </div>
        </GenericForm>
        <div className="flex items-center justify-center gap-3 w-full text-secondary text-xs">
          <Divider className="flex-1" />
          <div>OR</div>
          <Divider className="flex-1" />
        </div>
        <button className="text-default">Login with facebook</button>
        <button>Forgot Password?</button>
      </div>
      <div className="w-[350px]  border-secondary/25 border-[0.5px] flex flex-col items-center p-5 space-y-1 my-5">
        <p className="text-sm">Dont have an account?</p>
        <Link href="/register" className="text-default font-medium">
          Register
        </Link>
      </div>
    </div>
  );
};

export default Login;
