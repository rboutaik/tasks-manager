"use client";
import { useState } from "react";
import {
  Search,
  Check,
  FilePenLine,
  Trash2,
  Calendar1,
  CheckSquare,
  Trash,
  CheckCheck,
} from "lucide-react";
import TasksForm from "./tasksForm";

type Ttasks = {
    id: number,
    title: string,
    completed: boolean,
    date: string,
    category: string,
    priority: string,

};

export default function TasksList() {
  const [tasks, setTasks] = useState<Ttasks[]>([
    {
      id: 1,
      title: "Implement Redux store",
      completed: false,
      date: "2025-05-04",
      category: "Development",
      priority: "High",
    },
    {
      id: 2,
      title: "Design user dashboard",
      completed: false,
      date: "2025-05-05",
      category: "Design",
      priority: "Medium",
    },
    {
      id: 3,
      title: "Fix navigation bugs",
      completed: false,
      date: "2025-05-06",
      category: "Development",
      priority: "High",
    },
    {
      id: 4,
      title: "Update documentation",
      completed: false,
      date: "2025-05-07",
      category: "Documentation",
      priority: "Low",
    },
  ]);

  const [selectedTasks, setSelectedTasks] = useState<number[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const allSelected =
    filteredTasks.length > 0 && selectedTasks.length === filteredTasks.length;

  const handleSelectAll = () => {
    if (allSelected) {
      setSelectedTasks([]);
    } else {
      setSelectedTasks(filteredTasks.map((task) => task.id));
    }
  };

  const handleSelectTask = (taskId : number) => {
    if (selectedTasks.includes(taskId)) {
      setSelectedTasks(selectedTasks.filter((id) => id !== taskId));
    } else {
      setSelectedTasks([...selectedTasks, taskId]);
    }
  };

  const handleDeleteSelected = () => {
      setTasks(tasks.filter((task) => !selectedTasks.includes(task.id)));
      setSelectedTasks([]);
    };
    
    
  const handleDeleteCompleted = () => {
    setTasks(tasks.filter((task) => !task.completed));
  };

  const handleCompleteSelected = () => {
    setTasks(
      tasks.map((task) =>
        selectedTasks.includes(task.id) ? { ...task, completed: true } : task
      )
    );
    setSelectedTasks([]);
  };

  const handleDeleteTask = (taskId:number) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
    setSelectedTasks(selectedTasks.filter((id) => id !== taskId));
  };

  const handleToggleComplete = (taskId:number) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  return (
    <div className="mx-auto max-w-6xl px-6 flex flex-col gap-4">
      <div className="flex items-center justify-start bg-slate-50 dark:bg-slate-800 mt-6 rounded-xl py-2 border border-slate-300 dark:border-slate-700 px-3 gap-2">
        <Search width={20} className="text-slate-500" />
        <input
          type="text"
          placeholder="Search Tasks"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="bg-inherit placeholder-slate-500 font-medium w-full border-none outline-none"
        />
      </div>

      <TasksForm />

      <div className="flex items-center justify-between px-1">
        <div className="flex items-center gap-3">
          <h2 className="text-xl font-bold">All Tasks</h2>
          <span className="text-sm text-slate-500">
            {filteredTasks.length} Tasks
          </span>
        </div>

        <div className="flex items-center gap-3">
            <button
            onClick={handleDeleteCompleted}
            className="flex items-center gap-1 py-1 px-3 text-sm bg-teal-500 hover:bg-teal-600 text-white  rounded-md transition-colors"
            >
            <CheckCheck size={16} />
            <span>Delete Completed</span>
            </button>
          {selectedTasks.length > 0 && (
            <>
              <button
                onClick={handleCompleteSelected}
                className="flex items-center gap-1 py-1 px-3 text-sm bg-green-500  text-white rounded-md hover:bg-green-600 transition-colors"
              >
                <CheckCheck size={16} />
                <span>Complete</span>
              </button>
              <button
                onClick={handleDeleteSelected}
                className="flex items-center gap-1 py-1 px-3 text-sm bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
              >
                <Trash size={16} />
                <span>Delete</span>
              </button>
            </>
          )}
          <button
            onClick={handleSelectAll}
            className={`flex items-center gap-1 py-1 px-3 text-sm rounded-md transition-colors ${
              allSelected
                ? "bg-blue-500 text-white hover:bg-blue-600"
                : "bg-slate-200 text-slate-700 hover:bg-slate-300 dark:bg-slate-700 dark:text-slate-300 dark:hover:bg-slate-600"
            }`}
          >
            <CheckSquare size={16} />
            <span>{allSelected ? "Deselect All" : "Select All"}</span>
          </button>
        </div>
      </div>

      {filteredTasks.map((task) => (
        <div
          key={task.id}
          className={`bg-slate-50 dark:bg-slate-800 px-2 py-4 rounded-xl border-l-4 ${
            task.completed ? "border-green-500" : "border-red-500"
          } flex flex-col shadow-md relative ${
            selectedTasks.includes(task.id) ? "ring-2 ring-blue-500" : ""
          }`}
        >
          <div className="absolute top-2 right-2">
            <input
              type="checkbox"
              checked={selectedTasks.includes(task.id)}
              onChange={() => handleSelectTask(task.id)}
              className="w-4 h-4 accent-blue-500"
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <div className="flex items-center justify-start gap-3">
                <button
                  onClick={() => handleToggleComplete(task.id)}
                  className={`flex-shrink-0 mt-1 w-5 h-5 rounded-md flex items-center justify-center ${
                    task.completed
                      ? "bg-green-500 border-green-500"
                      : "bg-white dark:bg-slate-700 border-slate-300 dark:border-slate-500"
                  } border-2`}
                >
                  {task.completed && <Check size={14} className="text-white" />}
                </button>
                <span
                  className={`text-lg font-medium text-wrap ${
                    task.completed ? "line-through text-slate-500" : ""
                  }`}
                >
                  {task.title}
                </span>
              </div>
            </div>
            <div className="flex items-center justify-center pr-6 gap-4 text-slate-500">
              <FilePenLine
                width={22}
                className="cursor-pointer hover:text-blue-500"
              />
              <Trash2
                width={22}
                className="cursor-pointer hover:text-red-500"
                onClick={() => handleDeleteTask(task.id)}
              />
            </div>
          </div>

          <div className="flex items-center justify-start gap-2 pt-2 pl-7 flex-wrap max-w-[75%]">
            <div className="flex items-center justify-center text-xs bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 font-medium px-2 rounded-md">
              <div className="flex items-center gap-1">
                <Calendar1 width={14} />
                <span>{task.date}</span>
              </div>
            </div>
            <div className="flex items-center justify-center text-xs bg-purple-600 dark:bg-purple-700 text-white font-medium p-1 px-2 rounded-md">
              <div className="flex items-center">
                <span>{task.category}</span>
              </div>
            </div>
            <div
              className={`flex items-center justify-center text-xs font-medium p-1 px-2 rounded-md ${
                task.priority === "High"
                  ? "bg-red-100 text-red-600"
                  : task.priority === "Medium"
                  ? "bg-yellow-100 text-yellow-600"
                  : "bg-green-100 text-green-600"
              }`}
            >
              <div className="flex items-center justify-end gap-1">
                <span>{task.priority}</span>
              </div>
            </div>
          </div>
        </div>
      ))}

      {filteredTasks.length === 0 && (
        <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-xl text-center shadow-sm">
          <p className="text-slate-600 dark:text-slate-500">
            No tasks found. Add a new task or adjust your search.
          </p>
        </div>
      )}
    </div>
  );
}
