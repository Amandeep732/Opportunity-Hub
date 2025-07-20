import * as cheerio from 'cheerio';
import { safeScrape } from './puppeteer-helper.js';


export const scrapeDevpost = async () => {
 

  const html = await safeScrape('https://devpost.com/hackathons?status[]=upcoming');
  const $ = cheerio.load(html);
  const events = [];

  $('.hackathon-tile').each((i, el) => {
    const tile = $(el);
    // Primary date range selector
    let rawDate = tile.find('.info > .submission-period').text().trim()
      || tile.find('.submission-period').text().trim()
      || tile.find('.date-range').text().trim();

    // Parse start and end dates
    let startDate = rawDate;
    let endDate = rawDate;
    if (rawDate.includes('-')) {
      const parts = rawDate.split('-').map(p => p.trim());
      startDate = parts[0];
      endDate = parts[1] || parts[0];
    }

    // Fallback: if no valid rawDate, set deadlines 3 days from now
    if (!rawDate) {
      const now = new Date();
      const isoStart = now.toISOString();
      now.setDate(now.getDate() + 3);
      const isoDeadline = now.toISOString();
      startDate = isoStart;
      endDate = isoDeadline;
    }

    events.push({
      title: tile.find('h3').text().trim() || 'Hackathon',
      date: startDate,
      registrationLink: 'https://devpost.com/hackathons?status[]=upcoming',
      location: tile.find('.location').text().trim() ||
        tile.find('.info span').first().text().trim(),
      category: 'hackathons',
      deadline: endDate,
      source: 'scrape',
      approved: false,
      scrapedAt: new Date().toISOString()
    });
  });

  return events;
};
