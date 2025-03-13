"use client";

import { Create, Home, Message } from "@/src/components/shared/Icon";
import { Sidebar } from "@/src/components/shared/Sidebar/Sidebar";
import React, { ReactNode } from "react";

const UserLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className={`flex`}>
      <Sidebar />
      <div className="w-full flex justify-center">{children}</div>
      <div className="visible sm:invisible fixed bottom-0 flex flex-col w-full items-center justify-center bg-primary h-[50px]">
        <div className="flex justify-around w-full">
          <Home />
          <Create />
          <Message />
          <Create />
        </div>
      </div>
    </div>
  );
};

export default UserLayout;
