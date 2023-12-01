import LogoutButton from './LoggoutButton';
import React from 'react';
import { nextAuthOptions } from '@/app/api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';
import jwt, { Secret } from 'jsonwebtoken';

import { Session } from 'next-auth';

interface ExtendedSession extends Session {
  message: string;
}

const secret = process.env.JWT_SECRET;

export default async function Profile() {
  const session = await getServerSession(nextAuthOptions) as ExtendedSession;
  
  const getUserNameFromJWT = () => {
    const token = session?.message;
    

    if (token) {
      const decodedToken = jwt.verify(token, secret as Secret) as { userName: string };
      return decodedToken.userName;
    }

    return 'Nome de Usuário Desconhecido';
  };

  return (
    <div className="flex gap-2 text-red-800">
      <span>Foto</span>
      <span>{getUserNameFromJWT()}</span>
      <LogoutButton />
    </div>
  );
}
