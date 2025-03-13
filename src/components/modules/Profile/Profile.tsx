"use client";

import { TUser } from "@/src/types";
import Image from "next/image";
import React, { useState } from "react";
import profile from "../../../assets/img/profile.jpg";
import ISButton from "@/src/lib/ISButton/ISButton";
import { Post, Saved, Settings, Tagged } from "../../shared/Icon";
import ISDivider from "@/src/lib/ISDivider/ISDivider";
import Link from "next/link";

const Profile = ({ data }: { data: TUser }) => {
  const [tab, setTab] = useState<"posts" | "saved" | "tagged">("posts");

  return (
    <div className="w-full flex flex-col items-center justify-center">
      <div className="w-full max-w-[925px] p-10">
        <div className="flex items-starts gap-10  xl:gap-32">
          <div>
            <Image
              src={profile}
              height={150}
              width={150}
              alt="user"
              className="rounded-full"
            />
          </div>
          <div className="flex flex-col gap-8">
            <div className="flex items-center gap-4">
              <h6 className="text-2xl">{data?.userName}</h6>
              <ISButton
                as={Link}
                href="/accounts/edit"
                radius="sm"
                className="bg-secondary text-primary"
                size="md"
              >
                Edit Profile
              </ISButton>

              <ISButton
                radius="sm"
                className="bg-secondary text-primary"
                size="md"
              >
                View Archive
              </ISButton>
              <button className="text-lg">
                <Settings height="24" width="24" />
              </button>
            </div>
            <div className="flex items-center gap-8 text-sm">
              <p className="flex gap-1">
                <span>2</span>
                <span className="text-secondary">posts</span>
              </p>
              <p className="flex gap-1">
                <span>{data?.followers?.length}</span>
                <span className="text-secondary">followers</span>
              </p>
              <p className="flex gap-1">
                <span>{data?.followings?.length}</span>
                <span className="text-secondary">following</span>
              </p>
            </div>
            <div>
              <h3 className="text-xl">{data?.fullName}</h3>
            </div>
          </div>
        </div>
        <ISDivider className="mt-20" />
        <div className="flex items-center justify-center gap-16 mt-3">
          <div className="relative">
            {tab === "posts" && (
              <ISDivider className="absolute -top-3 bg-white z-10" />
            )}
            <button
              onClick={() => setTab("posts")}
              className="flex items-center gap-2"
            >
              <Post /> <span>Posts</span>
            </button>
          </div>
          <div className="relative">
            {tab === "saved" && (
              <ISDivider className="absolute -top-3 bg-white z-10" />
            )}
            <button
              onClick={() => setTab("saved")}
              className="flex items-center gap-2"
            >
              <Saved /> <span>Saved</span>
            </button>
          </div>
          <div className="relative">
            {tab === "tagged" && (
              <ISDivider className="absolute -top-3 bg-white z-10" />
            )}
            <button
              onClick={() => setTab("tagged")}
              className="flex items-center gap-2"
            >
              <Tagged /> <span>Tagged</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
