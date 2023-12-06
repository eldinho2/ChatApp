import { LogoutButton, UserName } from "./index";
import React from "react";

export default function Profile() {
  return (
    <div className="flex gap-2 text-red-800">
      <span>Foto</span>
      <UserName />
      <LogoutButton />
    </div>
  );
}