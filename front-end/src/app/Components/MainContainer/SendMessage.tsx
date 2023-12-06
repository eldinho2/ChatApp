"use client";

import React, { useState, useEffect } from "react";
import { LuArrowUpSquare } from "react-icons/lu";

interface SendMessageProps {
  socket: any;
  name: string;
  conversationId: any;
}

export default function SendMessage({
  socket,
  name,
  conversationId,
}: SendMessageProps) {
  const [textareaHeight, setTextareaHeight] = useState("20px");
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState(false);

  const handleClick = async () => {
    if (Object.values(conversationId).length === 0) {
      setError(!error);
      return;
    }

    socket?.emit("send_message", {
      chatMessage: inputValue,
      userName: name,
      conversationId: conversationId,
    });
    setInputValue("");
  };

  useEffect(() => {
    const newHeight = `${Math.min(Math.max(inputValue.length, 20), 60)}px`;
    setTextareaHeight(newHeight);
  }, [inputValue]);

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(event.target.value);
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === "Enter" && inputValue.trim() !== "") {
      event.preventDefault();
      handleClick();
      setInputValue("");
    }
  };

  const handleSendClick = () => {
    if (inputValue.trim() !== "") {
      handleClick();
      setInputValue("");
    }
  };

  return (
    <>
      <div className="flex items-center px-3 py-2 w-[700px] rounded-lg bg-gray-bg">
        <textarea
          rows={1}
          value={inputValue}
          className="resize-none block mx-4 p-2.5 w-full text-sm text-white bg-gray-bg border border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent "
          placeholder="Digite sua mensagem..."
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
        ></textarea>
        <LuArrowUpSquare
          onClick={handleSendClick}
          className="cursor-pointer text-4xl mx-4"
        />
      </div>
    </>
  );
}
