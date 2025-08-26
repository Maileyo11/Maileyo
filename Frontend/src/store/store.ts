import { configureStore } from "@reduxjs/toolkit";
import { authSlice, userMessageSlice, modelMessageSlice } from "./services";

const store = configureStore({
  reducer: {
    auth: authSlice,
    userMessage: userMessageSlice,
    modelMessage: modelMessageSlice,
  },
});

export default store;
