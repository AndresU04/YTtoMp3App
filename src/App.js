import './App.css';
import React, { useState } from 'react';

function App() {
  const [url, setUrl] = useState("");

  const handleDownload = async () => {
    if (!url) {
      alert("Please enter a YouTube URL");
      return;
    }

    try {
      const response = await fetch(`http://localhost:4000/download?url=${encodeURIComponent(url)}`);
      
      if (!response.ok) {
        throw new Error("Server error during download");
      }

      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = downloadUrl;
      a.download = "audio.mp3";
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(downloadUrl);
    } catch (error) {
      console.error("Error during download:", error);
      alert("Failed to download the file. Check the console for details.");
    }
  };

  return (
    <div className="appPage">
      <div className="titleBox">
        <h1 className="appTitle">YouTube to MP3 Converter</h1>
      </div>
      <div className="inputBox">
        <label className="inputLabel">YouTube URL:</label>
        <input
          className="yturl"
          type="text"
          placeholder="Enter YouTube URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
      </div>
      <div className="buttonBox">
        <button className="convertButton" onClick={handleDownload}>
          Convert
        </button>
      </div>
    </div>
  );
}

export default App;

