"use client";

import React, { useState } from "react";
import { IoPersonAddSharp } from "react-icons/io5";
import axios from "axios";
import { getUserNameFromJWT } from "@/app/utils/getUserNameFromJWT";
import Image from "next/image";
import LoadingSpinner from "@/app/utils/LoadingSpinner";
import { z } from "zod";

const userNameSchema = z
  .string()
  .min(4, "usuário deve ter pelo menos 4 caracteres")
  .max(20, "usuário não pode ter mais de 20 caracteres");

export default function AddFriend() {
    const [userName, setUserName] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
  
    const handleAddFriend = async (friendName: string, userName: string) => {
      setError("");
      try {
        await axios.post(`${process.env.BASE_URL}/users/Addfriend`, {
          friendName,
          userName,
        });
      } catch (error: any) {
        setError(error.response.data.message);
      }
    };
  
    const handleSearchFriend = async () => {
      setLoading(true);
      setUserName('');
      try {
        userNameSchema.parse(userName)
        await axios.get(`${process.env.BASE_URL}/users/${userName}`);
        const friendName = await getUserNameFromJWT();
        handleAddFriend(friendName, userName);
      } catch (error: any) {
        if (error instanceof z.ZodError) {
          setError(error.errors[0].message);
        } else {
          setError(error.response.data.message);
        }
      } finally {
        setLoading(false);
      }
    };
  
    return (
      <>
        <div className="flex items-center pl-3 gap-2 text-white">
          <Image
            src="/PFAC Logo.jpg"
            alt="add friend"
            width={30}
            height={30}
            className="rounded-full"
          />
        <input
          type="text"
          placeholder="Search"
          className="bg-transparent border-b-2 border-white outline-none text-white w-40"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          onKeyDown={(e) => { e.key === 'Enter' && handleSearchFriend() }}
        />
          {loading ? (
            <LoadingSpinner colorSpinner="black"/>
          ) : (
            <IoPersonAddSharp
              onClick={handleSearchFriend}
              className="cursor-pointer transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110"
            />
          )}
        </div>
        {error && <p className="flex justify-center items-center text-red-500 p-2">{error}</p>}
      </>
    );
  }
