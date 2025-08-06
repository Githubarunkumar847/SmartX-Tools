import React, { useRef, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import { toPng } from 'html-to-image';
import { Copy } from 'lucide-react';

const templates = [
  { name: 'Quadratic Formula', latex: '$$x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}$$' },
  { name: 'Chemical Reaction', latex: '$$\\ce{2H2 + O2 -> 2H2O}$$' },
  { name: 'Integral', latex: '$$\\int_0^\\infty e^{-x} dx = 1$$' }
];

export default function LatexMarkdownViewer() {
  const [input, setInput] = useState('');
  const previewRef = useRef(null);

  const handleCopy = () => {
    navigator.clipboard.writeText(input);
  };

  const handleDownload = async () => {
    if (previewRef.current) {
      const dataUrl = await toPng(previewRef.current);
      const link = document.createElement('a');
      link.download = 'formula.png';
      link.href = dataUrl;
      link.click();
    }
  };

  const insertTemplate = (template) => {
    setInput((prev) => prev + '\n' + template);
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Markdown + LaTeX Viewer</h1>

      {/* Toolbar */}
      <div className="flex flex-wrap gap-2 mb-4">
        <button
          className="bg-blue-600 text-white px-3 py-1 rounded"
          onClick={handleCopy}
        >
          <Copy className="inline w-4 h-4 mr-1" /> Copy
        </button>
        <button
          className="bg-green-600 text-white px-3 py-1 rounded"
          onClick={handleDownload}
        >
          Download as PNG
        </button>

        {/* Templates */}
        <div className="flex gap-2 ml-auto">
          {templates.map((t, idx) => (
            <button
              key={idx}
              className="bg-gray-200 px-2 py-1 text-sm rounded hover:bg-gray-300"
              onClick={() => insertTemplate(t.latex)}
            >
              {t.name}
            </button>
          ))}
        </div>
      </div>

      {/* Input */}
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Write Markdown + LaTeX here..."
        rows={6}
        className="w-full p-3 border border-gray-300 rounded mb-4 font-mono"
      />

      {/* Output */}
      <div
        ref={previewRef}
        className="prose max-w-none p-4 border border-dashed border-gray-400 rounded bg-white"
      >
        <ReactMarkdown
          children={input}
          remarkPlugins={[remarkMath]}
          rehypePlugins={[rehypeKatex]}
        />
      </div>
    </div>
  );
}
