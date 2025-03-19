"use server";

import { AxiosSecure } from "../lib/AxiosSecure/AxiosSecure";

export const createPost = async (payload: FormData) => {
  try {
    const { data } = await AxiosSecure.post("/posts/create-post", payload);
    return data;
  } catch (error: any) {
    return error.response.data;
  }
};

export const getAllPosts = async () => {
  try {
    const { data } = await AxiosSecure.get("/posts");
    return data;
  } catch (error: any) {
    return error.response.data;
  }
};
export const getSinglePost = async (id: string) => {
  try {
    const { data } = await AxiosSecure.get(`/posts/${id}`);
    return data;
  } catch (error: any) {
    return error.response.data;
  }
};
export const addLikeToPost = async (payload: { postId: string }) => {
  try {
    const { data } = await AxiosSecure.put("/posts/like", payload);
    return data;
  } catch (error: any) {
    return error.response.data;
  }
};
