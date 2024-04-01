import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface History {
    id: number,
    taskId?: number,
    listName?: string,
    taskName?:string,
    oldData?: string,
    newData?: string,
    listId?: number,
    type: string,
    text?: string,
    createdAt: Date
}

export interface HistoryState {
    history: History[];
}

const initialState: HistoryState = {
    history: []
}

export const historySlice = createSlice({
    name: 'history',
    initialState,
    reducers: {
        createNewActivity: (state, action: PayloadAction<{createdLog: any}>) => {
            state.history.push(action.payload.createdLog)
        },
        updateHistory: (state, action: PayloadAction<History[]>) => {
            state.history = action.payload;
        },
        resetHistory: (state, action: PayloadAction<{id: number}>) => {
            state.history = state.history.filter((history) => history.id !== action.payload.id)
        }
    }
})

export const { createNewActivity, updateHistory, resetHistory } = historySlice.actions

export default historySlice.reducer