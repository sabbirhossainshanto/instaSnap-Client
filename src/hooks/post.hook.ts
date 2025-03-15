import { useMutation, useQuery } from "@tanstack/react-query";
import { createPost, getAllPosts } from "../services/post.service";
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
