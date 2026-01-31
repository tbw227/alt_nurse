import express from 'express';
import eventsRouter from './events.js';
import contactRouter from './contact.js';
import galleryRouter from './gallery.js';
import newsRouter from './news.js';

const router = express.Router();

// API version info
router.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'ATL Nurse API',
    version: '1.0.0',
    endpoints: {
      events: '/api/events',
      contact: '/api/contact',
      gallery: '/api/gallery',
      news: '/api/news'
    }
  });
});

// Route handlers
router.use('/events', eventsRouter);
router.use('/contact', contactRouter);
router.use('/gallery', galleryRouter);
router.use('/news', newsRouter);

export default router;
