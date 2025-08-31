import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { GroupShow, GroupState } from "./type";

const initialState: GroupState = {
  group: null,
};

export const groupSlice = createSlice({
  name: "group",
  initialState,
  reducers: {
    setGroup: (state, action: PayloadAction<GroupShow>) => {
      state.group = action.payload;
    },
  },
});

export const { setGroup } = groupSlice.actions;

export default groupSlice.reducer;
