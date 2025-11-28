import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";

// -------- GET SESSION -----------
export async function getSession() {
  const cookieStore = await cookies(); // ✔ async now
  const sessionToken = cookieStore.get("session_token")?.value;

  if (!sessionToken) return null;

  const session = await prisma.session.findUnique({
    where: { token: sessionToken },
    include: { user: true },
  });

  if (!session || session.expiresAt < new Date() || !session.user.isActive) {
    return null;
  }

  return {
    user: {
      id: session.user.id,
      email: session.user.email,
      name: session.user.name,
      role: session.user.role,
      avatar: session.user.avatar,
    },
    expires: session.expiresAt,
  };
}

// -------- CREATE SESSION -----------
export async function createSession(userId: string) {
  const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

  const token = Array.from(crypto.getRandomValues(new Uint8Array(32)), (b) =>
    b.toString(16).padStart(2, "0")
  ).join("");

  await prisma.session.deleteMany({ where: { userId } });

  await prisma.session.create({
    data: { userId, token, expiresAt: expires },
  });

  const cookieStore = await cookies(); // ✔ async now
  cookieStore.set("session_token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    expires,
    path: "/",
  });

  return token;
}

// -------- DESTROY SESSION -----------
export async function destroySession() {
  const cookieStore = await cookies(); // ✔ async now
  const sessionToken = cookieStore.get("session_token")?.value;

  if (sessionToken) {
    await prisma.session.deleteMany({
      where: { token: sessionToken },
    });
  }

  cookieStore.delete("session_token");
}

// -------- PASSWORD HELPERS ----------
export async function hashPassword(password: string) {
  return bcrypt.hash(password, 10);
}

export async function verifyPassword(password: string, hash: string) {
  return bcrypt.compare(password, hash);
}
