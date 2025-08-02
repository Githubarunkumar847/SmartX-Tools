import { useState } from "react";
import { saveAs } from "file-saver";
import * as docx from "docx-preview";

export default function FileConverter() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageType, setImageType] = useState("png");
  const [convertedImage, setConvertedImage] = useState(null);
  const [originalSize, setOriginalSize] = useState(0);
  const [convertedSize, setConvertedSize] = useState(0);

  const [docFile, setDocFile] = useState(null);
  const [docError, setDocError] = useState("");

  const formatSize = (bytes) => (bytes / 1024).toFixed(2) + " KB";

  // === IMAGE CONVERTER ===
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setSelectedImage(file);
    setOriginalSize(file.size);
    setConvertedImage(null);
    setConvertedSize(0);
  };

  const convertImage = () => {
    if (!selectedImage) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);

        canvas.toBlob(
          (blob) => {
            if (!blob) return;

            if (blob.size <= selectedImage.size) {
              const url = URL.createObjectURL(blob);
              setConvertedImage(url);
              setConvertedSize(blob.size);
            } else {
              setConvertedImage(null);
              setConvertedSize(0);
              alert("Compression ineffective: Converted file is larger.");
            }
          },
          `image/${imageType}`,
          0.9
        );
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(selectedImage);
  };

  const downloadImage = () => {
    saveAs(convertedImage, `converted.${imageType}`);
  };

  // === DOCX to PDF Preview via browser print ===
  const handleDocChange = (e) => {
    const file = e.target.files[0];
    setDocError("");
    if (file && file.name.endsWith(".docx")) {
      setDocFile(file);
    } else {
      setDocError("Please upload a valid .docx file.");
    }
  };

  const convertDocxToPdf = () => {
    if (!docFile) return;

    const reader = new FileReader();
    reader.onload = async (e) => {
      const container = document.createElement("div");
      await docx.renderAsync(e.target.result, container);
      const newWindow = window.open();
      newWindow.document.write(container.innerHTML);
      newWindow.print();
    };
    reader.readAsArrayBuffer(docFile);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-center mb-10 text-blue-700">File Converter</h1>

      {/* === IMAGE CONVERTER === */}
      <div className="mb-12 p-6 rounded-lg shadow bg-white dark:bg-gray-800">
        <h2 className="text-xl font-semibold mb-4">JPG ↔ PNG Converter</h2>
        <input type="file" accept="image/*" onChange={handleImageChange} className="mb-4" />
        <div className="mb-4">
          <label className="mr-2 font-medium">Convert to:</label>
          <select
            value={imageType}
            onChange={(e) => setImageType(e.target.value)}
            className="p-2 border rounded"
          >
            <option value="png">PNG</option>
            <option value="jpeg">JPG</option>
          </select>
        </div>
        <button
          onClick={convertImage}
          disabled={!selectedImage}
          className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 disabled:opacity-50"
        >
          Convert Image
        </button>

        {convertedImage && (
          <div className="mt-6 grid md:grid-cols-2 gap-6 items-start">
            <div className="text-center">
              <h3 className="text-md font-semibold mb-2">Original Image</h3>
              <img
                src={URL.createObjectURL(selectedImage)}
                alt="Original"
                className="rounded shadow max-w-full max-h-80 mx-auto"
              />
              <p className="text-sm text-gray-600 mt-2">
                Size: <strong>{formatSize(originalSize)}</strong>
              </p>
            </div>
            <div className="text-center">
              <h3 className="text-md font-semibold mb-2">Converted Image</h3>
              <img
                src={convertedImage}
                alt="Converted"
                className="rounded shadow max-w-full max-h-80 mx-auto"
              />
              <p className="text-sm text-gray-600 mt-2">
                Size: <strong>{formatSize(convertedSize)}</strong>
              </p>
              <button
                onClick={downloadImage}
                className="mt-3 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              >
                Download
              </button>
            </div>
          </div>
        )}
      </div>

      {/* === DOCX TO PDF === */}
      <div className="p-6 rounded-lg shadow bg-white dark:bg-gray-800">
        <h2 className="text-xl font-semibold mb-4">DOCX → PDF Converter</h2>
        <input type="file" accept=".docx" onChange={handleDocChange} />
        {docError && <p className="text-red-600 mt-2">{docError}</p>}
        <button
          onClick={convertDocxToPdf}
          disabled={!docFile}
          className="mt-4 bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 disabled:opacity-50"
        >
          Convert to PDF
        </button>
        <p className="text-sm mt-2 text-gray-500">It will open a print view — choose "Save as PDF".</p>
      </div>
    </div>
  );
}
