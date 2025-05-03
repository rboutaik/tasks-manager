import { Plus } from "lucide-react";

export default function SideBar() {
  return (
    <div>
        <div className="absolute bg-black/40 top-0 right-0 left-0 bottom-0 w-[100vw] z-10"></div>
        <div className="bg-white border-r-1 border-slate-200 flex flex-col  w-64 h-[calc(100vh-85px)] absolute px-4 py-5 gap-5 z-20">
        <div className="flex items-center gap-2 justify-center bg-teal-500 hover:bg-teal-600 text-white font-bold py-3 px-4 rounded-xl">
            <Plus />
            <button>New Task</button>
        </div>
        <div className="flex flex-col justify-center items-start">
            <span className="text-sm font-bold text-slate-500">FILTER TASKS</span>
            <div className="flex flex-col py-3 w-full gap-1">
            {["All Tasks", "Active", "Completed"].map((item, index) => {
                return (
                <div className="p-1 font-medium px-2">
                    <span>{item}</span>
                </div>
                );
            })}
            </div>
        </div>
        <div className="flex flex-col justify-center items-start">
            <span className="text-sm font-bold text-slate-500">CATEGORIES</span>
            <div className="flex flex-col py-3 w-full gap-1">
            {["Development", "Testing", "UI/UX"].map((item, index) => {
                return (
                <div className="p-1 font-medium px-2 flex gap-3 items-center">
                    <div className="w-3 h-3 rounded-full bg-teal-400"></div>
                    <span>{item}</span>
                </div>
                );
            })}
            </div>
            <div className="flex w-full items-center p-2 gap-3 text-slate-400 font-medium">
                <Plus width={18} />
                <button>Add Category</button>
            </div>
        </div>
        </div>
    </div>
  );
}
