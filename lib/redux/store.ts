"use client";

import { configureStore } from '@reduxjs/toolkit';
import taskReducer from '@/lib/redux/features/taskSlice';
import categoriesReducer from '@/lib/redux/features/categoriesSlice';

export const store = configureStore({
  reducer: {
    tasks: taskReducer,
    categories: categoriesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;