"use client"
import { QRCodeCanvas } from 'qrcode.react';
import { useState } from 'react';

export default function DownloadableQR () {
    const [url, setUrl] = useState('');
    const downloadQRCode = () => {
        const canvas = document.querySelector<HTMLCanvasElement>('#qr-code-canvas');
        if (!canvas) return;

        const pgnUrl = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");

        const downloadLink = document.createElement("a");
        downloadLink.href = pgnUrl;
        downloadLink.download = "qr-code.png";
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
    }
  return (
    
    <div className="flex flex-col items-center gap-4">
        <div>QR Code Generator</div>
        <input 
  type="url"
  value={url} 
  onChange={(e) => setUrl(e.target.value)} 
  placeholder="https://example.com"
  aria-label="URL for QR Code"
  className="w-full max-w-md p-3 border-2 border-gray-200 rounded-lg 
             focus:border-blue-500 focus:ring-2 focus:ring-blue-200 
             outline-none transition-all text-gray-800 shadow-sm"
/>

      {/* Must use QRCodeCanvas specifically for downloading */}
      {url && (
                <>
                    <QRCodeCanvas
                        id="qr-code-canvas"
                        value={url}
                        size={256}
                        level={"H"} 
                    />
                    <button 
                        onClick={downloadQRCode}
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                    >
                        Download PNG
                    </button>
                </>
            )}
    </div>
  )
}
