import express from 'express';
import { shortenUrl, redirectToLongUrl, getUrlDetails, getTopUrls } from '../controllers/urlController.js';
import { rateLimitMiddleware } from '../middlewares/rateLimiter.js';

const router = express.Router();

router.post('/shorten', shortenUrl);
router.get('/:shortUrl', rateLimitMiddleware, redirectToLongUrl);
router.get('/details/:url', getUrlDetails);
router.get('/top/:number', getTopUrls)

export default router;
