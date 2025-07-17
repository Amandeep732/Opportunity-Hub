import { Event } from "@/models/event.model";
import connectDb from "./connectdb";

export const saveToDB = async (data) => {
  if (!data || !Array.isArray(data) || data.length === 0) {
    throw new Error("No data provided to saveToDB");
  }

  try {
    await connectDb();
    console.log("✅ Raw data length:", data.length);

    const cleanedResult = data
      .map((item) => {
        // ✅ validate title
        if (!item.title || typeof item.title !== "string" || item.title.trim() === "") {
          return null;
        }

        // ✅ validate and parse deadline
        let deadlineDate;
        if (!item.deadline || typeof item.deadline !== "string") {
          return null; // skip if missing or not a string
        }
        const d = new Date(item.deadline);
        if (isNaN(d.getTime())) {
          return null; // skip if invalid date string
        }
        deadlineDate = d;

        return {
          ...item,
          title: item.title.trim(),
          deadline: deadlineDate, // ✅ valid Date object
        };
      })
      .filter(Boolean); // remove nulls

    console.log("✅ Cleaned data length:", cleanedResult.length);

    if (cleanedResult.length === 0) {
      throw new Error("No valid data to insert after cleaning");
    }

    await Event.insertMany(cleanedResult);
    console.log("✅ Inserted into DB");
    return { success: true };
  } catch (error) {
    console.error("❌ Error saving to DB:", error);
    throw error;
  }
};
