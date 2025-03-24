import { useMutation, useQuery } from "@tanstack/react-query";
import { getMessages, sendMessage } from "../services/message.service";
import { TMessage, TResponse } from "../types";

export const useSendMessage = () => {
  return useMutation<any, Error, FormData>({
    mutationKey: ["send-message"],
    mutationFn: async (payload) => await sendMessage(payload),
  });
};
export const useGetMessages = (id: string) => {
  return useQuery<any, Error, TResponse<TMessage[]>>({
    queryKey: ["get-messages"],
    enabled: id ? true : false,
    queryFn: async () => await getMessages(id),
  });
};
