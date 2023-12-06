"use client";

import React, { useEffect, useState } from "react";
import io, { Socket } from "socket.io-client";
import { getUserNameFromJWT } from "../../utils/getUserNameFromJWT";
import { useParams } from "next/navigation";
import { SendMessage, Message } from './index'


export default function Chat() {
const conversationId = useParams();

const [messages, setMessages] = useState<any>([]);
const [inputValue, setInputValue] = useState("");
const [name, setName] = useState("");
const [error, setError] = useState(false);
const [socket, setSocket] = useState<Socket | null>(null);

const handleGetUserName = async () => {
  try {
    const userName = await getUserNameFromJWT();
    setName(userName);
  } catch (error) {
    console.error(error);
  }
}

useEffect(() => {
  handleGetUserName();
}, []);

useEffect(() => {
  if (Object.values(conversationId).length !== 0) {
    const newSocket = io("http://localhost:3002");
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
      socket.emit('join', { conversationId: conversationId });
    });

    socket.on("load_messages", (messages: any) => {
      const messagesRedis = messages.map((jsonString: string) => JSON.parse(jsonString));
      const formattedMessages = messagesRedis.map((message: any) => `${message.userName}: ${message.chatMessage}`);
      setMessages(formattedMessages);
    });

    const messageListener = (message: any) => {
      if (message.conversationId.id === conversationId.id) {
        const formattedMessage = `${message.userName}: ${message.chatMessage}`;
        setMessages((prevMessages: any) => [...prevMessages, formattedMessage]);
      }
    };

    socket.on('recive_message', messageListener);

    return () => {
      socket.off('recive_message', messageListener);
    }
  }
}, [socket, conversationId]);

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

return (
  <div className="flex flex-col h-full bg-gray-200 p-4">
    <div className="overflow-y-auto mb-4 flex-grow">
      {messages.map((message, index) => {
        const [userName, chatMessage] = message.split(': ');
        const isCurrentUser = userName === name;
        return (
          <div key={index} className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'}`}>
            <div className={`rounded-lg px-4 py-2 m-2 ${isCurrentUser ? 'bg-blue-500 text-white' : 'bg-gray-300 text-black'}`}>
              <p>{chatMessage}</p>
            </div>
          </div>
        );
      })}
    </div>
    <SendMessage
      inputValue={inputValue}
      setInputValue={setInputValue}
      sendSocketMessage={handleClick}
    />
    <p className="bg-green-600">{error ? 'erro' : ''}</p>
  </div>
);
}
