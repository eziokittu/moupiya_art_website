async function getImages() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/images`, {
    cache: 'no-store'
  });
  
  if (!res.ok) {
    throw new Error('Failed to fetch images');
  }
  
  return res.json();
}

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

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {images.map((image) => (
          <div key={image._id} className="rounded-lg overflow-hidden shadow-lg">
            <div className="aspect-w-3 aspect-h-2">
              <img
                src={image.imageUrl}
                alt={image.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">{image.title}</h3>
              <p className="text-gray-600">{image.description}</p>
              <div className="mt-2 flex gap-2 flex-wrap">
                {image.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 bg-gray-100 rounded-full text-sm text-gray-600"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 