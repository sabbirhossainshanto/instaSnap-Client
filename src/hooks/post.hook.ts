import { useMutation, useQuery } from "@tanstack/react-query";
import {
  addLikeToPost,
  createPost,
  getAllPosts,
  getSinglePost,
} from "../services/post.service";
import { TResponse } from "../types";
import { TPost } from "../types/post.type";

export const useCreatePost = () => {
  return useMutation<any, Error, FormData>({
    mutationKey: ["post"],
    mutationFn: async (payload) => await createPost(payload),
  });
};

export const useGetAllPost = () => {
  return useQuery<any, Error, TResponse<TPost[]>>({
    queryKey: ["posts"],
    queryFn: async () => await getAllPosts(),
  });
};
export const useGetSinglePost = (id: string) => {
  return useQuery<any, Error, TResponse<TPost>>({
    queryKey: ["single-post"],
    queryFn: async () => await getSinglePost(id),
  });
};
export const useAddToLikeToPost = () => {
  return useMutation<any, Error, { postId: string }>({
    mutationKey: ["like"],
    mutationFn: async (payload) => await addLikeToPost(payload),
  });
};
