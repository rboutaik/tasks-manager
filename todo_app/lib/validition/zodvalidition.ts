import { z } from "zod";
import { Category } from "../types";

export const categorySchema = z.object({
  name: z
    .string()
    .min(1, { message: "Category name is required" })
    .max(14, { message: "Category name must be 16 characters or less" }),
});

export const createTaskFormSchema = (categories: Category[]) => {
  const categoryNames = categories.map((c) => c.name) as [string, ...string[]];

  return z.object({
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

    category: z.enum(categoryNames, {
      required_error: "Category is required",
      invalid_type_error: "Please select a valid category",
    }),

    date: z
      .string()
      .min(1, { message: "Date is required" })
      .refine((date) => !isNaN(new Date(date).getTime()), {
        message: "Invalid date format",
      })
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
};
