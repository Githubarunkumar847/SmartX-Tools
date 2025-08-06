import { useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Navbar from './pages/Navbar';
import NotFound from './pages/NotFound';
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
  ThankYou,
  LatexRenderer,
} from './pages';
import { label } from 'framer-motion/client';
import PeriodicTable from './pages/PeriodicTable';

const App = () => {
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem('theme') === 'dark');
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/compress-image', label: 'Compress Image' },
    { to: '/merge-pdf', label: 'Merge PDF' },
    { to: '/file-converter', label: 'File Converter' },
    { to: '/bmi', label: 'BMI Calculator' },
    { to: '/age', label: 'Age Calculator' },
    { to: '/qr', label: 'QR Code Generator' },
    { to: '/text-utils', label: 'Text Utilities' },
    { to: '/unit-converter', label: 'Unit Converter' },
    { to: '/periodictable', label: 'PeriodicTable' },
    { to: '/latex', label: 'Latex Renderer' },
    { to: '/todo', label: 'To-Do List' },
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
        setSearch('');
      } else {
        alert('No matching tool found');
      }
    }
  };

  return (
    <div className="flex flex-col min-h-[100vh] bg-gray-50 text-gray-800 dark:bg-gray-900 dark:text-white transition-colors duration-300">
      <Navbar
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        search={search}
        setSearch={setSearch}
        handleSearch={handleSearch}
        navLinks={navLinks}
      />

      <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8 max-w-screen-xl mx-auto w-full">
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
          <Route path="/thankyou" element={<ThankYou />} />
          <Route path="/periodictable" element={<PeriodicTable />}/>
          <Route path="/latex" element={<LatexRenderer />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <footer className="bg-white dark:bg-gray-800 text-center text-sm text-gray-500 dark:text-gray-400 py-4 border-t dark:border-gray-700 mt-auto">
        &copy; {new Date().getFullYear()} SmartX — All rights reserved.
      </footer>
    </div>
  );
};

export default App;
