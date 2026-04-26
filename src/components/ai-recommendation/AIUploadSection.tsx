import React, { useState, useCallback } from 'react';
import { UploadCloud, Image, X, ArrowRight, Camera, CheckCircle, AlertCircle, Sparkles, Shield } from 'lucide-react';
import { useDropzone } from 'react-dropzone';
import { motion, AnimatePresence } from 'framer-motion';

const AIUploadSection = ({ onUploadComplete }: { onUploadComplete: (frontImage: string, backImage: string) => void }) => {
  const [frontImage, setFrontImage] = useState<string | null>(null);
  const [backImage, setBackImage] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const onDrop = useCallback((acceptedFiles: File[], type: 'front' | 'back') => {
    const file = acceptedFiles[0];
    if (!file) return;
    
    if (file && file.size > 5 * 1024 * 1024) {
      // Toast or error notification could be added here
      console.error('File too large');
      return;
    }
    
    setIsUploading(true);
    const reader = new FileReader();
    reader.onload = () => {
      if (type === 'front') {
        setFrontImage(reader.result as string);
      } else {
        setBackImage(reader.result as string);
      }
      setIsUploading(false);
    };
    reader.onerror = () => {
      setIsUploading(false);
    };
    reader.readAsDataURL(file);
  }, []);

  const { getRootProps: getFrontRootProps, getInputProps: getFrontInputProps, isDragActive: isFrontDragActive } = useDropzone({
    onDrop: (files) => onDrop(files, 'front'),
    accept: { 'image/*': ['.jpeg', '.jpg', '.png', '.webp'] },
    maxFiles: 1,
  });

  const { getRootProps: getBackRootProps, getInputProps: getBackInputProps, isDragActive: isBackDragActive } = useDropzone({
    onDrop: (files) => onDrop(files, 'back'),
    accept: { 'image/*': ['.jpeg', '.jpg', '.png', '.webp'] },
    maxFiles: 1,
  });

  const handleContinue = () => {
    if (frontImage && backImage) {
      onUploadComplete(frontImage, backImage);
    }
  };

  const handleRemoveImage = (type: 'front' | 'back', e: React.MouseEvent) => {
    e.stopPropagation();
    if (type === 'front') {
      setFrontImage(null);
    } else {
      setBackImage(null);
    }
  };

  const renderUploadBox = (
    type: 'front' | 'back',
    image: string | null,
    getRootProps: ReturnType<typeof useDropzone>['getRootProps'],
    getInputProps: ReturnType<typeof useDropzone>['getInputProps'],
    isDragActive: boolean
  ) => {
    const isFront = type === 'front';
    const title = isFront ? 'Front View' : 'Back View';
    const description = isFront 
      ? 'Upload a clear photo of your face' 
      : 'Upload a photo showing your hair from the back';
    const icon = isFront ? <Camera className="w-5 h-5" /> : <Image className="w-5 h-5" />;
    
    return (
      <motion.div 
        className="w-full"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: isFront ? 0 : 0.1 }}
      >
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-1">
            {icon}
            <h3 className="font-semibold text-primary text-lg">{title}</h3>
          </div>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
        
        <motion.div
          whileHover={{ scale: 1.01 }}
          transition={{ duration: 0.2 }}
          {...getRootProps()}
          className={`
            relative flex flex-col items-center justify-center 
            w-full h-72 md:h-80 
            border-2 border-dashed rounded-2xl 
            cursor-pointer transition-all duration-300
            ${image 
              ? 'border-accent/30 bg-accent/5' 
              : isDragActive
                ? 'border-accent bg-accent/10 shadow-lg scale-[1.02]'
                : 'border-border/60 bg-card hover:border-accent/40 hover:bg-accent/5 hover:shadow-md'
            }
          `}
        >
          <input {...getInputProps()} />
          
          <AnimatePresence mode="wait">
            {image ? (
              <motion.div 
                key="image-preview"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="relative w-full h-full p-2"
              >
                <img 
                  src={image} 
                  alt={`${type} view preview`} 
                  className="object-contain w-full h-full rounded-xl" 
                />
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={(e) => handleRemoveImage(type, e)}
                  className="absolute top-3 right-3 bg-black/60 backdrop-blur-sm text-white rounded-full p-1.5 hover:bg-destructive transition-colors shadow-lg"
                >
                  <X size={16} />
                </motion.button>
                <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
                  <CheckCircle size={12} className="text-green-400" />
                  <span>Uploaded</span>
                </div>
              </motion.div>
            ) : (
              <motion.div 
                key="upload-placeholder"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center text-center p-6"
              >
                <motion.div
                  animate={{ 
                    y: isDragActive ? [-2, 2, -2] : 0,
                  }}
                  transition={{ duration: 0.6, repeat: isDragActive ? Infinity : 0 }}
                >
                  <div className={`
                    w-20 h-20 rounded-2xl flex items-center justify-center mb-4
                    ${isDragActive 
                      ? 'bg-accent/20' 
                      : 'bg-muted/50'
                    }
                    transition-colors duration-300
                  `}>
                    <UploadCloud 
                      size={40} 
                      className={`transition-all duration-300 ${isDragActive ? 'text-accent scale-110' : 'text-muted-foreground'}`} 
                    />
                  </div>
                </motion.div>
                
                <p className="text-sm text-primary font-medium mb-1">
                  {isDragActive ? 'Drop your image here' : 'Click to upload or drag & drop'}
                </p>
                <p className="text-xs text-muted-foreground mb-3">
                  PNG, JPG, WEBP (Max. 5MB)
                </p>
                
                <div className="flex items-center gap-2 text-xs text-muted-foreground/70">
                  <Shield size={12} />
                  <span>Your images are secure & private</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          
          {isUploading && (
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm rounded-2xl flex items-center justify-center z-10">
              <div className="bg-white dark:bg-card rounded-xl p-4 flex items-center gap-3 shadow-xl">
                <div className="w-5 h-5 border-2 border-accent border-t-transparent rounded-full animate-spin" />
                <span className="text-sm font-medium">Processing...</span>
              </div>
            </div>
          )}
        </motion.div>
        
        {/* Tips section */}
        {!image && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mt-3 flex items-center gap-1.5 text-xs text-muted-foreground"
          >
            <Sparkles size={12} className="text-accent" />
            <span>Tip: Use well-lit, clear photos for best results</span>
          </motion.div>
        )}
      </motion.div>
    );
  };

  const isContinueDisabled = !frontImage || !backImage || isUploading;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8 md:mb-10"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 mb-3">
          <Sparkles className="w-3.5 h-3.5 text-accent" />
          <span className="text-xs font-medium text-accent">Step 1 of 3</span>
        </div>
        <h2 className="font-serif text-2xl md:text-3xl font-bold text-primary mb-2">
          Upload Your Photos
        </h2>
        <p className="text-muted-foreground max-w-md mx-auto">
          Our AI will analyze your current style and recommend the perfect look
        </p>
      </motion.div>

      {/* Upload Grid */}
      <div className="grid md:grid-cols-2 gap-6 md:gap-8">
        {renderUploadBox('front', frontImage, getFrontRootProps, getFrontInputProps, isFrontDragActive)}
        {renderUploadBox('back', backImage, getBackRootProps, getBackInputProps, isBackDragActive)}
      </div>

      {/* Requirements Checklist */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="mt-8 flex flex-wrap justify-center gap-4 text-xs text-muted-foreground"
      >
        <div className="flex items-center gap-1.5">
          <div className={`w-1.5 h-1.5 rounded-full ${frontImage ? 'bg-green-500' : 'bg-muted-foreground/30'}`} />
          <span className={frontImage ? 'text-green-600 dark:text-green-400' : ''}>Front photo ✓</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className={`w-1.5 h-1.5 rounded-full ${backImage ? 'bg-green-500' : 'bg-muted-foreground/30'}`} />
          <span className={backImage ? 'text-green-600 dark:text-green-400' : ''}>Back photo ✓</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground/30" />
          <span>Clear lighting</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground/30" />
          <span>No hats/accessories</span>
        </div>
      </motion.div>

      {/* Continue Button */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mt-10 text-center"
      >
        <motion.button
          whileHover={!isContinueDisabled ? { scale: 1.02 } : {}}
          whileTap={!isContinueDisabled ? { scale: 0.98 } : {}}
          onClick={handleContinue}
          disabled={isContinueDisabled}
          className={`
            group relative inline-flex items-center gap-3 px-8 py-3.5 rounded-xl font-semibold text-lg
            transition-all duration-300 overflow-hidden
            ${!isContinueDisabled
              ? 'bg-gradient-to-r from-accent to-accent/80 text-primary shadow-md hover:shadow-lg hover:from-accent/90 hover:to-accent/70'
              : 'bg-muted text-muted-foreground cursor-not-allowed'
            }
          `}
        >
          <span className="relative z-10">
            {!frontImage || !backImage ? 'Upload Both Photos to Continue' : 'Analyze My Style'}
          </span>
          {!isContinueDisabled && (
            <motion.div
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 1, repeat: Infinity, repeatDelay: 2 }}
              className="relative z-10"
            >
              <ArrowRight size={20} />
            </motion.div>
          )}
          
          {/* Shine effect on hover */}
          {!isContinueDisabled && (
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          )}
        </motion.button>
        
        <p className="text-xs text-muted-foreground mt-4">
          By continuing, you agree to our AI analysis and privacy terms
        </p>
      </motion.div>
    </div>
  );
};

export default AIUploadSection;