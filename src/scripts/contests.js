import * as cheerio from 'cheerio';
import { safeScrape } from './puppeteer-helper';

export const scrapeCodeforces = async () => {
  const html = await safeScrape('https://codeforces.com/contests');
  const $ = cheerio.load(html);
  const events = [];

  // Process both contest tables and lists
  $('.contests-table, .contest-list, .datatable').each((_, table) => {
    $(table).find('tr').each((i, row) => {
      // Skip header rows and empty rows
      if ($(row).find('th').length > 0 || $(row).text().trim() === '') return;

      const cols = $(row).find('td');
      if (cols.length < 3) return;

      // 1. IMPROVED TITLE EXTRACTION
      const title = $('td.dark.left').text().trim() || 'Codeforces Contest';
      
      // Clean up common title artifacts
      const cleanTitle = title.replace(/»/g, '').replace(/\s+/g, ' ').trim();

      // 2. IMPROVED LINK EXTRACTION
      let contestLink = $(cols[0]).find('a').attr('href') || '';
      if (!contestLink.startsWith('http')) {
        contestLink = contestLink.startsWith('/') 
          ? `https://codeforces.com${contestLink}`
          : `https://codeforces.com/contest/${contestLink}`;
      }

      // 3. ADVANCED DATE PARSING
      const rawDate = $(cols[2]).text().trim() || $(cols[1]).text().trim();
      const cleanDate = rawDate
        .replace(/\n/g, ' ')          // Remove newlines
        .replace(/\s+/g, ' ')         // Collapse spaces
        .replace(/UTC.*$/, '')        // Remove timezone
        .trim();

      // Convert to ISO format if possible
      const isoDate = new Date(cleanDate).toISOString() || cleanDate;
      const t = cleanTitle.split('(')[0].trim();
      events.push({
        title: t || 'Codeforces Contest',
        date: isoDate,
        registrationLink: contestLink,
        location: "Online",
        category: 'contests',
        source: 'scrape',
        scrapedAt: new Date().toISOString(),
      });
    });
  });

  return events;
};