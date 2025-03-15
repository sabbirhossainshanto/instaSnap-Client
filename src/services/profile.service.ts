"use server";

import { AxiosSecure } from "../lib/AxiosSecure/AxiosSecure";

export const updateProfile = async (payload: FormData) => {
  try {
    const { data } = await AxiosSecure.put("/profile", payload);
    return data;
  } catch (error: any) {
    return error.response.data;
  }
};
