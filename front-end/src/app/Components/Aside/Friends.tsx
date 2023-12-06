"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { getUserNameFromJWT } from "@/app/utils/getUserNameFromJWT";
import LoadingSpinner from "@/app/utils/LoadingSpinner";
import Link from "next/link";
import { usePathname } from 'next/navigation'

interface FriendType {
  friendName: string,
  conversationId: string,
}

export default function Friends(){
  const path = usePathname()  
  

  const [friends, setFriends] = useState([]);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const handleGetFriends = async () => {
      try {
        const userName = await getUserNameFromJWT();
        setUserName(userName);
        
        const response = await axios.get(`http://localhost:3002/users/${userName}/friends`);
        setFriends(response.data.friends);
        
      } catch (error) {
        console.error(error);
      }
    }
  
    handleGetFriends();
  }, [])

  const handleDellFriend = async (friendName: string, userName: string) => {
    try {
      await axios.post(`http://localhost:3002/users/Dellfriend`, { friendName, userName });
      setFriends((prevFriends) => prevFriends.filter((friend) => friend.friendName !== friendName));
    } catch (error) {
      console.error(error);
    }    
  }

  return (
    <div>
      {!friends ? (
        <LoadingSpinner />
      ) : (
        friends.map((friend: FriendType, index) => (
          <div className="flex gap-5" key={index}>
            <Link href={
              path === "/chat" ? 
              `/chat/${friend.conversationId}` : 
              `/chat/${friend.conversationId}`
            }>{friend.friendName}</Link>
            <div className="text-red-400" onClick={ () => handleDellFriend(friend.friendName, userName)}>Dell Friend</div>
          </div>
        ))
      )}
    </div>
  );
};
 