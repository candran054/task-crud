import React from "react";
import UserTable from "./table";
import { cookies } from "next/headers";

export default function DashboardUser() {
  const cookieStore = cookies();
  const token = cookieStore.get("UserJWT");

  return (
    <div>
      <p className="font-semibold text-2xl m-4">User List</p>
      <UserTable token={token} />
    </div>
  );
}
