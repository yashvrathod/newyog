import { type NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { createSession } from "@/lib/auth";

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    // Find user by unique field only
    const user = await prisma.user.findUnique({
      where: {
        email: email.toLowerCase(),
      },
    });

    // Check existence + isActive here
    if (!user || !user.isActive) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    // Create session
    const sessionToken = await createSession(user.id);

    const { password: _, ...userWithoutPassword } = user;

    const response = NextResponse.json({
      user: userWithoutPassword,
      sessionToken,
    });

    // Set cookie
    response.cookies.set("session_token", sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json({ error: "Login failed" }, { status: 500 });
  }
}
