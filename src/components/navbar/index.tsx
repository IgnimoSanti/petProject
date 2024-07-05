import Image from "next/image";
import React from 'react';


import Time from "./time";
import MyAvatar from "./my-avatar";
import { auth } from "@/../auth";

async function  Navbar() {
  const session = await auth();
  return (
    <div className="flex h-[11vh] w-full items-center justify-between bg-light-primary px-4 py-3 dark:bg-dark-primary">
      <Image
        src="/logoCam.png"
        alt="Logo"
        width={40}
        height={40}
        quality={100}
      />
		<div className="flex items-center gap-x-5">
			<Time />
			{session && <MyAvatar />}
		</div>
    </div>
  );
}

export default  Navbar;
