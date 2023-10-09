"use client";

import { FaBars } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import { toggleSidebar } from "../redux/sidebarSlice";

export default function Header() {
  const dispatch = useDispatch();

  const handleSidebarToggle = () => {
    dispatch(toggleSidebar());
  };

  return (
    <div className="flex justify-between p-4 bg-slate-200">
      <FaBars
        onClick={handleSidebarToggle}
        className={`text-xl text-red-300 md:hidden`}
      />
      <p className="md:flex md:w-full md:justify-end">Header</p>
    </div>
  );
}
