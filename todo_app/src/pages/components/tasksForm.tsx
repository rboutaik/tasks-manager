import { X } from "lucide-react"
export default function TasksForm () {
    return(
        <div className="flex flex-col bg-white border-1 border-slate-300 p-4 rounded-xl">
            <div className="flex items-center justify-between font-bold">
                <span>Add New Task</span>
                <X width={18} />
            </div>
            <div className="flex flex-col justify-center items-center py-4">
                <div className="bg-slate-100 w-full border-1 border-slate-300 rounded-xl">
                    <input type="text" placeholder="Task title" className="w-full text-slate-500 border-none outline-none py-2 px-4"/>
                </div>
            </div>
            <div className="flex flex-col justify-center items-center py-4">
                <div className="bg-slate-100 w-full border-1 border-slate-300 rounded-xl">
                    <textarea placeholder="Task description" rows={3} className="w-full text-slate-500 border-none outline-none py-2 px-4" />
                </div>
            </div>
            <div className="flex gap-4">
                <div className="flex-1 bg-slate-100 w-full border-1 border-slate-300 rounded-xl px-2">
                    <select className="w-full py-1 px-3 outline-none">
                        <option>Select Priority</option>
                        <option>Low</option>
                        <option>Medium</option>
                        <option>High</option>
                    </select>
                </div>
                <div className="flex-1 bg-slate-100 w-full border-1 border-slate-300 rounded-xl px-2">
                    <select className="w-full py-1 px-3 outline-none">
                        <option>Select Category</option>
                        <option>Development</option>
                        <option>Testing</option>
                        <option>UI/UX</option>
                    </select>
                </div>
            </div>
            <div className="flex flex-col justify-center items-center py-4">
                <div className="bg-slate-100 w-full border-1 border-slate-300 rounded-xl">
                    <input type="date" placeholder="Task title" className="w-full text-slate-500 border-none outline-none py-2 px-4"/>
                </div>
            </div>
            <div className="flex items-center justify-end">
                <button className="bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-4 rounded-xl">Add Task</button>
            </div>
        </div>
    );
}