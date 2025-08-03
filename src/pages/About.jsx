import React from 'react';
import { FaToolbox, FaMobileAlt, FaLock, FaRocket } from 'react-icons/fa';
import { motion } from 'framer-motion';

export default function About() {
  return (
    <div className="min-h-screen px-4 py-16 flex items-center justify-center">
      <motion.div
        className="bg-white dark:bg-gray-900 rounded-3xl shadow-2xl p-10 max-w-4xl w-full text-center"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-4xl sm:text-5xl font-extrabold text-blue-600 dark:text-blue-400 mb-6">
          About <span className="text-gray-900 dark:text-white">SmartX Tools</span>
        </h2>

        <p className="mb-6 text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
          <strong>SmartX Tools</strong> is your all-in-one digital Swiss Army knife. Whether you need to convert files, calculate BMI, generate QR codes, or merge PDFs — we've got you covered, all in a lightweight and clutter-free web app.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8 text-left text-gray-800 dark:text-gray-200">
          <div className="flex items-start gap-4">
            <FaToolbox className="text-2xl text-blue-500" />
            <div>
              <h3 className="text-lg font-semibold">Multi-Utility Toolkit</h3>
              <p className="text-sm">File converters, calculators, and everyday productivity tools — in one place.</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <FaMobileAlt className="text-2xl text-green-500" />
            <div>
              <h3 className="text-lg font-semibold">Mobile-First Design</h3>
              <p className="text-sm">Fully responsive UI for seamless experience across phones, tablets, and desktops.</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <FaLock className="text-2xl text-purple-500" />
            <div>
              <h3 className="text-lg font-semibold">No Signup Needed</h3>
              <p className="text-sm">Enjoy instant access to all tools — no account or login required.</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <FaRocket className="text-2xl text-red-500" />
            <div>
              <h3 className="text-lg font-semibold">Fast & Lightweight</h3>
              <p className="text-sm">Built for speed and simplicity using modern frontend tools.</p>
            </div>
          </div>
        </div>

        <p className="text-sm text-gray-500 dark:text-gray-400 mt-10">
          Version <span className="font-semibold">1.0.0</span> — Made with ❤️ in India 🇮🇳
        </p>
      </motion.div>
    </div>
  );
}
