import React from "react";
import UserTable from "./table";
import { cookies } from "next/headers";

export type User = {
  _id: string;
  name: string;
  email: string;
  avatar: string;
  bio: string;
};

async function getData(): Promise<User[]> {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get("UserJWT");

    const response = await fetch(
      "https://api-test.sinardigital.co.id/users?page=2",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token?.value}`,
        },
      },
    );

    if (response.ok) {
      const responseData = await response.json();
      return responseData.data.docs;
    } else {
      console.error("Failed to fetch user data.");
      return [];
    }
  } catch (error) {
    console.error("An error occurred while fetching user data:", error);
    return [];
  }
}

export default async function DashboardUser() {
  const cookieStore = cookies();
  const token = cookieStore.get("UserJWT");

  const data = await getData();

  return (
    <div>
      <p className="font-semibold text-2xl m-4">User List</p>
      <UserTable token={token} data={data} />
    </div>
  );
}
