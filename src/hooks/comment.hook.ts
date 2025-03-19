import { useMutation } from "@tanstack/react-query";
import { TComment } from "../types";
import { addCommentToPost } from "../services/comment.service";

export const useAddComment = () => {
  return useMutation<any, Error, TComment>({
    mutationKey: ["add-comment"],
    mutationFn: async (payload) => await addCommentToPost(payload),
  });
};
