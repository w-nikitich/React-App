import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface TaskState {
    name: string,
    list?: Array<{
        name: string,
        amount: number
    }>,
    date?: string,
    priority?: string,
    description?: string,
    activity?: {
        activityText: string,
        activityTime: string
    } | null,
    history?: {
        historyText: string,
        historyTime: string
    } | null
}

const initialState: TaskState = {
    name: 'Task name',
    list: [{
        name: 'New list',
        amount: 0
    }],
    date: '',
    priority: 'Low',
    description: 'Task descriptions should be unambiguous, accurate, factual.',
    activity: null,
    history: null
}

export const taskSlice = createSlice({
    name: 'task',
    initialState,
    reducers: {
        updateTask: (state, action: PayloadAction<TaskState>) => {
            return { ...state, ...action.payload }
        },
        updateTaskList: (state, action: PayloadAction<{name: string, amount: number}>) => {
            state.list?.push({name: action.payload.name, amount: action.payload.amount});
        },
        resetTask: () => initialState
    }
})

export const { updateTask, updateTaskList, resetTask } = taskSlice.actions

export default taskSlice.reducer