import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "../utils/loginSlice"

export const store = configureStore({
    reducer: loginReducer
})