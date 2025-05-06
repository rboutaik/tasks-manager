"use client";

import type React from "react";

import { Plus, X, Check } from "lucide-react";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import {
  showFormToggle,
  showSideBarToggle,
  setFilter,
} from "@/lib/redux/features/taskSlice";
import {
  deleteCategory,
  addCategory,
} from "@/lib/redux/features/categoriesSlice";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { categorySchema } from "@/lib/validition/zodvalidition";
import { CategoryFormValues } from "@/lib/types";

const colorOptions = [
  "bg-teal-400",
  "bg-blue-400",
  "bg-purple-400",
  "bg-red-400",
  "bg-green-400",
  "bg-yellow-400",
  "bg-pink-400",
  "bg-indigo-400",
];

export default function SideBar() {
  const { showSideBar, filter } = useAppSelector((state) => state.tasks);
  const { categories } = useAppSelector((state) => state.categories);
  const dispatch = useAppDispatch();

  const [showAddForm, setShowAddForm] = useState(false);
  const [newCategory, setNewCategory] = useState({
    name: "",
    color: "bg-teal-400",
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CategoryFormValues>({
    resolver: zodResolver(categorySchema),
  });

  const handleAddCategory = handleSubmit(() => {
    if (newCategory.name.trim()) {
      dispatch(
        addCategory({
          id: Date.now(),
          name: newCategory.name,
          color: newCategory.color,
        })
      );
      setNewCategory({ name: "", color: "bg-teal-400" });
      setShowAddForm(false);
    }
  });

  const handleDeleteCategory = (id: number) => {
    dispatch(deleteCategory(id));
  };

  const handleAddTask = () => {
    dispatch(showFormToggle(true));
    dispatch(showSideBarToggle());
  };

  if (!showSideBar) return null;

  return (
    <div>
      <div
        onClick={() => dispatch(showSideBarToggle())}
        className="absolute bg-black/40 top-0 right-0 left-0 bottom-0 w-full z-10 transition-all duration-300"
      ></div>
      <div className="bg-white dark:bg-slate-800 border-r-[1px] border-slate-200 dark:border-slate-700 flex flex-col w-64 h-[calc(100vh-82px)] absolute px-4 py-5 gap-5 z-20 overflow-y-auto">
        <div
          onClick={() => handleAddTask()}
          className="cursor-pointer flex items-center gap-2 justify-center bg-teal-500 dark:bg-teal-600 hover:bg-teal-600 text-white font-bold py-3 px-4 rounded-xl"
        >
          <Plus />
          <button aria-label="Close" name="btn">
            New Task
          </button>
        </div>

        <div className="flex flex-col justify-center items-start">
          <span className="text-sm font-bold text-slate-500">FILTER TASKS</span>
          <div className="flex flex-col py-3 w-full gap-1">
            {["All Tasks", "Active", "Completed"].map((item, index) => (
              <div
                onClick={() => dispatch(setFilter(item))}
                key={index}
                className={`p-1 font-medium px-3 rounded-md cursor-pointer ${
                  filter === item && "text-teal-700 bg-teal-100"
                } `}
              >
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col justify-center items-start">
          <span className="text-sm font-bold text-slate-500">CATEGORIES</span>
          <div className="flex flex-col py-3 w-full gap-1">
            {categories.map((category) => (
              <div
                key={category.id}
                className="p-1 font-medium px-2 flex items-center"
              >
                <div
                  className={`w-3 h-3 rounded-full ${category.color} mr-3`}
                ></div>
                <span className="flex-grow">{category.name}</span>
                <button
                  aria-label="Close"
                  name="btn"
                  onClick={() => handleDeleteCategory(category.id)}
                  className="text-slate-400 hover:text-red-500 transition-colors"
                >
                  <X size={16} />
                </button>
              </div>
            ))}
          </div>

          {showAddForm ? (
            <div className="mt-2 w-full px-2">
              <form
                onSubmit={handleAddCategory}
                className="bg-slate-100 dark:bg-slate-700 p-3 rounded-lg"
              >
                <div className="mb-3">
                  <input
                    {...register("name")}
                    type="text"
                    value={newCategory.name}
                    onChange={(e) =>
                      setNewCategory({ ...newCategory, name: e.target.value })
                    }
                    placeholder="Category name"
                    className="w-full p-2 rounded border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-sm"
                    autoFocus
                  />
                  {errors.name && (
                    <p className="mt-1 text-xs text-red-500">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                <div className="mb-3">
                  <label className="block text-xs font-medium mb-1 text-slate-500 dark:text-slate-400">
                    Select color
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {colorOptions.map((color, index) => (
                      <button
                        aria-label="Close"
                        name="btn"
                        key={index}
                        type="button"
                        className={`w-6 h-6 rounded-full ${color} flex items-center justify-center ${
                          newCategory.color === color
                            ? "ring-2 ring-offset-2 ring-slate-500"
                            : ""
                        }`}
                        onClick={() =>
                          setNewCategory({ ...newCategory, color })
                        }
                      >
                        {newCategory.color === color && (
                          <Check size={14} className="text-white" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex justify-end gap-2">
                  <button
                    aria-label="Close"
                    name="btn"
                    type="button"
                    onClick={() => setShowAddForm(false)}
                    className="px-3 py-1 text-sm bg-slate-200 dark:bg-slate-600 rounded hover:bg-slate-300 dark:hover:bg-slate-500"
                  >
                    Cancel
                  </button>
                  <button
                    aria-label="Close"
                    name="btn"
                    type="submit"
                    className="px-3 py-1 text-sm bg-teal-500 text-white rounded hover:bg-teal-600"
                  >
                    Add
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <div
              className="flex w-full items-center p-2 gap-3 text-slate-400 font-medium hover:text-teal-500 cursor-pointer transition-colors"
              onClick={() => setShowAddForm(true)}
            >
              <Plus width={18} />
              <button aria-label="Close" name="btn" type="button">
                Add Category
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
