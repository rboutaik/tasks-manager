import { Search, Check, FilePenLine, Trash2, Calendar1 } from "lucide-react";
export default function TasksList() {
  return <>
    <div className="mx-auto max-w-6xl px-6 flex flex-col gap-4">
        <div className="flex items-center justify-start bg-slate-100 mt-6 rounded-xl py-2 border border-slate-300 px-3 gap-2">
            <Search width={20} className="text-slate-500" />
            <input type="text" placeholder="Search Tasks" className="placeholder-slate-500 font-medium w-full border-none outline-none "></input>
        </div>
        <div className="flex items-center justify-between px-1">
            <h2 className="text-xl font-bold">All Tasks</h2>
            <span className="text-sm text-slate-500">5 Tasks</span>
        </div>
        {
            [1, 2, 3 ,4].map((item, index) => {
                return <div className="bg-white px-2 py-4 rounded-xl border-l-3 border-red-600 flex-flex-col shadow-sm">
                <div className=" flex items-center justify-between ">
                    <div className="flex flex-col">
                        <div className="flex items-center justify-start gap-3">
                            <button 
                            className="flex-shrink-0 mt-1 w-5 h-5 rounded-md flex items-center justify-center bg-teal-500 border-teal-500 border-2">
                            <Check size={14} className="text-white" />
                            </button>
                            <span className="text-lg font-medium text-wrap">Implement Redux store</span>
                        </div>
                    </div>
                    <div className="flex items-center justify-center pr-2 gap-4 text-slate-500">
                        <FilePenLine width={22} />
                        <Trash2 width={22} />
                    </div>
                </div>
                {/* here three elems */}
                <div className="flex items-center justify-start gap-2 pt-2 pl-7 flex-wrap max-w-[75%]">
                    <div className="flex items-center justify-center text-xs bg-slate-100 text-slate-500 font-medium px-1 rounded-md">
                        <div className="flex items-center gap-1">
                            <Calendar1 width={14}/>
                            <span>2025-05-04</span>
                        </div>
                    </div>
                    <div className="flex items-center justify-center text-xs bg-purple-600 text-white font-medium p-1 rounded-md">
                        <div className="flex items-center">
                            <span>Development</span>
                        </div>
                    </div>
                    <div className="flex items-center justify-center text-xs bg-red-100 text-red-600 p-1 font-medium px-1 rounded-md">
                        <div className="flex items-center gap-1">
                            <span>High</span>
                        </div>
                    </div>
                </div>
            </div>
            })
        }
        
        
    </div>
  </>;
}
