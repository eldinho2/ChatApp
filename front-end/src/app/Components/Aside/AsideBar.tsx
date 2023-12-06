import React from "react";
import { Profile } from "./index";
import { AddFriend } from "./index";
import { Friends } from './index'

export default function AsideBar() {
  return (
    <aside className="bg-black text-white h-screen w-[230px] flex flex-col justify-evenly">
      <div>
        <AddFriend />
      </div>
      <div>
        <Friends/>
      </div>
      <div>
        <Profile />
      </div>
    </aside>
  );
}