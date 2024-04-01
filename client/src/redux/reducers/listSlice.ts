import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface TaskList {
    
    id: number,
    name: string,
    amount: number
    
}

interface TaskListState {
    lists: TaskList[]   
}

const initialState: TaskListState = {
    lists: []
}

export const taskListsSlice = createSlice({
    name: 'lists',
    initialState,
    reducers: {
        createList: (state, action: PayloadAction<{id: number, name: string, amount: number}>) => {
            state.lists.push({id: action.payload.id, name: action.payload.name, amount: action.payload.amount});
        },
        updateList: (state, action: PayloadAction<{data: any}>) => {
            const listIndex = state.lists.findIndex(list => list.id === action.payload.data.id);
            state.lists[listIndex] = action.payload.data;
        },
        getAllLists: (state, action: PayloadAction<TaskList[]>) => {
            state.lists = action.payload;
        },
        resetList: (state, action: PayloadAction<{id: number}>) => {
            const listIndex = state.lists.findIndex(list => list.id === action.payload.id);
            state.lists.splice(listIndex, listIndex);
        }
    }
})

export const { createList, updateList, getAllLists, resetList } = taskListsSlice.actions

export default taskListsSlice.reducer