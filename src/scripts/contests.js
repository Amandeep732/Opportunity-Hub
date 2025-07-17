import * as cheerio from 'cheerio';
import { safeScrape } from './puppeteer-helper';
import { rateLimit } from '@/helpers/rate-limiter'; 

export const scrapeCodeforces = async () => {
  //await rateLimit('codeforces', 3); // Rate limiting

  const html = await safeScrape('https://codeforces.com/contests');
  const $ = cheerio.load(html);
  const events = [];

  // Upcoming contests are in a table
  $('table.contests-table tr').each((i, el) => {
    // Skip table header
    if (i === 0) return;

    const row = $(el);
    const columns = row.find('td');
    if (columns.length < 6) return; // Ensure it's a valid row

    const title = row.find("bottom dark left") || $(columns[0]).text().trim() 
    const relativeUrl = $(columns[0]).find('a').attr('href');
    const absoluteUrl = relativeUrl
      ? `https://codeforces.com${relativeUrl}`
      : 'https://codeforces.com/contests';

    const startTime = $(columns[2]).attr('href').text().trim()
    const duration = $(columns[3]).text().trim();
    const registrationLink = absoluteUrl;

    events.push({
      title: title || 'Codeforces contest',
      date: `${startTime} (Duration: ${duration})`,
      url: absoluteUrl,
      registrationLink: registrationLink,
      location: 'Online',
      category: 'contests',
      deadline: startTime || 'Not specified',
      source: 'scrape',
      approved: false,
      scrapedAt: new Date().toISOString(),
    });
  });

  return events;
};
