/**
 * Image Optimization Script
 * Compresses images and creates WebP versions
 */

import sharp from 'sharp';
import { readdir, stat, mkdir } from 'fs/promises';
import { join, dirname, extname, basename } from 'path';
import { existsSync } from 'fs';

const INPUT_DIR = './front-end/public/images';
const OUTPUT_DIR = './front-end/public/images/optimized';
const QUALITY = 85; // JPEG quality (0-100)
const WEBP_QUALITY = 80; // WebP quality (0-100)
const MAX_WIDTH = 1920; // Max width for images

/**
 * Check if file is an image
 */
function isImageFile(filename) {
  const ext = extname(filename).toLowerCase();
  return ['.jpg', '.jpeg', '.png', '.webp'].includes(ext);
}

/**
 * Optimize a single image
 */
async function optimizeImage(inputPath, outputPath, webpPath) {
  try {
    const stats = await stat(inputPath);
    console.log(`Processing: ${basename(inputPath)} (${(stats.size / 1024).toFixed(2)} KB)`);

    // Ensure output directory exists
    const outputDir = dirname(outputPath);
    if (!existsSync(outputDir)) {
      await mkdir(outputDir, { recursive: true });
    }

    // Read and optimize image
    const image = sharp(inputPath);
    const metadata = await image.metadata();

    // Resize if too large
    if (metadata.width > MAX_WIDTH) {
      image.resize(MAX_WIDTH, null, { withoutEnlargement: true });
    }

    // Save optimized JPEG
    await image
      .jpeg({ quality: QUALITY })
      .toFile(outputPath);

    // Create WebP version
    const webpDir = dirname(webpPath);
    if (!existsSync(webpDir)) {
      await mkdir(webpDir, { recursive: true });
    }

    await sharp(inputPath)
      .resize(metadata.width > MAX_WIDTH ? MAX_WIDTH : null, null, { withoutEnlargement: true })
      .webp({ quality: WEBP_QUALITY })
      .toFile(webpPath);

    const outputStats = await stat(outputPath);
    const webpStats = await stat(webpPath);
    const savings = ((1 - outputStats.size / stats.size) * 100).toFixed(1);
    const webpSavings = ((1 - webpStats.size / stats.size) * 100).toFixed(1);

    console.log(`  ✓ Optimized: ${(outputStats.size / 1024).toFixed(2)} KB (${savings}% smaller)`);
    console.log(`  ✓ WebP: ${(webpStats.size / 1024).toFixed(2)} KB (${webpSavings}% smaller)`);
  } catch (error) {
    console.error(`  ✗ Error processing ${inputPath}:`, error.message);
  }
}

/**
 * Process directory recursively
 */
async function processDirectory(dir) {
  try {
    const entries = await readdir(dir, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = join(dir, entry.name);

      if (entry.isDirectory()) {
        // Skip node_modules and other system directories
        if (entry.name.startsWith('.') || entry.name === 'node_modules') {
          continue;
        }
        await processDirectory(fullPath);
      } else if (entry.isFile() && isImageFile(entry.name)) {
        const relativePath = fullPath.replace(INPUT_DIR, '').replace(/^[\\/]/, '');
        const outputPath = join(OUTPUT_DIR, relativePath);
        const webpPath = outputPath.replace(/\.(jpg|jpeg|png)$/i, '.webp');

        await optimizeImage(fullPath, outputPath, webpPath);
      }
    }
  } catch (error) {
    console.error(`Error reading directory ${dir}:`, error.message);
  }
}

/**
 * Main function
 */
async function main() {
  console.log('🖼️  Image Optimization Script');
  console.log('============================\n');
  console.log(`Input: ${INPUT_DIR}`);
  console.log(`Output: ${OUTPUT_DIR}\n`);

  if (!existsSync(INPUT_DIR)) {
    console.error(`Error: Input directory does not exist: ${INPUT_DIR}`);
    process.exit(1);
  }

  await processDirectory(INPUT_DIR);
  console.log('\n✅ Optimization complete!');
}

main().catch(console.error);
