import pool from "../config/db.js";

export const createUrlTable = async () => {
    const query = `
        CREATE TABLE IF NOT EXISTS urls (
            id SERIAL PRIMARY KEY,
            long_url TEXT NOT NULL,
            short_url TEXT NOT NULL UNIQUE,
            hit_count INT DEFAULT 0,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
    `;

    try {
        await pool.query(query);
    } catch (err) {
        console.error('Error creating urls table ', err );
    }
}

export const insertUrl = async (longUrl, shortUrl) => {
    const query = `
        INSERT INTO urls (long_url, short_url) VALUES ($1,$2)
        RETURNING *;
    `;

    const values = [longUrl, shortUrl];

    const result = await pool.query(query, values);
    return result.rows[0];
}

export const getShortUrl = async (shortUrl) => {
    const query = `SELECT * FROM urls WHERE short_url = $1`;

    const result = await pool.query(query, [shortUrl]);
    return result.rows[0];
}

export const increaseHitCount = async (shortUrl) => {
    const query = `
        UPDATE urls SET hit_count = hit_count + 1
        WHERE short_url = $1
        RETURNING hit_count;
    `;

    const result = await pool.query(query, [shortUrl]);
    return result.rows[0].hit_count;
}

export const getExistingLongUrl = async (longUrl) => {
    const query = `SELECT * FROM urls WHERE long_url = $1`;

    const result = await pool.query(query, [longUrl]);
    return result;
}

export const fetchTopUrls = async (topNumber) => {
    try {
      const result = await pool.query(
        'SELECT short_url, long_url, hit_count FROM urls ORDER BY hit_count DESC LIMIT $1',
        [topNumber]
      );
      return result.rows;
    } catch (err) {
      console.error('Error fetching top URLs:', err.message);
      return [];
    }
  };
  