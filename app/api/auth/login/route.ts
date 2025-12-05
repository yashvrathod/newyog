import { type NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { createSession } from "@/lib/auth";

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();
    console.log('🔐 Login attempt:', email);

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    // Test database connection first
    try {
      await prisma.$connect();
      console.log('✅ Database connected for login');
    } catch (dbError) {
      console.error('❌ Database connection failed:', dbError);
      return NextResponse.json(
        { error: "Database connection failed" },
        { status: 500 }
      );
    }

    // Find user by unique field only
    const user = await prisma.user.findUnique({
      where: {
        email: email.toLowerCase(),
      },
    });

    console.log('👤 User found:', user ? `${user.email} (${user.role})` : 'None');

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
    console.error("❌ Login error details:", error);
    if (error instanceof Error) {
      console.error("Error message:", error.message);
      console.error("Error stack:", error.stack);
    }
    
    // Provide more specific error messages
    let errorMessage = "Login failed";
    if (error instanceof Error) {
      if (error.message.includes("database") || error.message.includes("connection")) {
        errorMessage = "Database connection error";
      } else if (error.message.includes("user") || error.message.includes("email")) {
        errorMessage = "User lookup failed";
      }
    }
    
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
