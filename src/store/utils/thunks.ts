import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "..";

const URL_SERVER = "http://localhost:3001";

// Second argument in the async function, is the Thunk API
export const fetchPosts = createAsyncThunk(
  "posts/fetchPosts",
  async (
    {
      page = 1,
      limit = 10,
      order = "asc",
    }: { page: number; limit: number; order: string },
    { getState }
  ) => {
    try {
      const response = await axios.get(
        `${URL_SERVER}/posts?_page=${page}&_limit=${limit}&_order=${order}&_sort=id`
      );

      const { posts: prevState } = getState() as RootState;

      return {
        items: [...prevState.articles.items, ...response.data],
        page: page,
        end: response.data.length === 0,
      };
    } catch (error) {
      throw error;
    }
  }
);

export const fetchPostById = createAsyncThunk(
  "posts/fetchPostById",
  async (id: string) => {
    try {
      const response = await axios.get(`${URL_SERVER}/posts/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const addToNewsLetter = createAsyncThunk(
  "users/addToNewsLetter",
  async (data: { email: string }) => {
    try {
      const findUser = await axios.get(
        `${URL_SERVER}/newsletter?email=${data.email}`
      );

      if (!Array.isArray(findUser.data) || !findUser.data.length) {
        const response = await axios({
          method: "POST",
          url: `${URL_SERVER}/newsletter`,
          data: { email: data.email },
        });

        return {
          newsletter: "added",
          email: response.data,
        };
      } else {
        return {
          newsletter: "failed",
        };
      }
    } catch (error) {
      throw error;
    }
  }
);

export const sendMessage = createAsyncThunk(
  "users/sendMessage",
  async (data: {
    email: string;
    firstname: string;
    lastname: string;
    message: string;
  }) => {
    try {
      await axios({
        method: "POST",
        url: `${URL_SERVER}/contact`,
        data: data,
      });
      return true;
    } catch (error) {
      throw error;
    }
  }
);
