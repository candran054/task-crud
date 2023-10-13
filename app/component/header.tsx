"use client";

import { FaBars } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { toggleSidebar } from "../redux/sidebarSlice";
import { RootState } from "../redux/store";
import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function Header() {
  const { push } = useRouter();

  const dispatch = useDispatch();
  const isSidebarVisible = useSelector(
    (state: RootState) => state.sidebar.isSidebarVisible,
  );

  const [showMenu, setShowMenu] = useState(false);

  const toggleSubmenu = () => {
    setShowMenu(!showMenu);
  };

  const handleSidebarToggle = () => {
    dispatch(toggleSidebar(!isSidebarVisible));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/auth/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      push("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex justify-between md:justify-end items-center p-4">
      <FaBars
        onClick={handleSidebarToggle}
        className={`text-xl text-indigo-500 md:hidden`}
      />
      <div
        onClick={toggleSubmenu}
        className="flex relative flex-col pr-9 justify-end cursor-pointer"
      >
        <Image
          src="/images/Me.jpg"
          width={50}
          height={50}
          alt="profile picture"
          style={{
            objectFit: "cover",
            width: "2rem",
            height: "2rem",
            borderRadius: "100px",
            backgroundColor: "ivory",
          }}
        />
        <AnimatePresence>
          {showMenu && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{
                opacity: 1,
                transition: {
                  type: "tween",
                  duration: 0.2,
                },
              }}
              exit={{
                opacity: 0,
                transition: {
                  type: "tween",
                  duration: 0.2,
                },
              }}
              onClick={handleSubmit}
              className="absolute flex justify-center items-center rounded-md top-10 right-2 w-20 px-4 py-[0.15rem]
            bg-zinc-200"
            >
              <p className="text-black text-sm font-semibold">Logout</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
