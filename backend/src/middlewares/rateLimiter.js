import { getRateLimitData, resetRateLimitData, increaseRequestCount} from '../models/urlModel.js';

export const rateLimitMiddleware = async (req, res, next) => {
  const { shortUrl } = req.params;

  try {
    const rateData = await getRateLimitData(shortUrl);

    if (!rateData) {
        return res.status(404).json({ error: 'Short URL not found' });
    }

    const { last_request_time, request_count } = rateData;
    const now = new Date();

    const timeDifference = (now - new Date(last_request_time)) / (1000 * 60 * 60); // Hours
    if (timeDifference < 24) {
      if (request_count >= 20) {
        return res.status(429).json({ error: 'Rate limit exceeded. Try again later.' });
      }
      await increaseRequestCount(shortUrl);
    } else {
      // Reset request count if the last request was more than a day ago
      await resetRateLimitData(shortUrl, now);
    }

    next();
  } catch (err) {
    console.error('Rate limit check failed:', err.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
