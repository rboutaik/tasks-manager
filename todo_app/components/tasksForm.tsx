"use client";
import { X } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";

// Create a Zod schema for the entire form
const TaskFormSchema = z.object({
  tasktitle: z
    .string()
    .min(1, { message: "Title is required" })
    .max(100, { message: "Title must be less than 100 characters" }),

  taskdescription: z
    .string()
    .min(1, { message: "Description is required" })
    .max(500, { message: "Description must be less than 500 characters" }),

  priority: z.enum(["Low", "Medium", "High"], {
    required_error: "Priority is required",
    invalid_type_error: "Priority must be Low, Medium, or High",
  }),

  category: z.enum(["Development", "Testing", "UI/UX"], {
    required_error: "Category is required",
    invalid_type_error: "Category must be Development, Testing, or UI/UX",
  }),

  date: z
    .string()
    .min(1, { message: "Date is required" })
    // Ensure it's a valid date
    .refine((date) => !isNaN(new Date(date).getTime()), {
      message: "Invalid date format",
    })
    // Ensure date is not in the past
    .refine(
      (date) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return new Date(date) >= today;
      },
      {
        message: "Date cannot be in the past",
      }
    ),
});

type TTaskFormSchema = z.infer<typeof TaskFormSchema>;

export default function TasksForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TTaskFormSchema>({ resolver: zodResolver(TaskFormSchema) });

  return (
    <form
      onSubmit={handleSubmit((data) => console.log(data))}
      className="flex flex-col bg-white dark:bg-slate-800 border-[1px] border-slate-200 dark:border-slate-500 p-4 rounded-xl gap-2 font-medium "
    >
      <div className="flex items-center justify-between font-bold">
        <span>Add New Task</span>
        <X width={18} />
      </div>
      <div className="flex flex-col justify-center items-center pt-4 pb-2">
        <div className="bg-slate-50 dark:bg-slate-700 w-full border-[1px] border-slate-200 dark:border-slate-600 rounded-xl relative">
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
        <div className="bg-slate-50 dark:bg-slate-700 w-full border-[1px] border-slate-200 dark:border-slate-600 rounded-xl relative">
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
        <div className=" flex-1 bg-slate-50 dark:bg-slate-700 w-full border-[1px] border-slate-200 dark:border-slate-600 rounded-xl px-2 relative">
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
        <div className="flex-1 bg-slate-50 dark:bg-slate-700 w-full border-[1px] border-slate-200 dark:border-slate-600 rounded-xl px-2 relative">
          <select
            {...register("category", { required: "Category is required" })}
            className="bg-inherit w-full py-1 px-3 outline-none"
          >
            <option value="">Select Category</option>
            <option value="Development">Development</option>
            <option value="Testing">Testing</option>
            <option value="UI/UX">UI/UX</option>
          </select>
          {errors?.category && (
            <p className="w-full absolute text-sm left-1 text-red-600 dark:text-red-600 mt-1 truncate whitespace-nowrap overflow-hidden">
              {errors.category.message}
            </p>
          )}
        </div>
      </div>
      <div className="flex flex-col justify-center items-center py-5">
        <div className="bg-slate-50 dark:bg-slate-700 w-full border-[1px] border-slate-200 dark:border-slate-600 rounded-xl relative">
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
      <div className="flex items-center justify-end">
        <button
          type="submit"
          className="bg-teal-500 dark:bg-teal-600 hover:bg-teal-600 text-white font-bold py-2 px-4 rounded-xl"
        >
          Add Task
        </button>
      </div>
    </form>
  );
}
