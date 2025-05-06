"use client";
import {
  Search,
  Check,
  FilePenLine,
  Trash2,
  Calendar1,
  CheckSquare,
  Trash,
  CheckCheck,
  ArrowUp,
  ArrowDown,
} from "lucide-react";
import TasksForm from "./tasksForm";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import {
  setSearchTerm,
  deleteTask,
  toggleComplete,
  selectTask,
  selectAllTasks,
  completeSelected,
  deleteSelected,
  deleteCompleted,
} from "@/lib/redux/features/taskSlice";
import { useState } from "react";
import { Task } from "@/lib/types";

export default function TasksList() {
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [spreadItem, setSpreadItem] = useState(-1);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const dispatch = useAppDispatch();
  const { tasks, selectedTasks, searchTerm, filter } = useAppSelector(
    (state) => state.tasks
  );
  const { categories } = useAppSelector((state) => state.categories);

  const filteredTasks = tasks
    .filter((task) =>
      task.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
    });

  const filteredTaskIds = filteredTasks.map((task) => task.id);
  const allSelected =
    filteredTasks.length > 0 &&
    filteredTaskIds.every((id: number) => selectedTasks.includes(id));

  const [currentPage, setCurrentPage] = useState(1);
  const [tasksPerPage] = useState(8);

  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = filteredTasks
    .filter((item) => {
      if (filter === "Active") return !item.completed;
      if (filter === "Completed") return item.completed;
      return true;
    })
    .slice(indexOfFirstTask, indexOfLastTask);
  const totalPages = Math.ceil(filteredTasks.length / tasksPerPage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const handleSortByDate = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    setCurrentPage(1);
  };

  const handleSelectAll = () => {
    dispatch(selectAllTasks(filteredTaskIds));
  };

  const handleSelectTask = (taskId: number) => {
    dispatch(selectTask(taskId));
  };

  const handleDeleteSelected = () => {
    dispatch(deleteSelected());
  };

  const handleDeleteCompleted = () => {
    dispatch(deleteCompleted());
  };

  const handleCompleteSelected = () => {
    dispatch(completeSelected());
  };

  const handleDeleteTask = (taskId: number) => {
    dispatch(deleteTask(taskId));
  };

  const handleToggleComplete = (taskId: number) => {
    dispatch(toggleComplete(taskId));
  };

  return (
    <div className="mx-auto max-w-6xl px-6 flex flex-col gap-4">
      <div className="flex items-center justify-start bg-slate-50 dark:bg-slate-800 mt-6 rounded-xl py-2 border border-slate-300 dark:border-slate-700 px-3 gap-2">
        <Search width={20} className="text-slate-500" />
        <input
          type="text"
          placeholder="Search Tasks"
          value={searchTerm}
          onChange={(e) => dispatch(setSearchTerm(e.target.value))}
          className="bg-inherit placeholder-slate-500 font-medium w-full border-none outline-none"
        />
      </div>

      <TasksForm
        editingTask={editingTask}
        onCancelEdit={() => setEditingTask(null)}
      />

      <div className="flex items-center justify-between px-1">
        <div className="flex items-center gap-3">
          <h2 className="text-xl font-bold">All Tasks</h2>
          <span className="text-sm text-slate-500 dark:text-slate-400">
            {filteredTasks.length} Tasks
          </span>
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          <button
            onClick={handleSortByDate}
            className={`flex items-center gap-1 py-1 px-3 text-sm rounded-md ${
                'bg-blue-500 text-white hover:bg-blue-600'
            }`}
            aria-label="Close"
          >
            <span>Sort by Date</span>
            {sortOrder === 'asc' ? (
              <ArrowUp size={16} />
            ) : (
              <ArrowDown size={16} />
            )}
          </button>

          <button
            aria-label="Close"
            onClick={handleDeleteCompleted}
            className="flex items-center gap-1 py-1 px-3 text-sm bg-teal-500 hover:bg-teal-600 text-white rounded-md transition-colors"
          >
            <CheckCheck size={16} />
            <span>Delete Completed</span>
          </button>
          
          {selectedTasks.length > 0 && (
            <>
              <button
                aria-label="Close"
                onClick={handleCompleteSelected}
                className="flex items-center gap-1 py-1 px-3 text-sm bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
              >
                <CheckCheck size={16} />
                <span>Complete</span>
              </button>
              <button
                aria-label="Close"
                onClick={handleDeleteSelected}
                className="flex items-center gap-1 py-1 px-3 text-sm bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
              >
                <Trash size={16} />
                <span>Delete</span>
              </button>
            </>
          )}
          <button
            aria-label="Close"
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

      {currentTasks.map((task) => (
        <div
          key={task.id}
          className={`bg-slate-50 dark:bg-slate-800 px-2 py-4 rounded-xl border-l-4 ${
            task.completed ? "border-green-500" : "border-red-500"
          } flex flex-col shadow-md relative ${
            selectedTasks.includes(task.id) ? "ring-2 ring-blue-500" : ""
          }`}
        >
          <div className="absolute top-2 right-2">
            <label>
              <input
                type="checkbox"
                checked={selectedTasks.includes(task.id)}
                onChange={() => handleSelectTask(task.id)}
                className="w-4 h-4 accent-blue-500"
              />
            </label>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <div className="flex items-center justify-start gap-3">
                <button
                  aria-label="Close"
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
                onClick={() => setEditingTask(task)}
                aria-label="Close"
              />
              <Trash2
                width={22}
                className="cursor-pointer hover:text-red-500"
                onClick={() => handleDeleteTask(task.id)}
                aria-label="Close"
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
            <div
              className={`flex items-center justify-center text-xs ${
                categories.find((item) => item.name === task.category)?.color ?? "bg-purple-600"
              } text-white font-medium p-1 px-2 rounded-md`}
            >
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
          <div
            className="flex items-center justify-end"
            onClick={() =>
              task.id === spreadItem
                ? setSpreadItem(-1)
                : setSpreadItem(task.id)
            }
          >
            <span className="text-xs font-bold text-teal-600 dark:text-teal-400 cursor-pointer">
              {task.id !== spreadItem ? "Show" : "Hide"} Description
            </span>
          </div>
          {spreadItem === task.id && (
            <div className="px-2 pt-4 text-wrap">{task.description}</div>
          )}
        </div>
      ))}

      {currentTasks.length === 0 && (
        <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-xl text-center shadow-sm">
          <p className="text-slate-600 dark:text-slate-500">
            No tasks found. Add a new task or adjust your search.
          </p>
        </div>
      )}

      {filteredTasks.length > tasksPerPage && (
        <div className="flex justify-center mt-4">
          <nav className="flex items-center gap-1">
            <button
              aria-label="Close"
              onClick={() => paginate(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 rounded-md bg-slate-200 dark:bg-slate-700 disabled:opacity-50"
            >
              Previous
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map(
              (number) => (
                <button
                  aria-label="Close"
                  key={number}
                  onClick={() => paginate(number)}
                  className={`px-3 py-1 rounded-md ${
                    currentPage === number
                      ? "bg-blue-500 text-white"
                      : "bg-slate-200 dark:bg-slate-700"
                  }`}
                >
                  {number}
                </button>
              )
            )}

            <button
              aria-label="Close"
              onClick={() => paginate(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="px-3 py-1 rounded-md bg-slate-200 dark:bg-slate-700 disabled:opacity-50"
            >
              Next
            </button>
          </nav>
        </div>
      )}
    </div>
  );
}