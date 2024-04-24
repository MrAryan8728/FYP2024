import { createSlice } from "@reduxjs/toolkit";

export const walletSlice = createSlice({
    name: "walletStatus",
    initialState: { isWalletConnected: false },
    reducers: {
        toggleStatus: (state, action) => {
            state.isWalletConnected = action.payload;
        },
    },
});

export const { toggleStatus } = walletSlice.actions;
export default walletSlice.reducer;