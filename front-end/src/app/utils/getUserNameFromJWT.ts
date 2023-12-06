"use server"
import { nextAuthOptions } from "@/app/api/auth/[...nextauth]";
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

  
export const getUserNameFromJWT = async() => {
  const session = (await getServerSession(nextAuthOptions)) as ExtendedSession;

  if (session) {
    const decoded = jwt.verify(session.user.message, secret as Secret);
    

    if (typeof decoded === "object" && "userName" in decoded) {
      return decoded.userName
    }

    return 'erro';
  }

  return "Convidado";
};