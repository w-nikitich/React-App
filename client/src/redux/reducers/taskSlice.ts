import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface Task {
    id: number,
    name: string,
    listId?: number,
    date?: string,
    priority?: string,
    description?: string,
    activity?: [{
        activityText: string,
        activityTime: string
    }] | null,
    history?: {
        historyText: string,
        historyTime: string
    } | null
}

export interface TasksState {
    tasks: Task[];
}

const initialState: TasksState = {
    tasks: []
}

export const tasksSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        createNewTask: (state, action: PayloadAction<{createdTask: any}>) => {
            state.tasks.push(action.payload.createdTask)
        },
        updateTask: (state, action: PayloadAction<{id: number, updatedTask: any}>) => {
            const taskId = state.tasks.findIndex(task => task.id = action.payload.id);
            state.tasks[taskId] = action.payload.updatedTask;
        },
        updateAllTasks: (state, action: PayloadAction<Task[]>) => {
            // const taskId = state.tasks.findIndex(task => task.id = action.payload.updatedTask.id);
            // state.tasks[taskId] = action.payload.updatedTask;
            state.tasks = action.payload;
        },
        updateActivity: (state, action: PayloadAction<{id: number, activityText: string, activityTime: string}>) => {
            const taskId = state.tasks.findIndex(task => task.id = action.payload.id)
            state.tasks[taskId].activity?.push({activityText: action.payload.activityText, activityTime: action.payload.activityTime})
        },
        resetTask: (state, action: PayloadAction<{id: number}>) => {
            state.tasks = state.tasks.filter((tasks) => tasks.id !== action.payload.id)
        }
    }
})

export const { updateAllTasks,updateTask, createNewTask, updateActivity, resetTask } = tasksSlice.actions

export default tasksSlice.reducer