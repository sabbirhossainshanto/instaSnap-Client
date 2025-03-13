"use server";

import { AxiosSecure } from "../lib/AxiosSecure/AxiosSecure";
import { TFollowPayload } from "../types";

export const followUnfollow = async (payload: TFollowPayload) => {
  try {
    const { data } = await AxiosSecure.post("/follow", payload);
    return data;
  } catch (error: any) {
    return error.response.data;
  }
};
