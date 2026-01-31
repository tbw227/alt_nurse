# Image Optimization Script

This script optimizes images by compressing them and creating WebP versions.

## Usage

```bash
npm run optimize:images
```

## Features

- Compresses JPEG images to 85% quality
- Creates WebP versions at 80% quality
- Resizes images larger than 1920px width
- Preserves directory structure
- Shows compression statistics

## Output

Optimized images are saved to `front-end/public/images/optimized/` with the same directory structure as the input.
