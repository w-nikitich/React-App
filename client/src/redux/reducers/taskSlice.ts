import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface TaskState {
    name: string,
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
        resetTask: () => initialState
    }
})

export const { updateTask, resetTask } = taskSlice.actions

export default taskSlice.reducer