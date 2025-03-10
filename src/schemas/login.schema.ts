import { z } from "zod";

export const RegisterSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .email({ message: "Please enter a valid email" }),
  password: z.string().min(2, { message: "Password must be four character" }),
  fullName: z.string().min(2, { message: "Full name must be four character" }),
  userName: z.string().min(4, { message: "User name must be four character" }),
});
