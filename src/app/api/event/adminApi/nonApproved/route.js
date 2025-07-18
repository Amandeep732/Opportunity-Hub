import connectDb from "@/helpers/connectdb";
import { Event } from "@/models/event.model";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    // ✅ Connect to the database
    await connectDb();

    // ✅ Fetch events where approved is NOT true
    const events = await Event.find({ approved: { $ne: true } }).lean();

    return NextResponse.json(
      {
        success: true,
        count: events.length,
        data: events
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching non-approved events:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch non-approved events",
      },
      { status: 500 }
    );
  }
}
