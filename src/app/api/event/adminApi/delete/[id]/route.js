import connectDb from "@/helpers/connectdb";
import { Event } from "@/models/event.model";
import { NextResponse } from "next/server";

export async function DELETE(request, { params }) {
  // ✅ Check for id
  if (!params.id) {
    return NextResponse.json(
      { error: "Event ID not provided" },
      { status: 400 }
    );
  }

  try {
    await connectDb();
    const eventId = params.id;

    // ✅ Delete event by id
    const deletedEvent = await Event.findByIdAndDelete(eventId);

    // ✅ If not found
    if (!deletedEvent) {
      return NextResponse.json(
        { error: "Event not found" },
        { status: 404 }
      );
    }

    // ✅ Successfully deleted
    return NextResponse.json(
      { success: true, message: "Event deleted successfully", data: deletedEvent },
      { status: 200 }
    );

  } catch (error) {
    console.error("Error deleting event:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
