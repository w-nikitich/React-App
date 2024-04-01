import { configureStore } from '@reduxjs/toolkit'
import taskReducer from './reducers/taskSlice'
import taskListReducer from './reducers/listSlice'
import historyReducer from './reducers/historySlice'

export const store = configureStore({
    reducer: {
        task: taskReducer,
        list: taskListReducer,
        history: historyReducer
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch