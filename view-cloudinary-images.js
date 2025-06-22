// View your Cloudinary images
const { v2: cloudinary } = require('cloudinary');

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

async function viewCloudinaryImages() {
  try {
    console.log('🖼️  Your Cloudinary Images:\n');

    // Search for images in your moupiya_art folder
    const result = await cloudinary.search
      .expression('folder:moupiya_art')
      .sort_by([['created_at', 'desc']])
      .max_results(50)
      .execute();

    if (result.resources.length === 0) {
      console.log('No images found in the moupiya_art folder.');
      return;
    }

    console.log(`Found ${result.resources.length} images:\n`);

    result.resources.forEach((image, index) => {
      console.log(`${index + 1}. Image: ${image.public_id}`);
      console.log(`   📎 Direct URL: ${image.secure_url}`);
      console.log(`   📏 Size: ${image.width}x${image.height} pixels`);
      console.log(`   💾 File size: ${(image.bytes / 1024).toFixed(2)} KB`);
      console.log(`   📅 Created: ${new Date(image.created_at).toLocaleString()}`);
      console.log(`   🔗 View in browser: ${image.secure_url}\n`);
    });

    console.log('💡 Tips:');
    console.log('• Copy any URL above and paste in browser to view the image');
    console.log('• Or visit: https://cloudinary.com/console → Media Library → moupiya_art folder');

  } catch (error) {
    console.error('❌ Error fetching images:', error.message);
    console.log('\n💡 Make sure your .env.local file has correct Cloudinary credentials:');
    console.log('NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name');
    console.log('CLOUDINARY_API_KEY=your_api_key');
    console.log('CLOUDINARY_API_SECRET=your_api_secret');
  }
}

viewCloudinaryImages(); 