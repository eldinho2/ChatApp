"use client";

import React, { useState } from "react";
import { IoPersonAddSharp } from "react-icons/io5";
import axios from "axios";
import { getUserNameFromJWT } from "@/app/utils/getUserNameFromJWT";
import Image from "next/image";
import { z } from "zod";

const userNameSchema = z
  .string()
  .min(4, "usuário deve ter pelo menos 4 caracteres")
  .max(20, "usuário não pode ter mais de 20 caracteres");

export default function AddFriend() {
  const [userName, setUserName] = useState("");
  const [error, setError] = useState("");

  const handleAddFriend = async (friendName: string, userName: string) => {
    try {
      await axios.post(`http://localhost:3002/users/Addfriend`, {
        friendName,
        userName,
      });
    } catch (error: any) {
      setError(error.response.data.message);
    }
  };

  const handleSearchFriend = async () => {
    try {
      userNameSchema.parse(userName)
      await axios.get(`http://localhost:3002/users/${userName}`);
      const friendName = await getUserNameFromJWT();
      handleAddFriend(friendName, userName);
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        setError(error.errors[0].message);
      } else {
        setError(error.response.data.message);
      }
    }
  };

  return (
    <>
      <div className="flex items-center gap-2 text-white">
        <div>
          <Image
            src="/PFAC Logo.jpg"
            alt="logo"
            width={30}
            height={30}
            className="rounded-full"
          />
        </div>
          <div>
              <input
                type="text"
                placeholder="Search"
                className="bg-transparent border-b-2 border-white outline-none text-white w-40"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
        </div>
        <IoPersonAddSharp
          onClick={handleSearchFriend}
          className="cursor-pointer transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110"
        />
      </div>
      {error && <p className="text-red-500">{error}</p>}
    </>
  );
}
