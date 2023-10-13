import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const cookieStore = cookies();
  const token = cookieStore.get("UserJWT");

  if (!token || token.value !== token.value) {
    return NextResponse.json(
      {
        message: "Unauthorized",
      },
      {
        status: 401,
      },
    );
  }

  const response = {
    user: "are you authenticated?",
  };

  return new Response(JSON.stringify(response), {
    status: 200,
  });
}
