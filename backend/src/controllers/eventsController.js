// File-based persistent storage
import { eventsStorage } from '../services/persistence.js';

// Initialize with sample data if storage is empty
const initializeEvents = async () => {
  const existing = await eventsStorage.findAll();
  if (existing.length === 0) {
    await eventsStorage.create({
      id: '1',
      title: 'Summer Music Festival',
      date: '2024-07-15T18:00:00Z',
      venue: 'Kansas City Music Hall',
      description: 'Join us for an unforgettable summer music festival featuring top artists.',
      image: '/images/IMG_8001.jpg',
      price: 50,
      status: 'upcoming',
      createdAt: new Date().toISOString()
    });
    await eventsStorage.create({
      id: '2',
      title: 'Jazz Night Special',
      date: '2024-08-20T19:00:00Z',
      venue: 'Blue Note KC',
      description: 'An intimate evening of jazz with local and international artists.',
      image: '/images/IMG_7961.jpg',
      price: 35,
      status: 'upcoming',
      createdAt: new Date().toISOString()
    });
  }
};

// Initialize on module load
initializeEvents().catch(err => {
  console.error('Failed to initialize events:', err);
});

// Get all events
export const getEvents = async (req, res) => {
  try {
    const { status, limit } = req.query;
    
    // Validate status parameter
    const validStatuses = ['upcoming', 'past', 'cancelled'];
    if (status && !validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        error: { message: `Invalid status. Must be one of: ${validStatuses.join(', ')}` }
      });
    }

    const query = {};
    if (status) query.status = status;
    if (limit) {
      const limitNum = parseInt(limit, 10);
      if (isNaN(limitNum) || limitNum < 1 || limitNum > 100) {
        return res.status(400).json({
          success: false,
          error: { message: 'Limit must be between 1 and 100' }
        });
      }
      query.limit = limitNum;
    }
    
    let filteredEvents = await eventsStorage.findAll(query);

    // Sanitize response
    const sanitizedEvents = filteredEvents.map(event => ({
      id: event.id,
      title: event.title,
      date: event.date,
      venue: event.venue,
      description: event.description,
      image: event.image,
      price: event.price,
      status: event.status,
      createdAt: event.createdAt
    }));

    res.json({
      success: true,
      count: sanitizedEvents.length,
      data: sanitizedEvents
    });
  } catch (error) {
    const errorMessage = process.env.NODE_ENV === 'production' 
      ? 'Failed to fetch events' 
      : error.message;
    
    res.status(500).json({
      success: false,
      error: { message: errorMessage }
    });
  }
};

// Get event by ID
export const getEventById = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Server-side validation
    if (!id || typeof id !== 'string' || id.length > 100) {
      return res.status(400).json({
        success: false,
        error: { message: 'Invalid event ID' }
      });
    }

    const event = await eventsStorage.findById(id);

    if (!event) {
      return res.status(404).json({
        success: false,
        error: { message: 'Event not found' }
      });
    }

    // Sanitize response
    const sanitizedEvent = {
      id: event.id,
      title: event.title,
      date: event.date,
      venue: event.venue,
      description: event.description,
      image: event.image,
      price: event.price,
      status: event.status,
      createdAt: event.createdAt
    };

    res.json({
      success: true,
      data: sanitizedEvent
    });
  } catch (error) {
    const errorMessage = process.env.NODE_ENV === 'production' 
      ? 'Failed to fetch event' 
      : error.message;
    
    res.status(500).json({
      success: false,
      error: { message: errorMessage }
    });
  }
};

// Create new event (admin only)
export const createEvent = async (req, res) => {
  try {
    // Server-side validation (defense in depth)
    const { title, date, venue, description, image, price, status } = req.body;

    if (!title || !date || !venue) {
      return res.status(400).json({
        success: false,
        error: { message: 'Title, date, and venue are required' }
      });
    }

    // Validate date
    const eventDate = new Date(date);
    if (isNaN(eventDate.getTime())) {
      return res.status(400).json({
        success: false,
        error: { message: 'Invalid date format' }
      });
    }

    // Validate image path if provided
    if (image && (!image.startsWith('/images/') || image.includes('..') || image.includes('//'))) {
      return res.status(400).json({
        success: false,
        error: { message: 'Invalid image path' }
      });
    }

    const newEvent = {
      id: Date.now().toString(),
      title: title.trim(),
      date: date,
      venue: venue.trim(),
      description: description ? description.trim() : undefined,
      image: image ? image.trim() : undefined,
      price: price ? parseFloat(price) : undefined,
      status: status || 'upcoming',
      createdAt: new Date().toISOString()
    };

    // Persist to file storage
    const savedEvent = await eventsStorage.create(newEvent);

    // Sanitize response
    const sanitizedEvent = {
      id: savedEvent.id,
      title: savedEvent.title,
      date: savedEvent.date,
      venue: savedEvent.venue,
      description: savedEvent.description,
      image: savedEvent.image,
      price: savedEvent.price,
      status: savedEvent.status,
      createdAt: savedEvent.createdAt
    };

    res.status(201).json({
      success: true,
      message: 'Event created successfully',
      data: sanitizedEvent
    });
  } catch (error) {
    const errorMessage = process.env.NODE_ENV === 'production' 
      ? 'Failed to create event' 
      : error.message;
    
    res.status(500).json({
      success: false,
      error: { message: errorMessage }
    });
  }
};

// Update event
export const updateEvent = (req, res) => {
  try {
    const { id } = req.params;
    const eventIndex = events.findIndex(e => e.id === id);

    if (eventIndex === -1) {
      return res.status(404).json({
        success: false,
        error: { message: 'Event not found' }
      });
    }

    events[eventIndex] = {
      ...events[eventIndex],
      ...req.body,
      updatedAt: new Date().toISOString()
    };

    res.json({
      success: true,
      message: 'Event updated successfully',
      data: events[eventIndex]
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: { message: 'Failed to update event' }
    });
  }
};

// Delete event (admin only)
export const deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Server-side validation
    if (!id || typeof id !== 'string' || id.length > 100) {
      return res.status(400).json({
        success: false,
        error: { message: 'Invalid event ID' }
      });
    }

    const deleted = await eventsStorage.delete(id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        error: { message: 'Event not found' }
      });
    }

    res.json({
      success: true,
      message: 'Event deleted successfully'
    });
  } catch (error) {
    const errorMessage = process.env.NODE_ENV === 'production' 
      ? 'Failed to delete event' 
      : error.message;
    
    res.status(500).json({
      success: false,
      error: { message: errorMessage }
    });
  }
};

// Get upcoming events
export const getUpcomingEvents = async (req, res) => {
  try {
    const allEvents = await eventsStorage.findAll();
    const now = new Date();
    const upcomingEvents = allEvents
      .filter(event => {
        const eventDate = new Date(event.date);
        return eventDate > now && event.status === 'upcoming';
      })
      .sort((a, b) => new Date(a.date) - new Date(b.date));

    res.json({
      success: true,
      count: upcomingEvents.length,
      data: upcomingEvents
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: { message: 'Failed to fetch upcoming events' }
    });
  }
};

