"use server";

import { AxiosSecure } from "../lib/AxiosSecure/AxiosSecure";
import { TComment } from "../types";

export const addCommentToPost = async (payload: TComment) => {
  try {
    const { data } = await AxiosSecure.post("/comments/add-comment", payload);
    return data;
  } catch (error: any) {
    return error.response.data;
  }
};
