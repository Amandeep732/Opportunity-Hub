import { NextResponse } from 'next/server';
import { scrapeDevpost } from '@/scripts/devpost-scraper';
import { scrapeInternshala } from '@/scripts/internships';
import { scrapeCodeforces } from '@/scripts/contests';
import { saveToDB } from '@/helpers/saveToDB';
import { withErrorHandling } from '@/helpers/error-handler';

// ✅ Puppeteer requires Node.js runtime, not Edge
export const runtime = 'nodejs';

export async function POST() {
  return withErrorHandling(async () => {
    // Run all scrapers in parallel
    const [hackathons, internships, contests] = await Promise.allSettled([
      scrapeDevpost(),
      scrapeCodeforces(),
      scrapeInternshala()
    ]);

    // Merge results from fulfilled promises
    const results = [
      ...(hackathons.status === 'fulfilled' ? hackathons.value : []),
      ...(internships.status === 'fulfilled' ? internships.value : []),
      ...(contests.status === 'fulfilled' ? contests.value : [])
    ];
      
    // Save to DB
    await saveToDB(results);

    // Respond with JSON
    return NextResponse.json({
      success: true,
      scraped: results.length,
      data: results,
      sources: ['Devpost', 'Internshala', 'Codeforces']
    });
  })();
}
