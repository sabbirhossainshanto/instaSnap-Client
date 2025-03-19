"use client";
import Image from "next/image";
import moment from "moment";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { Bookmark, Comment, Liked, Share, UnLike } from "../../shared/Icon";
import { useAddToLikeToPost, useGetAllPost } from "@/src/hooks/post.hook";
import { useUser } from "@/src/providers/user.provider";
import images from "@/src/assets/images";
import Link from "next/link";
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";
import { useState } from "react";
import { HiOutlineEmojiHappy } from "react-icons/hi";
import { notification } from "@/src/utils/notification";
import PostMoreOption from "../../modals/PostMoreOption/PostMoreOption";
import { useAddComment } from "@/src/hooks/comment.hook";
import { TPost } from "@/src/types/post.type";

const Posts = () => {
  const { mutate: addComment } = useAddComment();
  const { mutate: addLike } = useAddToLikeToPost();
  const [comment, setComment] = useState("");
  const [showEmoji, setShowEmoji] = useState(false);
  const { user } = useUser();
  const { data, refetch: refetchPosts } = useGetAllPost();

  if (data?.data?.length === 0) {
    return null;
  }

  const handleEmojiClick = (emoji: EmojiClickData) => {
    setComment((prev) => prev + emoji.emoji);
    setShowEmoji(false);
  };

  const handleLikeToPost = (postId: string) => {
    addLike(
      { postId },
      {
        onSuccess: (data) => {
          if (data?.success) {
            refetchPosts();
            notification({ message: data?.message });
          } else {
            notification({ message: data?.message, color: "warning" });
          }
        },
      }
    );
  };

  const handleAddComment = (payload: TPost) => {
    const postData = {
      text: comment,
      post: payload?._id,
    };
    addComment(postData, {
      onSuccess: (data) => {
        if (data?.success) {
          setComment("");
          refetchPosts();
          notification({ message: data?.message });
        } else {
          notification({ message: data?.message, color: "warning" });
        }
      },
    });
  };

  return (
    <div className="pt-5  flex flex-col items-center justify-center gap-20 max-w-[500px] mx-auto">
      {data?.data?.map((post) => {
        const isUserLikedToPost = post?.likes?.find(
          (usr) => usr._id === user?._id
        );

        return (
          <div
            key={post?._id}
            className="flex flex-col w-full h-full max-h-[80vh]"
          >
            <div className="flex items-center justify-between px-2 xl:px-0 pb-2">
              <div className="flex items-center gap-3">
                <Image
                  height={40}
                  width={40}
                  className="rounded-full"
                  src={post?.user?.profilePhoto || images.user}
                  alt="user"
                />

                <Link
                  href={`/${post?.user?.userName}`}
                  className="text-sm font-semibold"
                >
                  {post?.user?.userName}
                </Link>

                <p className="flex items-baseline">
                  <span className="text-start m-0 p-0 mr-1">.</span>{" "}
                  <span>
                    {moment(post?.createdAt).startOf("hour").fromNow()}
                  </span>
                </p>
              </div>
              <PostMoreOption post={post} />
            </div>

            <Swiper
              slidesPerView={1}
              navigation={true}
              modules={[Navigation]}
              className="mySwiper w-full h-full min-h-[200px]"
            >
              {post?.media?.map((media) => {
                return (
                  <SwiperSlide key={media} style={{ width: "100%" }}>
                    <Image
                      height={500}
                      width={500}
                      className="w-full h-full  object-cover"
                      src={media}
                      alt="user"
                    />
                  </SwiperSlide>
                );
              })}
            </Swiper>
            <div className="space-y-2.5 px-2">
              <div className="flex items-center justify-between mt-3">
                <div className="flex gap-5 items-center">
                  <button onClick={() => handleLikeToPost(post?._id)}>
                    {isUserLikedToPost ? <Liked /> : <UnLike />}
                  </button>
                  <Link href={`/p/${post?._id}`}>
                    <Comment />
                  </Link>
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

              {post?.comments?.length > 0 && (
                <Link href={`/p/${post?._id}`} className="text-secondary">
                  View all {post?.comments?.length} comments
                </Link>
              )}

              <div className="relative">
                <input
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Add a comment"
                  className="w-full bg-transparent  border-b-[0.5px] border-secondary/20 pb-3 outline-none"
                  value={comment}
                />
                <div className="absolute right-0 top-0 flex items-center gap-3">
                  {comment?.length > 0 && (
                    <button
                      onClick={() => handleAddComment(post)}
                      className="text-default"
                    >
                      Post
                    </button>
                  )}
                  <button onClick={() => setShowEmoji((prev) => !prev)}>
                    <HiOutlineEmojiHappy size={20} />
                  </button>
                </div>
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
