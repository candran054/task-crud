"use client";

import Header from "@/app/component/header";
import Sidebar from "@/app/component/sidebar";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios, { AxiosError } from "axios";

interface UserResponse {
  user: string | null;
  error: AxiosError | null;
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const { push } = useRouter();

  // use getUser to check if there is an error that mean
  // user is not authenticate, so if user type 'https://localhost:3000/dashboard'
  // user will be redirected to "/"
  useEffect(() => {
    (async () => {
      const { error } = await getUser();

      if (error) {
        push("/");
        return;
      }

      setIsSuccess(true);
    })();
  }, [push]);

  if (!isSuccess) {
    return null;
  }

  return (
    <>
      <Sidebar />
      <div className="flex-1">
        <Header />
        <section>{children}</section>
      </div>
    </>
  );
}

async function getUser(): Promise<UserResponse> {
  try {
    const { data } = await axios.get("/api/auth/me");

    return {
      user: data,
      error: null,
    };
  } catch (e) {
    const error = e as AxiosError;

    return {
      user: null,
      error,
    };
  }
}
