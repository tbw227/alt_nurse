// File-based persistent storage
import { contactsStorage } from '../services/persistence.js';

// Submit contact form
export const submitContact = async (req, res) => {
  try {
    // Extract and validate required fields (already validated by middleware, but extra safety)
    const { name, email, message, phone, subject } = req.body;
    
    // Server-side validation (defense in depth)
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        error: { message: 'Name, email, and message are required' }
      });
    }

    // Additional length checks (server-side)
    if (name.length > 100 || email.length > 255 || message.length > 5000) {
      return res.status(400).json({
        success: false,
        error: { message: 'Input exceeds maximum length' }
      });
    }

    const contact = {
      id: Date.now().toString(),
      name: name.trim(),
      email: email.trim().toLowerCase(),
      message: message.trim(),
      phone: phone ? phone.trim() : undefined,
      subject: subject ? subject.trim() : undefined,
      status: 'new',
      createdAt: new Date().toISOString()
    };

    // Persist to file storage
    const savedContact = await contactsStorage.create(contact);

    // Sanitize response - only return safe fields
    res.status(201).json({
      success: true,
      message: 'Thank you for your message! We will get back to you soon.',
      data: {
        id: savedContact.id,
        name: savedContact.name,
        // Don't expose email in response for privacy
      }
    });
  } catch (error) {
    // Don't expose error details in production
    const errorMessage = process.env.NODE_ENV === 'production' 
      ? 'Failed to submit contact form' 
      : error.message;
    
    res.status(500).json({
      success: false,
      error: { message: errorMessage }
    });
  }
};

// Get all contacts (admin only)
export const getContacts = (req, res) => {
  try {
    const { status, limit } = req.query;
    let filteredContacts = [...contacts];

    // Validate status parameter
    const validStatuses = ['new', 'read', 'archived'];
    if (status && !validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        error: { message: `Invalid status. Must be one of: ${validStatuses.join(', ')}` }
      });
    }

    if (status) {
      filteredContacts = filteredContacts.filter(contact => contact.status === status);
    }

    // Validate and apply limit
    if (limit) {
      const limitNum = parseInt(limit, 10);
      if (isNaN(limitNum) || limitNum < 1 || limitNum > 100) {
        return res.status(400).json({
          success: false,
          error: { message: 'Limit must be between 1 and 100' }
        });
      }
      filteredContacts = filteredContacts.slice(0, limitNum);
    }

    // Sort by newest first
    filteredContacts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    // Sanitize response - ensure no secrets leak
    const sanitizedContacts = filteredContacts.map(contact => ({
      id: contact.id,
      name: contact.name,
      email: contact.email,
      message: contact.message,
      phone: contact.phone,
      subject: contact.subject,
      status: contact.status,
      createdAt: contact.createdAt
    }));

    res.json({
      success: true,
      count: sanitizedContacts.length,
      data: sanitizedContacts
    });
  } catch (error) {
    const errorMessage = process.env.NODE_ENV === 'production' 
      ? 'Failed to fetch contacts' 
      : error.message;
    
    res.status(500).json({
      success: false,
      error: { message: errorMessage }
    });
  }
};

