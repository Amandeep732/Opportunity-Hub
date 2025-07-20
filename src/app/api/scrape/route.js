import { saveToDB } from '@/helpers/saveToDB';
import { scrapeCodeforces } from '@/scripts/contests';
import { scrapeDevpost } from '@/scripts/devpost-scraper';
import { scrapeInternshala } from '@/scripts/internships';
import { NextResponse } from 'next/server';


export async function POST() {
  try {

    // Scrape fastest site first
    const contests = await scrapeCodeforces().catch(() => []);

    // Return early if time is running out
    if (process.env.VERCEL_ENV === 'production') {
      const remainingTime = context.waitUntil()?.remainingTime || 9000;
      if (remainingTime < 3000) return NextResponse.json({ contests });
    }

    const hackathons = await scrapeDevpost().catch(() => []);
    const internships = await scrapeInternshala().catch(() => []);

     const allData = [...contests, ...hackathons, ...internships];
     await saveToDB(allData);
    return NextResponse.json({
      success: true,
      data: { contests, hackathons, internships }
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Partial scrape completed' },
      { status: 206 }
    );
  }
}