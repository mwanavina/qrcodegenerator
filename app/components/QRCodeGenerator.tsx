"use client";

import { useState } from "react";
import { QRCodeSVG } from "qrcode.react";

export default function QRCodeGenerator() {
    const [url, setUrl] = useState("");

    return (
        <div>
      <h1>QR Code Generator</h1>
      <input
        type="text"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="Enter URL"
      />
      {url && (
        <div style={{ marginTop: '20px' }}>
          <QRCodeSVG value={url} size={256} level={"H"} includeMargin={true} />
        </div>
      )}
    </div>
  );
}   