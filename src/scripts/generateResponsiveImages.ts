import { glob } from 'glob';
import sharp from 'sharp';
import fs from 'fs/promises';
import path from 'path';

const imageSizes = [400, 800, 1200]; // Define the sizes you want to generate
const inputDir = 'public/lovable-uploads'; // Your input directory
const outputDir = 'public/lovable-uploads/compressed'; // Your output directory

async function generateResponsiveImages() {
  try {
    // Ensure the output directory exists
    await fs.mkdir(outputDir, { recursive: true });

    // Use glob to find all images in the input directory
    const files = await glob(`${inputDir}/**/*.{jpg,jpeg,png,webp}`);

    for (const file of files) {
      const parsed = path.parse(file);
      const imageName = parsed.name;
      const imageExt = parsed.ext.slice(1); // Remove the dot

      for (const size of imageSizes) {
        const outputFilePath = path.join(outputDir, `${imageName}-${size}.${imageExt}`);

        // Check if the file already exists
        try {
          await fs.access(outputFilePath);
          console.log(`File ${outputFilePath} already exists. Skipping.`);
          continue; // Skip to the next size if the file exists
        } catch (e) {
          // File does not exist, so proceed with processing
        }

        try {
          await sharp(file)
            .resize(size)
            .toFile(outputFilePath);

          console.log(`Generated ${outputFilePath}`);
        } catch (error) {
          console.error(`Error processing ${file} for size ${size}:`, error);
        }
      }
    }

    console.log('All images processed!');
  } catch (error) {
    console.error('An error occurred:', error);
  }
}

generateResponsiveImages();
