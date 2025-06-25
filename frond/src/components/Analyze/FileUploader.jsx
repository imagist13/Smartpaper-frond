import React from 'react';
import { FaUpload, FaCheck } from 'react-icons/fa';

const FileUploader = ({ file, setFile, fileInputRef }) => {
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type === 'application/pdf') {
      setFile(selectedFile);
    } else if (selectedFile) {
      setFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      return { error: '请上传PDF格式的文件' };
    }
    return { error: null };
  };

  return (
    <div className="mb-8">
      <label
        htmlFor="file-upload"
        className={`flex flex-col items-center justify-center w-full h-56 border-2 border-dashed rounded cursor-pointer transition-colors ${
          file
            ? 'border-indigo-500 bg-indigo-50'
            : 'border-gray-300 hover:border-indigo-300 bg-gray-50 hover:bg-gray-100'
        }`}
      >
        <div className="flex flex-col items-center justify-center py-6">
          {file ? (
            <>
              <FaCheck className="w-10 h-10 mb-4 text-indigo-600" />
              <p className="mb-2 text-lg font-medium text-gray-700">
                {file.name}
              </p>
              <p className="text-sm text-gray-500">
                {(file.size / 1024 / 1024).toFixed(2)} MB
              </p>
              <button
                type="button"
                onClick={() => {
                  setFile(null);
                  if (fileInputRef.current) {
                    fileInputRef.current.value = '';
                  }
                }}
                className="mt-4 px-4 py-2 text-sm text-red-600 hover:text-red-800 hover:bg-red-50 rounded-md transition-colors"
              >
                移除文件
              </button>
            </>
          ) : (
            <>
              <FaUpload className="w-10 h-10 mb-4 text-gray-400" />
              <p className="mb-2 text-lg font-medium text-gray-700">
                点击或拖拽上传PDF文件
              </p>
              <p className="text-sm text-gray-500">
                支持PDF格式的学术论文，大小不超过20MB
              </p>
            </>
          )}
        </div>
        <input
          id="file-upload"
          type="file"
          accept="application/pdf"
          className="hidden"
          onChange={handleFileChange}
          ref={fileInputRef}
        />
      </label>
    </div>
  );
};

export default FileUploader; 