"use client";

import { createSlice } from "@reduxjs/toolkit";

interface SidebarState {
  isSidebarVisible: boolean;
}

const initialState: SidebarState = {
  isSidebarVisible: false,
};

const sidebarSlice = createSlice({
  name: "sidebar",
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.isSidebarVisible = !state.isSidebarVisible;
    },
  },
});

export const { toggleSidebar } = sidebarSlice.actions;

export default sidebarSlice.reducer;
