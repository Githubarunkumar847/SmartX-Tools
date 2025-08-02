import { useState } from "react";

export default function CompressImage() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [originalUrl, setOriginalUrl] = useState(null);
  const [compressedUrl, setCompressedUrl] = useState(null);
  const [originalSize, setOriginalSize] = useState(0);
  const [compressedSize, setCompressedSize] = useState(0);
  const [message, setMessage] = useState("");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setSelectedFile(file);
    setOriginalSize(file.size);
    setOriginalUrl(URL.createObjectURL(file));
    setCompressedUrl(null);
    setCompressedSize(0);
    setMessage("");
  };

  const handleCompress = () => {
    if (!selectedFile) return;

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();

    img.onload = () => {
      const scale = 0.5;
      canvas.width = img.width * scale;
      canvas.height = img.height * scale;
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      canvas.toBlob(
        (blob) => {
          if (!blob) return;

          // Only update if compressed size is smaller
          if (blob.size < selectedFile.size) {
            const url = URL.createObjectURL(blob);
            setCompressedUrl(url);
            setCompressedSize(blob.size);
            setMessage("");
          } else {
            setCompressedUrl(null);
            setCompressedSize(0);
            setMessage("Compression not effective. File size would increase.");
          }
        },
        "image/jpeg",
        0.7
      );
    };

    img.src = URL.createObjectURL(selectedFile);
  };

  const formatSize = (bytes) => (bytes / 1024).toFixed(2) + " KB";

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-700">Image Compressor</h1>

      <div className="mb-6 flex flex-col items-center gap-3">
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="block w-full border p-2 rounded-md"
        />
        <button
          onClick={handleCompress}
          disabled={!selectedFile}
          className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 transition disabled:opacity-50"
        >
          Compress Image
        </button>
      </div>

      {originalUrl && (
        <div className="grid md:grid-cols-2 gap-8 mt-8">
          <div className="text-center">
            <h2 className="text-lg font-semibold mb-2 text-gray-700">Original Image</h2>
            <img
              src={originalUrl}
              alt="Original"
              className="max-w-full max-h-80 mx-auto rounded shadow"
            />
            <p className="mt-2 text-sm text-gray-600">
              Size: <strong>{formatSize(originalSize)}</strong>
            </p>
          </div>

          <div className="text-center">
            <h2 className="text-lg font-semibold mb-2 text-gray-700">Compressed Image</h2>
            {compressedUrl ? (
              <>
                <img
                  src={compressedUrl}
                  alt="Compressed"
                  className="max-w-full max-h-80 mx-auto rounded shadow"
                />
                <p className="mt-2 text-sm text-gray-600">
                  Size: <strong>{formatSize(compressedSize)}</strong>
                </p>
                <a
                  href={compressedUrl}
                  download="compressed.jpg"
                  className="mt-3 inline-block bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                >
                  Download
                </a>
              </>
            ) : (
              <p className="text-red-500 font-medium">{message || "Click Compress to start."}</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
