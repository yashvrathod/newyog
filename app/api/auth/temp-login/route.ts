import { type NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

// Temporary login endpoint for testing
export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();
    console.log('🔐 Temp login attempt:', email);

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    // Temporary hardcoded admin for testing
    const tempAdmin = {
      id: 'temp-admin-1',
      email: 'admin@techcorp.com',
      name: 'Admin User',
      role: 'SUPER_ADMIN',
      isActive: true,
      password: await bcrypt.hash('admin123', 10)
    };

    // Check credentials
    if (email.toLowerCase() !== tempAdmin.email) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    const isValidPassword = await bcrypt.compare(password, tempAdmin.password);
    if (!isValidPassword) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    // Create simple session token
    const sessionToken = Array.from(crypto.getRandomValues(new Uint8Array(32)), (b) =>
      b.toString(16).padStart(2, "0")
    ).join("");

    const { password: _, ...userWithoutPassword } = tempAdmin;

    const response = NextResponse.json({
      user: userWithoutPassword,
      sessionToken,
      message: "Temporary login successful"
    });

    // Set cookie
    response.cookies.set("temp_session_token", sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      path: "/",
    });

    console.log('✅ Temp login successful for:', email);
    return response;

  } catch (error) {
    console.error("❌ Temp login error:", error);
    return NextResponse.json({ error: "Login failed" }, { status: 500 });
  }
}