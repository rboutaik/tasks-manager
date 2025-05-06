"use client";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import ThemeToggle from "./themeToggle";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { showSideBarToggle } from "@/lib/redux/features/taskSlice";




export default function NavBar() {
  const { showSideBar } = useAppSelector((state) => state.tasks);
  const dispatch = useAppDispatch();
  return (
    <nav className=" bg-white dark:bg-slate-800 border-b-[0.5px] border-gray-500  z-40 relative">
      <div className="mx-auto max-w-6xl  p-5 flex items-center justify-between">
        <div className="flex gap-2 items-center">
          <div onClick={() => dispatch(showSideBarToggle())}>
            {showSideBar ? <X size={25} /> : <Menu size={25} />}
          </div>

          <h2 className={`text-2xl font-bold font-merienda`}>Taskify</h2>
        </div>
        <div className="flex gap-4 items-center">
          <ThemeToggle />
          <div className="w-10 h-10">
            <Image
              className="rounded-full shadow-sm shadow-slate-400"
              src="https://i.pravatar.cc/500?img=68"
              width={500}
              height={500}
              alt="Picture of the author"
            />
          </div>
        </div>
      </div>
    </nav>
  );
}
