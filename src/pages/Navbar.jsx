import { useState, useEffect } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { Menu, X, Moon, Sun } from 'lucide-react';

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
  { to: '/periodictable', label: 'PeriodicTable'},
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem('theme') === 'dark');
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
    localStorage.setItem('theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  const handleSearch = (e) => {
    if (e.key === 'Enter') {
      const match = navLinks.find((link) =>
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
    ? navLinks.filter((link) =>
        link.label.toLowerCase().includes(search.toLowerCase())
      )
    : navLinks;

  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-gray-800 shadow-md">
      <div className="max-w-screen-xl mx-auto flex items-center justify-between p-4 sm:px-6 lg:px-8 flex-wrap gap-3">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-4 group hover:scale-105 transition-transform w-full sm:w-auto justify-center sm:justify-start"
        >
          <div className="w-32 h-14 bg-white dark:bg-gray-800 border border-blue-400 dark:border-blue-300 rounded-full shadow-md flex items-center justify-center overflow-hidden">
            <img
              src="/images/smartxweb-logo.png"
              alt="SmartX Logo"
              className="object-contain h-full"
            />
          </div>
          <span className="text-xl sm:text-2xl font-bold italic text-blue-700 dark:text-blue-300 tracking-wide">
            SmartX Tools
          </span>
        </Link>

        {/* Search and Controls */}
        <div className="flex items-center gap-3 flex-wrap w-full sm:w-auto justify-center sm:justify-end">
          <input
            type="text"
            placeholder="Search tools..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={handleSearch}
            className="px-3 py-1.5 rounded-md border dark:border-gray-600 bg-white dark:bg-gray-700 text-sm text-gray-800 dark:text-white outline-none focus:ring focus:ring-blue-400 dark:focus:ring-blue-600 w-full sm:w-64"
          />
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-full bg-transparent hover:bg-gray-200 dark:hover:bg-gray-800 transition-all text-black dark:text-white"
            aria-label="Toggle theme"
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="sm:hidden text-blue-700 dark:text-blue-300"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Desktop Nav */}
      <nav className="hidden sm:flex justify-center flex-wrap gap-5 pb-3 text-sm">
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

      {/* Mobile Nav */}
      {menuOpen && (
        <div className="sm:hidden px-4 pb-4 space-y-2">
          {filteredLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                `block px-2 py-1 rounded-md ${
                  isActive
                    ? 'bg-blue-100 dark:bg-blue-900 font-semibold text-blue-800 dark:text-blue-300'
                    : 'text-gray-800 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-gray-800'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>
      )}
    </header>
  );
}
