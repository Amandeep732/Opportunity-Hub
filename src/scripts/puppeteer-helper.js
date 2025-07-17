import puppeteer from 'puppeteer-core';
import chromium from '@sparticuz/chromium';

export const launchBrowser = async () => {
  return await puppeteer.launch({
    args: [
      ...chromium.args,
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage'
    ],
    executablePath: process.env.CHROME_EXECUTABLE_PATH || await chromium.executablePath(),
    headless: chromium.headless,
    ignoreHTTPSErrors: true,
  });
};

export const safeScrape = async (url) => {
  const browser = await launchBrowser();
  try {
    const page = await browser.newPage();
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 }); // Increased timeout
    await new Promise(res => setTimeout(res, 5000));
    return await page.content();
  } catch (error) {
    console.error('Scraping failed:', error);
    throw error; // Or return `null`
  } finally {
    await browser.close();
  }
};