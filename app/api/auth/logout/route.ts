import { serialize } from "cookie";

export async function POST(request: Request) {
  const serialized = serialize("UserJWT", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    path: "/",
    maxAge: -1,
    sameSite: "strict",
  });

  return new Response("logout", {
    status: 201,
    headers: { "Set-Cookie": serialized },
  });
}
