const Jimp = require("jimp");

async function cropLogo() {
  try {
    const image = await Jimp.read("public/logo.png");
    image.autocrop();
    await image.writeAsync("public/logo-cropped.png");
    console.log("Successfully cropped logo.");
  } catch (err) {
    console.error("Error cropping logo:", err);
  }
}

cropLogo();
