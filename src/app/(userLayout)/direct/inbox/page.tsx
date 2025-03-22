"use client";

import { FaFacebookMessenger } from "react-icons/fa";

const Inbox = () => {
  return (
    <div className="w-full flex flex-col items-center justify-center h-screen">
      <div className="p-10 border-2 rounded-full mb-5">
        <FaFacebookMessenger size={40} />
      </div>
      <p className="text-xl">Your Messages</p>
      <p className="text-secondary">Send a message to start a chat.</p>
    </div>
  );
};

export default Inbox;
