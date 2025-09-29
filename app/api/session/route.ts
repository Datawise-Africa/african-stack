import { NextResponse } from "next/server";

import { authApi } from "@/lib/auth";
import { ApiError } from "@/lib/api";
import {
  createSession,
  deleteSession,
  getSession,
} from "@/lib/sesion";

export async function GET() {
  const session = await getSession();

  return NextResponse.json(
    {
      user: session?.user ?? null,
      rememberMe: session?.rememberMe ?? false,
    },
    { status: 200 }
  );
}

export async function POST(request: Request) {
  try {
    const { email, password, rememberMe = false } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required." },
        { status: 400 }
      );
    }

    const response = await authApi.login({
      email,
      password,
      rememberMe,
    });

    await createSession({
      user: response.user,
      accessToken: response.token,
      refreshToken: response.refreshToken,
      rememberMe,
    });

    return NextResponse.json(
      {
        user: response.user,
        token: response.token,
        refreshToken: response.refreshToken,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Session login error", error);

    if (error instanceof ApiError) {
      return NextResponse.json(
        { error: error.message },
        { status: error.status || 401 }
      );
    }

    const message = error instanceof Error ? error.message : "Login failed";

    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function DELETE() {
  await deleteSession();

  return NextResponse.json({ success: true }, { status: 200 });
}
