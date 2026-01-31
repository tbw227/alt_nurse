// File-based persistent storage
import { newsStorage } from '../services/persistence.js';

// Initialize with sample data if storage is empty
const initializeNews = async () => {
  const existing = await newsStorage.findAll();
  if (existing.length === 0) {
    await newsStorage.create({
      id: '1',
      title: 'New Music Venue Opening in KC',
      content: 'We are excited to announce the opening of a new music venue in Kansas City. This state-of-the-art facility will host various events throughout the year.',
      author: 'Alt Nurse',
      image: '/images/IMG_8001.jpg',
      published: true,
      createdAt: new Date().toISOString()
    });
    await newsStorage.create({
      id: '2',
      title: 'Summer Festival Lineup Announced',
      content: 'The complete lineup for this year\'s summer music festival has been announced. Get ready for an amazing experience!',
      author: 'Alt Nurse',
      image: '/images/IMG_7961.jpg',
      published: true,
      createdAt: new Date().toISOString()
    });
  }
};

// Initialize on module load
initializeNews().catch(err => {
  console.error('Failed to initialize news:', err);
});

// Get all news articles
export const getNews = async (req, res) => {
  try {
    const { published, limit } = req.query;
    const query = {};
    if (published !== undefined) query.published = published === 'true';
    if (limit) query.limit = parseInt(limit, 10);
    
    let filteredNews = await newsStorage.findAll(query);

    if (limit) {
      const limitNum = parseInt(limit, 10);
      if (isNaN(limitNum) || limitNum < 1 || limitNum > 100) {
        return res.status(400).json({
          success: false,
          error: { message: 'Limit must be between 1 and 100' }
        });
      }
    }

    // Sort by newest first
    filteredNews.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    // Sanitize response
    const sanitizedNews = filteredNews.map(article => ({
      id: article.id,
      title: article.title,
      content: article.content,
      author: article.author,
      image: article.image,
      published: article.published,
      createdAt: article.createdAt
    }));

    res.json({
      success: true,
      count: sanitizedNews.length,
      data: sanitizedNews
    });
  } catch (error) {
    const errorMessage = process.env.NODE_ENV === 'production' 
      ? 'Failed to fetch news' 
      : error.message;
    
    res.status(500).json({
      success: false,
      error: { message: errorMessage }
    });
  }
};

// Get news article by ID
export const getNewsById = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Server-side validation
    if (!id || typeof id !== 'string' || id.length > 100) {
      return res.status(400).json({
        success: false,
        error: { message: 'Invalid article ID' }
      });
    }

    const article = await newsStorage.findById(id);

    if (!article) {
      return res.status(404).json({
        success: false,
        error: { message: 'News article not found' }
      });
    }

    // Sanitize response
    const sanitizedArticle = {
      id: article.id,
      title: article.title,
      content: article.content,
      author: article.author,
      image: article.image,
      published: article.published,
      createdAt: article.createdAt
    };

    res.json({
      success: true,
      data: sanitizedArticle
    });
  } catch (error) {
    const errorMessage = process.env.NODE_ENV === 'production' 
      ? 'Failed to fetch news article' 
      : error.message;
    
    res.status(500).json({
      success: false,
      error: { message: errorMessage }
    });
  }
};

// Create news article (admin only)
export const createNews = async (req, res) => {
  try {
    // Server-side validation (defense in depth)
    const { title, content, author, image, published } = req.body;

    if (!title || !content) {
      return res.status(400).json({
        success: false,
        error: { message: 'Title and content are required' }
      });
    }

    // Validate image path if provided
    if (image && (!image.startsWith('/images/') || image.includes('..') || image.includes('//'))) {
      return res.status(400).json({
        success: false,
        error: { message: 'Invalid image path' }
      });
    }

    const newArticle = {
      id: Date.now().toString(),
      title: title.trim(),
      content: content.trim(),
      author: author ? author.trim() : undefined,
      image: image ? image.trim() : undefined,
      published: published !== undefined ? Boolean(published) : true,
      createdAt: new Date().toISOString()
    };

    // Persist to file storage
    const savedArticle = await newsStorage.create(newArticle);

    // Sanitize response
    const sanitizedArticle = {
      id: savedArticle.id,
      title: savedArticle.title,
      content: savedArticle.content,
      author: savedArticle.author,
      image: savedArticle.image,
      published: savedArticle.published,
      createdAt: savedArticle.createdAt
    };

    res.status(201).json({
      success: true,
      message: 'News article created successfully',
      data: sanitizedArticle
    });
  } catch (error) {
    const errorMessage = process.env.NODE_ENV === 'production' 
      ? 'Failed to create news article' 
      : error.message;
    
    res.status(500).json({
      success: false,
      error: { message: errorMessage }
    });
  }
};

// Update news article (admin only)
export const updateNews = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Server-side validation
    if (!id || typeof id !== 'string' || id.length > 100) {
      return res.status(400).json({
        success: false,
        error: { message: 'Invalid article ID' }
      });
    }

    const existingArticle = await newsStorage.findById(id);

    if (!existingArticle) {
      return res.status(404).json({
        success: false,
        error: { message: 'News article not found' }
      });
    }

    // Validate and sanitize update data
    const updateData = {};
    if (req.body.title) updateData.title = req.body.title.trim();
    if (req.body.content) updateData.content = req.body.content.trim();
    if (req.body.author) updateData.author = req.body.author.trim();
    if (req.body.image) {
      if (!req.body.image.startsWith('/images/') || req.body.image.includes('..') || req.body.image.includes('//')) {
        return res.status(400).json({
          success: false,
          error: { message: 'Invalid image path' }
        });
      }
      updateData.image = req.body.image.trim();
    }
    if (req.body.published !== undefined) updateData.published = Boolean(req.body.published);

    const updatedArticle = await newsStorage.update(id, updateData);

    // Sanitize response
    const sanitizedArticle = {
      id: updatedArticle.id,
      title: updatedArticle.title,
      content: updatedArticle.content,
      author: updatedArticle.author,
      image: updatedArticle.image,
      published: updatedArticle.published,
      createdAt: updatedArticle.createdAt,
      updatedAt: updatedArticle.updatedAt
    };

    res.json({
      success: true,
      message: 'News article updated successfully',
      data: sanitizedArticle
    });
  } catch (error) {
    const errorMessage = process.env.NODE_ENV === 'production' 
      ? 'Failed to update news article' 
      : error.message;
    
    res.status(500).json({
      success: false,
      error: { message: errorMessage }
    });
  }
};

// Delete news article (admin only)
export const deleteNews = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Server-side validation
    if (!id || typeof id !== 'string' || id.length > 100) {
      return res.status(400).json({
        success: false,
        error: { message: 'Invalid article ID' }
      });
    }

    const deleted = await newsStorage.delete(id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        error: { message: 'News article not found' }
      });
    }

    res.json({
      success: true,
      message: 'News article deleted successfully'
    });
  } catch (error) {
    const errorMessage = process.env.NODE_ENV === 'production' 
      ? 'Failed to delete news article' 
      : error.message;
    
    res.status(500).json({
      success: false,
      error: { message: errorMessage }
    });
  }
};

