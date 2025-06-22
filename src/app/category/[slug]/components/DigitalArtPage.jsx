'use client';

import { useState, useEffect } from 'react';
import ImageUploadForm from '@/components/gallery/ImageUploadForm';
import ImageCard from '@/components/gallery/ImageCard';
import EditImageModal from '@/components/gallery/EditImageModal';

export default function DigitalArtPage() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [editingImage, setEditingImage] = useState(null);

  // Fetch images
  const fetchImages = async () => {
    try {
      const response = await fetch('/api/images?category=digital');
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

  // Handle image upload
  const handleImageUploaded = (newImage) => {
    setImages([newImage, ...images]);
    setShowUploadForm(false);
  };

  // Handle image update
  const handleImageUpdated = (updatedImage) => {
    setImages(images.map(img => 
      img._id === updatedImage._id ? updatedImage : img
    ));
    setEditingImage(null);
  };

  // Handle image delete
  const handleImageDeleted = (deletedImageId) => {
    setImages(images.filter(img => img._id !== deletedImageId));
  };

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
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold text-gray-800">Digital Art</h1>
          <p className="text-gray-600 mt-2">Digital artwork created using digital tools and software</p>
        </div>
        <button
          onClick={() => setShowUploadForm(!showUploadForm)}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          {showUploadForm ? 'Cancel' : 'Upload New'}
        </button>
      </div>

      {/* Upload Form */}
      {showUploadForm && (
        <div className="bg-gray-50 p-6 rounded-lg">
          <ImageUploadForm 
            category="digital"
            onImageUploaded={handleImageUploaded}
            onCancel={() => setShowUploadForm(false)}
          />
        </div>
      )}

      {/* Images Grid */}
      {images && images.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {images.map((image) => (
            <ImageCard
              key={image._id}
              image={image}
              onEdit={setEditingImage}
              onDelete={handleImageDeleted}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No digital art pieces yet.</p>
          <p className="text-gray-400">Upload your first piece to get started!</p>
        </div>
      )}

      {/* Edit Modal */}
      {editingImage && (
        <EditImageModal
          image={editingImage}
          onImageUpdated={handleImageUpdated}
          onClose={() => setEditingImage(null)}
        />
      )}
    </div>
  );
} 