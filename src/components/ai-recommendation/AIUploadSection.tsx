import React, { useState, useCallback } from 'react';
import { UploadCloud, Image, X, ArrowRight } from 'lucide-react';
import { useDropzone } from 'react-dropzone';
import { HTMLAttributes, InputHTMLAttributes } from 'react';

const AIUploadSection = ({ onUploadComplete }: { onUploadComplete: (frontImage: string, backImage: string) => void }) => {
  const [frontImage, setFrontImage] = useState<string | null>(null);
  const [backImage, setBackImage] = useState<string | null>(null);

  const onDrop = useCallback((acceptedFiles: File[], type: 'front' | 'back') => {
    const file = acceptedFiles[0];
    const reader = new FileReader();
    reader.onload = () => {
      if (type === 'front') {
        setFrontImage(reader.result as string);
      } else {
        setBackImage(reader.result as string);
      }
    };
    reader.readAsDataURL(file);
  }, []);

  const { getRootProps: getFrontRootProps, getInputProps: getFrontInputProps } = useDropzone({
    onDrop: (files) => onDrop(files, 'front'),
    accept: { 'image/*': ['.jpeg', '.png'] }
  });

  const { getRootProps: getBackRootProps, getInputProps: getBackInputProps } = useDropzone({
    onDrop: (files) => onDrop(files, 'back'),
    accept: { 'image/*': ['.jpeg', '.png'] }
  });

  const handleContinue = () => {
    if (frontImage && backImage) {
      onUploadComplete(frontImage, backImage);
    }
  };

  const renderUploadBox = (
    type: 'front' | 'back',
    image: string | null,
    getRootProps: (options?: Record<string, unknown>) => HTMLAttributes<HTMLDivElement>,
    getInputProps: (options?: Record<string, unknown>) => InputHTMLAttributes<HTMLInputElement>
  ) => (
    <div className="w-full">
      <h3 className="text-lg font-semibold text-primary mb-2">{type === 'front' ? 'Upload Front Face' : 'Upload Back Hair'}</h3>
      <div
        {...getRootProps()}
        className="relative flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-border rounded-lg cursor-pointer bg-card hover:bg-muted transition-all"
      >
        <input {...getInputProps()} />
        {image ? (
          <>
            <img src={image} alt="preview" className="object-contain h-full w-full rounded-lg" />
            <button
              onClick={(e) => {
                e.stopPropagation();
                if (type === 'front') setFrontImage(null);
                else setBackImage(null);
              }}
              className="absolute top-2 right-2 bg-destructive text-destructive-foreground rounded-full p-1"
            >
              <X size={16} />
            </button>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center text-muted-foreground">
            <UploadCloud size={48} className="mb-2" />
            <p className="mb-2 text-sm">
              <span className="font-semibold">Click to upload</span> or drag and drop
            </p>
            <p className="text-xs">PNG, JPG (MAX. 5MB)</p>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto">
      <div className="grid md:grid-cols-2 gap-8">
        {renderUploadBox('front', frontImage, getFrontRootProps, getFrontInputProps)}
        {renderUploadBox('back', backImage, getBackRootProps, getBackInputProps)}
      </div>
      <div className="mt-8 text-center">
        <button
          onClick={handleContinue}
          disabled={!frontImage || !backImage}
          className="bg-accent text-primary font-semibold inline-flex items-center gap-2 px-8 py-3 rounded-lg text-lg hover:bg-accent/90 transition-all disabled:bg-muted disabled:cursor-not-allowed"
        >
          Continue
          <ArrowRight size={20} />
        </button>
      </div>
    </div>
  );
};

export default AIUploadSection;

