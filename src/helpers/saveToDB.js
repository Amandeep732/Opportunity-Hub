import { Event } from "@/models/event.model";
import connectDb from "./connectdb";

// Category limits configuration
const CATEGORY_LIMITS = {
  contests: 33,
  internships: 33,
  hackathons: 34
};

export const saveToDB = async (data) => {
  if (!data || !Array.isArray(data) || data.length === 0) {
    throw new Error("No data provided to saveToDB");
  }

  try {
    await connectDb();
    console.log("✅ Raw data length:", data.length);

    // Step 1: Clean and validate data
    const cleanedResult = data
      .map((item) => {
        // Validate required fields
        if (!item.title || typeof item.title !== "string" || item.title.trim() === "") {
          return null;
        }

        // Validate category
        if (!item.category || !CATEGORY_LIMITS[item.category]) {
          return null;
        }

        // Parse deadline
        let deadlineDate;
        if (item.deadline) {
          const d = new Date(item.deadline);
          deadlineDate = isNaN(d.getTime()) ? null : d;
        }

        return {
          ...item,
          title: item.title.trim(),
          deadline: deadlineDate,
          category: item.category.toLowerCase() // normalize category
        };
      })
      .filter(Boolean);

    console.log("✅ Cleaned data length:", cleanedResult.length);

    if (cleanedResult.length === 0) {
      throw new Error("No valid data to insert after cleaning");
    }

    // Step 2: Apply category limits
    const categoryCounts = {
      contests: 0,
      internships: 0,
      hackathons: 0
    };

    const limitedResults = [];
    const overLimitItems = [];

    for (const item of cleanedResult) {
      if (categoryCounts[item.category] < CATEGORY_LIMITS[item.category]) {
        limitedResults.push(item);
        categoryCounts[item.category]++;
      } else {
        overLimitItems.push(item);
      }
    }

    console.log(`📊 Category limits applied:
      Contests: ${categoryCounts.contests}/${CATEGORY_LIMITS.contests}
      Internships: ${categoryCounts.internships}/${CATEGORY_LIMITS.internships}
      Hackathons: ${categoryCounts.hackathons}/${CATEGORY_LIMITS.hackathons}
    `);

    if (overLimitItems.length > 0) {
      console.log(`⚠️ ${overLimitItems.length} items exceeded category limits`);
    }

    // Step 3: Database operations
    if (limitedResults.length > 0) {
      // Delete oldest documents if we're at limit
      for (const category in CATEGORY_LIMITS) {
        const count = await Event.countDocuments({ category });
        if (count >= CATEGORY_LIMITS[category]) {
          const excess = count + categoryCounts[category] - CATEGORY_LIMITS[category];
          if (excess > 0) {
            const oldest = await Event.find({ category })
              .sort({ createdAt: 1 })
              .limit(excess)
              .select('_id');
            
            await Event.deleteMany({ 
              _id: { $in: oldest.map(doc => doc._id) } 
            });
            console.log(`♻️ Deleted ${oldest.length} old ${category} documents`);
          }
        }
      }

      // Insert new documents
      await Event.insertMany(limitedResults);
      console.log("✅ Inserted into DB:", limitedResults.length);
    }

    return { 
      success: true,
      stats: {
        inserted: limitedResults.length,
        skipped: overLimitItems.length,
        byCategory: categoryCounts
      }
    };

  } catch (error) {
    console.error("❌ Error saving to DB:", error);
    throw error;
  }
};