import express from 'express';
import { shortenUrl, redirectToLongUrl } from '../controllers/urlController.js';

const router = express.Router();

router.post('/shorten', shortenUrl);
router.get('/redirect/:shortUrl', redirectToLongUrl);

export default router;
