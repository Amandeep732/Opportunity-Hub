import { saveToDB } from '@/helpers/saveToDB';
import { scrapeCodeforces } from '@/scripts/contests';
import { scrapeDevpost } from '@/scripts/devpost-scraper';
import { scrapeInternshala } from '@/scripts/internships';
import { NextResponse } from 'next/server';

export async function GET(req) {
  const url = new URL(req.url);

  // ✅ Auth check
  if (url.searchParams.get('secret') !== process.env.CRON_SECRET) {
    return NextResponse.json({ error: 'Invalid secret' }, { status: 401 });
  }

  try {
    const results = await executeFullScrape();
    return NextResponse.json({ success: true, scraped: results.length }, { status: 200 });
  } catch (err) {
    console.error('Scrape failed:', err);
    return NextResponse.json({ error: 'Scrape failed' }, { status: 500 });
  }
}

async function executeFullScrape() {
  const results = [];

  try {
    results.push(...(await scrapeCodeforces()));
  } catch (e) {
    console.error('Codeforces failed:', e);
  }

  try {
    results.push(...(await scrapeDevpost()));
  } catch (e) {
    console.error('Devpost failed:', e);
  }

  try {
    const partialData = await scrapeInternshala({ timeout: 10_000 });
    results.push(...partialData);
  } catch (e) {
    console.error('Internshala partial:', e.message);
  }

  await saveToDB(results);
  return results;
}
