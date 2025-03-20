"use client";
import Link from "next/link";
import { Home, Logo, LogoMobile, Message, Notification, Search } from "../Icon";
import SidebarMoreDropdown from "./SidebarMoreDropdown";
import { useUser } from "@/src/providers/user.provider";
import Image from "next/image";
import images from "@/src/assets/images";
import CreatePost from "../../modals/CreatePost/CreatePost";
import { useState } from "react";
import { Divider, Input } from "@heroui/react";
import ISButton from "@/src/lib/ISButton/ISButton";

export const Sidebar = () => {
  const { user } = useUser();
  const [showSearchNotification, setShowSearchNotification] = useState<
    "search" | "notification" | null
  >(null);

  const navItems = [
    { href: "/", icon: <Home />, label: "Home" },
    { href: "#", icon: <Search />, label: "Search", isButton: true },
    { href: "/", icon: <Message />, label: "Message" },
    {
      href: "/",
      icon: <Notification />,
      label: "Notification",
      isButton: true,
    },
    {
      href: `/${user?.userName}`,
      icon: (
        <Image
          className="rounded-full"
          width={30}
          height={30}
          src={user?.profilePhoto || images.user}
          alt="user"
        />
      ),
      label: "Profile",
    },
  ];

  const handleShowNotificationOrSearch = (text: "search" | "notification") => {
    if (text === showSearchNotification) {
      setShowSearchNotification(null);
    } else {
      setShowSearchNotification(text);
    }
  };

  return (
    <>
      {/* Sidebar */}
      <div
        className={`hidden sm:w-[80px] xl:w-[240px] h-screen pt-10 px-4 sm:flex flex-col sm:fixed ${
          showSearchNotification
            ? "!w-[80px]"
            : "border-r-[0.5px] border-secondary/25"
        }`}
      >
        <div
          className={`hidden xl:block px-3 ${showSearchNotification ? "!hidden" : ""}`}
        >
          <Link href="/">
            <Logo />
          </Link>
        </div>
        <div
          className={`px-3 xl:hidden ${showSearchNotification ? "!flex items-center justify-center" : ""}`}
        >
          <LogoMobile className={"w-full"} />
        </div>

        <div className="mt-12 flex flex-col justify-between h-full">
          <div className="flex flex-col flex-grow space-y-2 h-full">
            {navItems.map((item, index) =>
              item.isButton ? (
                <button
                  key={index}
                  onClick={() =>
                    handleShowNotificationOrSearch(
                      item.label?.toLocaleLowerCase() as
                        | "search"
                        | "notification"
                    )
                  }
                  className={`flex items-center gap-4 hover:bg-hover py-3 rounded-md px-3 transition-colors ${
                    showSearchNotification === item?.label?.toLocaleLowerCase()
                      ? "justify-center bg-secondary"
                      : ""
                  }`}
                >
                  {item.icon}
                  <span
                    className={`hidden xl:block ${showSearchNotification ? "!hidden" : ""}`}
                  >
                    {item.label}
                  </span>
                </button>
              ) : (
                <Link
                  key={index}
                  href={item.href}
                  className={`flex items-center gap-4 hover:bg-hover py-3 rounded-md px-3 transition-colors ${
                    showSearchNotification ? "justify-center" : ""
                  }`}
                >
                  {item.icon}
                  <span
                    className={`hidden xl:block ${showSearchNotification ? "!hidden" : ""}`}
                  >
                    {item.label}
                  </span>
                </Link>
              )
            )}

            <CreatePost showSearch={showSearchNotification} />
          </div>

          <div className="mt-auto">
            <SidebarMoreDropdown showSearch={showSearchNotification} />
          </div>
        </div>
      </div>

      {/* Search panel */}

      <div
        className={`h-screen border-r-[0.5px] border-secondary/20 rounded-r-3xl shadow-md pt-10 px-4 sm:flex flex-col sm:fixed z-20 left-[80px] bg-primary transition-[width,opacity] duration-300 ease-in-out ${
          showSearchNotification == "search"
            ? "w-[400px] opacity-100"
            : "w-0 opacity-0 hidden"
        }`}
      >
        <div className="px-5">
          <h1 className="font-semibold text-2xl">Search</h1>
          <div className="my-10">
            <Input
              size="lg"
              startContent={
                <Search className="text-secondary" height={15} width={15} />
              }
              radius="sm"
              placeholder="Search"
              isClearable
            />
          </div>
          <Divider />
          <div className="flex flex-col items-center justify-center h-full">
            <p>No recent searches.</p>
          </div>
        </div>
      </div>
      {/* Notification */}
      <div
        className={`h-screen border-r-[0.5px] border-secondary/20 rounded-r-3xl shadow-md pt-10 px-4 sm:flex flex-col sm:fixed z-20 left-[80px] bg-primary transition-[width,opacity] duration-300 ease-in-out ${
          showSearchNotification == "notification"
            ? "w-[400px] opacity-100"
            : "w-0 opacity-0 hidden"
        }`}
      >
        <div className="px-5">
          <h1 className="font-semibold text-2xl">Notification</h1>
          <div className="my-10">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Image
                  className="rounded-full"
                  width={40}
                  height={40}
                  src={images.user}
                  alt="user"
                />
                <div>
                  <h5 className="text-sm">Jiinat</h5>
                  <p className="text-secondary text-xs">Suggested for you</p>
                </div>
              </div>
              <ISButton size="sm" radius="sm" className="w-[70px]">
                Following
              </ISButton>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
