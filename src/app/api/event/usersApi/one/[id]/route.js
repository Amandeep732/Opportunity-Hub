import connectDb from "@/helpers/connectdb";
import { Event } from "@/models/event.model";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  // ✅ 1. Check id exists
  if (!params?.id) {
    return NextResponse.json(
      { success: false, error: "Event ID is required" },
      { status: 400 } // 400 = Bad Request
    );
  }

  try {
    // ✅ 2. Connect to DB
    await connectDb();

    const evtId = params.id;

    // ✅ 3. Fetch event by ID
    const eventOne = await Event.findById(evtId);

    // ✅ 4. If not found
    if (!eventOne) {
      return NextResponse.json(
        { success: false, error: "Event not found" },
        { status: 404 } // 404 = Not Found
      );
    }

    // ✅ 5. Return event
    return NextResponse.json(
      { success: true, data: eventOne },
      { status: 200 }
    );

  } catch (error) {
    console.error("Error fetching event by ID:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
