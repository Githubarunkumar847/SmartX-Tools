import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Lottie from 'lottie-react';
import notFoundAnimation from '../assets/404.json'; // ✔️ Ensure this file exists

export default function NotFound() {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim() !== '') {
      navigate(`/search?query=${encodeURIComponent(query)}`);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white px-4 py-8">
      <div className="w-full max-w-md mx-auto mb-6">
        <Lottie animationData={notFoundAnimation} loop={true} />
      </div>

      <h1 className="text-5xl md:text-6xl font-extrabold mb-3">404</h1>
      <p className="text-lg md:text-xl mb-6 text-gray-300">Oops! The page you're looking for doesn’t exist.</p>

      {/* Search Box */}
      <form onSubmit={handleSearch} className="w-full max-w-md mb-4">
        <input
          type="text"
          placeholder="Search for tools or services..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full px-4 py-2 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </form>

      <Link
        to="/"
        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md transition duration-200"
      >
        Go Back Home
      </Link>
    </div>
  );
}
