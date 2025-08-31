import { configureStore } from "@reduxjs/toolkit";
import groupReducer from "@/features/groups/slice";
const store = configureStore({
  reducer: {
    group: groupReducer,
  },
});

export default store;
