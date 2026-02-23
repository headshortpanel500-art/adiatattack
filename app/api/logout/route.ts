import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const cookieStore = await cookies();
    cookieStore.set("isLoggedIn", "", { maxAge: 0, path: "/" });
    cookieStore.set("userRole", "", { maxAge: 0, path: "/" }); // রোল কুকি ডিলিট
    return NextResponse.json({ message: "Logged out" });
  } catch (error) {
    return NextResponse.json({ message: "Failed" }, { status: 500 });
  }
}