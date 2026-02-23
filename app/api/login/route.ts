import { connectToDatabase } from "@/lib/mongodb";
import User from "@/models/User";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();
    await connectToDatabase();

    // ইউজার চেক
    const user = await User.findOne({ email });

    if (!user || user.password !== password) {
      return NextResponse.json({ message: "Invalid email or password!" }, { status: 401 });
    }

    if (user.isBanned) {
      return NextResponse.json({ message: "Your account is BANNED!" }, { status: 403 });
    }

    // কুকি সেট করা (Next.js 15+ style)
    const cookieStore = await cookies();
    
    cookieStore.set("isLoggedIn", "true", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24, 
      path: "/",
    });

    cookieStore.set("userRole", user.role || "user", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24,
      path: "/",
    });

    return NextResponse.json({ 
      message: "Login Successful", 
      role: user.role || "user" 
    }, { status: 200 });

  } catch (error) {
    return NextResponse.json({ message: "Server error!" }, { status: 500 });
  }
}