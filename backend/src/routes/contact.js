import express from 'express';
import * as contactController from '../controllers/contactController.js';
import { validateContactForm, validateQuery } from '../middleware/validation.js';
import { requireAdmin } from '../middleware/auth.js';

const router = express.Router();

// POST /api/contact - Submit contact form (public)
router.post('/', validateContactForm, contactController.submitContact);

// GET /api/contact - Get all contact submissions (admin only)
router.get('/', requireAdmin, validateQuery, contactController.getContacts);

export default router;
