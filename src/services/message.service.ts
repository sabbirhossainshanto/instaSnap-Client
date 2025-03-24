"use server";

import { AxiosSecure } from "../lib/AxiosSecure/AxiosSecure";

export const sendMessage = async (payload: FormData) => {
  try {
    const { data } = await AxiosSecure.post(`/messages/send-message`, payload);
    return data;
  } catch (error: any) {
    return error.response.data;
  }
};

export const getMessages = async (id: string) => {
  try {
    const { data } = await AxiosSecure.get(`/messages/${id}`);
    return data;
  } catch (error: any) {
    return error.response.data;
  }
};
