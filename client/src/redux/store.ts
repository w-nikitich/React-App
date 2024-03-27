import { configureStore } from '@reduxjs/toolkit'
import taskReducer from './reducers/taskSlice'
import taskListReducer from './reducers/listSlice'

export const store = configureStore({
    reducer: {
        task: taskReducer,
        list: taskListReducer
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch