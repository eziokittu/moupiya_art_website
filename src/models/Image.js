import mongoose from 'mongoose';

const ImageSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a title for the image'],
    maxlength: [60, 'Title cannot be more than 60 characters']
  },
  description: {
    type: String,
    required: [true, 'Please provide a description'],
    maxlength: [300, 'Description cannot be more than 300 characters']
  },
  imageUrl: {
    type: String,
    required: [true, 'Please provide an image URL']
  },
  publicId: {
    type: String,
    required: [true, 'Cloudinary public ID is required']
  },
  format: {
    type: String,
    required: [true, 'File format is required']
  },
  resourceType: {
    type: String,
    enum: ['image', 'video'],
    required: [true, 'Resource type is required']
  },
  category: {
    type: String,
    required: [true, 'Please specify a category'],
    enum: ['digital', 'traditional', 'sketches', 'other']
  },
  tags: [{
    type: String
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.models.Image || mongoose.model('Image', ImageSchema); 