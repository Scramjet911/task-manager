import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

export type ITask = {
  id: string;
  title: string;
  description: string;
  assignee: string;
  status: 'To Do' | 'In Progress' | 'Done';
  dueDate: string;
};

type TasksState = {
  tasks: ITask[];
};

const initialState: TasksState = {
  tasks: [
    {
      id: '1',
      title: 'Create Login Page',
      description: 'Implement login functionality for the app.',
      assignee: 'John Doe',
      status: 'To Do',
      dueDate: '2024-01-10',
    },
    {
      id: '2',
      title: 'Setup Redux Store',
      description: 'Configure Redux for state management.',
      assignee: 'Jane Smith',
      status: 'In Progress',
      dueDate: '2024-01-05',
    },
  ],
};

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask(state, action: PayloadAction<ITask>) {
      state.tasks.push(action.payload);
    },
    updateTaskStatus(
      state,
      action: PayloadAction<{ id: string; status: ITask['status'] }>,
    ) {
      const task = state.tasks.find((t) => t.id === action.payload.id);
      if (task) {
        task.status = action.payload.status;
      }
    },
  },
});

export const { addTask, updateTaskStatus } = taskSlice.actions;
export default taskSlice.reducer;
