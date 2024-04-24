import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "../utils/loginSlice";
import walletReducer from "../utils/walletSlice";

export const store = configureStore({
  reducer: {
    loginReducer,
    walletReducer,
  },
});
