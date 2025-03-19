import { TUser } from "./user.type";

export type TPost = {
  _id: string;
  caption: string;
  likes: TUser[];
  media: string[];
  comments: {
    _id: string;
    post: string;
    commentUser: TUser;
    text: string;
    replies: [];
    createdAt: string;
    updatedAt: string;
  }[];
  user: TUser;
  createdAt: string;
  updatedAt: string;
};
