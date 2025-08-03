import { useState } from "react";

export default function CompressImage() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [originalUrl, setOriginalUrl] = useState(null);
  const [compressedUrl, setCompressedUrl] = useState(null);
  const [originalSize, setOriginalSize] = useState(0);
  const [compressedSize, setCompressedSize] = useState(0);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

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

    setLoading(true);
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
          setLoading(false);
          if (!blob) return;

          if (blob.size < selectedFile.size) {
            const url = URL.createObjectURL(blob);
            setCompressedUrl(url);
            setCompressedSize(blob.size);
            setMessage("");
          } else {
            setCompressedUrl(null);
            setCompressedSize(0);
            setMessage("⚠️ Compression not effective. File size would increase.");
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
    <div className="max-w-5xl mx-auto px-4 py-10 bg-white dark:bg-gray-900 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-700 dark:text-blue-400">
        Image Compressor
      </h1>

      <div className="flex flex-col sm:flex-row sm:items-center gap-4 justify-center mb-6">
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="w-full sm:w-auto border dark:border-gray-700 p-2 rounded-md bg-gray-100 dark:bg-gray-800 dark:text-white"
        />
        <button
          onClick={handleCompress}
          disabled={!selectedFile || loading}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2 rounded transition disabled:opacity-50"
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              Compressing...
            </span>
          ) : (
            "Compress Image"
          )}
        </button>
      </div>

      {originalUrl && (
        <div className="grid gap-8 mt-8 md:grid-cols-2">
          <div className="text-center">
            <h2 className="text-lg font-semibold mb-2 text-gray-700 dark:text-gray-300">
              Original Image
            </h2>
            <img
              src={originalUrl}
              alt="Original"
              className="max-w-full max-h-80 mx-auto rounded shadow"
            />
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              Size: <strong>{formatSize(originalSize)}</strong>
            </p>
          </div>

          <div className="text-center">
            <h2 className="text-lg font-semibold mb-2 text-gray-700 dark:text-gray-300">
              Compressed Image
            </h2>
            {compressedUrl ? (
              <>
                <img
                  src={compressedUrl}
                  alt="Compressed"
                  className="max-w-full max-h-80 mx-auto rounded shadow"
                />
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                  Size: <strong>{formatSize(compressedSize)}</strong>
                </p>
                <a
                  href={compressedUrl}
                  download="compressed.jpg"
                  className="mt-4 inline-block bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
                >
                  Download
                </a>
              </>
            ) : (
              <p className="text-red-600 dark:text-red-400 font-medium mt-4">{message}</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
