"use client";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import React from "react";
import { LuMoreVertical } from "react-icons/lu";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { Switch } from "../ui/switch";
import { useTheme } from "next-themes";
import { signOut } from "next-auth/react";

function MyAvatar() {
  const { theme, setTheme } = useTheme();

  return (
    <Popover>
      <PopoverTrigger>
        <div className="flex h-full cursor-pointer items-center justify-between rounded-full bg-light-secondary p-2 dark:bg-slate-800 md:w-80">
          <div className="flex items-center gap-x-5">
            <Avatar className="border-2 border-white">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="hidden font-medium md:block">Taras Sinyakov</div>
          </div>
          <LuMoreVertical className="mr-3 hidden h-6 w-6 md:block" />
        </div>
      </PopoverTrigger>
      <PopoverContent>
        <div className="flex cursor-pointer items-center justify-between gap-x-3 rounded-xl p-2 duration-200 hover:bg-gray-50 dark:hover:bg-gray-800">
          Prymary theme
          <Switch
            defaultChecked={theme === "dark"}
            onCheckedChange={(value) => {
              setTheme(value ? "dark" : "light");
            }}
          />
        </div>
        <div
          className="flex cursor-pointer items-center gap-x-3 rounded-xl p-2 duration-200 hover:bg-gray-50 dark:hover:bg-gray-800"
          onClick={() => signOut()}
        >
          Sign-out
        </div>
      </PopoverContent>
    </Popover>
  );
}

export default MyAvatar;
