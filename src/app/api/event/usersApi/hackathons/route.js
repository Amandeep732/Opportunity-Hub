import connectDb from "@/helpers/connectdb";
import { Event } from "@/models/event.model";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // connect to database
    await connectDb();

    const hackathons = await Event.find({
      category: "hackathons",
      approved: true,
    }).sort({ createdAt: -1 });

    // calculate length
    const count = hackathons.length;

    // return response with both
    return NextResponse.json(
      {
        count,        // total number
        hackathons,   // list of hackathons
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching hackathons:", error);
    return NextResponse.json(
      { message: "Failed to fetch hackathons" },
      { status: 500 }
    );
  }
}
