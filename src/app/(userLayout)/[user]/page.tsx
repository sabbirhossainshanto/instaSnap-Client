import Profile from "@/src/components/modules/Profile/Profile";
import { TResponse, TUser } from "@/src/types";
import React from "react";

const ProfilePage = async ({
  params,
}: {
  params: Promise<{ user: string }>;
}) => {
  const { user } = await params;
  const res = await fetch(`http://localhost:5000/api/v1/users/${user}`);
  const data: TResponse<TUser> = await res.json();

  return (
    <div className="w-full">{data?.data && <Profile data={data?.data} />}</div>
  );
};

export default ProfilePage;
