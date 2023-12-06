'use client'

import React, { useEffect, useState } from "react";
import {getUserNameFromJWT} from '@/app/utils/getUserNameFromJWT'

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
    <div className="flex gap-2 text-red-800">
      <span>{userName}</span>
    </div>
  );
}
