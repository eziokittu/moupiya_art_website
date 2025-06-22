import { notFound } from 'next/navigation';
import DigitalArtPage from './components/DigitalArtPage';
import TraditionalArtPage from './components/TraditionalArtPage';

const CATEGORY_COMPONENTS = {
  'digital-art': DigitalArtPage,
  'traditional-art': TraditionalArtPage,
  'sketches': () => (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-gray-800">Sketches</h1>
        <p className="text-gray-600 mt-2">Quick sketches, concept art, and preliminary drawings</p>
      </div>
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">Sketches gallery coming soon...</p>
      </div>
    </div>
  ),
  'other': () => (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-gray-800">Other</h1>
        <p className="text-gray-600 mt-2">Experimental work, mixed media, and other creative pieces</p>
      </div>
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">Other artwork gallery coming soon...</p>
      </div>
    </div>
  )
};

export default function CategoryPage({ params }) {
  const { slug } = params;
  const ComponentToRender = CATEGORY_COMPONENTS[slug];

  // If category doesn't exist, show 404
  if (!ComponentToRender) {
    notFound();
  }

  return <ComponentToRender />;
} 