import { createSlice } from "@reduxjs/toolkit";

const initialState: Array<string> = [];

const userMessageSlice = createSlice({
  name: "userMessage",
  initialState,
  reducers: {
    addUserMessageToArray: (state, action) => {
      state.push(action.payload);
    },
  },
});

export const { addUserMessageToArray } = userMessageSlice.actions;
export default userMessageSlice.reducer;
