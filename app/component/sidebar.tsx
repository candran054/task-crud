"use client";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { toggleSidebar } from "../redux/sidebarSlice";
import { AnimatePresence, motion } from "framer-motion";
import { MdOutlineDashboard } from "react-icons/md";
import Link from "next/link";

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
    <AnimatePresence>
      {isSidebarVisible && (
        <motion.div
          initial={{ width: 0, opacity: 0 }}
          animate={{
            width: isSidebarVisible ? 288 : 0,
            opacity: isSidebarVisible ? 1 : 0,
            transition: {
              type: "tween",
              duration: 0.2,
            },
          }}
          exit={{
            width: 0,
            opacity: 0,
            transition: {
              type: "tween",
              duration: 0.2,
            },
          }}
          className={`sticky w-80 top-0 left-0 border border-r-gray h-screen overflow-y-auto md:block`}
        >
          <div className="flex w-full items-center p-4">
            <p className="text-2xl text-indigo-500">
              <MdOutlineDashboard />
            </p>
            <h3 className="text-2xl font-semibold m-2 text-gray-900">Panel</h3>
          </div>
          <ul>
            <Link href={"/#"}>Dashboard</Link>
          </ul>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
