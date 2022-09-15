import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { string } from "yup";
import { fetchPostById, fetchPosts } from "../utils/thunks";

export type Post = {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  imagexl: string;
  author: string;
  createdAt: string;
};

export type Articles = {
  items: Post[];
  page: number;
  end: boolean;
};

export type PostsState = {
  loading: boolean;
  articles: Articles;
  postById: null | Post;
};

const initialState: PostsState = {
  loading: true,
  articles: { items: [], page: 1, end: false },
  postById: null,
};

export const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    clearPostById: (state) => {
      state.postById = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        fetchPosts.fulfilled,
        (state, action: PayloadAction<Articles>) => {
          state.loading = false;
          state.articles = action.payload;
        }
      )
      .addCase(fetchPosts.rejected, (state) => {
        state.loading = false;
      })
      .addCase(fetchPostById.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        fetchPostById.fulfilled,
        (state, action: PayloadAction<Post>) => {
          state.loading = false;
          state.postById = action.payload;
        }
      )
      .addCase(fetchPostById.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { clearPostById } = postsSlice.actions;

export default postsSlice.reducer;
