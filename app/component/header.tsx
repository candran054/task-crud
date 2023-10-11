"use client";

import { FaBars } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { toggleSidebar } from "../redux/sidebarSlice";
import { RootState } from "../redux/store";
import Image from "next/image";

export default function Header() {
  const dispatch = useDispatch();
  const isSidebarVisible = useSelector(
    (state: RootState) => state.sidebar.isSidebarVisible,
  );

  const handleSidebarToggle = () => {
    dispatch(toggleSidebar(!isSidebarVisible));
  };

  return (
    <div className="flex justify-between md:justify-end items-center p-4">
      <FaBars
        onClick={handleSidebarToggle}
        className={`text-xl text-indigo-500 md:hidden`}
      />
      <div className="flex pr-4 justify-end">
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
      </div>
    </div>
  );
}
