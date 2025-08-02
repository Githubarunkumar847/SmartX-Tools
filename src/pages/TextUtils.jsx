import { useState } from 'react';
import {
  Copy,
  Trash2,
  Text,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';

const TextUtils = () => {
  const [text, setText] = useState('');
  const [copied, setCopied] = useState(false);
  const [showPreview, setShowPreview] = useState(true);

  const handleTextChange = (e) => setText(e.target.value);

  const toUpperCase = () => setText(text.toUpperCase());

  const toLowerCase = () => setText(text.toLowerCase());

  const clearText = () => {
    setText('');
    toast('Text cleared');
  };

  const copyText = () => {
    if (!text.trim()) return toast('Nothing to copy!', true);
    navigator.clipboard.writeText(text);
    setCopied(true);
    toast('Copied to clipboard!');
    setTimeout(() => setCopied(false), 1500);
  };

  const removeExtraSpaces = () => {
    const cleaned = text.replace(/\s+/g, ' ').trim();
    setText(cleaned);
    toast('Extra spaces removed');
  };

  const toast = (msg, isError = false) => {
    const toast = document.createElement('div');
    toast.textContent = msg;
    toast.className = `fixed bottom-5 left-1/2 transform -translate-x-1/2 px-4 py-2 text-sm rounded shadow-lg z-50 transition-all duration-300
      ${isError ? 'bg-red-500 text-white' : 'bg-green-600 text-white'}`;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 2500);
  };

  const wordCount = text.trim() === '' ? 0 : text.trim().split(/\s+/).length;
  const charCount = text.length;
  const sentenceCount = text.trim().split(/[.!?]+/).filter(Boolean).length;
  const paragraphCount = text.trim().split(/\n+/).filter(p => p.trim()).length;
  const readingTime = (wordCount / 200).toFixed(2); // avg 200 WPM

  return (
    <div className="min-h-screen px-4 py-6 transition-all duration-300 bg-white text-black dark:bg-gray-900 dark:text-white">
      <div className="max-w-3xl mx-auto rounded-xl shadow-xl border p-6 space-y-6 bg-opacity-30 backdrop-blur-md dark:border-gray-700">
        
        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Text size={20} /> Text Utilities
          </h1>
        </div>

        {/* Text Area */}
        <textarea
          rows={8}
          value={text}
          onChange={handleTextChange}
          className="w-full p-4 border rounded-lg resize-none transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-100 text-black dark:bg-gray-800 dark:text-white dark:border-gray-700"
          placeholder="Type or paste your text here..."
        />

        {/* Buttons */}
        <div className="flex flex-wrap justify-center gap-3">
          <Button onClick={toUpperCase} label="UPPERCASE" />
          <Button onClick={toLowerCase} label="lowercase" />
          <Button onClick={removeExtraSpaces} label="Remove Spaces" />
          <Button onClick={copyText} label={copied ? 'Copied!' : 'Copy'} icon={<Copy size={16} />} />
          <Button onClick={clearText} label="Clear" icon={<Trash2 size={16} />} />
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-3 text-center text-sm gap-2 pt-3">
          <Stat label="Words" value={wordCount} />
          <Stat label="Characters" value={charCount} />
          <Stat label="Sentences" value={sentenceCount} />
          <Stat label="Paragraphs" value={paragraphCount} />
          <Stat label="Reading Time" value={`${readingTime} min`} />
        </div>

        {/* Preview Toggle */}
        <div className="flex justify-between items-center pt-3">
          <h3 className="text-lg font-semibold">Live Preview</h3>
          <button
            className="text-blue-500 hover:underline flex items-center text-sm"
            onClick={() => setShowPreview(!showPreview)}
          >
            {showPreview ? 'Hide Preview' : 'Show Preview'}
            {showPreview ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>
        </div>

        {/* Preview Box */}
        {showPreview && (
          <div className="whitespace-pre-wrap break-words p-4 rounded-lg text-sm border transition-all duration-300 bg-gray-100 text-black dark:bg-gray-800 dark:text-white dark:border-gray-700">
            {text.trim() || 'Nothing to preview...'}
          </div>
        )}
      </div>
    </div>
  );
};

const Button = ({ onClick, label, icon }) => (
  <button
    onClick={onClick}
    className="flex items-center gap-1 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-all text-sm"
  >
    {icon} {label}
  </button>
);

const Stat = ({ label, value }) => (
  <div>
    <div className="font-bold">{value}</div>
    <div className="text-xs opacity-80">{label}</div>
  </div>
);

export default TextUtils;
