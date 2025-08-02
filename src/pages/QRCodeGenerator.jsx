import { useState, useRef } from 'react';
import { QRCodeCanvas } from 'qrcode.react';

const QRCodeGenerator = () => {
  const [text, setText] = useState('');
  const [uploadedImage, setUploadedImage] = useState(null);
  const qrRef = useRef(null);

  const downloadQRCode = () => {
    const canvas = qrRef.current?.querySelector('canvas');
    if (!canvas) return;
    const url = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = url;
    link.download = 'qr-code.png';
    link.click();
  };

  const shareQRCode = async () => {
    const canvas = qrRef.current?.querySelector('canvas');
    if (!canvas) return;

    canvas.toBlob(async (blob) => {
      const file = new File([blob], 'qr-code.png', { type: 'image/png' });

      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        try {
          await navigator.share({
            files: [file],
            title: 'QR Code',
            text: 'Here is your QR code!',
          });
        } catch (err) {
          alert('Sharing failed: ' + err.message);
        }
      } else {
        alert('Sharing is not supported on this device/browser.');
      }
    });
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file || !file.type.startsWith('image/')) {
      alert('Please upload a valid image file.');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setUploadedImage(reader.result);
      setText(''); // reset text
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-md space-y-4">
      <h2 className="text-2xl font-bold text-center text-blue-700">QR Code Generator</h2>

      <input
        type="text"
        placeholder="Enter text or URL"
        value={text}
        onChange={(e) => {
          setText(e.target.value);
          setUploadedImage(null); // reset uploaded image if typing
        }}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <div className="text-center text-sm text-gray-500">OR</div>

      <div className="flex flex-col items-center space-y-2">
        <label className="cursor-pointer bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded border border-dashed border-gray-400">
          Upload QR Image
          <input
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            className="hidden"
          />
        </label>
      </div>

      <div
        ref={qrRef}
        className="flex justify-center items-center h-56 border rounded-md bg-gray-50 mt-4 overflow-hidden"
      >
        {text ? (
          <QRCodeCanvas value={text} size={200} />
        ) : uploadedImage ? (
          <img src={uploadedImage} alt="Uploaded QR" className="h-48 object-contain" />
        ) : (
          <p className="text-gray-400">Enter text or upload QR to preview</p>
        )}
      </div>

      {(text || uploadedImage) && (
        <div className="flex justify-center gap-4 mt-4">
          {text && (
            <>
              <button
                onClick={downloadQRCode}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Download
              </button>
              <button
                onClick={shareQRCode}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                Share
              </button>
            </>
          )}
          {uploadedImage && (
            <a
              href={uploadedImage}
              download="uploaded-qr.png"
              className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
            >
              Save Image
            </a>
          )}
        </div>
      )}
    </div>
  );
};

export default QRCodeGenerator;
