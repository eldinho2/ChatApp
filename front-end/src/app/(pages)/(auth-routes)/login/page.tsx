"use client";
import React, { SyntheticEvent, useEffect, useState } from "react";
import Cookie from "js-cookie";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signIn } from "next-auth/react";

export default function Login() {
  const [token, setToken] = useState<string>("");
  const [email, setEmail] = useState<string>("viniuhftegrdize@gmail.com")
  const [password, setPassword] = useState<string>("534543")

  const router = useRouter();

  const handleLogin = async (event: SyntheticEvent) => {
    event.preventDefault();
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      console.log(result);
      return;
    }

    router.replace("/chat");
  };

  return (
    <main className="bg-gray-800 h-screen w-screen flex gap-8">
      <input type="text" value={"viniuhftegrdize@gmail.com"} name="" id="" />
      <input type="text" value={"534543"} name="" id="" />
      <button onClick={handleLogin}>Login</button>
      <Link href="/chat">
        <p>Chat</p>
      </Link>
    </main>
  );
}
