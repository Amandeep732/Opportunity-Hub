import * as cheerio from 'cheerio';
import { safeScrape } from './puppeteer-helper.js';


export const scrapeInternshala = async () => {

  const html = await safeScrape('https://internshala.com/internships');
  const $ = cheerio.load(html);
  const events = [];

  $('.individual_internship').each((i, el) => {
    const card = $(el);
    const title = card.find('h3').find('a').text().trim();
    const location = card.find('.location span').text().trim() || 'Remote';
    const startDate = $('.apply .item_body').text().trim();
    
    const registrationLink = 'https://internshala.com/internships/work-from-home-jobs';

    events.push({
      title: title || "Internship",
      date: startDate || new Date(),
      registrationLink: registrationLink,
      location: location,
      category: 'internships',
      source: 'scrape',
      approved: false,
      scrapedAt: new Date().toISOString(),
    });
  });

  return events;
};
