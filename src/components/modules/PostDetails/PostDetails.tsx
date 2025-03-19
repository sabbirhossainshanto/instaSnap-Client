"use client";
import images from "@/src/assets/images";
import { useAddComment } from "@/src/hooks/comment.hook";
import { useAddToLikeToPost, useGetSinglePost } from "@/src/hooks/post.hook";
import { useUser } from "@/src/providers/user.provider";
import { TPost } from "@/src/types/post.type";
import { notification } from "@/src/utils/notification";
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";
import Image from "next/image";
import { useRef, useState } from "react";
import PostMoreOption from "../../modals/PostMoreOption/PostMoreOption";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { Bookmark, Comment, Liked, Share, UnLike } from "../../shared/Icon";
import { HiOutlineEmojiHappy } from "react-icons/hi";
import Link from "next/link";

const PostDetails = ({ postId }: { postId: string }) => {
  const commentRef = useRef<HTMLInputElement | null>(null);
  const { mutate: addComment } = useAddComment();
  const { mutate: addLike } = useAddToLikeToPost();
  const [comment, setComment] = useState("");
  const [showEmoji, setShowEmoji] = useState(false);
  const { user } = useUser();
  const { data, refetch: refetchPost } = useGetSinglePost(postId);

  if (!data?.data) {
    return null;
  }

  const post = data?.data;

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
            refetchPost();
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
          refetchPost();
          notification({ message: data?.message });
        } else {
          notification({ message: data?.message, color: "warning" });
        }
      },
    });
  };

  const isUserLikedToPost = post?.likes?.find((usr) => usr._id === user?._id);
  return (
    <div className="w-full max-h-[90vh] h-full">
      <div className="max-w-[815px] h-full w-full mx-auto border-[0.5px] border-secondary/20 mt-10  grid grid-cols-12">
        <div className="col-span-7 h-full">
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
        </div>
        <div className="col-span-5 h-full flex flex-col justify-between">
          <div className="flex items-center justify-between p-2 border-b-[0.5px] border-secondary/20">
            <div className="flex items-center gap-3">
              <Image
                height={20}
                width={20}
                className="rounded-full"
                src={post?.user?.profilePhoto || images.user}
                alt="user"
              />

              <div>
                <h5 className="text-sm">{user?.userName}</h5>
                <p className="text-secondary text-xs">{user?.fullName}</p>
              </div>
            </div>
            <PostMoreOption post={post} />
          </div>
          <div className="flex flex-col  p-2 border-b-[0.5px] border-secondary/20 h-full">
            <div className="flex items-center gap-3">
              <Image
                height={20}
                width={20}
                className="rounded-full"
                src={post?.user?.profilePhoto || images.user}
                alt="user"
              />

              <div>
                <h5 className="text-sm">{user?.userName}</h5>
                <p>{post?.caption}</p>
              </div>
            </div>
            <div className="mt-10">
              {post?.comments?.map((comment) => (
                <div
                  key={comment?._id}
                  className="flex items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-2">
                    <Image
                      height={20}
                      width={20}
                      className="rounded-full"
                      src={comment?.commentUser?.profilePhoto || images.user}
                      alt="user"
                    />
                    <div>
                      {" "}
                      <h5 className="text-sm">
                        {comment?.commentUser?.userName}
                      </h5>
                      <p>{comment?.text}</p>
                      <div className="flex items-center justify-between gap-4">
                        <button className="text-secondary text-xs">Like</button>
                        <button className="text-secondary text-xs">
                          Reply
                        </button>
                      </div>
                    </div>
                  </div>
                  <button>
                    <UnLike height={14} />
                  </button>
                </div>
              ))}
            </div>
          </div>
          <div className="px-2  mt-auto py-5">
            <div className="flex items-center justify-between">
              <div className="flex gap-5 items-center">
                <button onClick={() => handleLikeToPost(post?._id)}>
                  {isUserLikedToPost ? (
                    <Liked height={18} />
                  ) : (
                    <UnLike width={18} />
                  )}
                </button>
                <button onClick={() => commentRef.current!.focus()}>
                  <Comment height={18} />
                </button>
                <button>
                  <Share height={18} />
                </button>
              </div>
              <button>
                <Bookmark height={18} />
              </button>
            </div>
            {post?.likes?.length > 1 && (
              <div className="mt-2 text-sm">
                Liked by{" "}
                <Link
                  className="font-semibold"
                  href={`/${post?.likes?.[0]?.userName}`}
                >
                  {post?.likes?.[0]?.userName}
                </Link>{" "}
                and others
              </div>
            )}
            <div className="relative mt-7 flex items-center gap-4">
              <Image
                height={20}
                width={20}
                className="rounded-full"
                src={user?.profilePhoto || images.user}
                alt="user"
              />
              <input
                ref={commentRef}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Add a comment"
                className="w-full bg-transparent outline-none"
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
                <div className="relative">
                  <button onClick={() => setShowEmoji((prev) => !prev)}>
                    <HiOutlineEmojiHappy size={20} />
                  </button>

                  {showEmoji && (
                    <div className="absolute right-0 -top-96 z-10">
                      <EmojiPicker
                        height="335px"
                        onEmojiClick={(emoji) => handleEmojiClick(emoji)}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDetails;
