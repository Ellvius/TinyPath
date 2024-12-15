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
        console.log('urls table created successfully. ');
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