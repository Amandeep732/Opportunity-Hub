
import connectDb from "@/helpers/connectdb";
import { generateAccessandRefreshToken } from "@/helpers/generateTokens";
import { User } from "@/models/user.model";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connectDb();

    const {email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Please provide username or email" },
        { status: 400 }
      );
    }

    const user = await User.findOne({
      $or: [{ email }, { password }],
    });

    if (!user) {
      return NextResponse.json({ error: "User does not exist" }, { status: 404 });
    }

    const isPasswordValid = await user.isPasswordCorrect(password);
    if (!isPasswordValid) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 400 });
    }

    const { accessToken, refreshToken } = await generateAccessandRefreshToken(user._id);

    const response = NextResponse.json({
      message: "Login successful",
      user: {
        _id: user._id,
        email: user.email,
        name: user.name,
      },
    });

    
    const isProduction = process.env.NODE_ENV === "production";
    const cookieDomain = isProduction ? "opportunity-hub-nine.vercel.app" : undefined;


    // Set accessToken cookie
    response.cookies.set("accessToken", accessToken, {
      httpOnly: true,
      secure: true, // Always true for Vercel
      sameSite: "none", // Required for cross-origin on Vercel
      path: "/",
      maxAge: 60 * 15, // 15 minutes
      domain: cookieDomain // Only set domain in production
    });

    // Set refreshToken cookie
    response.cookies.set("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true, // Always true for Vercel
      sameSite: "none", // Required for cross-origin on Vercel
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      domain: cookieDomain // Only set domain in production
    });

    return response;
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}