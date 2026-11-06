import { NextResponse } from "next/server";
import { SESSION_COOKIE, checkCredentials, isLoginConfigured, createSessionToken, sessionCookieOptions } from "@/lib/admin-auth";

export async function POST(req: Request) {
  if (!isLoginConfigured()) {
    return NextResponse.json({ message: "Login isn't set up: add ADMIN_USERNAME, ADMIN_PASSWORD and ADMIN_SECRET to the environment." }, { status: 500 });
  }
  const body = await req.json().catch(() => null);
  const username = typeof body?.username === "string" ? body.username : "";
  const password = typeof body?.password === "string" ? body.password : "";

  if (!checkCredentials(username, password)) {
    // Small delay slows down password guessing
    await new Promise((r) => setTimeout(r, 800));
    return NextResponse.json({ message: "Invalid username or password" }, { status: 401 });
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set(SESSION_COOKIE, createSessionToken(), sessionCookieOptions);
  return res;
}
