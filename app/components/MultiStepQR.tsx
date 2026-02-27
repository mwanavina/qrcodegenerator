'use client';
import { useState } from 'react';
import { QRCode } from 'react-qrcode-logo';

export default function MultiStepQR() {
  const [step, setStep] = useState(1);
  const [logo, setLogo] = useState<string | undefined>(undefined);
  const [link, setLink] = useState('');

  // Step 1: Handle Logo Upload
  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setLogo(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Final Step: Download Function
  const downloadQR = () => {
    const canvas = document.querySelector<HTMLCanvasElement>('#react-qrcode-logo');
    if (canvas) {
      const url = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.download = 'custom-qr.png';
      link.href = url;
      link.click();
    }
  };

  return (
    <>
        <div className="p-8 max-w-md mx-auto bg-white rounded-xl shadow-md">
        <div className='text-3xl font-bold text-gray-800 mb-8 border-b-2 border-blue-500 pb-2'>
        QRCode Generator
      </div>
      {/* STEP 1: LOGO UPLOAD */}
      {step === 1 && (
        <div className="flex flex-col gap-4">
          <h2 className="text-xl font-bold">Stage 1: Upload Logo</h2>
          <input type="file" accept="image/*" onChange={handleLogoUpload} />
          {logo && <img src={logo} alt="Preview" className="w-20 h-20 object-contain border" />}
          <button onClick={() => setStep(2)} className="bg-blue-600 text-white p-2 rounded">Next</button>
        </div>
      )}

      {/* STEP 2: INPUT LINK */}
      {step === 2 && (
        <div className="flex flex-col gap-4">
          <h2 className="text-xl font-bold">Stage 2: Enter Link</h2>
          <input 
            type="url" 
            placeholder="https://example.com" 
            className="border p-2" 
            value={link} 
            onChange={(e) => setLink(e.target.value)} 
          />
          <div className="flex gap-2">
            <button onClick={() => setStep(1)} className="bg-gray-400 text-white p-2 rounded">Back</button>
            <button onClick={() => setStep(3)} className="bg-blue-600 text-white p-2 rounded flex-1">Generate</button>
          </div>
        </div>
      )}

      {/* STEP 3: PREVIEW & DOWNLOAD */}
      {step === 3 && (
        <div className="flex flex-col items-center gap-4">
          <h2 className="text-xl font-bold">Final Stage: Your QR Code</h2>
          <QRCode 
            id="react-qrcode-logo"
            value={link}
            logoImage={logo}
            logoWidth={50}
            ecLevel="H" // High error correction to allow for logo overlay
            size={250}
          />
          <button onClick={downloadQR} className="bg-green-600 text-white p-2 rounded w-full">Download PNG</button>
          <button onClick={() => setStep(1)} className="text-blue-600 underline">Start Over</button>
        </div>
      )}
    </div>
    </>
  );
}
