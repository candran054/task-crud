import { serialize } from "cookie";
import { sign } from "jsonwebtoken";

const MAX_AGE = 60 * 60 * 24 * 30; // days;

export async function POST(request: Request) {
  const body = await request.json();

  const { email, password } = body;

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    },
  );

  if (response.status === 201) {
    const secret = process.env.JWT_SECRET || "";
    const responseData = await response.json();
    const access_token = responseData.data.access_token;
    const jwt = access_token;

    const token = sign(
      {
        email,
      },
      secret,
      {
        expiresIn: MAX_AGE,
      },
    );

    const serialized = serialize("UserJWT", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      path: "/",
      maxAge: 60 * 60 * 24 * 30,
      sameSite: "strict",
    });

    return new Response(JSON.stringify(responseData), {
      status: 201,
      headers: { "Set-Cookie": serialized },
    });
  } else {
    const errorData = await response.json();
    return new Response(JSON.stringify(errorData), {
      status: response.status,
    });
  }
}
