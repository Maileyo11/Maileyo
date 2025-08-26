import { createSlice } from "@reduxjs/toolkit";

const initialState: Array<string> = [];

const modelMessageSlice = createSlice({
  name: "modelMessage",
  initialState,
  reducers: {
    addModelMessageToArray: (state, action) => {
      state.push(action.payload);
    },
  },
});

export const { addModelMessageToArray } = modelMessageSlice.actions;
export default modelMessageSlice.reducer;
