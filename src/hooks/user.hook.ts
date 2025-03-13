import { useQuery } from "@tanstack/react-query";
import { TResponse, TUser } from "../types";
import { getAllUsers } from "../services/user.service";

export const useGetAllUsers = () => {
  return useQuery<any, Error, TResponse<TUser[]>>({
    queryKey: ["get-all-users"],
    queryFn: async () => await getAllUsers(),
  });
};
