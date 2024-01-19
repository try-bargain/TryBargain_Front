import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./user/user.slice";
import categoriesSlice from './categories/categories.slice';
import boardSlice from './boards/board.slice';
import boardsSlice from './boards/boards.slice';

export const store = configureStore({
    reducer: {
        boardSlice,
        userSlice,
        categoriesSlice,
        boardsSlice
    }
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;
