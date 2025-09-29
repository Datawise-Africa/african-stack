import "server-only";
import { JWTPayload, jwtVerify, SignJWT } from "jose";
import type { ResponseCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { cache } from "react";
import { apiClient } from "./api";
import { User } from "./types";
import { COOKIE } from "./constants/cookies";

const secretKey = process.env.SESSION_SECRET;

const cookieOptions = (expiresAt: Date) => {
  return {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
    sameSite: "lax",
    path: "/",
  } as Partial<ResponseCookie>;
};
const encodedKey = new TextEncoder().encode(secretKey);
type SessionPayload = User & { userId: number; expiresAt: Date };
export async function encrypt(payload: SessionPayload) {
  return new SignJWT(payload as unknown as JWTPayload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(encodedKey);
}

export async function decrypt(session: string | undefined = "") {
  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ["HS256"],
    });
    return payload;
  } catch (_error) {
    console.log("Failed to verify session");
  }
}

export async function createSession(user: Omit<SessionPayload, "expiresAt">) {
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  const session = await encrypt({
    ...user,
    expiresAt: expiresAt,
  });
  const cookieStore = await cookies();

  cookieStore.set(COOKIE.SESSION_KEY, session, cookieOptions(expiresAt));
}

export async function updateSession() {
  const session = (await cookies()).get(COOKIE.SESSION_KEY)?.value;
  const payload = await decrypt(session);
  if (!payload || !session) return null;
  const cookieStore = await cookies();
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

  cookieStore.set(COOKIE.SESSION_KEY, session, cookieOptions(expiresAt));
}

export async function deleteSession() {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE.SESSION_KEY);
}

export async function logout() {
  deleteSession();
  redirect("/auth/login");
}

export async function verifySession() {
  const session = (await cookies()).get(COOKIE.SESSION_KEY)?.value;
  const payload = await decrypt(session);
  if (!payload) {
    redirect("/auth/login");
  }
  return payload;
}

export const getSessionUser = cache(async () => {
  const session = await verifySession();
  if (!session) return null;
  const rawUserId =
    typeof session.userId === "number"
      ? session.userId
      : Number(session.userId);

  if (!rawUserId || Number.isNaN(rawUserId)) {
    return null;
  }
  try {
    const { data } = await apiClient.get("/auth/me");

    return data;
  } catch (_) {
    console.log("Failed to get user from session");
    return null;
  }
});
