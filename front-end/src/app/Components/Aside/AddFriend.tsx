'use client'

import React, { useState } from 'react'
import { IoPersonAddSharp } from "react-icons/io5";
import axios from 'axios';
import {getUserNameFromJWT} from '@/app/utils/getUserNameFromJWT'

export default function AddFriend() {
  const [userName, setUserName] = useState('');

  const handleSearchChange = (event:any) => {
    setUserName(event.target.value);
  }

  const handleSearchFriend = async () => {
    try {
      await axios.get(`http://localhost:3002/users/${userName}`);
      const friendName = await getUserNameFromJWT() 
      handleAddFriend(friendName, userName);
    } catch (error) {
      console.error(error);
    }
  }

  const handleAddFriend = async (friendName: string, userName: string) => {
    try {
      await axios.post(`http://localhost:3002/users/Addfriend`, { friendName, userName });
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className='flex flex-co gap-2 text-red-500'>
      <div>
        <IoPersonAddSharp/>
      </div>
      <div>
        <input type="text" placeholder="Search users" value={userName} onChange={handleSearchChange} />
        <button onClick={handleSearchFriend}>Add Friend</button>
      </div>
    </div>
  )
}
