import { insertUrl, getShortUrl, increaseHitCount, getExistingLongUrl, fetchTopUrls } from '../models/urlModel.js';
import { generateShortUrl } from '../utils/generateShortUrl.js';

export const shortenUrl = async (req, res) => {
  const { longUrl } = req.body;

  try {
    const existingUrl = await getExistingLongUrl(longUrl);
    if (existingUrl.rows.length > 0) {
      return res.status(200).json({ shortUrl: `${process.env.HOST_URL}/redirect/${existingUrl.rows[0].short_url}` });
    }

    const shortUrl = generateShortUrl();
    const newUrl = await insertUrl(longUrl, shortUrl);
    res.status(201).json({ shortUrl: `${process.env.HOST_URL}/redirect/${newUrl.short_url}` });
    console.log(`Shortened URL successfully created for: ${longUrl} -> ${shortUrl}`);
  } catch (err) {
    console.error('Error creating short URL:', err.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const redirectToLongUrl = async (req, res) => {
  const { shortUrl } = req.params;

  try {
    const urlData = await getShortUrl(shortUrl);
    if (!urlData) {
      return res.status(404).json({ error: 'URL not found' });
    }

    const hitCount = await increaseHitCount(shortUrl);
    if (hitCount % 10 === 0) {
      return res.redirect(process.env.REDIRECT_SITE);
    }

    console.log(`Redirected short URL (${shortUrl}) to long URL (${longUrl})`);
    res.redirect(urlData.long_url);
  } catch (err) {
    console.error('Error redirecting:', err.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const getUrlDetails = async (req, res) => {
  const  url  = decodeURIComponent(req.params.url);
  console.log(url);

  try {
    const isShortUrl = url.startsWith(process.env.HOST_URL);

    if (isShortUrl) {
      const shortUrl = url.replace(process.env.HOST_URL, '').replace('/', '');

      const shortUrlData = await getShortUrl(shortUrl);

      if (!shortUrlData) {
        return res.status(404).json({ error: 'Short URL not found' });
      }

      console.log(`Details fetched for URL: ${url}. Total hits: ${hitCount}`);
      return res.status(200).json({
        longUrl: shortUrlData.long_url,
        shortUrl: `${process.env.HOST_URL}/${shortUrl}`,
        hitCount: shortUrlData.hit_count,
      });
    } else {
      const longUrlData = await getExistingLongUrl(url);

      if (!longUrlData || longUrlData.rows.length === 0) {
        return res.status(404).json({ error: 'Long URL not found' });
      }

      return res.status(200).json({
        longUrl: url,
        shortUrl: `${process.env.HOST_URL}/${longUrlData.rows[0].short_url}`,
        hitCount: longUrlData.rows[0].hit_count,
      });
    }
  } catch (err) {
    console.error('Error fetching URL details:', err.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const getTopUrls = async (req, res) => {
  const { number } = req.params;

  try {
    const topNumber = parseInt(number, 10);
    if (isNaN(topNumber) || topNumber <= 0) {
      return res.status(400).json({ error: 'Invalid number parameter. Must be a positive integer.' });
    }

    const topUrls = await fetchTopUrls(topNumber);

    if (topUrls.length === 0) {
      return res.status(404).json({ error: 'No URLs found.' });
    }

    const response = topUrls.map((url, index) => ({
      rank: index + 1,
      shortUrl: `${process.env.HOST_URL}/${url.short_url}`,
      longUrl: url.long_url,
      hitCount: url.hit_count,
    }));

    console.log(`Top ${number} URLs fetched based on hit counts.`);
    res.status(200).json(response);
  } catch (err) {
    console.error('Error fetching top URLs:', err.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


