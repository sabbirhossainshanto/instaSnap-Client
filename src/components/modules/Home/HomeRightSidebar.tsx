"use client";

import Image from "next/image";
import profile from "@/src/assets/img/profile.jpg";
import { useUser } from "@/src/providers/user.provider";
import { useGetAllUsers } from "@/src/hooks/user.hook";
import { useFollowUnfollow } from "@/src/hooks/follow.hook";
import { useEffect, useState } from "react";
import { TUser } from "@/src/types";
import Link from "next/link";

const HomeRightSidebar = () => {
  const { mutate: followUnfollow } = useFollowUnfollow();
  const { user } = useUser();
  const { data, refetch: refetchUsers } = useGetAllUsers();
  const [users, setUsers] = useState<TUser[] | []>([]);

  const handleFollowUnfollow = (id: string) => {
    // Perform API call
    followUnfollow(
      { followingUser: id },
      {
        onSuccess(data) {
          if (data?.success) {
            refetchUsers();
          }
        },
      }
    );
  };

  useEffect(() => {
    if (data?.data && data?.data?.length > 0) {
      setUsers(data?.data);
    }
  }, [data]);

  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href={`/${user?.userName}`}>
            <Image
              className="rounded-full"
              width={40}
              height={40}
              src={profile}
              alt="user"
            />
          </Link>
          <div>
            <Link href={`/${user?.userName}`} className="text-sm">
              {user?.userName}
            </Link>
            <p className="text-secondary text-xs">{user?.fullName}</p>
          </div>
        </div>
        <button className="text-default text-sm hover:text-primary transition-colors">
          Switch
        </button>
      </div>
      <div className="pt-6">
        <div className="flex items-center justify-between">
          <h6 className="text-sm text-secondary">Suggested for you</h6>
          <Link href="/explore/people" className="text-sm">
            See All
          </Link>
        </div>
        <div className="pt-3 space-y-4">
          {users?.map((people) => {
            const isFollowing = people.followers.some(
              (p) => p.followerUser._id === user?._id
            );

            return (
              <div
                key={people._id}
                className="flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <Image
                    className="rounded-full"
                    width={40}
                    height={40}
                    src={profile}
                    alt="user"
                  />
                  <div>
                    <h5 className="text-sm">{people.fullName}</h5>
                    <p className="text-secondary text-xs">Suggested for you</p>
                  </div>
                </div>
                <button
                  onClick={() => handleFollowUnfollow(people._id)}
                  className="text-default text-sm hover:text-primary transition-colors"
                >
                  {isFollowing ? "Following" : "Follow"}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default HomeRightSidebar;
