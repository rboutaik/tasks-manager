import { createSlice } from "@reduxjs/toolkit";
import { Category } from "@/lib/types";

interface AppState {
  categories: Category[];
}

const initialState: AppState = {
  categories: [
    { id: 1, name: "Development", color: "bg-teal-400" },
    { id: 2, name: "Testing", color: "bg-blue-400" },
    { id: 3, name: "UI/UX", color: "bg-purple-400" },
  ],
};

export const categories = createSlice({
  name: "categories",
  initialState,
  reducers: {
    addCategory: (state, action) => {
      state.categories.push(action.payload);
    },
    deleteCategory: (state, action) => {
      console.log(action.payload);
      state.categories = state.categories.filter(
        (cat) => cat.id !== action.payload
      );
      console.log(state);
    },
  },
});

export const { addCategory, deleteCategory } = categories.actions;

export default categories.reducer;
