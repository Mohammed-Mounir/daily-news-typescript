import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { addToNewsLetter } from "../utils/thunks";

export type Action = {
  newsletter?: string;
  email?: string;
};

export type UserState = {
  action: Action;
};

const initialState: UserState = {
  action: {},
};

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    clearNewsLetter: (state) => {
      state.action = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addToNewsLetter.pending, (state) => {})
      .addCase(
        addToNewsLetter.fulfilled,
        (state, action: PayloadAction<Action>) => {
          state.action = action.payload;
        }
      )
      .addCase(addToNewsLetter.rejected, (state) => {});
  },
});

export const { clearNewsLetter } = usersSlice.actions;

export default usersSlice.reducer;
