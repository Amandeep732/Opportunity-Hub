import connectDb from "@/helpers/connectdb";
import { Event } from "@/models/event.model";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Connect to database
    await connectDb();

    // Fetch all approved contests
    const contests = await Event.find({
      category: "contests",    // 👈 category for contests
      approved: true,
    }).sort({ createdAt: -1 });

    // Count length
    const count = contests.length;

    return NextResponse.json(
      {
        count,     // total number of contests
        contests,  // array of contests
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching contest")
    }
}