import GalleryGrid from '@/components/gallery/GalleryGrid';
import { getImages } from '@/services/gallery.service';

export default async function Gallery() {
  const images = await getImages();

  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold text-gray-800">Gallery</h1>
      
      {/* Filter Section */}
      <div className="flex gap-4 flex-wrap">
        {['All', 'Digital', 'Traditional', 'Sketches', 'Other'].map((filter) => (
          <button
            key={filter}
            className="px-4 py-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-800"
          >
            {filter}
          </button>
        ))}
      </div>

      <GalleryGrid images={images} />
    </div>
  );
} 