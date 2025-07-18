import connectDb from "@/helpers/connectdb";
import { Event } from "@/models/event.model";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Connect to database
    await connectDb();

    // Fetch all approved internships
    const internships = await Event.find({
      category: "internships",   // 👈 change category
      approved: false,
    }).sort({ createdAt: -1 });

    // Count length
    const count = internships.length;
    console.log('internship length from  inter api', count)

    return NextResponse.json(
      {
        count,        // total number of internships
        internships,  // array of internship docs
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching internships:", error);
    return NextResponse.json(
      { message: "Failed to fetch internships" },
      { status: 500 }
    );
  }
}
