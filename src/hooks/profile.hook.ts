import { useMutation } from "@tanstack/react-query";
import { updateProfile } from "../services/profile.service";

export const useUpdateProfile = () => {
  return useMutation<any, Error, FormData>({
    mutationKey: ["update-profile"],
    mutationFn: async (payload) => await updateProfile(payload),
  });
};
