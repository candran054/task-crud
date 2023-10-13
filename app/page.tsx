"use client";

import React, { useState } from "react";
import { Button } from "./component/ui/button";
import { useRouter } from "next/navigation";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export default function Home() {
  const { push } = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const isButtonDisabled = !email || !password;

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setIsLoading(true);
    setError("");

    const payload = {
      email: email,
      password: password,
    };

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.status === 201) {
        const responseData = await response.json();
        push("/dashboard");
        console.log(responseData);
      } else if (response.status === 400) {
        setError("Email or password is incorrect");
      } else {
        const responseData = await response.json();
        setIsLoading(false);
        console.log(responseData);
      }
    } catch (error) {
      console.error("Error occurred:", error);
    }
    setIsLoading(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full h-screen justify-center items-center"
    >
      <div className="flex w-[320px] flex-col justify-center rounded-md p-4 border-2 border-indigo-200">
        <p className="text-center font-semibold m-2">LOGIN</p>
        <p className="font-medium">email</p>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full pl-2 pt-1 pb-1 bg-gray-300 rounded-md outline-none focus:bg-slate-200"
        />
        <p className="font-medium mt-2">password</p>
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          className="w-full pl-2 pt-1 pb-1 bg-gray-300 rounded-md outline-none focus:bg-slate-200"
        />
        {error && (
          <p className="text-xs text-semibold mt-1 text-red-500">{error}</p>
        )}

        <Button disabled={isButtonDisabled} type="submit" className="mt-5">
          {isLoading ? (
            <AiOutlineLoading3Quarters className="animate-spin" />
          ) : (
            "Sign In"
          )}
        </Button>
      </div>
    </form>
  );
}
