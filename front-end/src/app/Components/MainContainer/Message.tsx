"use client";

import React from "react";

interface MessageProps {
  key: number;
  chatMessage: string;
  name: string;
}

const Message: React.FC<MessageProps> = ({ chatMessage, key, name }) => {
  const user = chatMessage.split(":")[0];
  const message = chatMessage.split(":")[1];
  const isCurrentUser = user === name;

  return (
    <>
      <div
        key={key}
        className={`flex ${isCurrentUser ? "justify-end" : "justify-start"}`}
      >
        <div
          className={`max-w-sm break-words rounded-lg px-4 py-2 m-2 ${
            isCurrentUser ? "bg-blue-500 text-white" : "bg-gray-300 text-black"
          }`}
        >
          <p>{message}</p>
        </div>
      </div>
    </>
  );
};

export default Message;
