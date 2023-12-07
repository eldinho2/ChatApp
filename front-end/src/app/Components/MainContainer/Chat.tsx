"use client";

import React, { useEffect, useState, useRef } from "react";
import io, { Socket } from "socket.io-client";
import { getUserNameFromJWT } from "../../utils/getUserNameFromJWT";
import { useParams } from "next/navigation";
import { SendMessage, Message } from "./index";

export default function Chat() {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const conversationId = useParams();

  const [messages, setMessages] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState(false);
  const [socket, setSocket] = useState<Socket | null>(null);  

  useEffect(() => {
    if (Object.values(conversationId).length !== 0) {
      const newSocket = io(`${process.env.BASE_URL}`);
      setSocket(newSocket);
    }
  }, [conversationId]);

  useEffect(() => {
    if (socket) {
      socket.on("connect", function () {
        if (Object.values(conversationId).length === 0) {
          setError(true);
          return;
        }
        async function getUserName() {
          const user = await getUserNameFromJWT();
          setName(user);
          socket?.emit("join", { conversationId: conversationId, name: user });
        }
        getUserName();
      });

      socket.on("load_messages", (messages: any) => {
        const messagesRedis = messages.map((jsonString: string) =>
          JSON.parse(jsonString)
        );
        const formattedMessages = messagesRedis.map(
          (message: any) => `${message.userName}: ${message.chatMessage}`
        );
        setMessages(formattedMessages);
      });

      const messageListener = (message: any) => {
        if (message.conversationId.id === conversationId.id) {
          const formattedMessage = `${message.userName}: ${message.chatMessage}`;
          setMessages((prevMessages: any) => [
            ...prevMessages,
            formattedMessage,
          ]);
        }
      };

      socket.on("recive_message", messageListener);

      return () => {
        socket.off("recive_message", messageListener);
      };
    }
  }, [socket, conversationId, name]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView();
  }

  useEffect(scrollToBottom, [messages]);


  return (
    <>
      <div className="flex flex-col h-full bg-gray-bg p-4 justify-center items-center overflow-y-scroll">
        <div className="overflow-y-auto mb-4 flex-grow w-1/2">
          {messages.map((message: any, index: number) => (
            <Message
              key={index}
              chatMessage={message}
              name={name}
            />
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>
      <div className="flex flex-col justify-center items-center">
        <SendMessage
          socket={socket}
          name={name}
          conversationId={conversationId}
        />
      </div>
    </>
  );
}
