import { NextResponse } from "next/server"
import { destroySession } from "@/lib/auth"

export async function POST() {
  try {
    // Destroy the session in database and clear cookie
    await destroySession()
    
    const response = NextResponse.json({ success: true })
    
    // Clear session cookie
    response.cookies.set('session_token', '', {
      expires: new Date(0),
      path: '/',
      httpOnly: true
    })
    
    return response
  } catch (error) {
    console.error("Logout error:", error)
    return NextResponse.json({ error: "Logout failed" }, { status: 500 })
  }
}
