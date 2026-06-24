const fs = require('fs');
const { createCanvas, loadImage } = require('canvas');

async function padImage() {
  const image = await loadImage('public/icons/logo.png');
  const size = Math.max(image.width, image.height);
  const canvas = createCanvas(size, size);
  const ctx = canvas.getContext('2d');
  
  // Center image
  const x = (size - image.width) / 2;
  const y = (size - image.height) / 2;
  
  ctx.drawImage(image, x, y);
  
  const buffer = canvas.toBuffer('image/png');
  fs.writeFileSync('public/icons/logo_square.png', buffer);
  console.log('Square image saved to public/icons/logo_square.png');
}

padImage().catch(console.error);
