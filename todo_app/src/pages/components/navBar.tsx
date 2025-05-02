import { Menu, Sun } from "lucide-react";
import Image from "next/image";

export default function NavBar() {
  return (
    <>
      <nav className="bg-white border-b border-slate-200">
        <div className="mx-auto max-w-6xl bg-white  p-5 flex items-center justify-between">
          <div className="flex gap-2 items-center">
            <Menu size={25} />
            <h2 className="text-xl font-bold">Taskify</h2>
          </div>
          <div className="flex gap-4 items-center">
            <Sun></Sun>
            <div className="w-10 h-10">
              <Image
              className="rounded-full"
                  src="https://i.pravatar.cc/500?img=68"
                  width={500}
                  height={500}
                  alt="Picture of the author"
              />
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
