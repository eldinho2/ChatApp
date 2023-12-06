'use client'

import React from 'react';
import { useUserInHeaderStore } from '@/store/userInHeader';

export default function Header() {
  const username = useUserInHeaderStore((state) => state.username);

  return (
    <div className='bg-gray-bg/90 text-white pl-8 fixed w-full h-10 top-0 flex items-center text-xl font-medium'>
      {username}
    </div>
  );
}