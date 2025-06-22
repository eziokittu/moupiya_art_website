import { NextResponse } from 'next/server';
import { getImageById, updateImage, deleteImage } from '@/services/gallery.service';
import { deleteImage as deleteCloudinaryImage } from '@/lib/cloudinary';

// GET single image by ID
export async function GET(request, { params }) {
  try {
    const { id } = params;
    const image = await getImageById(id);
    
    if (!image) {
      return NextResponse.json({ error: 'Image not found' }, { status: 404 });
    }
    
    return NextResponse.json(image);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// PUT (update) image by ID
export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const body = await request.json();
    
    const updatedImage = await updateImage(id, body);
    
    if (!updatedImage) {
      return NextResponse.json({ error: 'Image not found' }, { status: 404 });
    }
    
    return NextResponse.json(updatedImage);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// DELETE image by ID
export async function DELETE(request, { params }) {
  try {
    const { id } = params;
    
    // First get the image to get the publicId for Cloudinary deletion
    const image = await getImageById(id);
    if (!image) {
      return NextResponse.json({ error: 'Image not found' }, { status: 404 });
    }
    
    // Delete from Cloudinary
    await deleteCloudinaryImage(image.publicId);
    
    // Delete from database
    await deleteImage(id);
    
    return NextResponse.json({ message: 'Image deleted successfully' });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
} 