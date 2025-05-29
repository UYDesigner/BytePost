import { configureStore } from "@reduxjs/toolkit";
import PostReducer from "../features/postSlice"
import AuthReducer from "../features/authSlice"
const store = configureStore({
    reducer:
    {
        posts: PostReducer,
        auths: AuthReducer
    }
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store