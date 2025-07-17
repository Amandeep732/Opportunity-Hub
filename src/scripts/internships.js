import * as cheerio from 'cheerio';
import { safeScrape } from './puppeteer-helper.js';
import { rateLimit } from '@/helpers/rate-limiter.js';

export const scrapeInternshala = async () => {
  //await rateLimit('internshala', 3); // Rate limiting

  const html = await safeScrape('https://internshala.com/internships');
  const $ = cheerio.load(html);
  const events = [];

  $('.individual_internship').each((i, el) => {
    const card = $(el);

    const title = card.find('h3').find('a').text().trim();
    const relativeUrl = card.find('a.view_detail_button').attr('href');
    const absoluteUrl = relativeUrl
      ? `https://internshala.com${relativeUrl}`
      : 'https://internshala.com/internships/work-from-home-jobs';

    const desc = card.find('.company_and_preminum p').text().trim();
    const location = card.find('.location span').text().trim() || 'Remote';
    const startDate = $('.apply .item_body').text().trim();
    const now = new Date();
    now.setDate(now.getDate() + 7); // add 7 days
    const applyBy = now.toISOString();
    const registrationLink = absoluteUrl;

    events.push({
      title: title || "Internship",
      desc: desc,
      date: startDate || 'Not specified',
      url: absoluteUrl,
      registrationLink: registrationLink,
      location: location,
      category: 'internships',
      deadline: applyBy,
      source: 'scrape',
      approved: false,
      scrapedAt: new Date().toISOString(),
    });
  });

  return events;
};
