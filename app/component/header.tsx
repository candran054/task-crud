"use client";

import { FaBars } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { toggleSidebar } from "../redux/sidebarSlice";
import { RootState } from "../redux/store";

export default function Header() {
  const dispatch = useDispatch();
  const isSidebarVisible = useSelector(
    (state: RootState) => state.sidebar.isSidebarVisible,
  );

  const handleSidebarToggle = () => {
    dispatch(toggleSidebar(!isSidebarVisible));
  };

  return (
    <div className="flex justify-between p-4 bg-slate-200">
      <FaBars
        onClick={handleSidebarToggle}
        className={`text-xl text-indigo-500 md:hidden`}
      />
      <p className="md:flex md:w-full md:justify-end">Header</p>
    </div>
  );
}
