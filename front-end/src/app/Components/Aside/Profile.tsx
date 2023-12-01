import { LogoutButton, UserName } from "./index";
import React from "react";

export default function Profile() {
  const key = Date.now();

  return (
    <div className="flex gap-2 text-red-800">
      <span>Foto</span>
      <UserName key={key} />
      <LogoutButton />
    </div>
  );
}