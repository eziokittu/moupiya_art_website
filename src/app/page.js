import Image from "next/image";

export default function Home() {
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="text-center py-16 bg-gradient-to-r from-purple-100 to-pink-100 rounded-lg">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-4">
          Welcome to My Art Gallery
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto px-4">
          Explore my collection of digital and traditional artwork, sketches, and creative pieces
        </p>
      </section>

      {/* Featured Works */}
      <section>
        <h2 className="text-3xl font-bold text-gray-800 mb-8">Featured Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* This will be populated with actual data from the database */}
          <div className="rounded-lg overflow-hidden shadow-lg">
            <div className="aspect-w-3 aspect-h-2 bg-gray-200">
              {/* Placeholder for image */}
              <div className="w-full h-48 bg-gray-300"></div>
            </div>
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">Artwork Title</h3>
              <p className="text-gray-600">Description of the artwork goes here...</p>
            </div>
          </div>
          {/* Repeat for more placeholder items */}
        </div>
      </section>

      {/* Categories Section */}
      <section>
        <h2 className="text-3xl font-bold text-gray-800 mb-8">Browse by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {['Digital Art', 'Traditional Art', 'Sketches', 'Other'].map((category) => (
            <a
              key={category}
              href={`/gallery?category=${category.toLowerCase().replace(' ', '-')}`}
              className="p-6 text-center bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <h3 className="text-xl font-semibold text-gray-800">{category}</h3>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}
