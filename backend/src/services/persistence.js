/**
 * File-based Data Persistence Layer
 * Provides persistent storage using JSON files
 * Demonstrates data persistence for the application
 */

import { promises as fs } from 'fs';
import { existsSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import logger from './logger.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Data directory
const DATA_DIR = path.join(__dirname, '../../data');

// Ensure data directory exists
const ensureDataDir = async () => {
  if (!existsSync(DATA_DIR)) {
    await fs.mkdir(DATA_DIR, { recursive: true });
    logger.info('Created data directory', { path: DATA_DIR });
  }
};

/**
 * File-based storage class
 */
class FileStorage {
  constructor(filename) {
    this.filename = path.join(DATA_DIR, `${filename}.json`);
    this.data = [];
  }

  /**
   * Load data from file
   */
  async load() {
    try {
      await ensureDataDir();
      
      if (existsSync(this.filename)) {
        const fileContent = await fs.readFile(this.filename, 'utf-8');
        this.data = JSON.parse(fileContent);
        logger.debug(`Loaded ${this.data.length} items from ${this.filename}`);
      } else {
        this.data = [];
        await this.save(); // Create empty file
      }
    } catch (error) {
      logger.error('Error loading data', { filename: this.filename, error });
      this.data = [];
    }
  }

  /**
   * Save data to file
   */
  async save() {
    try {
      await ensureDataDir();
      await fs.writeFile(this.filename, JSON.stringify(this.data, null, 2), 'utf-8');
      logger.debug(`Saved ${this.data.length} items to ${this.filename}`);
    } catch (error) {
      logger.error('Error saving data', { filename: this.filename, error });
      throw error;
    }
  }

  /**
   * Find all items
   */
  async findAll(query = {}) {
    await this.load();
    let results = [...this.data];

    // Apply filters
    if (query.category) {
      results = results.filter(item => item.category === query.category);
    }
    if (query.status) {
      results = results.filter(item => item.status === query.status);
    }
    if (query.published !== undefined) {
      const isPublished = query.published === 'true' || query.published === true;
      results = results.filter(item => item.published === isPublished);
    }
    if (query.limit) {
      const limit = parseInt(query.limit, 10);
      results = results.slice(0, limit);
    }

    return results;
  }

  /**
   * Find item by ID
   */
  async findById(id) {
    await this.load();
    return this.data.find(item => item.id === id) || null;
  }

  /**
   * Create new item
   */
  async create(item) {
    await this.load();
    const newItem = {
      ...item,
      id: item.id || Date.now().toString(),
      createdAt: item.createdAt || new Date().toISOString()
    };
    this.data.push(newItem);
    await this.save();
    return newItem;
  }

  /**
   * Update item
   */
  async update(id, updates) {
    await this.load();
    const index = this.data.findIndex(item => item.id === id);
    
    if (index === -1) {
      return null;
    }

    this.data[index] = {
      ...this.data[index],
      ...updates,
      updatedAt: new Date().toISOString()
    };
    await this.save();
    return this.data[index];
  }

  /**
   * Delete item
   */
  async delete(id) {
    await this.load();
    const index = this.data.findIndex(item => item.id === id);
    
    if (index === -1) {
      return false;
    }

    this.data.splice(index, 1);
    await this.save();
    return true;
  }

  /**
   * Count items
   */
  async count(query = {}) {
    const items = await this.findAll(query);
    return items.length;
  }
}

// Initialize storage instances
export const contactsStorage = new FileStorage('contacts');
export const eventsStorage = new FileStorage('events');
export const newsStorage = new FileStorage('news');
export const galleryStorage = new FileStorage('gallery');

// Initialize on import
ensureDataDir().catch(err => {
  logger.error('Failed to initialize data directory', err);
});
