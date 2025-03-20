"use client";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  DropdownSection,
} from "@heroui/react";

import { Activity, More, Report, Saved, Settings, ThemeIcon } from "../Icon";
import { ThemeSwitch } from "../../theme-switch";
import { logOut } from "@/src/services/auth";
import { useRouter } from "next/navigation";

export default function SidebarMoreDropdown({
  showSearch,
}: {
  showSearch: "search" | "notification" | null;
}) {
  const router = useRouter();

  const handleLogout = async () => {
    await logOut();
    router.push("/login");
  };
  return (
    <Dropdown
      closeOnSelect={false}
      showArrow
      classNames={{
        base: "before:bg-default-200",
        content:
          "py-1 px-1 border border-default-200 bg-gradient-to-br from-white to-default-200 dark:from-default-50 dark:to-black",
      }}
    >
      <DropdownTrigger>
        <button className="flex items-center gap-4 hover:bg-hover py-3 rounded-md px-3 transition-colors mt-auto">
          <More />
          <span className={`hidden xl:block ${showSearch ? "!hidden" : ""}`}>
            More
          </span>
        </button>
      </DropdownTrigger>
      <DropdownMenu variant="light" aria-label="Dropdown menu with description">
        <DropdownSection showDivider>
          <DropdownItem
            className="mt-3"
            key="settings"
            startContent={<Settings />}
          >
            Settings
          </DropdownItem>
          <DropdownItem
            className="mt-3"
            key="activity"
            startContent={<Activity />}
          >
            Your Activity
          </DropdownItem>
          <DropdownItem className="mt-3" key="saved" startContent={<Saved />}>
            Saved
          </DropdownItem>
          <DropdownItem
            className="mt-3"
            closeOnSelect={false}
            key="dark mode"
            endContent={<ThemeSwitch />}
            startContent={<ThemeIcon />}
          >
            Dark Mode
          </DropdownItem>

          <DropdownItem className="mt-3" key="Report" startContent={<Report />}>
            Report a problem
          </DropdownItem>
        </DropdownSection>

        <DropdownSection showDivider>
          <DropdownItem key="switch account">Switch accounts</DropdownItem>
        </DropdownSection>

        <DropdownItem onPress={handleLogout} key="logout">
          Logout
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
