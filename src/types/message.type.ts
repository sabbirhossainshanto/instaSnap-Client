import { TUser } from "./user.type";

export type TMessage = {
  _id: string;
  senderUser: TUser;
  receiverUser: TUser;
  text: string;
  image: string;
};
export type TMessagePayload = {
  senderUser: string;
  receiverUser: string;
  text: string;
  image: string;
};
