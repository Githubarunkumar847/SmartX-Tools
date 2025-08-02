import React, { useState, useCallback } from "react";
import { PDFDocument } from "pdf-lib";
import { useDropzone } from "react-dropzone";
import Sortable from "sortablejs";

export default function MergePDF() {
  const [pdfFiles, setPdfFiles] = useState([]);
  const [mergedPdfUrl, setMergedPdfUrl] = useState(null);

  const onDrop = useCallback((acceptedFiles) => {
    const pdfOnly = acceptedFiles.filter(file => file.type === "application/pdf");
    setPdfFiles((prev) => [...prev, ...pdfOnly]);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const handleFileInput = (e) => {
    const files = Array.from(e.target.files);
    const pdfOnly = files.filter(file => file.type === "application/pdf");
    setPdfFiles((prev) => [...prev, ...pdfOnly]);
  };

  const handleMerge = async () => {
    const mergedPdf = await PDFDocument.create();

    for (const file of pdfFiles) {
      const bytes = await file.arrayBuffer();
      const pdf = await PDFDocument.load(bytes, { ignoreEncryption: true });
      const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
      copiedPages.forEach((page) => mergedPdf.addPage(page));
    }

    // Compress output (optimize)
    const pdfBytes = await mergedPdf.save({ useObjectStreams: false });

    const blob = new Blob([pdfBytes], { type: "application/pdf" });
    const url = URL.createObjectURL(blob);
    setMergedPdfUrl(url);
  };

  const reorderFiles = (evt) => {
    const newOrder = [...pdfFiles];
    const [moved] = newOrder.splice(evt.oldIndex, 1);
    newOrder.splice(evt.newIndex, 0, moved);
    setPdfFiles(newOrder);
  };

  const fileListRef = useCallback((node) => {
    if (node) {
      Sortable.create(node, {
        animation: 150,
        onEnd: reorderFiles,
      });
    }
  }, [pdfFiles]);

  const formatSize = (bytes) => {
    const kb = bytes / 1024;
    return `${kb.toFixed(2)} KB`;
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Merge PDF Files</h2>

      {/* Dropzone */}
      <div
        {...getRootProps()}
        className="border-dashed border-2 border-gray-400 p-6 rounded cursor-pointer text-center mb-4"
      >
        <input {...getInputProps()} />
        <p className="text-gray-500">Drag & drop PDFs here, or click to select files</p>
      </div>

      {/* Manual Upload */}
      <div className="mb-4">
        <label className="text-gray-700 font-semibold">Or choose manually:</label>
        <input
          type="file"
          accept="application/pdf"
          multiple
          onChange={handleFileInput}
          className="block mt-2"
        />
      </div>

      {/* Uploaded Files List */}
      {pdfFiles.length > 0 && (
        <div className="mb-4">
          <h4 className="font-semibold mb-2">Uploaded PDFs (drag to reorder):</h4>
          <ul ref={fileListRef} className="space-y-2">
            {pdfFiles.map((file, index) => (
              <li
                key={index}
                className="bg-white p-2 rounded shadow flex justify-between items-center cursor-move"
              >
                <span>{file.name}</span>
                <span className="text-sm text-gray-600">{formatSize(file.size)}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Merge Button */}
      <button
        onClick={handleMerge}
        disabled={pdfFiles.length < 2}
        className={`mt-4 px-6 py-2 rounded text-white ${
          pdfFiles.length < 2 ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        Merge PDFs
      </button>

      {/* Download Link */}
      {mergedPdfUrl && (
        <div className="mt-6">
          <a
            href={mergedPdfUrl}
            download="merged.pdf"
            className="text-blue-600 underline"
          >
            Download Merged PDF
          </a>
        </div>
      )}
    </div>
  );
}
