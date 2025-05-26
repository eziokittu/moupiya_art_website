export default function GalleryGrid({ images }) {
  return (
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
  );
} 