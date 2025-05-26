import connectDB from '@/lib/mongodb';
import Image from '@/models/Image';

export async function getImages(filter = {}) {
  try {
    await connectDB();
    return await Image.find(filter).sort({ createdAt: -1 });
  } catch (error) {
    console.error('Error fetching images:', error);
    throw error;
  }
}

export async function createImage(imageData) {
  try {
    await connectDB();
    return await Image.create(imageData);
  } catch (error) {
    console.error('Error creating image:', error);
    throw error;
  }
}

export async function updateImage(id, imageData) {
  try {
    await connectDB();
    return await Image.findByIdAndUpdate(id, imageData, { new: true });
  } catch (error) {
    console.error('Error updating image:', error);
    throw error;
  }
}

export async function deleteImage(id) {
  try {
    await connectDB();
    return await Image.findByIdAndDelete(id);
  } catch (error) {
    console.error('Error deleting image:', error);
    throw error;
  }
} 