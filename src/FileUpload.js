// FileUpload.js
import React, { useState } from "react";
import axios from "axios";

const FileUpload = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [isFileUploaded, setIsFileUploaded] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setSelectedFiles([...selectedFiles, ...e.target.files]);
  };

  const handleUpload = async () => {
    setLoading(true);
    const formData = new FormData();
    selectedFiles.forEach((file, index) => {
      formData.append(`files[]`, file);
    });
    try {
      await axios.post("http://localhost:5002/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setIsFileUploaded(true);
    } catch (error) {
      console.error("Error uploading files:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <h1 className="text-3xl font-bold mb-4 ">Pdf Bot</h1>
      <div className="p-4">
        <input type="file" onChange={handleFileChange} multiple className="file-input mb-4" />
        <button
          onClick={handleUpload}
          className="file-upload-btn bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          disabled={selectedFiles.length === 0 || loading}
        >
          {loading ? "Uploading..." : "Upload"}
        </button>
        {isFileUploaded && <p className="bot-msg mt-4 text-green-600">Files uploaded successfully!</p>}
        {loading && <div className="loader mt-4"></div>}
      </div>
    </div>
  );
};

export default FileUpload;
