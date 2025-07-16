import connectDb from "@/helpers/connectdb";
import { Event } from "@/models/event.model";
import { NextResponse } from "next/server";

export async function PATCH(request, { params }) {
  // ✅ check if id is provided
  if (!params.id) {
    return NextResponse.json(
      { error: "Event ID not provided" },
      { status: 400 }
    );
  }

  try {
    await connectDb();
    const eventId = params.id;

    const body = await request.json();
    let {
      title,
      desc,
      category,
      source,
      approved,
      time,
      deadline,
      location,
      registrationLink
    } = body;

    // ✅ Optional: trim fields
    title = title?.trim();
    desc = desc?.trim();
    category = category?.trim();
    location = location?.trim();

    // ✅ Validate required fields (you can relax this if partial updates allowed)
    if (
      !title ||
      !desc ||
      !category ||
      !time ||
      !deadline ||
      !location ||
      !registrationLink
    ) {
      return NextResponse.json(
        { error: "All fields are required for updating event" },
        { status: 400 }
      );
    }

    // ❌ Remove duplicate check — while updating, same title/category/deadline may be valid.
    // Or if you really want to check duplicates, exclude current id:
    const duplicate = await Event.findOne({
      title,
      category,
      deadline,
      registrationLink,
      _id: { $ne: eventId }
    });
    if (duplicate) {
      return NextResponse.json(
        { error: "Another event with same details already exists" },
        { status: 400 }
      );
    }

    // ✅ Update event
    const updatedEvent = await Event.findByIdAndUpdate(
      eventId,
      {
        $set: {
          title,
          desc,
          category,
          source: source || "manual",
          approved: approved ?? false, // keep provided value
          time,
          deadline,
          location,
          registrationLink
        }
      },
      { new: true } // ✅ return updated document
    );

    if (!updatedEvent) {
      return NextResponse.json(
        { error: "Event not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Event updated successfully", data: updatedEvent },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating event by admin:", error);
    return NextResponse.json(
      { success: false, message: "Failed to update event" },
      { status: 500 }
    );
  }
}
