// src/pages/Contact.jsx
import { Mail, Globe, User } from 'lucide-react';

export default function Contact() {
  return (
    <div className="max-w-3xl mx-auto p-6 sm:p-10 bg-white dark:bg-gray-900 rounded-2xl shadow-xl mt-10">
      <h2 className="text-3xl sm:text-4xl font-extrabold text-blue-600 mb-6">📬 Contact Us</h2>
      <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
        We'd love to hear your feedback, suggestions, or any issues you encounter while using the app.
      </p>

      <div className="space-y-5 text-gray-800 dark:text-gray-200 text-base">
        <div className="flex items-center gap-3">
          <Mail className="text-blue-500 w-5 h-5" />
          <span>
            <strong>Email:</strong>{' '}
            <a
              href="mailto:narasingam200@gmail.com"
              className="text-blue-600 hover:underline"
            >
              narasingam200@gmail.com
            </a>
          </span>
        </div>

        <div className="flex items-center gap-3">
          <Globe className="text-blue-500 w-5 h-5" />
          <span>
            <strong>Website:</strong>{' '}
            <a
              href="https://smartx-tools.web.app"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              smartx-tools.web.app
            </a>
            <span className="ml-1 text-sm text-gray-500">(under development)</span>
          </span>
        </div>

        <div className="flex items-center gap-3">
          <User className="text-blue-500 w-5 h-5" />
          <span>
            <strong>Owner:</strong> Arun Kumar J
          </span>
        </div>
      </div>
    </div>
  );
}
