'use client';
import { useState } from 'react';
import { QRCode } from 'react-qrcode-logo';

export default function KwendaQR() {
  const [step, setStep] = useState(1);
//   const [logo, setLogo] = useState<string | undefined>(undefined);
  const [link, setLink] = useState('');
   
  const logo = "/vercel.svg";
  // Download Function
  const downloadQR = () => {
    const canvas = document.querySelector<HTMLCanvasElement>('#react-qrcode-logo');
    if (canvas) {
      const url = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.download = 'kwenda-event-qrcode.png';
      link.href = url;
      link.click();
    }
  };

  return (
    <>
        <div className="p-8 max-w-md mx-auto bg-white rounded-xl shadow-md">
        <div className='text-3xl font-bold text-gray-800 mb-8 border-b-2 border-blue-500 pb-2'>
        Kwenda QRCode Generator
      </div>

      {step === 1 && (
        <div className="flex flex-col gap-4">
          <h2 className="text-xl font-bold">Enter Link</h2>
          <input 
            type="url" 
            placeholder="https://example.com" 
            className="border p-2" 
            value={link} 
            onChange={(e) => setLink(e.target.value)} 
          />
          <div className="flex gap-2">
            <button onClick={() => setStep(3)} className="bg-blue-600 text-white p-2 rounded flex-1">Generate</button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="flex flex-col items-center gap-4">
          <h2 className="text-xl font-bold text-green-600">QR Code generated successfully</h2>
          <QRCode 
            id="react-qrcode-logo"
            value={link}
            logoImage={logo}
            logoWidth={50}
            ecLevel="H" 
            size={250}
          />
          <button onClick={downloadQR} className="bg-green-600 text-white p-2 rounded w-full">Download QRCode</button>
          <button onClick={() => setStep(1)} className="text-blue-600 underline">Start Over</button>
        </div>
      )}
    </div>
    </>
  );
}
