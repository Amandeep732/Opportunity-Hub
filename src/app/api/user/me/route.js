import connectDb from "@/helpers/connectdb";
import { userIdFromToken } from "@/helpers/userIdFromToken";
import { User } from "@/models/user.model";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    await connectDb();

    // jwt verify middleware run behind the scene and put user id in header
    const userId = await userIdFromToken(request);
    console.log(`✅ userId from token: ${userId}`);

    if (!userId) {
      return NextResponse.json(
        { message: "user id not found" },
        { status: 401 }
      );
    }

    const user = await User.findById(userId).lean(); // optional: lean() for plain object
    console.log(`✅ user in /me route:`, user);

    if (!user) {
      return NextResponse.json(
        { message: "user not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "true", user },
      { status: 200 }
    );

  } catch (error) {
    console.error("❌ User fetch error:", error);
    return NextResponse.json(
      { error: "User not authenticated" },
      { status: 401 }
    );
  }
}
