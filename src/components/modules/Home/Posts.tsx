"use client";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { Bookmark, Comment, MoreOption, Share } from "../../shared/Icon";
import { useGetAllPost } from "@/src/hooks/post.hook";
import { useUser } from "@/src/providers/user.provider";
import images from "@/src/assets/images";
import { LuHeart } from "react-icons/lu";
import Link from "next/link";
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";
import { useState } from "react";
import { HiOutlineEmojiHappy } from "react-icons/hi";

const Posts = () => {
  const [comment, setComment] = useState("");
  const [showEmoji, setShowEmoji] = useState(false);
  const { user } = useUser();
  const { data } = useGetAllPost();

  if (data?.data?.length === 0) {
    return null;
  }

  const handleEmojiClick = (emoji: EmojiClickData) => {
    setComment((prev) => prev + emoji.emoji);
    setShowEmoji(false);
  };
  return (
    <div className="pt-10 flex flex-col items-center justify-center gap-20 mb-20">
      {data?.data?.map((post) => {
        return (
          <div
            key={post?._id}
            className="flex flex-col max-w-[500px] w-full h-full max-h-[80vh]"
          >
            <div className="flex items-center justify-between px-4 xl:px-0 pb-2">
              <div className="flex items-center gap-3">
                <Image
                  height={40}
                  width={40}
                  className="rounded-full"
                  src={post?.user?.profilePhoto || images.user}
                  alt="user"
                />

                <div>
                  <h5 className="text-sm">{user?.userName}</h5>
                  <p className="text-secondary text-xs">{user?.fullName}</p>
                </div>
              </div>
              <button>
                <MoreOption />
              </button>
            </div>

            <Swiper
              slidesPerView={1}
              navigation={true}
              modules={[Navigation]}
              className="mySwiper w-full h-full"
            >
              {post?.media?.map((media) => {
                return (
                  <SwiperSlide key={media} style={{ width: "100%" }}>
                    <Image
                      height={400}
                      width={500}
                      className="w-full h-full object-cover"
                      src={media}
                      alt="user"
                    />
                  </SwiperSlide>
                );
              })}
            </Swiper>
            <div className="space-y-2.5">
              <div className="flex items-center justify-between mt-3">
                <div className="flex gap-5 items-center">
                  <button>
                    <LuHeart size={27} />
                  </button>
                  <button>
                    <Comment />
                  </button>
                  <button>
                    <Share />
                  </button>
                </div>
                <button>
                  <Bookmark />
                </button>
              </div>
              <div>
                <p>Liked by {post?.likes?.length} people</p>
              </div>
              <div>
                <p>
                  <Link
                    className="font-semibold"
                    href={`/${post?.user?.userName}`}
                  >
                    {post?.user?.userName}
                  </Link>{" "}
                  {post?.caption}
                </p>
              </div>

              <p>View all 10 comments</p>

              <div className="relative">
                <input
                  placeholder="Add a comment"
                  className="w-full bg-transparent  border-b-[0.5px] border-secondary/20 pb-3 outline-none"
                />
                <button
                  onClick={() => setShowEmoji((prev) => !prev)}
                  className="absolute right-0"
                >
                  <HiOutlineEmojiHappy size={20} />
                </button>
                <div className="absolute -right-96 -top-96 z-10">
                  <EmojiPicker
                    height={"335px"}
                    open={showEmoji}
                    onEmojiClick={(emoji) => handleEmojiClick(emoji)}
                  />
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Posts;
