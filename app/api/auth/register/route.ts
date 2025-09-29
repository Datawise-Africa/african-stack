import { NextResponse } from "next/server";

import { ApiError } from "@/lib/api";
import { authApi } from "@/lib/auth";
import { createSession } from "@/lib/sesion";

export async function POST(request: Request) {
  try {
    const { name, email, password, handle } = await request.json();

    if (!name || !email || !password || !handle) {
      return NextResponse.json(
        { error: "All fields are required." },
        { status: 400 }
      );
    }

    const response = await authApi.register({
      name,
      email,
      password,
      handle,
    });

    await createSession({
      user: response.user,
      accessToken: response.token,
      refreshToken: response.refreshToken,
      rememberMe: true,
    });

    return NextResponse.json(
      {
        user: response.user,
        token: response.token,
        refreshToken: response.refreshToken,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Registration error", error);

    if (error instanceof ApiError) {
      return NextResponse.json(
        { error: error.message },
        { status: error.status || 400 }
      );
    }

    const message =
      error instanceof Error ? error.message : "Registration failed";

    return NextResponse.json({ error: message }, { status: 500 });
  }
}
