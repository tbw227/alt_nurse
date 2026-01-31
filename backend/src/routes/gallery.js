import express from 'express';
import * as galleryController from '../controllers/galleryController.js';
import { validateId, validateGalleryImage, validateQuery } from '../middleware/validation.js';
import { requireAdmin } from '../middleware/auth.js';

const router = express.Router();

// GET /api/gallery - Get all gallery images (public)
router.get('/', validateQuery, galleryController.getGalleryImages);

// GET /api/gallery/:id - Get single gallery image (public)
router.get('/:id', validateId, galleryController.getGalleryImageById);

// POST /api/gallery - Add gallery image (admin only)
router.post('/', requireAdmin, validateGalleryImage, galleryController.addGalleryImage);

// DELETE /api/gallery/:id - Delete gallery image (admin only)
router.delete('/:id', requireAdmin, validateId, galleryController.deleteGalleryImage);

export default router;
