import * as cheerio from 'cheerio';
import { safeScrape } from './puppeteer-helper.js';
import { rateLimit } from '@/helpers/rate-limiter.js';

export const scrapeDevpost = async () => {
  //await rateLimit('devpost', 3); // Maintain rate limiting

  const html = await safeScrape('https://devpost.com/hackathons?status[]=upcoming');
  const $ = cheerio.load(html);
  const events = [];

  $('.hackathon-tile').each((i, el) => {
    const tile = $(el);
    const now = new Date();
    now.setDate(now.getDate() + 3); // add 7 days
    const applyBy = now.toISOString();
    events.push({
      title: tile.find('h3').text().trim(),
      date: tile.find('.submission-period').text().trim() ||
        tile.find('.date-range').text().trim(), // Fallback selector
      registrationLink: "https://devpost.com/hackathons?status[]=upcoming", // Common registration pattern
      location: tile.find('.location').text().trim() ||
        tile.find('.info span').first().text().trim(), // Multiple possible selectors
      category: 'hackathons',
      deadline: applyBy,
      source: 'scrape',
      approved: false,
      scrapedAt: new Date().toISOString()
    });
  });

  return events;
};