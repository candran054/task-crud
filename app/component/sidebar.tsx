"use client";

import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

export default function Sidebar() {
  const isSidebarVisible = useSelector(
    (state: RootState) => state.sidebar.isSidebarVisible,
  );

  return (
    <div
      className={`bg-indigo-500 w-[20rem] h-screen md:block ${
        isSidebarVisible ? "" : "hidden"
      }`}
    >
      <h3 className="text-2xl m-3 text-white">Panel</h3>
    </div>
  );
}
