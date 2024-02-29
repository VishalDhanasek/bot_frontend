// App.js
import React from 'react';
import QuestionComponent from './QuestionComponent';
import PDFUploadComponent from './PDFUploadComponent';
import FileUpload from './FileUpload';

const App = () => {
  return (
    <div className="flex">
      <div className="w-1/4 bg-gray-200">
        <FileUpload />
      </div>
      <div className="w-3/4 bg-gray-100">
        <QuestionComponent />
      </div>
    </div>
  );
};

export default App;
