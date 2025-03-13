"use client";

import Link from "next/link";
import React from "react";
import { FaUserCircle } from "react-icons/fa";
import { BiBlock } from "react-icons/bi";
import { CloseFriend } from "../../shared/Icon";
import { usePathname } from "next/navigation";

const SettingsNavigation = () => {
  const pathname = usePathname();

  return (
    <div className="w-full px-6 border-r-[0.5px] border-primary/20 h-screen pt-5 xl:pt-10">
      <h2 className="text-xl font-semibold">Settings</h2>
      <div className="mt-12 flex flex-col flex-grow space-y-2">
        <Link
          className={`flex items-center gap-4 hover:bg-highlight py-3 rounded-md px-3 transition-colors ${pathname.includes("/edit") ? "bg-highlight" : ""}`}
          href="/accounts/edit"
        >
          <FaUserCircle size={25} />
          <span>Edit Profile</span>
        </Link>
        <Link
          className={`flex items-center gap-4 hover:bg-highlight py-3 rounded-md px-3 transition-colors ${pathname.includes("/close_friends") ? "bg-highlight" : ""}`}
          href="/accounts/close_friends"
        >
          <CloseFriend />
          <span>Close Friend</span>
        </Link>
        <Link
          className={`flex items-center gap-4 hover:bg-highlight py-3 rounded-md px-3 transition-colors ${pathname.includes("/blocked") ? "bg-highlight" : ""}`}
          href="/accounts/blocked"
        >
          <BiBlock size={25} />
          <span>Blocked</span>
        </Link>
      </div>
    </div>
  );
};

export default SettingsNavigation;
