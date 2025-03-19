"use client";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  DropdownSection,
} from "@heroui/react";

import { MoreOption } from "../../shared/Icon/index";
import { SlUserUnfollow } from "react-icons/sl";
import { FaRegCopy } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import { useRouter } from "next/navigation";
import { TPost } from "@/src/types/post.type";
import copy from "copy-to-clipboard";
import { useEffect, useState } from "react";
import { notification } from "@/src/utils/notification";

export default function PostMoreOption({ post }: { post: TPost }) {
  const router = useRouter();
  const [currentUrl, setCurrentUrl] = useState("");

  const handleCopyToClipBoard = (post: TPost) => {
    copy(`${currentUrl}p/${post?._id}`);
    notification({ message: "Link copied to clipboard", color: "success" });
  };

  useEffect(() => {
    if (process) {
      setCurrentUrl(window.location.href);
    }
  }, []);

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
        <button>
          <MoreOption />
        </button>
      </DropdownTrigger>
      <DropdownMenu variant="light" aria-label="Dropdown menu with description">
        <DropdownSection>
          <DropdownItem
            className="mt-3"
            key="unfollow"
            startContent={<SlUserUnfollow size={15} />}
          >
            Unfollow
          </DropdownItem>
          <DropdownItem
            closeOnSelect
            className="mt-3"
            key="post details"
            startContent={<SlUserUnfollow size={15} />}
            onPress={() => router.push(`/p/${post?._id}`)}
          >
            Go to post
          </DropdownItem>
          <DropdownItem
            onPress={() => handleCopyToClipBoard(post)}
            className="mt-3"
            key="activity"
            startContent={<FaRegCopy />}
            closeOnSelect
          >
            Copy Link
          </DropdownItem>
          <DropdownItem
            closeOnSelect
            className="mt-3"
            key="saved"
            startContent={<MdCancel />}
          >
            Cancel
          </DropdownItem>
        </DropdownSection>
      </DropdownMenu>
    </Dropdown>
  );
}
