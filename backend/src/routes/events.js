import express from 'express';
import * as eventsController from '../controllers/eventsController.js';
import { validateId, validateEvent, validateQuery } from '../middleware/validation.js';
import { requireAdmin } from '../middleware/auth.js';

const router = express.Router();

// GET /api/events - Get all events (public)
router.get('/', validateQuery, eventsController.getEvents);

// GET /api/events/upcoming/all - Get upcoming events (public)
router.get('/upcoming/all', eventsController.getUpcomingEvents);

// GET /api/events/:id - Get single event (public)
router.get('/:id', validateId, eventsController.getEventById);

// POST /api/events - Create new event (admin only)
router.post('/', requireAdmin, validateEvent, eventsController.createEvent);

// PUT /api/events/:id - Update event (admin only)
router.put('/:id', requireAdmin, validateId, validateEvent, eventsController.updateEvent);

// DELETE /api/events/:id - Delete event (admin only)
router.delete('/:id', requireAdmin, validateId, eventsController.deleteEvent);

export default router;
