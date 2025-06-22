'use client';

import { useState } from 'react';

export default function ImageCard({ image, onEdit, onDelete }) {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this image?')) {
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`/api/images/${image._id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        onDelete(image._id);
      } else {
        const error = await response.json();
        alert('Delete failed: ' + error.error);
      }
    } catch (error) {
      console.error('Delete error:', error);
      alert('Delete failed: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      {/* Image/Video Display */}
      <div className="aspect-square relative">
        {image.resourceType === 'video' ? (
          <video
            src={image.imageUrl}
            controls
            className="w-full h-full object-cover"
          />
        ) : (
          <img
            src={image.imageUrl}
            alt={image.title}
            className="w-full h-full object-cover"
          />
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-1">
          {image.title}
        </h3>
        
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {image.description}
        </p>

        {/* Tags */}
        {image.tags && image.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {image.tags.slice(0, 3).map((tag, index) => (
              <span
                key={index}
                className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full"
              >
                {tag}
              </span>
            ))}
            {image.tags.length > 3 && (
              <span className="text-gray-500 text-xs">
                +{image.tags.length - 3} more
              </span>
            )}
          </div>
        )}

        {/* Metadata */}
        <div className="text-xs text-gray-500 mb-3">
          <p>Category: {image.category}</p>
          <p>Uploaded: {formatDate(image.createdAt)}</p>
          <p>Type: {image.resourceType} ({image.format})</p>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <button
            onClick={() => onEdit(image)}
            className="flex-1 bg-blue-600 text-white py-2 px-3 rounded text-sm hover:bg-blue-700 transition-colors"
          >
            Edit
          </button>
          <button
            onClick={handleDelete}
            disabled={loading}
            className="flex-1 bg-red-600 text-white py-2 px-3 rounded text-sm hover:bg-red-700 disabled:bg-gray-400 transition-colors"
          >
            {loading ? 'Deleting...' : 'Delete'}
          </button>
        </div>
      </div>
    </div>
  );
} 