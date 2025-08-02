import { useEffect, useState } from 'react';
import { Routes, Route, NavLink, Link, useNavigate } from 'react-router-dom';
import {
  Home,
  CompressImage,
  MergePDF,
  FileConverter,
  BMICalculator,
  AgeCalculator,
  QRCodeGenerator,
  TextUtils,
  UnitConverter,
  TodoList,
  About,
  Contact,
} from './pages';

import { Menu, X, Moon, Sun } from 'lucide-react';

const App = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem('theme') === 'dark');
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/compress-image', label: 'Compress' },
    { to: '/merge-pdf', label: 'Merge PDF' },
    { to: '/file-converter', label: 'File Convert' },
    { to: '/bmi', label: 'BMI' },
    { to: '/age', label: 'Age' },
    { to: '/qr', label: 'Generate QR' },
    { to: '/text-utils', label: 'Generate Text' },
    { to: '/unit-converter', label: 'Unit Convert' },
    { to: '/todo', label: 'To Do List' },
    { to: '/about', label: 'About' },
    { to: '/contact', label: 'Contact' },
  ];

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
    localStorage.setItem('theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  const handleSearch = (e) => {
    if (e.key === 'Enter') {
      const match = navLinks.find(link =>
        link.label.toLowerCase().includes(search.toLowerCase())
      );
      if (match) {
        navigate(match.to);
        setMenuOpen(false);
        setSearch('');
      } else {
        alert('No matching tool found');
      }
    }
  };

  const filteredLinks = search.trim()
    ? navLinks.filter(link =>
        link.label.toLowerCase().includes(search.toLowerCase())
      )
    : navLinks;

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 text-gray-800 dark:bg-gray-900 dark:text-white transition-colors duration-300">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white dark:bg-gray-800 shadow-md">
        <div className="flex items-center justify-between p-4 md:px-8">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-4 group transition-transform hover:scale-105">
            <div className="w-36 h-16 bg-white dark:bg-gray-800 border border-blue-400 dark:border-blue-300 rounded-full shadow-md flex items-center justify-center overflow-hidden">
              <img
                src="/images/smartxweb-logo.png"
                alt="SmartX Logo"
                title="Go to Home"
              />
            </div>
            <span className="text-2xl font-bold italic text-blue-700 dark:text-blue-300 tracking-wide">
              SmartX Tools
            </span>
          </Link>

          {/* Search Bar */}
          <input
            type="text"
            placeholder="Search tools..."
            className="hidden md:block px-3 py-1.5 rounded-md border dark:border-gray-600 bg-white dark:bg-gray-700 text-sm text-gray-800 dark:text-white outline-none focus:ring focus:ring-blue-400 dark:focus:ring-blue-600"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={handleSearch}
          />

          {/* Actions */}
          <div className="flex items-center gap-4">
            {/* Theme Toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-full bg-transparent hover:bg-gray-200 dark:hover:bg-gray-800 transition-all text-black dark:text-white"
              aria-label="Toggle theme"
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden text-blue-700 dark:text-blue-300"
            >
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex justify-center flex-wrap gap-5 pb-3 text-sm">
          {filteredLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `px-2 py-1 transition-all hover:underline ${
                  isActive
                    ? 'text-blue-700 dark:text-blue-300 font-semibold underline'
                    : 'text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        {/* Mobile Navigation */}
        {menuOpen && (
          <div className="md:hidden px-4 pb-4 space-y-2">
            <input
              type="text"
              placeholder="Search tools..."
              className="w-full px-3 py-2 mb-2 rounded-md border dark:border-gray-600 bg-white dark:bg-gray-700 text-sm text-gray-800 dark:text-white"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={handleSearch}
            />
            {filteredLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `block px-2 py-1 rounded-md ${
                    isActive
                      ? 'bg-blue-100 dark:bg-blue-900 font-semibold text-blue-800 dark:text-blue-300'
                      : 'text-gray-800 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-gray-800'
                  }`
                }
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </NavLink>
            ))}
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-1 px-4 py-6 md:px-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/compress-image" element={<CompressImage />} />
          <Route path="/merge-pdf" element={<MergePDF />} />
          <Route path="/file-converter" element={<FileConverter />} />
          <Route path="/bmi" element={<BMICalculator />} />
          <Route path="/age" element={<AgeCalculator />} />
          <Route path="/qr" element={<QRCodeGenerator />} />
          <Route path="/text-utils" element={<TextUtils />} />
          <Route path="/unit-converter" element={<UnitConverter />} />
          <Route path="/todo" element={<TodoList />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>

      {/* Footer */}
      <footer className="bg-white dark:bg-gray-800 text-center text-sm text-gray-500 dark:text-gray-400 py-4 border-t dark:border-gray-700 mt-auto">
        &copy; {new Date().getFullYear()} SmartX — All rights reserved.
      </footer>
    </div>
  );
};

export default App;
