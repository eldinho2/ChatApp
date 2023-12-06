import { LogoutButton, UserName } from "./index";
import React from "react";

export default function Profile() {
  return (
    <div className="flex pl-5 items-center gap-2">
      <UserName />
      <LogoutButton />
    </div>
  );
}