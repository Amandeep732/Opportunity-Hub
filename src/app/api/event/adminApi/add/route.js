import connectDb from "@/helpers/connectdb";
import { Event } from "@/models/event.model";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    await connectDb();

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

    // Trim strings
    title = title?.trim();
    desc = desc?.trim();
    category = category?.trim();
    location = location?.trim();

    // ✅ Validate required fields
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
        { error: "All fields are required for adding event" },
        { status: 400 }
      );
    }

    // ✅ Check if event already exists
    const existingEvent = await Event.findOne({
      title,
      category,
      deadline,
      registrationLink
    });

    if (existingEvent) {
      return NextResponse.json(
        { error: "Event already exists" },
        { status: 400 }
      );
    }

    // ✅ Create new event
    const response = await Event.create({
      title,
      desc,
      category,
      time,
      source: source || "manual",
      approved: approved || false,
      deadline,
      location,
      registrationLink
    });

    if (!response) {
      return NextResponse.json(
        { error: "Something went wrong while saving event" },
        { status: 500 }
      );
    }

    return NextResponse.json({ message: "Event Created", response }, { status: 201 });
  } catch (error) {
    console.error("Error not added event by admin:", error);
    return NextResponse.json(
      { success: false, message: "Failed to add event" },
      { status: 500 }
    );
  }
}
