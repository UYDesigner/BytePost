import { createSlice } from "@reduxjs/toolkit";

interface AuthState {
    status: boolean;
    userData: any | null;
}

const initialState: AuthState = {
    status: false,
    userData: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logIn: (state, action) => {
            state.status = true,
                state.userData = action.payload
        },
        logOut: (state) => {
            state.status = false
            state.userData = null
        }
    }
})
export const { logIn, logOut } = authSlice.actions
export default authSlice.reducer