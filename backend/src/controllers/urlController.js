import { insertUrl, getShortUrl, increaseHitCount } from '../models/urlModel.js';
import { generateShortUrl } from '../utils/generateShortUrl.js';

export const shortenUrl = async (req, res) => {
  const { longUrl } = req.body;

  try {
    const existingUrl = await pool.query('SELECT * FROM urls WHERE long_url = $1', [longUrl]);
    if (existingUrl.rows.length > 0) {
      return res.status(200).json({ shortUrl: `http://localhost:5000/${existingUrl.rows[0].short_url}` });
    }

    const shortUrl = generateShortUrl();
    const newUrl = await insertUrl(longUrl, shortUrl);
    res.status(201).json({ shortUrl: `http://localhost:5000/${newUrl.short_url}` });
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
      return res.redirect('https://google.com');
    }

    res.redirect(urlData.long_url);
  } catch (err) {
    console.error('Error redirecting:', err.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
