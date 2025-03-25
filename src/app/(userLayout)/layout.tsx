"use client";

import images from "@/src/assets/images";
import {
  Create,
  Home,
  Logo,
  Message,
  Notification,
  Post,
} from "@/src/components/shared/Icon";
import { Sidebar } from "@/src/components/shared/Sidebar/Sidebar";
import { useAppSelector } from "@/src/lib/redux/hook";
import { useUser } from "@/src/providers/user.provider";
import Image from "next/image";
import Link from "next/link";
import React, { ReactNode, useState } from "react";

const UserLayout = ({ children }: { children: ReactNode }) => {
  const { decreaseSidebarWidth } = useAppSelector((state) => state.global);
  const { user } = useUser();
  const [showPost, setShowPost] = useState(false);
  return (
    <div className={`sm:flex w-full`}>
      <div className="flex sm:hidden justify-between px-3 mt-3">
        <div>
          <Link href="/">
            <Logo />
          </Link>
        </div>
        <div className="flex items-center gap-4 relative">
          <button onClick={() => setShowPost((prev) => !prev)}>
            <Create />
          </button>
          <button>
            <Notification />
          </button>
          <div
            className={`${showPost ? "flex" : "hidden"} bg-secondary h-[70px] w-[90px] absolute z-30 top-10 right-1  flex-col items-center`}
          >
            <div className="mt-1 space-y-3 w-full px-3">
              <button className="flex items-center justify-between w-full text-base">
                <span>Post</span> <Post height={24} />
              </button>
              <button className="flex items-center justify-between w-full">
                <span>Post</span> <Post height={24} />
              </button>
            </div>
          </div>
        </div>
      </div>
      <Sidebar />
      <div
        className={`sm:ml-[80px] xl:ml-[240px] w-full mb-[150px] sm:mb-0 ${decreaseSidebarWidth ? "!ml-[80px]" : ""}`}
      >
        {children}
      </div>
      <div className="visible sm:invisible fixed bottom-0 flex flex-col w-full items-center justify-center bg-primary h-[50px] z-10 border-t-[0.5px] border-secondary/20">
        <div className="flex justify-around w-full">
          <button>
            {" "}
            <Home />
          </button>
          <button>
            {" "}
            <Create />
          </button>
          <button>
            {" "}
            <Message />
          </button>
          <button>
            <Image
              className="rounded-full"
              width={30}
              height={30}
              src={user?.profilePhoto || images.user}
              alt="user"
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserLayout;
