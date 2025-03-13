import { useMutation } from "@tanstack/react-query";
import { TFollowPayload } from "../types";
import { followUnfollow } from "../services/follow.service";

export const useFollowUnfollow = () => {
  return useMutation<any, Error, TFollowPayload>({
    mutationKey: ["follow-unfollow"],
    mutationFn: async (payload) => await followUnfollow(payload),
  });
};
