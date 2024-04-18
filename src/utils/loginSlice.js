import { createSlice } from "@reduxjs/toolkit";

export const loginSlice = createSlice({
    name: "authStatus",
    initialState: {
        auth: false
    },
    reducers: {
        toggleStatus: (state, action) => {
            state.auth = action.payload
        }
    }
})

export const { toggleStatus } = loginSlice.actions
export default loginSlice.reducer;