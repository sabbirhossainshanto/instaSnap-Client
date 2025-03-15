import { TUser } from "./user.type";

export type TPost = {
  _id: string;
  caption: string;
  likes: TUser[];
  media: string[];
  user: TUser;
  createdAt: string;
  updatedAt: string;
};
