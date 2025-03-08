"use client";
import Link from "next/link";
import { Create, Home, Logo, Message, Notification, Search } from "../Icon";
import SidebarMoreDropdown from "./SidebarMoreDropdown";

export const Sidebar = () => {
  return (
    <div className="w-[300px] h-screen border-r-[0.5px] border-secondary/25 pt-10 px-4 flex flex-col">
      <div className="px-3">
        <Logo />
      </div>

      <div className="mt-12 flex flex-col flex-grow space-y-2">
        <Link
          className="flex items-center gap-4 hover:bg-hover py-3 rounded-md px-3 transition-colors"
          href="/"
        >
          <Home />
          <span>Home</span>
        </Link>
        <Link
          className="flex items-center gap-4 hover:bg-hover py-3 rounded-md px-3 transition-colors"
          href="/"
        >
          <Search />
          <span>Search</span>
        </Link>
        <Link
          className="flex items-center gap-4 hover:bg-hover py-3 rounded-md px-3 transition-colors"
          href="/"
        >
          <Message />
          <span>Message</span>
        </Link>
        <Link
          className="flex items-center gap-4 hover:bg-hover py-3 rounded-md px-3 transition-colors"
          href="/"
        >
          <Notification />
          <span>Notification</span>
        </Link>
        <Link
          className="flex items-center gap-4 hover:bg-hover py-3 rounded-md px-3 transition-colors"
          href="/"
        >
          <Create />
          <span>Create</span>
        </Link>
        <Link
          className="flex items-center gap-4 hover:bg-hover py-3 rounded-md px-3 transition-colors"
          href="/"
        >
          <Create />
          <span>Profile</span>
        </Link>

        <SidebarMoreDropdown />
      </div>
    </div>
  );
};
