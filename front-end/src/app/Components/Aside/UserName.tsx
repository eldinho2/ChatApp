'use client'

import React, { useEffect, useState } from "react";
import {getUserNameFromJWT} from '@/app/utils/getUserNameFromJWT'
import Skeleton from "@/app/utils/skeleton";

export default function UserName() {
  const [userName, setUserName] = useState("");
  const [renderKey, setRenderKey] = useState(0);

  const fetchUserName = async () => {
    const result = await getUserNameFromJWT();
    setUserName(result);
  }

  useEffect(() => {
    fetchUserName();
    setRenderKey(prevKey => prevKey + 1);
  }, []);


  return (
    <div className="flex justify-center items-center text-white">
    
      {userName ? (
        <h1 className="text-xl font-bold">{userName}</h1>
      ) : (
        <Skeleton rows={1} width="20" />
      )}
    </div>
  );
}
