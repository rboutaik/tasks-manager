import { createSlice } from '@reduxjs/toolkit';
import { Task } from '@/lib/types';

interface AppState {
  tasks: Task[];
  selectedTasks: number[];
  filter: string;
  searchTerm: string;
  showSideBar: boolean;
  showForm: boolean;
}

const initialState : AppState = {
  tasks: [
    {
      id: 1,
      title: "Implement Redux store",
      description : "Lorem Ipsum is simply dummy text of the printing and typesetting industry Lorem Ipsum is simply dummy text of the printing and typesetting industry Lorem Ipsum is simply dummy text of the printing and typesetting industry",
      completed: false,
      date: "2025-05-04",
      category: "Development",
      priority: "High",
    },
    {
      id: 2,
      title: "Design user dashboard",
      description : "Lorem Ipsum is simply dummy text of the printing and typesetting industry",
      completed: false,
      date: "2025-05-05",
      category: "Design",
      priority: "Medium",
    },
    {
      id: 3,
      title: "Fix navigation bugs",
      description : "Lorem Ipsum is simply dummy text of the printing and typesetting industry",
      completed: false,
      date: "2025-05-06",
      category: "Development",
      priority: "High",
    },
    {
      id: 4,
      title: "Update documentation",
      description : "Lorem Ipsum is simply dummy text of the printing and typesetting industry",
      completed: false,
      date: "2025-05-07",
      category: "Documentation",
      priority: "Low",
    },
  ],
  selectedTasks: [],
  searchTerm: "",
  filter: "All Tasks",
  showSideBar: false,
  showForm: false,
};

export const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    addTask: (state, action) => {
      state.tasks.push(action.payload);
    },
    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter(task => task.id !== action.payload);
      state.selectedTasks = state.selectedTasks.filter(id => id !== action.payload);
    },
    toggleComplete: (state, action) => {
      const task = state.tasks.find(task => task.id === action.payload);
      if (task) {
        task.completed = !task.completed;
      }
    },
    selectTask: (state, action) => {
      if (state.selectedTasks.includes(action.payload)) {
        state.selectedTasks = state.selectedTasks.filter(id => id !== action.payload);
      } else {
        state.selectedTasks.push(action.payload);
      }
    },
    selectAllTasks: (state, action) => {
      const filteredTaskIds = action.payload;
      const allSelected = 
        filteredTaskIds.length > 0 && 
        filteredTaskIds.every((id : number) => state.selectedTasks.includes(id));
      
      if (allSelected) {
        state.selectedTasks = state.selectedTasks.filter(id => !filteredTaskIds.includes(id));
      } else {
        filteredTaskIds.forEach((id : number) => {
          if (!state.selectedTasks.includes(id)) {
            state.selectedTasks.push(id);
          }
        });
      }
    },
    completeSelected: (state) => {
      state.tasks = state.tasks.map(task => 
        state.selectedTasks.includes(task.id) 
          ? { ...task, completed: true } 
          : task
      );
      state.selectedTasks = [];
    },
    deleteSelected: (state) => {
      state.tasks = state.tasks.filter(task => !state.selectedTasks.includes(task.id));
      state.selectedTasks = [];
    },
    deleteCompleted: (state) => {
      state.tasks = state.tasks.filter(task => !task.completed);
    },
    editTask: (state, action) => {
      const index = state.tasks.findIndex(task => task.id === action.payload.id);
      if (index !== -1) {
        state.tasks[index] = { ...state.tasks[index], ...action.payload.updatedTask };
      }
    },
    showSideBarToggle: (state) => {
      state.showSideBar = !state.showSideBar;
    },
    showFormToggle: (state, action) => {
      state.showForm = action.payload;
    },
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
  },
});

export const { 
  setSearchTerm, 
  addTask, 
  deleteTask, 
  toggleComplete, 
  selectTask, 
  selectAllTasks,
  completeSelected,
  deleteSelected,
  deleteCompleted,
  editTask,
  showSideBarToggle,
  showFormToggle,
  setFilter
} = taskSlice.actions;

export default taskSlice.reducer;