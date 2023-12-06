import React from "react";
import { Profile } from "./index";
import { AddFriend } from "./index";
import { Friends } from './index'

export default function AsideBar() {
  return (
    <aside className="bg-black text-white h-screen w-[290px] flex flex-col justify-between py-12">
      <AddFriend />
      <Friends/>
      <Profile />
    </aside>
  );
}