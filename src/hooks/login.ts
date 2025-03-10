import { useMutation } from "@tanstack/react-query";
import { loginUser, registerUser } from "../services/auth";
import { TRegister } from "../types";
import { TLoginPayload } from "../types/login.type";

export const useUserRegister = () => {
  return useMutation<any, Error, TRegister>({
    mutationKey: ["user_registration"],
    mutationFn: async (userData) => await registerUser(userData),
  });
};

export const useUserLogin = () => {
  return useMutation<any, Error, TLoginPayload>({
    mutationKey: ["user_login"],
    mutationFn: async (userData) => await loginUser(userData),
  });
};
