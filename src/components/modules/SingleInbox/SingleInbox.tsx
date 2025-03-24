"use client";

import images from "@/src/assets/images";
import { useGetMessages, useSendMessage } from "@/src/hooks/message.hook";
import { useGetSingleUser } from "@/src/hooks/user.hook";
import ISButton from "@/src/lib/ISButton/ISButton";
import { useUser } from "@/src/providers/user.provider";
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";
import Image from "next/image";
import Link from "next/link";
import { FormEventHandler, useState } from "react";
import { HiOutlineEmojiHappy } from "react-icons/hi";
import { IoCallOutline, IoVideocamOutline } from "react-icons/io5";
import { RiGalleryFill, RiInformation2Line } from "react-icons/ri";

const SingleInbox = ({ userId }: { userId: string }) => {
  const { user } = useUser();
  const { mutate: sendMessage } = useSendMessage();
  const { data } = useGetSingleUser(userId);
  const { data: messages, refetch } = useGetMessages(data?.data?._id as string);
  const [text, setText] = useState("");
  const [showEmoji, setShowEmoji] = useState(false);

  const handleEmojiClick = (emoji: EmojiClickData) => {
    setText((prev) => prev + emoji.emoji);
    setShowEmoji(false);
  };

  const handleSendMessage: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const payload = {
      receiverUser: data?.data?._id,
      text,
    };
    const formData = new FormData();
    formData.append("data", JSON.stringify(payload));
    sendMessage(formData, {
      onSuccess(data) {
        if (data?.success) {
          refetch();
          setText("");
        }
      },
    });
  };

  return (
    <div className="h-full w-full flex flex-col">
      {/* Header part */}
      <div className="flex items-center justify-between p-4 border-b-[0.5px] border-secondary/20">
        <div className="flex items-center gap-2">
          <Image
            src={data?.data?.profilePhoto || images.user}
            height={40}
            width={40}
            alt="user"
            className="rounded-full"
          />
          <div className="flex flex-col">
            <h4>{data?.data?.fullName}</h4>
            <p>Active 1d ago</p>
          </div>
        </div>
        <div className="flex items-center gap-5">
          <button>
            <IoCallOutline size={30} />
          </button>
          <button>
            <IoVideocamOutline size={30} />
          </button>
          <button>
            <RiInformation2Line size={30} />
          </button>
        </div>
      </div>
      {/* Middle message */}
      <div className="overflow-y-scroll h-full p-6 w-full">
        <div className="w-full flex items-center justify-center">
          <div className="flex flex-col items-center justify-center ">
            <Image
              src={data?.data?.profilePhoto || images.user}
              height={100}
              width={100}
              alt="user"
              className="rounded-full"
            />
            <h3 className="m-0">{data?.data?.fullName}</h3>
            <p className="text-secondary m-0">
              {" "}
              <span>
                {data?.data?.userName} <span>Instagram</span>
              </span>
            </p>
            <ISButton
              as={Link}
              radius="sm"
              className="bg-secondary text-primary"
              size="sm"
              href={`/${data?.data?.userName}`}
            >
              View Profile
            </ISButton>
          </div>
        </div>
        <div className="mt-20 w-full">
          {messages?.data?.map((message) => (
            <div
              key={message?._id}
              className={`w-full flex items-center ${user?._id === message?.senderUser?._id ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`bg-default w-1/3  mt-4 py-2 pl-5  ${user?._id === message?.senderUser?._id ? "rounded-l-full rounded-br-full" : "rounded-r-full rounded-bl-full"}`}
              >
                {message?.text}
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Bottom input */}
      <form onSubmit={handleSendMessage} className="mt-auto m-3 relative">
        <input
          onChange={(e) => setText(e.target.value)}
          placeholder="Message.."
          className="pl-16 w-full h-[45px] rounded-full border-[0.5px] border-secondary/20 outline-none bg-transparent"
          value={text}
        />
        <button
          type="submit"
          className={`absolute right-3 top-2.5 text-default ${text?.length > 0 ? "visible" : "invisible"}`}
        >
          Send
        </button>
        <button
          type="button"
          onClick={() => setShowEmoji((prev) => !prev)}
          className={`absolute left-3 top-2.5  `}
        >
          <HiOutlineEmojiHappy size={25} />
        </button>
        <input type="text" hidden />
        <button
          type="button"
          className={`absolute right-3 top-2.5 ${text?.length > 0 ? "invisible" : "visible"}`}
        >
          <RiGalleryFill size={25} />
        </button>
        <div className="absolute -top-[350px]">
          <EmojiPicker
            height={"335px"}
            open={showEmoji}
            onEmojiClick={(emoji) => handleEmojiClick(emoji)}
          />
        </div>
      </form>
    </div>
  );
};

export default SingleInbox;
