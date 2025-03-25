import { useQuery } from "@tanstack/react-query";
import { TResponse, TUser } from "../types";
import { getAllUsers, getSingleUser } from "../services/user.service";

export const useGetAllUsers = () => {
  return useQuery<any, Error, TResponse<TUser[]>>({
    queryKey: ["get-all-users"],
    queryFn: async () => await getAllUsers(),
  });
};
export const useGetSingleUser = (id: string) => {
  return useQuery<any, Error, TResponse<TUser>>({
    queryKey: ["get-single-users", id],
    queryFn: async () => await getSingleUser(id),
  });
};
