"use client";

import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/component/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/app/component/ui/dropdown-menu";
import { Button } from "@/app/component/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/component/ui/dialog";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";

interface TableProps {
  token: RequestCookie | undefined;
}

type UserRole = "Role" | "admin" | "user";

export default function UserTable({ token }: TableProps) {
  const [isData, setIsData] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [bio, setBio] = useState("");
  const [avatar, setAvatar] = useState("");
  const [selectedRole, setSelectedRole] = useState<UserRole>("Role");
  const [roleId, setRoleId] = useState("");

  const handleRoleSelection = (selectedRole: UserRole) => {
    setSelectedRole(selectedRole);
    if (selectedRole === "admin") {
      setRoleId("648c4a358f6c1f606c750c1c");
    } else if (selectedRole === "user") {
      setRoleId("648c4a358f6c1f606c750c1d");
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const payload = {
      name: name,
      email: email,
      password: password,
      bio: bio,
      avatar: avatar,
      role: roleId,
    };

    try {
      const response = await fetch(
        "https://api-test.sinardigital.co.id/users",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        },
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {isData ? (
        <Table className="w-4/5 mx-auto">
          <TableCaption>A list of your recent users</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>john</TableCell>
              <TableCell>john@email.com</TableCell>
              <TableCell>admin</TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger>...</DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem>Edit</DropdownMenuItem>
                    <DropdownMenuItem>Delete</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      ) : (
        <form onSubmit={handleSubmit} className="flex relative flex-col">
          <p className="text-center text-slate-400">No Data</p>
          <Dialog>
            <DialogTrigger>
              <Button className="bg-indigo-400 mt-5 hover:bg-indigo-600/70">
                Create New
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New User</DialogTitle>
              </DialogHeader>
              <input
                className="w-full pl-2 pt-1 pb-1 bg-gray-300 rounded-md outline-none focus:bg-slate-200"
                placeholder="name"
                type="text"
              />
              <input
                className="w-full pl-2 pt-1 pb-1 bg-gray-300 rounded-md outline-none focus:bg-slate-200"
                placeholder="email"
                type="email"
              />
              <input
                className="w-full pl-2 pt-1 pb-1 bg-gray-300 rounded-md outline-none focus:bg-slate-200"
                placeholder="password"
                type="password"
              />
              <input
                className="w-full pl-2 pt-1 pb-1 bg-gray-300 rounded-md outline-none focus:bg-slate-200"
                placeholder="bio"
                type="text"
              />
              <input
                className="w-full pl-2 pt-1 pb-1 bg-gray-300 rounded-md outline-none focus:bg-slate-200"
                placeholder="avatar"
                type="url"
              />
              <DropdownMenu>
                <DropdownMenuTrigger className="text-left" asChild>
                  <Button className="w-[128px]">{selectedRole}</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="absolute -right-16">
                  <DropdownMenuItem
                    onClick={() => handleRoleSelection("admin")}
                    className="cursor-pointer"
                  >
                    admin
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => handleRoleSelection("user")}
                    className="cursor-pointer"
                  >
                    user
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Button className="w-1/2 mx-auto text-black hover:text-white bg-slate-400">
                Submit
              </Button>
            </DialogContent>
          </Dialog>
        </form>
      )}
    </>
  );
}
