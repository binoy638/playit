import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ISidebar } from "../types";

// Define the initial state using that type
const initialState: ISidebar = {
  show: true,
};

const sidebarSlice = createSlice({
  name: "sidebar",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setShowSidebar: (state, action: PayloadAction<boolean>) => {
      state.show = action.payload;
    },
  },
});

export const { setShowSidebar } = sidebarSlice.actions;

export default sidebarSlice.reducer;
