import React from 'react';
import { FaUpload, FaCheck, FaFilePdf } from 'react-icons/fa';

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
    <div>
      <label
        htmlFor="file-upload"
        className={`flex flex-col items-center justify-center w-full h-36 sm:h-48 border-2 border-dashed rounded-lg cursor-pointer transition-all ${
          file
            ? 'border-indigo-500 bg-indigo-50'
            : 'border-gray-300 hover:border-indigo-300 bg-gray-50 hover:bg-gray-100'
        }`}
      >
        <div className="flex flex-col items-center justify-center px-3 py-4 sm:py-6">
          {file ? (
            <>
              <div className="mb-2 sm:mb-3 bg-indigo-100 p-2 sm:p-3 rounded-full">
                <FaFilePdf className="w-6 h-6 sm:w-8 sm:h-8 text-indigo-600" />
              </div>
              <p className="mb-1 sm:mb-2 text-sm sm:text-base font-medium text-gray-700 text-center">
                {file.name.length > 25 ? file.name.substring(0, 22) + '...' : file.name}
              </p>
              <p className="text-xs sm:text-sm text-gray-500 flex items-center">
                <FaCheck className="w-3 h-3 sm:w-4 sm:h-4 mr-1 text-green-500" />
                文件已选择 ({(file.size / 1024 / 1024).toFixed(2)} MB)
              </p>
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  setFile(null);
                  if (fileInputRef.current) {
                    fileInputRef.current.value = '';
                  }
                }}
                className="mt-2 sm:mt-4 px-3 sm:px-4 py-1 sm:py-1.5 text-xs sm:text-sm text-red-600 hover:text-red-800 hover:bg-red-50 rounded-md transition-colors border border-red-200"
              >
                移除文件
              </button>
            </>
          ) : (
            <>
              <div className="mb-2 sm:mb-3 bg-gray-200 p-2 sm:p-3 rounded-full">
                <FaUpload className="w-6 h-6 sm:w-8 sm:h-8 text-gray-500" />
              </div>
              <p className="mb-1 sm:mb-2 text-sm sm:text-base font-medium text-gray-700 text-center">
                点击或拖拽上传PDF
              </p>
              <p className="text-xs sm:text-sm text-gray-500 text-center">
                支持PDF格式文件，大小不超过20MB
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