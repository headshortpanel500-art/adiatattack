import { connectToDatabase } from "@/lib/mongodb";
import User from "@/models/User";
import { NextResponse } from "next/server";

// ১. ডাটাবেস থেকে সব ইউজার গেট করা (Admin Table-এর জন্য)
export async function GET() {
  try {
    await connectToDatabase();
    const users = await User.find({}).sort({ createdAt: -1 });
    return NextResponse.json(users);
  } catch (error) {
    return NextResponse.json({ message: "Failed to fetch users" }, { status: 500 });
  }
}

// ২. নতুন ইউজার তৈরি করা (Admin Form-এর জন্য)
export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();
    await connectToDatabase();
    
    const newUser = await User.create({ 
      email, 
      password, 
      balance: 0, 
      isBanned: false 
    });
    
    return NextResponse.json(newUser, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Error creating user" }, { status: 500 });
  }
}

// ৩. মেইন পার্ট: ব্যালেন্স এবং ব্যান আপডেট করা
export async function PATCH(req: Request) {
  try {
    await connectToDatabase();
    const body = await req.json();
    const { id, isBanned, balance } = body;

    // ডাটাবেসে আপডেট পাঠানো
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { 
        ...(isBanned !== undefined && { isBanned }), 
        ...(balance !== undefined && { balance }) 
      },
      { new: true } // যাতে আপডেট হওয়া ডাটাটা রিটার্ন করে
    );

    if (!updatedUser) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Success", user: updatedUser });
  } catch (error) {
    console.error("Patch Error:", error);
    return NextResponse.json({ message: "Update failed" }, { status: 500 });
  }
}

// ৪. ইউজার ডিলিট করা
export async function DELETE(req: Request) {
  try {
    const { id } = await req.json();
    await connectToDatabase();
    await User.findByIdAndDelete(id);
    return NextResponse.json({ message: "User deleted successfully" });
  } catch (error) {
    return NextResponse.json({ message: "Delete failed" }, { status: 500 });
  }
}
