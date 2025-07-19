import connectDb from "@/helpers/connectdb";
import { Event } from "@/models/event.model";
import { NextResponse } from "next/server";


export async function GET(request) {
  try {
   
    await connectDb();

    const events = await Event.find({ approved: false }).lean();

    return NextResponse.json(
      {
        success: true,
        count: events.length,
        data: events
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching events:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch events",
      },
      { status: 500 }
    );
  }
}
