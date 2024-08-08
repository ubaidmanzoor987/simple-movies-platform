import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { DragDropIcon } from '@/assets/svgs';

interface FileDropzoneProps {
  onFileUpload: (file: File) => void;
  fileUrl?: string;
}

const FileDropzone: React.FC<FileDropzoneProps> = ({ onFileUpload, fileUrl }) => {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        onFileUpload(acceptedFiles[0]);
      }
    },
    [onFileUpload]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': [],
    },
    maxFiles: 1,
  });

  return (
    <div
      {...getRootProps()}
      className={`border-2 border-dashed rounded-2xl flex flex-col items-center justify-center cursor-pointer w-full bg-input h-[500px] ${
        isDragActive ? 'border-brand' : 'border-brand'
      }`}
    >
      <input {...getInputProps()} />
      {fileUrl ? (
        <img
          src={fileUrl}
          alt="Selected file"
          className="w-full h-full object-cover rounded-2xl"
        />
      ) : (
        <>
          <div className="mb-4">
            <DragDropIcon className="fill-none h-12 w-12" />
          </div>
          <p className="text-center text-sm text-muted-foreground">
            <span className="text-headingColor font-normal text-sm cursor-pointer">
              Drop an image here
            </span>
          </p>
        </>
      )}
    </div>
  );
};

export default FileDropzone;
