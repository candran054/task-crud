"use client";

import { configureStore } from "@reduxjs/toolkit";
import sidebarSlice from "./sidebarSlice";

export type RootState = ReturnType<typeof store.getState>;

export const store = configureStore({
  reducer: {
    sidebar: sidebarSlice,
  },
});
