"use client";

import { useState } from "react";
import { QRCodeSVG } from "qrcode.react";

export default function QRCodeGenerator() {
    const [url, setUrl] = useState("");

    return (
    <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-2xl font-bold">QR Code Generator</h1>
        <input className="border-2 border-gray-300 rounded-md p-2" maxLength={200} required type="text" value={url} onChange={(e) => setUrl(e.target.value)} placeholder="Enter URL" />
        {url && <QRCodeSVG value={url} size={256} level={"H"} includeMargin={true} />}
    </div>
  );
}   