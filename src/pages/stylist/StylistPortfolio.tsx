import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { stylists } from "@/data/demo-data";
import { 
  Upload, X, Image as ImageIcon, Sparkles, 
  Camera, Grid3X3, Eye, Heart, Download,
  ChevronLeft, ChevronRight, Maximize2
} from "lucide-react";
import { toast } from "sonner";

const StylistPortfolio = () => {
  const [portfolio, setPortfolio] = useState(stylists[0].portfolio);
  const [isUploading, setIsUploading] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"grid" | "masonry">("grid");
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setIsUploading(true);
      const file = files[0];
      
      // Simulate upload
      setTimeout(() => {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPortfolio([...portfolio, reader.result as string]);
          setIsUploading(false);
          toast.success("Photo added to portfolio!", {
            icon: "🎉",
            description: "Your clients can now see your latest work."
          });
        };
        reader.readAsDataURL(file);
      }, 1000);
    }
  };

  const handleRemovePhoto = (index: number) => {
    setPortfolio(portfolio.filter((_, i) => i !== index));
    toast.success("Photo removed from portfolio", {
      icon: "🗑️",
    });
  };

  const handleViewImage = (img: string) => {
    setSelectedImage(img);
  };

  const handleNextImage = () => {
    if (selectedImage) {
      const currentIndex = portfolio.indexOf(selectedImage);
      const nextIndex = (currentIndex + 1) % portfolio.length;
      setSelectedImage(portfolio[nextIndex]);
    }
  };

  const handlePrevImage = () => {
    if (selectedImage) {
      const currentIndex = portfolio.indexOf(selectedImage);
      const prevIndex = (currentIndex - 1 + portfolio.length) % portfolio.length;
      setSelectedImage(portfolio[prevIndex]);
    }
  };

  // Animation variants
  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.05, duration: 0.5 } }),
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-4"
      >
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="bg-primary/10 text-primary text-xs font-medium px-3 py-1 rounded-full flex items-center gap-1">
              <Camera className="w-3.5 h-3.5" />
              Portfolio Gallery
            </span>
          </div>
          <h2 className="font-serif text-3xl font-bold text-primary">My Portfolio</h2>
          <p className="text-detail mt-1 font-brand">
            Showcase your best work to attract more clients
          </p>
        </div>

        {/* View Mode Toggle */}
        <div className="flex items-center gap-2 bg-card rounded-xl p-1 border border-border/50">
          <button
            onClick={() => setViewMode("grid")}
            className={`p-2 rounded-lg transition-all ${
              viewMode === "grid" 
                ? "bg-primary text-white" 
                : "text-detail hover:bg-primary/10"
            }`}
          >
            <Grid3X3 className="w-4 h-4" />
          </button>
          <button
            onClick={() => setViewMode("masonry")}
            className={`p-2 rounded-lg transition-all ${
              viewMode === "masonry" 
                ? "bg-primary text-white" 
                : "text-detail hover:bg-primary/10"
            }`}
          >
            <ImageIcon className="w-4 h-4" />
          </button>
        </div>
      </motion.div>

      {/* Portfolio Grid */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className={`grid ${
          viewMode === "grid" 
            ? "grid-cols-2 md:grid-cols-3 lg:grid-cols-4" 
            : "grid-cols-2 md:grid-cols-3 gap-6"
        } gap-4`}
      >
        {portfolio.map((img, i) => (
          <motion.div
            key={i}
            custom={i}
            variants={fadeUp}
            onHoverStart={() => setHoveredIndex(i)}
            onHoverEnd={() => setHoveredIndex(null)}
            className={`group relative ${
              viewMode === "masonry" && i % 3 === 0 ? "row-span-2" : ""
            }`}
          >
            <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-primary/5 to-primary/10 border-2 border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-2xl">
              <img 
                src={img} 
                alt={`Work ${i+1}`} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                style={{
                  aspectRatio: viewMode === "masonry" && i % 3 === 0 ? "3/4" : "1/1"
                }}
              />
              
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/50 to-transparent opacity-0 group-hover:opacity-60 transition-opacity duration-300" />

              {/* Action Buttons */}
              <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <div className="flex items-center justify-center gap-2">
                  <button
                    onClick={() => handleViewImage(img)}
                    className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-all hover:scale-110 shadow-lg"
                  >
                    <Eye className="w-4 h-4 text-primary" />
                  </button>
                  
                  <button
                    onClick={() => handleRemovePhoto(i)}
                    className="w-10 h-10 rounded-full bg-destructive/90 backdrop-blur-sm flex items-center justify-center hover:bg-destructive transition-all hover:scale-110 shadow-lg"
                  >
                    <X className="w-4 h-4 text-white" />
                  </button>
                </div>
              </div>

              {/* Image Counter Badge */}
              <div className="absolute top-3 left-3 bg-black/50 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full">
                {i + 1}/{portfolio.length}
              </div>

             
            </div>
          </motion.div>
        ))}

        {/* Upload Card */}
        <motion.label
          custom={portfolio.length}
          variants={fadeUp}
          className={`
            relative rounded-2xl border-3 border-dashed transition-all duration-300 cursor-pointer
            ${isUploading 
              ? "border-primary/50 bg-primary/5" 
              : "border-border hover:border-primary/50 hover:bg-primary/5"
            }
            ${viewMode === "masonry" ? "aspect-square" : "aspect-square"}
          `}
        >
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
            disabled={isUploading}
          />
          
          <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
            {isUploading ? (
              <>
                <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mb-3" />
                <span className="text-sm font-medium text-primary">Uploading...</span>
                <span className="text-xs text-detail mt-1">Please wait</span>
              </>
            ) : (
              <>
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                  <Upload className="w-8 h-8 text-primary" />
                </div>
                <span className="text-sm font-semibold text-primary">Add Photo</span>
                <span className="text-xs text-detail mt-1">Click to upload</span>
                <span className="text-xs text-detail">PNG, JPG up to 10MB</span>
              </>
            )}
          </div>
        </motion.label>
      </motion.div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 bg-black/90 backdrop-blur-xl z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring" }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-5xl w-full"
            >
              <img 
                src={selectedImage} 
                alt="Enlarged view" 
                className="w-full h-auto rounded-2xl shadow-2xl"
              />
              
              {/* Close Button */}
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute -top-12 right-0 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 transition-all"
              >
                <X className="w-5 h-5 text-white" />
              </button>

              {/* Navigation */}
              <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-4">
                <button 
                  onClick={handlePrevImage}
                  className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 transition-all"
                >
                  <ChevronLeft className="w-5 h-5 text-white" />
                </button>
                <button 
                  onClick={handleNextImage}
                  className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 transition-all"
                >
                  <ChevronRight className="w-5 h-5 text-white" />
                </button>
              </div>

              {/* Image Info */}
              <div className="absolute -bottom-16 left-0 right-0 flex justify-center">
                <div className="bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 text-white text-sm flex items-center gap-4">
                  <span>1 / {portfolio.length}</span>
                  <span className="w-1 h-1 rounded-full bg-white/30" />
                  <button className="flex items-center gap-1 hover:text-primary transition-colors">
                    <Heart className="w-4 h-4" /> Like
                  </button>
                  <span className="w-1 h-1 rounded-full bg-white/30" />
                  <button className="flex items-center gap-1 hover:text-primary transition-colors">
                    <Download className="w-4 h-4" /> Download
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Portfolio Tips */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-gradient-to-r from-primary/5 to-primary/10 rounded-2xl p-6 border border-primary/20"
      >
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <div>
            <h4 className="font-serif font-semibold text-primary mb-2">Tips for a Great Portfolio</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                "Upload high-quality, well-lit photos of your best work",
                "Include a variety of styles to showcase your range",
                "Update regularly with your latest creations"
              ].map((tip, i) => (
                <div key={i} className="flex items-center gap-2 text-sm text-detail">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                  {tip}
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Upload Limit Info */}
      <motion.p 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="text-xs text-center text-detail flex items-center justify-center gap-1"
      >
        <Camera className="w-3 h-3 text-primary" />
        You can upload up to 20 photos. {portfolio.length}/20 used.
      </motion.p>
    </div>
  );
};

export default StylistPortfolio;