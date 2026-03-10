import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const inputDir = path.join(__dirname, '../public/images');
const outputDir = path.join(__dirname, '../public/images/optimized');

if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

const optimizeImages = async () => {
    try {
        const files = fs.readdirSync(inputDir);
        
        for (const file of files) {
            if (file.match(/\.(png|jpe?g)$/i)) {
                const inputPath = path.join(inputDir, file);
                const filenameWithoutExt = path.parse(file).name;
                const outputPath = path.join(outputDir, `${filenameWithoutExt}.webp`);
                
                console.log(`Optimizing: ${file}...`);
                
                await sharp(inputPath)
                    .resize(1200, undefined, { // Max width 1200px
                        withoutEnlargement: true 
                    })
                    .webp({ quality: 80, effort: 6 }) 
                    .toFile(outputPath);
                    
                console.log(`✅ Success: ${filenameWithoutExt}.webp created!`);
            }
        }
        console.log('🎉 All images optimized successfully.');
    } catch (err) {
        console.error('❌ Error optimizing images:', err);
    }
};

optimizeImages();
