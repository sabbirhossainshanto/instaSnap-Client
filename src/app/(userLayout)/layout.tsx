"use client";

import { Sidebar } from "@/src/components/shared/Sidebar/Sidebar";
import { useTheme } from "next-themes";
import React, { ReactNode } from "react";

const UserLayout = ({ children }: { children: ReactNode }) => {
  const { theme } = useTheme();
  return (
    <div className={`flex  ${theme === "light" ? "light-bg" : "dark-bg"}`}>
      <Sidebar />
      <div className="w-full flex justify-center pt-10">{children}</div>
    </div>
  );
};

export default UserLayout;
