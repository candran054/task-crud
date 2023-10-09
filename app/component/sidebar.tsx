"use client";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { toggleSidebar } from "../redux/sidebarSlice";

export default function Sidebar() {
  const dispatch = useDispatch();
  const isSidebarVisible = useSelector(
    (state: RootState) => state.sidebar.isSidebarVisible,
  );

  const handleResize = () => {
    const isMobileView = window.innerWidth <= 768;
    dispatch(toggleSidebar(!isMobileView));
  };

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

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
