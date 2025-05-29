import { createSlice} from "@reduxjs/toolkit";

interface PostState {
  posts: string[];
}

const initialState: PostState = {
  posts: [],
};

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    addPost: (state, action) => {
      state.posts.push(action.payload);
    },
    clearPost: (state) => {
      state.posts = [];
    },
  },
});

export const { addPost, clearPost } = postSlice.actions;

export default postSlice.reducer;
