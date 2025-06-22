import { NextResponse } from 'next/server';
import { getImages, createImage } from '@/services/gallery.service';

// GET all images
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const tags = searchParams.get('tags');
    
    const filter = {};
    if (category && category !== 'all') {
      filter.category = category;
    }
    if (tags) {
      filter.tags = { $in: tags.split(',') };
    }

    const images = await getImages(filter);
    return NextResponse.json(images);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// POST new image
export async function POST(request) {
  try {
    const body = await request.json();
    const newImage = await createImage(body);
    return NextResponse.json(newImage, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
} 