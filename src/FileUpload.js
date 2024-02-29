import React, { useState, useCallback } from "react";
import axios from "axios";
import { useDropzone } from "react-dropzone";

const FileUpload = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [isFileUploaded, setIsFileUploaded] = useState(false);
  const [loading, setLoading] = useState(false);

  const onDrop = useCallback((acceptedFiles) => {
    setSelectedFiles([...selectedFiles, ...acceptedFiles]);
  }, [selectedFiles]);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "application/pdf", // accept only PDF files
    multiple: true,
  });

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
      <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 inline-block text-transparent bg-clip-text">Pdf Bot </h1>
      <div className="p-4">
        <div {...getRootProps()} className="dropzone mb-4 border-2 border-dashed border-gray-400 rounded-md p-8 text-center">
          <input {...getInputProps()} />
          <p className="text-gray-600">Drag 'n' drop some PDF files here, or click to select files</p>
        </div>
        <div className="file-info">
          <p className="text-lg font-semibold mb-2">Files Added:</p>
          {selectedFiles.map((file, index) => (
            <p key={index} className="text-gray-800">{file.name}</p>
          ))}
          {selectedFiles.length === 0 && <p className="text-gray-600">No files added yet</p>}
        </div>
        <button
          onClick={handleUpload}
          className="file-upload-btn bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded mt-4"
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
