import { useState } from "react";
import { saveAs } from "file-saver";
import * as docx from "docx-preview";

export default function FileConverter() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageType, setImageType] = useState("png");
  const [convertedImage, setConvertedImage] = useState(null);
  const [originalSize, setOriginalSize] = useState(0);
  const [convertedSize, setConvertedSize] = useState(0);
  const [isImageLoading, setIsImageLoading] = useState(false);

  const [docFile, setDocFile] = useState(null);
  const [docError, setDocError] = useState("");
  const [isDocLoading, setIsDocLoading] = useState(false);

  const formatSize = (bytes) => (bytes / 1024).toFixed(2) + " KB";

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
    setIsImageLoading(true);

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
            setIsImageLoading(false);
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
    setIsDocLoading(true);

    const reader = new FileReader();
    reader.onload = async (e) => {
      const container = document.createElement("div");
      await docx.renderAsync(e.target.result, container);
      const newWindow = window.open();
      newWindow.document.write(container.innerHTML);
      newWindow.print();
      setIsDocLoading(false);
    };
    reader.readAsArrayBuffer(docFile);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 text-gray-800 dark:text-gray-200">
      <h1 className="text-3xl sm:text-4xl font-extrabold text-center mb-12 text-blue-700 dark:text-blue-400">
        File Converter
      </h1>

      {/* IMAGE CONVERTER */}
      <div className="mb-16 p-6 sm:p-8 rounded-2xl shadow-md bg-white dark:bg-gray-900 border dark:border-gray-700 transition">
        <h2 className="text-2xl font-semibold mb-6">🖼 JPG ↔ PNG Converter</h2>

        <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full sm:w-auto px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-800 text-sm text-gray-900 dark:text-white"
          />
          <div className="flex items-center gap-2">
            <label className="font-medium">Convert to:</label>
            <select
              value={imageType}
              onChange={(e) => setImageType(e.target.value)}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-800 text-sm text-gray-900 dark:text-white"
            >
              <option value="png">PNG</option>
              <option value="jpeg">JPG</option>
            </select>
          </div>
        </div>

        <button
          onClick={convertImage}
          disabled={!selectedImage || isImageLoading}
          className="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-6 py-2 rounded-md disabled:opacity-50 transition"
        >
          {isImageLoading ? "Converting..." : "Convert Image"}
        </button>

        {isImageLoading && (
          <div className="flex justify-center mt-6">
            <div className="animate-spin h-10 w-10 border-4 border-blue-500 border-t-transparent rounded-full"></div>
          </div>
        )}

        {convertedImage && !isImageLoading && (
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="text-center">
              <h3 className="text-lg font-medium mb-2">Original Image</h3>
              <img
                src={URL.createObjectURL(selectedImage)}
                alt="Original"
                className="rounded-xl shadow max-w-full max-h-80 mx-auto object-contain"
              />
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                Size: <strong>{formatSize(originalSize)}</strong>
              </p>
            </div>
            <div className="text-center">
              <h3 className="text-lg font-medium mb-2">Converted Image</h3>
              <img
                src={convertedImage}
                alt="Converted"
                className="rounded-xl shadow max-w-full max-h-80 mx-auto object-contain"
              />
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                Size: <strong>{formatSize(convertedSize)}</strong>
              </p>
              <button
                onClick={downloadImage}
                className="mt-4 bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md transition"
              >
                Download
              </button>
            </div>
          </div>
        )}
      </div>

      {/* DOCX TO PDF CONVERTER */}
      <div className="p-6 sm:p-8 rounded-2xl shadow-md bg-white dark:bg-gray-900 border dark:border-gray-700">
        <h2 className="text-2xl font-semibold mb-6">📄 DOCX → PDF Converter</h2>

        <input
          type="file"
          accept=".docx"
          onChange={handleDocChange}
          className="block w-full sm:w-auto px-4 py-2 mb-4 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-800 text-sm text-gray-900 dark:text-white"
        />

        {docError && (
          <p className="text-red-600 text-sm mb-2">{docError}</p>
        )}

        <button
          onClick={convertDocxToPdf}
          disabled={!docFile || isDocLoading}
          className="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-6 py-2 rounded-md disabled:opacity-50 transition"
        >
          {isDocLoading ? "Converting..." : "Convert to PDF"}
        </button>

        {isDocLoading && (
          <div className="flex justify-center mt-6">
            <div className="animate-spin h-10 w-10 border-4 border-blue-500 border-t-transparent rounded-full"></div>
          </div>
        )}

        <p className="text-sm mt-3 text-gray-600 dark:text-gray-400">
          A print dialog will open. Select <strong>“Save as PDF”</strong> to download the file.
        </p>
      </div>
    </div>
  );
}
