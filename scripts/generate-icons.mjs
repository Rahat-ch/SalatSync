import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const sizes = [72, 96, 128, 144, 152, 192, 384, 512];
const inputSvg = path.join(__dirname, '../public/icon.svg');
const outputDir = path.join(__dirname, '../public/icons');

// Ensure the icons directory exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

async function generateIcons() {
  console.log('🎨 Generating PWA icons from SVG...');
  
  try {
    for (const size of sizes) {
      const outputPath = path.join(outputDir, `icon-${size}x${size}.png`);
      
      await sharp(inputSvg)
        .resize(size, size)
        .png({ quality: 90, progressive: true })
        .toFile(outputPath);
        
      console.log(`✅ Generated icon-${size}x${size}.png`);
    }
    
    // Also create a favicon
    await sharp(inputSvg)
      .resize(32, 32)
      .png({ quality: 90 })
      .toFile(path.join(__dirname, '../public/favicon-32x32.png'));
      
    console.log('✅ Generated favicon-32x32.png');
    
    // Create apple-touch-icon
    await sharp(inputSvg)
      .resize(180, 180)
      .png({ quality: 90 })
      .toFile(path.join(__dirname, '../public/apple-touch-icon.png'));
      
    console.log('✅ Generated apple-touch-icon.png');
    
    console.log('\n🎉 All PWA icons generated successfully!');
    
  } catch (error) {
    console.error('❌ Error generating icons:', error);
    process.exit(1);
  }
}

generateIcons();
