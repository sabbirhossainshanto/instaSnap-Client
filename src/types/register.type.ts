import { z } from "zod";
import { RegisterSchema } from "../schemas";

export type TRegister = z.infer<typeof RegisterSchema>;

export type TRegisterData = {
  accessToken: string;
  refreshToken: string;
};
