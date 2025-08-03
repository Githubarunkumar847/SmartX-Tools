// src/pages/Contact.jsx
import { Mail, Globe, User, Star } from 'lucide-react';
import { useState } from 'react';
import emailjs from 'emailjs-com';
import { useNavigate } from 'react-router-dom';

export default function Contact() {
  const [showFeedback, setShowFeedback] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '', rating: 0 });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleRating = (value) => {
    setFormData(prev => ({ ...prev, rating: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    emailjs.send(
      'SmartXTools',
      'template_710a8do',
      {
        from_name: formData.name,
        reply_to: formData.email,
        message: formData.message,
        rating: formData.rating
      },
      'IUKCDDPkg0A77En1k'
    ).then(() => {
      navigate('/thankyou');
    }).catch((err) => {
      alert('Failed to send. Try again.');
      console.error(err);
    });
  };

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
            <a href="mailto:narasingam200@gmail.com" className="text-blue-600 hover:underline">
              narasingam200@gmail.com
            </a>
          </span>
        </div>

        <div className="flex items-center gap-3">
          <Globe className="text-blue-500 w-5 h-5" />
          <span>
            <strong>Website:</strong>{' '}
            <a href="https://smartx-tools.netlify.app" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
              smartx-tools.netlify.app
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

      <button
        className="mt-8 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        onClick={() => setShowFeedback(!showFeedback)}
      >
        {showFeedback ? 'Hide Feedback Form' : 'Send Feedback'}
      </button>

      {showFeedback && (
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <input
            name="name"
            type="text"
            required
            placeholder="Your Name"
            className="w-full p-2 border rounded dark:bg-gray-800 dark:text-white"
            onChange={handleInputChange}
          />
          <input
            name="email"
            type="email"
            required
            placeholder="Your Email"
            className="w-full p-2 border rounded dark:bg-gray-800 dark:text-white"
            onChange={handleInputChange}
          />
          <textarea
            name="message"
            required
            placeholder="Your Message"
            rows="4"
            className="w-full p-2 border rounded dark:bg-gray-800 dark:text-white"
            onChange={handleInputChange}
          ></textarea>
          
          <div className="flex items-center gap-1">
            <span className="mr-2">Rating:</span>
            {[1, 2, 3, 4, 5].map((num) => (
              <Star
                key={num}
                className={`w-5 h-5 cursor-pointer ${formData.rating >= num ? 'text-yellow-500' : 'text-gray-400'}`}
                onClick={() => handleRating(num)}
              />
            ))}
          </div>

          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
          >
            Submit Feedback
          </button>
        </form>
      )}
    </div>
  );
}
