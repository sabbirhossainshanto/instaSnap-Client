"use client";
import Link from "next/link";
import {
  Create,
  Home,
  Logo,
  LogoMobile,
  Message,
  Notification,
  Search,
} from "../Icon";
import SidebarMoreDropdown from "./SidebarMoreDropdown";
import { useUser } from "@/src/providers/user.provider";
import Image from "next/image";
import images from "@/src/assets/images";
// import instaSnap from "../../../assets/img/instaSnap.webp";
// import Image from "next/image";

export const Sidebar = () => {
  const { user } = useUser();
  return (
    <div className="hidden sm:w-[80px] xl:w-[300px] h-screen border-r-[0.5px] border-secondary/25 pt-10 px-4 sm:flex flex-col">
      <div className="hidden xl:block">
        {/* <Image src={instaSnap} alt="instaSnap" height={150} width={150} /> */}
        <Link href="/">
          <Logo />
        </Link>
      </div>
      <div className="px-3 xl:hidden">
        <LogoMobile />
      </div>

      <div className="mt-12 flex flex-col flex-grow space-y-2">
        <Link
          className="flex items-center gap-4 hover:bg-hover py-3 rounded-md px-3 transition-colors"
          href="/"
        >
          <Home />
          <span className="hidden xl:block">Home</span>
        </Link>
        <Link
          className="flex items-center gap-4 hover:bg-hover py-3 rounded-md px-3 transition-colors"
          href="/"
        >
          <Search />
          <span className="hidden xl:block">Search</span>
        </Link>
        <Link
          className="flex items-center gap-4 hover:bg-hover py-3 rounded-md px-3 transition-colors"
          href="/"
        >
          <Message />
          <span className="hidden xl:block">Message</span>
        </Link>
        <Link
          className="flex items-center gap-4 hover:bg-hover py-3 rounded-md px-3 transition-colors"
          href="/"
        >
          <Notification />
          <span className="hidden xl:block">Notification</span>
        </Link>
        <Link
          className="flex items-center gap-4 hover:bg-hover py-3 rounded-md px-3 transition-colors"
          href="/"
        >
          <Create />
          <span className="hidden xl:block">Create</span>
        </Link>
        <Link
          className="flex items-center gap-4 hover:bg-hover py-3 rounded-md px-3 transition-colors"
          href={`/${user?.userName}`}
        >
          <Image
            className="rounded-full"
            width={40}
            height={40}
            src={user?.profilePhoto || images.user}
            alt="user"
          />
          <span className="hidden xl:block">Profile</span>
        </Link>

        <SidebarMoreDropdown />
      </div>
    </div>
  );
};
