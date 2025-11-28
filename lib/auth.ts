import { cookies } from "next/headers"
import prisma from "@/lib/prisma"
import bcrypt from "bcryptjs"
import { User as PrismaUser, Session as PrismaSession } from "@prisma/client"

export interface User {
  id: string
  email: string
  name: string | null
  role: string
  avatar?: string | null
}

export interface Session {
  user: User
  expires: Date
}

// Simple session-based auth using cookies
// For production, consider using a proper auth library like NextAuth.js

export async function getSession(): Promise<Session | null> {
  const cookieStore = await cookies()
  const sessionToken = cookieStore.get("session_token")?.value

  if (!sessionToken) {
    return null
  }

  try {
    // Check if session exists in database
    const session = await prisma.session.findUnique({
      where: { token: sessionToken },
      include: { user: true }
    })

    if (!session || session.expiresAt < new Date() || !session.user.isActive) {
      return null
    }

    return {
      user: {
        id: session.user.id,
        email: session.user.email,
        name: session.user.name,
        role: session.user.role,
        avatar: session.user.avatar
      },
      expires: session.expiresAt,
    }
  } catch {
    return null
  }
}

export async function createSession(userId: string): Promise<string> {
  const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days
  
  // Generate a secure random token
  const token = Array.from(crypto.getRandomValues(new Uint8Array(32)), 
    byte => byte.toString(16).padStart(2, '0')).join('')

  // Clean up old sessions for this user
  await prisma.session.deleteMany({
    where: { userId }
  })

  // Create new session in database
  await prisma.session.create({
    data: {
      userId,
      token,
      expiresAt: expires
    }
  })

  const cookieStore = await cookies()
  cookieStore.set("session_token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    expires,
    path: "/",
  })

  return token
}

export async function destroySession(): Promise<void> {
  const cookieStore = await cookies()
  const sessionToken = cookieStore.get("session_token")?.value

  if (sessionToken) {
    // Remove session from database
    await prisma.session.deleteMany({
      where: { token: sessionToken }
    })
  }

  cookieStore.delete("session_token")
}

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10)
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash)
}
