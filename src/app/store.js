import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "../utils/loginSlice"

export default configureStore = configureStore({
    reducer: loginReducer
})