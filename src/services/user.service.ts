"use server";

import { AxiosSecure } from "../lib/AxiosSecure/AxiosSecure";

export const getAllUsers = async () => {
  try {
    const { data } = await AxiosSecure.get("/users");
    return data;
  } catch (error: any) {
    return error.response.data;
  }
};
