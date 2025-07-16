import { kv } from '@vercel/kv';

export const rateLimit = async (domain, maxRequests) => {
  const key = `rate-limit:${domain}`;
  const current = await kv.incr(key);
  
  if (current > maxRequests) {
    throw new Error(`Rate limit exceeded for ${domain}`);
  }

  if (current === 1) {
    await kv.expire(key, 60); // Reset every 60 seconds
  }
};