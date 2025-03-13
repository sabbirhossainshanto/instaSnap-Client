export type TUser = {
  _id: string;
  fullName: string;
  userName: string;
  email: string;
  role: string;
  status: "ACTIVE" | "BLOCKED";
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
  passwordChangedAt: string;
  mobileNumber: string;
  profilePhoto: string;
  bio: string;
  followers: {
    createdAt: string;
    updatedAt: string;
    followingUser: string;
    followerUser: TUser;
  }[];
  followings: {
    createdAt: string;
    updatedAt: string;
    followerUser: string;
    followingUser: TUser;
  }[];
};
