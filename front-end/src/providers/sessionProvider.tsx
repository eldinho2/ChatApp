'use client'

import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";

interface NextAuthSectionProviderProps {
  children?: ReactNode;
}

export default function NextAuthSectionProvider({children}: NextAuthSectionProviderProps) {
  return (
    <SessionProvider>
      {children}
    </SessionProvider>
  )
}