'use client'

import React, { useState, useEffect } from "react";
import { LuArrowUpSquare } from "react-icons/lu";

export default function SendMessage({ inputValue, setInputValue, sendSocketMessage  }: any) {
  const [textareaHeight, setTextareaHeight] = useState(80);

  const handleTextareaChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(event.target.value);
    const newHeight = event.target.scrollHeight;
    if (newHeight <= 140) {
      setTextareaHeight(newHeight);
    }
  };

  useEffect(() => {
    if(inputValue === ' ') {
      setTextareaHeight(80);
      return;
    }
  }, [inputValue])

  return (
    <div className="flex justify-center items-center h-20 bg-gray-bg">
      <div
        className="flex justify-between items-center p-2 w-[700px] rounded-xl border border-secondary overflow-hidden"
        style={{ height: textareaHeight + "px" }}
      >
        <textarea
          placeholder="Digite sua mensagem..."
          value={inputValue}
          rows={1}
          className="bg-main-grey text-primary border-none resize-none outline-none"
          onChange={handleTextareaChange}
        ></textarea>
        <LuArrowUpSquare onClick={sendSocketMessage} className="cursor-pointer text-4xl mx-4" />
      </div>
    </div>
  );
};