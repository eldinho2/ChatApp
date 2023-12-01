import React, { useEffect, useState } from "react";
import { nextAuthOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import jwt, { Secret } from "jsonwebtoken";

import { Session } from "next-auth";

interface ExtendedSession extends Session {
  user: {
    name?: string | null | undefined;
    message: string;
  };
}

const secret = process.env.JWT_SECRET;

export default async function Profile() {

  const session = (await getServerSession(nextAuthOptions)) as ExtendedSession;

  
  const getUserNameFromJWT = () => {
    if (session) {
      const decoded = jwt.verify(session.user.message, secret as Secret);
  
      if (typeof decoded === "object" && "userName" in decoded) {
        return decoded.userName;
      }
    }
  
    return "Nome de Usuário Desconhecido";
  };


  return (
    <div className="flex gap-2 text-red-800">
      <span>{getUserNameFromJWT()}</span>
    </div>
  );
}
