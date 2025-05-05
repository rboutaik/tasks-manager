import { Menu } from "lucide-react";
import Image from "next/image";
import ThemeToggle from "./themeToggle";

export default function NavBar() {
  return (
      <nav className="relative bg-white dark:bg-slate-800 border-b-[0.5px] border-gray-500  z-40">
        <div className="mx-auto max-w-6xl  p-5 flex items-center justify-between">
          <div className="flex gap-2 items-center">
            <Menu size={25} />
            <h2 className="text-xl font-bold">Taskify</h2>
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
