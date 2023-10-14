"use client";

import React, { useState } from "react";
import {
  Table,
  TableBody,
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
  data: any;
}

interface User {
  _id: string;
  name: string;
  email: string;
}

type UserRole = "Role" | "admin" | "user";

export default function UserTable({ token, data }: TableProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [bio, setBio] = useState("");
  const [avatar, setAvatar] = useState("");
  const [selectedRole, setSelectedRole] = useState<UserRole>("Role");
  const [roleId, setRoleId] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDialogCreate, setIsDialogCreate] = useState(false);

  const tokenValue = token?.value;

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
      roleId: roleId,
    };

    try {
      const response = await fetch(
        "https://api-test.sinardigital.co.id/users",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${tokenValue}`,
          },
          body: JSON.stringify(payload),
        },
      );

      const responseData = await response.json();
      if (response.status === 201) {
        console.log(responseData);
        setIsDialogCreate(false);
        window.location.reload();
      } else if (response.status === 400) {
        console.error(responseData);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdate =
    (user: User) => async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      const payload = {
        id: user._id,
        name: name,
        email: email,
        bio: bio,
        avatar: avatar,
        roleId: roleId,
      };

      try {
        const response = await fetch(
          "https://api-test.sinardigital.co.id/users",

          {
            next: { revalidate: 30 },
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${tokenValue}`,
            },
            body: JSON.stringify(payload),
          },
        );

        const responseData = await response.json();
        if (response.ok) {
          setIsDialogOpen(false);
          window.location.reload();
          console.log(responseData);
          setIsDialogOpen(false);
        } else if (response.status === 400) {
          console.error(responseData);
        }
      } catch (error) {
        console.error(error);
      }
      setIsDialogOpen(false);
    };

  const handleDelete = (user: User) => async () => {
    const url = `https://api-test.sinardigital.co.id/users/${user._id}`;

    try {
      const response = await fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokenValue}`,
        },
      });

      if (response.ok) {
        window.location.reload();
        console.log("User deleted successfully.");
      } else {
        const responseData = await response.json();
        console.error(responseData);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Table className="w-4/5 mx-auto">
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((user: any) => (
            <TableRow key={user._id}>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.role?.name}</TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Dialog
                    open={isDialogOpen}
                    onOpenChange={(isOpen) => setIsDialogOpen(isOpen)}
                  >
                    <DialogTrigger>
                      <Button>Edit</Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Edit User</DialogTitle>
                      </DialogHeader>
                      <form
                        onSubmit={handleUpdate(user)}
                        className="flex flex-col gap-2"
                      >
                        <input
                          className="w-full pl-2 pt-1 pb-1 bg-gray-300 rounded-md outline-none focus:bg-slate-200"
                          placeholder="name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                        />
                        <input
                          className="w-full pl-2 pt-1 pb-1 bg-gray-300 rounded-md outline-none focus:bg-slate-200"
                          placeholder="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                        <input
                          className="w-full pl-2 pt-1 pb-1 bg-gray-300 rounded-md outline-none focus:bg-slate-200"
                          placeholder="bio"
                          value={bio}
                          onChange={(e) => setBio(e.target.value)}
                        />
                        <input
                          className="w-full pl-2 pt-1 pb-1 bg-gray-300 rounded-md outline-none focus:bg-slate-200"
                          placeholder="avatar"
                          value={avatar}
                          onChange={(e) => setAvatar(e.target.value)}
                        />
                        <DropdownMenu>
                          <DropdownMenuTrigger className="text-left" asChild>
                            <Button className="w-[128px]">
                              {selectedRole}
                            </Button>
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
                        <Button
                          type="submit"
                          className="w-1/2 mx-auto text-black hover:text-white bg-slate-400"
                        >
                          Submit
                        </Button>
                      </form>
                    </DialogContent>
                  </Dialog>
                  <Button onClick={handleDelete(user)}>Delete</Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="flex relative flex-col">
        <Dialog
          open={isDialogCreate}
          onOpenChange={(isOpen) => setIsDialogCreate(isOpen)}
        >
          <DialogTrigger asChild>
            <Button className="w-[180px] mx-auto bg-indigo-400 mt-5 hover:bg-indigo-600/70">
              Create New
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New User</DialogTitle>
            </DialogHeader>
            <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
              <input
                className="w-full pl-2 pt-1 pb-1 bg-gray-300 rounded-md outline-none focus:bg-slate-200"
                placeholder="name"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
              />
              <input
                className="w-full pl-2 pt-1 pb-1 bg-gray-300 rounded-md outline-none focus:bg-slate-200"
                placeholder="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
              />
              <input
                className="w-full pl-2 pt-1 pb-1 bg-gray-300 rounded-md outline-none focus:bg-slate-200"
                placeholder="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
              />
              <input
                className="w-full pl-2 pt-1 pb-1 bg-gray-300 rounded-md outline-none focus:bg-slate-200"
                placeholder="bio"
                name="bio"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                type="text"
              />
              <input
                className="w-full pl-2 pt-1 pb-1 bg-gray-300 rounded-md outline-none focus:bg-slate-200"
                placeholder="avatar"
                name="avatar"
                value={avatar}
                onChange={(e) => setAvatar(e.target.value)}
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
              <Button
                type="submit"
                className="w-1/2 mx-auto text-black hover:text-white bg-slate-400"
              >
                Submit
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
}
