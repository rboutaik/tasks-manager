import { z } from "zod";
import { categorySchema } from "./validition/zodvalidition";

export interface Task {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  date: string;
  category: string;
  priority: string;
}

export interface Category {
  id : number;
  name : string;
  color : string;
}

export type CategoryFormValues = z.infer<typeof categorySchema>;

export interface TasksFormProps {
  editingTask?: Task | null;
  onCancelEdit?: () => void;
}

