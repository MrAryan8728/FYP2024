import { createSlice } from "@reduxjs/toolkit";

// export const walletSlice = createSlice({
//     name: "walletStatus",
//     initialState: { isWalletConnected: false },
//     reducers: {
//         toggleStatus: (state, action) => {
//             state.isWalletConnected = action.payload;
//         },
//     },
// });

// export const { toggleStatus } = walletSlice.actions;
// export default walletSlice.reducer;

export const walletSlice = createSlice({
    name: "address",
    initialState: {
        address: "",
    },
    reducers: {
        setWalletAddress: (state, action) => {
            state.address = action.payload;
        },
    },
});

export const { setWalletAddress } = walletSlice.actions;
export default walletSlice.reducer;