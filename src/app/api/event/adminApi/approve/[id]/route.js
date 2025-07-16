import connectDb from "@/helpers/connectdb";
import { Event } from "@/models/event.model";
import { NextResponse } from "next/server";

export async function PATCH(request, { params }) {
  if (!params.id) {
    return NextResponse.json(
      { error: "Event ID not provided" },
      { status: 400 }
    );
  }

  try {
    await connectDb();
    const eventId = params.id;

    const updatedEvent = await Event.findByIdAndUpdate(
      eventId,
      { $set: { approved: true } },
      { new: true } // ✅ return updated document
    );

    if (!updatedEvent) {
      return NextResponse.json(
        { error: "Event not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, data: updatedEvent },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating event:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
