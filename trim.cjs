const sharp = require('sharp');

async function trimLogo() {
  try {
    await sharp('public/logo.png')
      .trim()
      .toFile('public/logo-cropped.png');
    console.log('Successfully trimmed transparent padding from logo.');
  } catch (err) {
    console.error('Error trimming logo:', err);
  }
}

trimLogo();
