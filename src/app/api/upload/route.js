import { NextResponse } from 'next/server';
import { uploadImage } from '@/lib/cloudinary';
import connectDB from '@/lib/mongodb';
import Image from '@/models/Image';

export async function POST(request) {
  try {
    const { title, description, category, tags, file } = await request.json();

    // Validate required fields
    if (!title || !description || !category || !file) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Upload to Cloudinary
    const uploadResult = await uploadImage(file);

    // Connect to MongoDB
    await connectDB();

    // Create image record
    const image = await Image.create({
      title,
      description,
      category,
      tags: tags || [],
      imageUrl: uploadResult.secure_url,
      publicId: uploadResult.public_id,
      format: uploadResult.format,
      resourceType: uploadResult.resource_type
    });

    return NextResponse.json(image, { status: 201 });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: error.message || 'Error uploading file' },
      { status: 500 }
    );
  }
} 