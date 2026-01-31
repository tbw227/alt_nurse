import express from 'express';
import * as newsController from '../controllers/newsController.js';
import { validateId, validateNews, validateQuery } from '../middleware/validation.js';
import { requireAdmin } from '../middleware/auth.js';

const router = express.Router();

// GET /api/news - Get all news articles (public)
router.get('/', validateQuery, newsController.getNews);

// GET /api/news/:id - Get single news article (public)
router.get('/:id', validateId, newsController.getNewsById);

// POST /api/news - Create news article (admin only)
router.post('/', requireAdmin, validateNews, newsController.createNews);

// PUT /api/news/:id - Update news article (admin only)
router.put('/:id', requireAdmin, validateId, validateNews, newsController.updateNews);

// DELETE /api/news/:id - Delete news article (admin only)
router.delete('/:id', requireAdmin, validateId, newsController.deleteNews);

export default router;
