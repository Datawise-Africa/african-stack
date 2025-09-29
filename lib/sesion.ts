import "server-only";

import { JWTPayload, SignJWT, jwtVerify } from "jose";
import type { ResponseCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { cache } from "react";

import { COOKIE } from "./constants/cookies";
import { User } from "./types";

const SESSION_SECRET = process.env.SESSION_SECRET;

if (!SESSION_SECRET) {
  throw new Error(
    "SESSION_SECRET environment variable is required for session management."
  );
}

const encodedKey = new TextEncoder().encode(SESSION_SECRET);

const SEVEN_DAYS_IN_MS = 7 * 24 * 60 * 60 * 1000;
const THIRTY_DAYS_IN_MS = 30 * 24 * 60 * 60 * 1000;

const cookieOptions = (expiresAt: Date): Partial<ResponseCookie> => ({
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax",
  path: "/",
  expires: expiresAt,
  maxAge: Math.floor((expiresAt.getTime() - Date.now()) / 1000),
});

export type SessionPayload = {
  user: User;
  userId: string;
  accessToken: string;
  refreshToken?: string | null;
  rememberMe?: boolean;
  expiresAt: string;
};

type CreateSessionInput = {
  user: User;
  accessToken: string;
  refreshToken?: string | null;
  rememberMe?: boolean;
};

const signJwt = async (payload: SessionPayload, expiresAt: Date) => {
  return new SignJWT(payload as unknown as JWTPayload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(Math.floor(expiresAt.getTime() / 1000))
    .sign(encodedKey);
};

export async function decrypt(session: string | undefined) {
  if (!session) return null;

  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ["HS256"],
    });
    return payload as unknown as SessionPayload;
  } catch (error) {
    console.error("Failed to verify session", error);
    return null;
  }
}

export async function createSession({
  user,
  accessToken,
  refreshToken,
  rememberMe = false,
}: CreateSessionInput) {
  const now = Date.now();
  const expiresInMs = rememberMe ? THIRTY_DAYS_IN_MS : SEVEN_DAYS_IN_MS;
  const expiresAt = new Date(now + expiresInMs);

  const payload: SessionPayload = {
    user,
    userId: user.id,
    accessToken,
    refreshToken: refreshToken ?? null,
    rememberMe,
    expiresAt: expiresAt.toISOString(),
  };

  const token = await signJwt(payload, expiresAt);
  const cookieStore = await cookies();

  cookieStore.set(COOKIE.SESSION_KEY, token, cookieOptions(expiresAt));

  return payload;
}

export async function getSession(): Promise<SessionPayload | null> {
  const sessionCookie = (await cookies()).get(COOKIE.SESSION_KEY)?.value;
  const payload = await decrypt(sessionCookie);

  if (!payload) {
    return null;
  }

  const expiresAt = new Date(payload.expiresAt);
  if (Number.isNaN(expiresAt.getTime()) || expiresAt.getTime() <= Date.now()) {
    await deleteSession();
    return null;
  }

  return payload;
}

export async function updateSession() {
  const session = await getSession();
  if (!session) return null;

  const { user, accessToken, refreshToken, rememberMe } = session;
  return createSession({
    user,
    accessToken,
    refreshToken,
    rememberMe: rememberMe ?? false,
  });
}

export async function deleteSession() {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE.SESSION_KEY);
}

export async function logout(redirectTo = "/auth/login") {
  await deleteSession();
  redirect(redirectTo);
}

export async function verifySession() {
  const session = await getSession();
  if (!session) {
    redirect("/auth/login");
  }
  return session;
}

export const getSessionUser = cache(async () => {
  const session = await getSession();
  return session?.user ?? null;
});

export const getSessionTokens = cache(async () => {
  const session = await getSession();
  if (!session) return null;
  return {
    accessToken: session.accessToken,
    refreshToken: session.refreshToken,
  };
});
