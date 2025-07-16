import { NextResponse } from 'next/server';
import { scrapeDevpost } from '@/scripts/devpost-scraper'; 
import { scrapeInternshala } from '@/scripts/internshala-scraper';//
import { scrapeCodeforces } from '@/scripts/codeforces-scraper';//
import { saveToDB } from '@/lib/db'; //
import { withErrorHandling } from '@/helpers/error-handler';

export const config = {
  runtime: 'edge', // Use Vercel's Edge Runtime
};

const handler = async () => {
  // Run scrapers in parallel with safety
  const [hackathons, internships, contests] = await Promise.allSettled([
    scrapeDevpost(),
    scrapeInternshala(),//
    scrapeCodeforces()//
  ]);

  const results = [
    ...(hackathons.status === 'fulfilled' ? hackathons.value : []),
    ...(internships.status === 'fulfilled' ? internships.value : []),
    ...(contests.status === 'fulfilled' ? contests.value : [])
  ];

  // Save to database
  await saveToDB(results);//

  return NextResponse.json({
    success: true,
    scraped: results.length,
    sources: ['Devpost', 'Internshala', 'Codeforces']
  });
};

export default withErrorHandling(handler);