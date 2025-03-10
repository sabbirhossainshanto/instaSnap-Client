"use server";

import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";
import { AxiosSecure } from "../lib/AxiosSecure/AxiosSecure";
import { TRegister } from "../types";
import { TLoginPayload } from "../types/login.type";

export const registerUser = async (payload: TRegister) => {
  try {
    const { data } = await AxiosSecure.post("/auth/register", payload);
    const cookieStore = await cookies();
    cookieStore.set("accessToken", data?.data?.accessToken);
    cookieStore.set("refreshToken", data?.data?.refreshToken);
    return data;
  } catch (error: any) {
    return error.response.data;
  }
};

export const loginUser = async (payload: TLoginPayload) => {
  try {
    const { data } = await AxiosSecure.post("/auth/login", payload);
    const cookieStore = await cookies();
    cookieStore.set("accessToken", data?.data?.accessToken);
    cookieStore.set("refreshToken", data?.data?.refreshToken);
    return data;
  } catch (error: any) {
    return error.response.data;
  }
};
export const logOut = async () => {
  const cookieStore = await cookies();
  cookieStore.delete("accessToken");
  cookieStore.delete("refreshToken");
};

export const getCurrentUser = async () => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  let decode = null;
  if (accessToken) {
    decode = await jwtDecode(accessToken);
    return {
      _id: decode._id,
      fullName: decode.fullName,
      userName: decode.userName,
      email: decode.email,
      role: decode.role,
      status: decode.status,
      isVerified: decode?.isVerified,
      createdAt: decode?.createdAt,
      updatedAt: decode?.updatedAt,
    };
  }
  return decode;
};
export const getNewAccessToken = async () => {
  try {
    const cookieStore = await cookies();
    const refreshToken = cookieStore.get("refreshToken")?.value;
    const res = await AxiosSecure({
      url: "/auth/refreshToken",
      method: "POST",
      withCredentials: true,
      headers: {
        cookies: `refreshToken=${refreshToken}`,
      },
    });
    return res.data;
  } catch (error: any) {
    return error.response.data;
  }
};
