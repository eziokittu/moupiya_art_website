import Link from 'next/link';

export default function Header() {
  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold text-gray-800">
              Moupiya Art
            </Link>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/gallery" className="text-gray-600 hover:text-gray-900">Gallery</Link>
            <Link href="/category/digital-art" className="text-gray-600 hover:text-gray-900">Digital Art</Link>
            <Link href="/category/traditional-art" className="text-gray-600 hover:text-gray-900">Traditional</Link>
            <Link href="/category/sketches" className="text-gray-600 hover:text-gray-900">Sketches</Link>
            <Link href="/category/other" className="text-gray-600 hover:text-gray-900">Other</Link>
          </div>
        </div>
      </div>
    </nav>
  );
} 