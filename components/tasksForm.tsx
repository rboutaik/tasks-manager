"use client";
import {  useEffect } from "react";
import { X } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { addTask, showFormToggle } from "@/lib/redux/features/taskSlice";
import { editTask } from "@/lib/redux/features/taskSlice";
import { createTaskFormSchema } from "@/lib/validition/zodvalidition";
import { TasksFormProps } from "@/lib/types";

export default function TasksForm({
  editingTask = null,
  onCancelEdit = () => {},
}: TasksFormProps) {
  const { categories } = useAppSelector((state) => state.categories);
  const TaskFormSchema = createTaskFormSchema(categories);
  type TTaskFormSchema = z.infer<typeof TaskFormSchema>;
  const dispatch = useAppDispatch();
  const { showForm } = useAppSelector((state) => state.tasks);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<TTaskFormSchema>({ resolver: zodResolver(TaskFormSchema) });

  useEffect(() => {
    if (editingTask) {
      setValue("tasktitle", editingTask.title);
      setValue("taskdescription", editingTask.description || "");
      setValue("priority", editingTask.priority as "Low" | "Medium" | "High");
      setValue("category", editingTask.category);
      setValue("date", editingTask.date);
      dispatch(showFormToggle(true));
    }
  }, [editingTask, setValue, dispatch]);

  const onSubmit = (data: TTaskFormSchema) => {
    if (editingTask) {
      dispatch(
        editTask({
          id: editingTask.id,
          updatedTask: {
            title: data.tasktitle,
            date: data.date,
            category: data.category,
            priority: data.priority,
            description: data.taskdescription,
          },
        })
      );
      onCancelEdit();
    } else {
      const newTask = {
        id: Date.now(),
        title: data.tasktitle,
        completed: false,
        date: data.date,
        category: data.category,
        priority: data.priority,
        description: data.taskdescription,
      };
      dispatch(addTask(newTask));
    }
    reset();
    dispatch(showFormToggle(false));
  };

  if (!showForm) {
    return null;
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col bg-slate-50 dark:bg-slate-800 border-[1px] border-slate-200 dark:border-slate-600 p-4 rounded-xl gap-2 font-medium "
    >
      <div className="flex items-center justify-between font-bold">
        <span>{editingTask ? "Edit Task" : "Add New Task"}</span>
        <X
          width={18}
          className="cursor-pointer"
          onClick={() => {
            if (editingTask) {
              reset();
              onCancelEdit();
            }
            dispatch(showFormToggle(false));
          }}
        />
      </div>

      <div className="flex flex-col justify-center items-center pt-4 pb-2 ">
        <div className="bg-slate-100 dark:bg-slate-700 w-full border-[1px] border-slate-200 dark:border-slate-600 rounded-xl relative">
          <input
            {...register("tasktitle", { required: "Title is required" })}
            type="text"
            placeholder="Task title"
            className="bg-inherit w-full text-slate-500 dark:text-slate-300 rounded-xl outline-none py-2 px-4"
          />
          {errors?.tasktitle && (
            <p className="absolute text-sm left-1 text-red-600 dark:text-red-600 mt-1 truncate whitespace-nowrap overflow-hidden">
              {errors.tasktitle.message}
            </p>
          )}
        </div>
      </div>
      <div className="flex flex-col justify-center items-center py-5">
        <div className="bg-slate-100 dark:bg-slate-700 w-full border-[1px] border-slate-200 dark:border-slate-600 rounded-xl relative">
          <textarea
            {...register("taskdescription", {
              required: "Description is required",
            })}
            placeholder="Task description"
            rows={3}
            className="bg-inherit w-full text-slate-500 dark:text-slate-300 rounded-xl outline-none py-2 px-4"
          />
          {errors?.taskdescription && (
            <p className="absolute text-sm left-1 text-red-600 dark:text-red-600 mt-1 truncate whitespace-nowrap overflow-hidden">
              {errors.taskdescription.message}
            </p>
          )}
        </div>
      </div>
      <div className="flex gap-4">
        <div className=" flex-1 bg-slate-100 dark:bg-slate-700 w-full border-[1px] border-slate-200 dark:border-slate-600 rounded-xl px-2 relative">
          <select
            {...register("priority", { required: "Priority is required" })}
            className="bg-inherit  w-full py-1 px-3 outline-none"
          >
            <option value="">Select Priority</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
          {errors?.priority && (
            <p className="absolute text-sm left-1 text-red-600 dark:text-red-600 mt-1 truncate whitespace-nowrap overflow-hidden">
              {errors.priority.message}
            </p>
          )}
        </div>
        <div className="flex-1 bg-slate-100 dark:bg-slate-700 w-full border-[1px] border-slate-200 dark:border-slate-600 rounded-xl px-2 relative">
          <select
            {...register("category", { required: "Category is required" })}
            className="bg-inherit w-full py-1 px-3 outline-none"
          >
            <option value="">Select Category</option>
            {categories.map((item, index) => {
              return (
                <option key={index} value={item.name}>
                  {item.name}
                </option>
              );
            })}
          </select>
          {errors?.category && (
            <p className="w-full absolute text-sm left-1 text-red-600 dark:text-red-600 mt-1 truncate whitespace-nowrap overflow-hidden">
              {errors.category.message}
            </p>
          )}
        </div>
      </div>
      <div className="flex flex-col justify-center items-center py-5">
        <div className="bg-slate-100 dark:bg-slate-700 w-full border-[1px] border-slate-200 dark:border-slate-600 rounded-xl relative">
          <input
            {...register("date", { required: "Date is required" })}
            type="date"
            placeholder="Task title"
            className="bg-inherit w-full text-slate-500 dark:text-slate-300 rounded-xl outline-none py-2 px-4"
          />
          {errors?.date && (
            <p className="absolute text-sm left-1 text-red-600 dark:text-red-600 mt-1 truncate whitespace-nowrap overflow-hidden">
              {errors.date.message}
            </p>
          )}
        </div>
      </div>
      <div className="flex items-center justify-end gap-2">
        {editingTask && (
          <button
            aria-label="Close"
            name="btn"
            type="button"
            onClick={() => {
              reset();
              onCancelEdit();
            }}
            className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-xl"
          >
            Cancel
          </button>
        )}
        <button
          aria-label="Close"
          name="btn"
          type="submit"
          className="bg-teal-500 dark:bg-teal-600 hover:bg-teal-600 text-white font-bold py-2 px-4 rounded-xl"
        >
          {editingTask ? "Update Task" : "Add Task"}
        </button>
      </div>
    </form>
  );
}
