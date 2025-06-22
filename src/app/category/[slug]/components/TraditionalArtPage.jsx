'use client';

import { useState, useEffect } from 'react';
import ImageCard from '@/components/gallery/ImageCard';

export default function TraditionalArtPage() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch images
  const fetchImages = async () => {
    try {
      const response = await fetch('/api/images?category=traditional');
      if (response.ok) {
        const data = await response.json();
        setImages(Array.isArray(data) ? data : []);
      } else {
        console.error('Failed to fetch images');
        setImages([]);
      }
    } catch (error) {
      console.error('Error fetching images:', error);
      setImages([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-64">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-gray-800">Traditional Art</h1>
        <p className="text-gray-600 mt-2">Traditional artwork including paintings, drawings, and physical media</p>
      </div>

      {/* Images Grid */}
      {images && images.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {images.map((image) => (
            <ImageCard
              key={image._id}
              image={image}
              onEdit={null} // Read-only
              onDelete={null} // Read-only
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No traditional art pieces yet.</p>
          <p className="text-gray-400">Coming soon...</p>
        </div>
      )}
    </div>
  );
} 