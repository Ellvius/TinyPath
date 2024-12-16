import express from 'express';
import { shortenUrl, redirectToLongUrl, getUrlDetails, getTopUrls } from '../controllers/urlController.js';

const router = express.Router();

router.post('/shorten', shortenUrl);
router.get('/redirect/:shortUrl', redirectToLongUrl);
router.get('/details/:url', getUrlDetails);
router.get('/top/:number', getTopUrls)

export default router;
