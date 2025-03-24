"use client";
import images from "@/src/assets/images";
import { useGetAllUsers } from "@/src/hooks/user.hook";
import { setDecreaseSidebarWidth } from "@/src/lib/redux/features/global/global";
import { useAppDispatch } from "@/src/lib/redux/hook";
import { useUser } from "@/src/providers/user.provider";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { ReactNode, useEffect } from "react";
import { FaRegEdit } from "react-icons/fa";

const InboxLayout = ({ children }: { children: ReactNode }) => {
  const { data } = useGetAllUsers();
  const { user } = useUser();
  const pathname = usePathname();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (pathname === "/direct/inbox") {
      dispatch(setDecreaseSidebarWidth("message"));
    }
  }, []);
  return (
    <div className="w-full grid grid-cols-12 h-screen overflow-hidden">
      <div className="col-span-3 border-r-[0.5px] border-secondary/20 h-screen xl:pt-10">
        <div className="flex items-center justify-between px-6">
          <button className="text-2xl">{user?.userName}</button>
          <button>
            <FaRegEdit size={25} />
          </button>
        </div>
        <div className="mt-20">
          <div className="flex items-center justify-between px-6">
            <h5 className="text-lg font-semibold">Messages</h5>
            <button className="text-secondary">Request</button>
          </div>
          <div className="mt-5">
            {data?.data?.map((friend) => (
              <Link
                href={`/direct/t/${friend?.userName}`}
                key={friend?._id}
                className="w-full flex mb-4 gap-4 items-center hover:bg-secondary/30 px-6 py-3"
              >
                <Image
                  src={friend?.profilePhoto || images.user}
                  height={50}
                  width={50}
                  alt="user"
                  className="rounded-full"
                />
                <div className="text-start">
                  <p>{friend?.userName}</p>
                  <p className="text-secondary text-sm">sent a photo 1.h</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
      <div className="col-span-9">{children}</div>
    </div>
  );
};

export default InboxLayout;
