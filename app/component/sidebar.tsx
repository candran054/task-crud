"use client";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { toggleSidebar } from "../redux/sidebarSlice";
import { AnimatePresence, motion } from "framer-motion";

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
    <motion.div
      initial={{ width: 0, opacity: 0 }}
      animate={{
        width: isSidebarVisible ? 320 : 0,
        opacity: isSidebarVisible ? 1 : 0,
        transition: {
          type: "tween",
          duration: 0.2,
        },
      }}
      exit={{
        x: -100,
        transition: {
          type: "tween",
          duration: 0.2,
        },
      }}
      className={` bg-indigo-500 h-screen md:block ${
        isSidebarVisible ? "" : "hidden"
      }`}
    >
      <h3 className="text-2xl m-3 text-white">Panel</h3>
    </motion.div>
  );
}
