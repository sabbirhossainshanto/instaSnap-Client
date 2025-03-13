"use client";
import profile from "@/src/assets/img/profile.jpg";
import { IoIosArrowBack } from "react-icons/io";
import { useFollowUnfollow } from "@/src/hooks/follow.hook";
import { useGetAllUsers } from "@/src/hooks/user.hook";
import ISButton from "@/src/lib/ISButton/ISButton";
import { useUser } from "@/src/providers/user.provider";
import { TUser } from "@/src/types";
import Image from "next/image";
import { useEffect, useState } from "react";
import ISDivider from "@/src/lib/ISDivider/ISDivider";
import { useRouter } from "next/navigation";

const PeoplePage = () => {
  const { user } = useUser();
  const router = useRouter();
  const { data, refetch: refetchUsers } = useGetAllUsers();
  const { mutate: followUnfollow } = useFollowUnfollow();
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
    <div className="w-full flex flex-col items-center ">
      <div className="w-full flex sm:hidden  gap-20 px-10">
        <button onClick={() => router.back()}>
          <IoIosArrowBack size={30} />
        </button>
        <h3 className="text-lg">Discover People</h3>
      </div>
      <ISDivider className="block sm:hidden mt-2" />
      <div className="w-full max-w-[500px] p-10 mx-auto">
        <div>
          <div className="flex items-center justify-between">
            <h6 className="text-sm text-primary">Suggested</h6>
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
                      <p className="text-secondary text-xs">
                        Suggested for you
                      </p>
                    </div>
                  </div>
                  <ISButton
                    size="sm"
                    radius="sm"
                    className="w-[70px]"
                    onPress={() => handleFollowUnfollow(people._id)}
                  >
                    {isFollowing ? "Following" : "Follow"}
                  </ISButton>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PeoplePage;
