import cheerio from 'cheerio';
import { safeScrape } from './puppeteer-helper.js';
import { rateLimit } from '../utils/rate-limiter.js';

export const scrapeDevpost = async () => {
  await rateLimit('devpost', 3); // Maintain rate limiting
  
  const html = await safeScrape('https://devpost.com/hackathons?status[]=upcoming');
  const $ = cheerio.load(html);
  const events = [];

  $('.hackathon-tile').each((i, el) => {
    const tile = $(el);
    const relativeUrl = tile.find('a[data-role="hackathon-tile"]').attr('href');
    const absoluteUrl = `https://devpost.com${relativeUrl}`;


    const deadline = tile.find('.submission-date').text().trim() || 
                    tile.find('.deadline').text().trim() ||
                    tile.find('.info span').eq(1).text().trim() || 
                    'Not specified';
    
    events.push({
      title: tile.find('h2').text().trim(),
      date: tile.find('.submission-period').text().trim() || 
            tile.find('.date-range').text().trim(), // Fallback selector
      url: absoluteUrl,
      registrationLink: tile.find('a[href*="register"]').attr('href') || 
                      `${absoluteUrl}/register`, // Common registration pattern
      location: tile.find('.location').text().trim() || 
               tile.find('.info span').first().text().trim(), // Multiple possible selectors
      category: 'hackathons',
      deadline :deadline,
      source: 'scrape',
      approved : false,
      scrapedAt: new Date().toISOString()
    });
  });

  return events;
};