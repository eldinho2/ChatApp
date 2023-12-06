"use client";

import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function ButtonLogout() {
  const router = useRouter();

  async function logout() {
    await signOut({
      redirect: false,
    });

    router.replace("/");
  }

  return (
    <button
      onClick={logout}
      className="border border-red-500 hover:bg-red-700 text-white py-2 px-4 rounded"
    >
      Sair
    </button>
  );
}
