import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { stylists } from "@/data/demo-data";
import { 
  Upload, X, Image as ImageIcon, Sparkles, 
  Camera, Grid3X3, Eye, Heart, Download,
  ChevronLeft, ChevronRight, Maximize2, 
  BadgeCheck, Zap, Star, Layers,
  FolderOpen, Clock, ThumbsUp, Share2
} from "lucide-react";
import { toast } from "sonner";
import { AddPortfolioModal } from "@/components/stylist/AddPortfolioModal";

interface PortfolioItem {
  image: string;
  name: string;
  category: string;
}

const StylistPortfolio = () => {
  const [portfolio, setPortfolio] = useState<PortfolioItem[]>(stylists[0].portfolio.map(item => ({image: item.image, name: item.name, category: item.category})));
  const [isUploading, setIsUploading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<PortfolioItem | null>(null);
  const [viewMode, setViewMode] = useState<"grid" | "masonry">("grid");
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const handleAddPortfolio = (newPortfolioItem: { image: string; name: string; category: string }) => {
    setIsUploading(true);
    // Simulate upload
    setTimeout(() => {
      setPortfolio([...portfolio, newPortfolioItem]);
      setIsUploading(false);
      toast.success("Photo added to portfolio!", {
        icon: "🎉",
        description: "Your clients can now see your latest work."
      });
    }, 1000);
  };

  const handleRemovePhoto = (index: number) => {
    setPortfolio(portfolio.filter((_, i) => i !== index));
    toast.success("Photo removed from portfolio", {
      icon: "🗑️",
    });
  };

  const handleViewImage = (img: PortfolioItem) => {
    setSelectedImage(img);
  };

  const handleNextImage = () => {
    if (selectedImage) {
      const currentIndex = portfolio.findIndex(item => item.image === selectedImage.image);
      const nextIndex = (currentIndex + 1) % portfolio.length;
      setSelectedImage(portfolio[nextIndex]);
    }
  };

  const handlePrevImage = () => {
    if (selectedImage) {
      const currentIndex = portfolio.findIndex(item => item.image === selectedImage.image);
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
    <div className="space-y-10">
      <AddPortfolioModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddPortfolio={handleAddPortfolio}
      />
      {/* Header - Premium redesign */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-4"
      >
        <div>
          <div className="flex items-center gap-2 mb-3">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1, type: "spring" }}
              className="bg-gradient-to-r from-accent/10 to-accent/5 text-accent text-xs font-medium px-4 py-1.5 rounded-full flex items-center gap-1.5 border border-accent/20"
            >
              <Camera className="w-3.5 h-3.5" />
              Portfolio Gallery
            </motion.div>
          </div>
          
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-primary mb-2">My Portfolio</h2>
          
          <div className="flex items-center gap-2 text-muted-foreground">
            <Layers className="w-4 h-4 text-accent" />
            <p className="text-sm">Showcase your best work to attract more clients</p>
          </div>
        </div>

        {/* View Mode Toggle - Premium */}
        <div className="flex items-center gap-2 bg-card/80 backdrop-blur-sm rounded-xl p-1.5 border border-border/50 shadow-sm">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setViewMode("grid")}
            className={`p-2.5 rounded-lg transition-all ${
              viewMode === "grid" 
                ? "bg-gradient-to-r from-accent to-accent/90 text-primary shadow-md" 
                : "text-muted-foreground hover:text-accent hover:bg-accent/10"
            }`}
          >
            <Grid3X3 className="w-4 h-4" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setViewMode("masonry")}
            className={`p-2.5 rounded-lg transition-all ${
              viewMode === "masonry" 
                ? "bg-gradient-to-r from-accent to-accent/90 text-primary shadow-md" 
                : "text-muted-foreground hover:text-accent hover:bg-accent/10"
            }`}
          >
            <ImageIcon className="w-4 h-4" />
          </motion.button>
        </div>
      </motion.div>

      {/* Portfolio Grid - Premium redesign */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className={`grid ${
          viewMode === "grid" 
            ? "grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5" 
            : "grid-cols-2 md:grid-cols-3 gap-6"
        }`}
      >
        {portfolio.map((item, i) => (
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
            <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-accent/5 to-accent/0 border-2 border-border/50 hover:border-accent/30 transition-all duration-500 hover:shadow-2xl">
              <img 
                src={item.image} 
                alt={`Work ${i+1}`} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                style={{
                  aspectRatio: viewMode === "masonry" && i % 3 === 0 ? "3/4" : "1/1"
                }}
              />
              
              {/* Gradient Overlay - Premium */}
              <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/50 to-transparent opacity-0 group-hover:opacity-70 transition-opacity duration-500" />

              {/* Top Badges */}
              <div className="absolute top-3 left-3 z-20 flex flex-col gap-2">
                <div className="bg-black/50 backdrop-blur-sm text-white text-xs px-3 py-1.5 rounded-full border border-white/20 shadow-lg">
                  {item.category}
                </div>
              </div>

              {i === 0 && (
                <div className="absolute top-3 right-3 z-20">
                  <div className="bg-gradient-to-r from-amber-500 to-amber-400 text-white text-xs px-3 py-1.5 rounded-full flex items-center gap-1 shadow-lg border border-white/20">
                    <Star className="w-3 h-3 fill-white" />
                    Featured
                  </div>
                </div>
              )}

              {/* Action Buttons - Premium */}
              <div className="absolute inset-x-0 bottom-0 p-5 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                <div className="flex items-center justify-center gap-3">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleViewImage(item)}
                    className="w-12 h-12 rounded-xl bg-white/90 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-all shadow-xl border border-white/20"
                  >
                    <Eye className="w-5 h-5 text-primary" />
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleRemovePhoto(i)}
                    className="w-12 h-12 rounded-xl bg-destructive/90 backdrop-blur-sm flex items-center justify-center hover:bg-destructive transition-all shadow-xl border border-white/20"
                  >
                    <X className="w-5 h-5 text-white" />
                  </motion.button>
                </div>
              </div>

            
            </div>
          </motion.div>
        ))}

        {/* Upload Card - Premium redesign */}
        <motion.div
          custom={portfolio.length}
          variants={fadeUp}
          onClick={() => setIsModalOpen(true)}
          className={`
            relative rounded-2xl border-3 border-dashed transition-all duration-500 cursor-pointer
            overflow-hidden group
            ${isUploading 
              ? "border-accent/50 bg-accent/5" 
              : "border-border/50 hover:border-accent/30 hover:bg-accent/5"
            }
            ${viewMode === "masonry" ? "aspect-square" : "aspect-square"}
          `}
        >
          
          {/* Animated background pattern */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent" />
            <div className="absolute inset-0" style={{ backgroundImage: `radial-gradient(circle at 2px 2px, rgba(184,122,93,0.1) 1px, transparent 0)`, backgroundSize: '24px 24px' }} />
          </div>
          
         <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center z-10">
            {isUploading ? (
              <>
                <div className="relative mb-4">
                  <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center">
                    <div className="w-12 h-12 border-4 border-accent border-t-transparent rounded-full animate-spin" />
                  </div>
                </div>
                <span className="text-sm font-medium text-primary">Uploading...</span>
                <span className="text-xs text-muted-foreground mt-2">Please wait</span>
              </>
            ) : (
              <>
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 400 }}
                  className="w-20 h-20 rounded-2xl bg-gradient-to-br from-accent/10 to-accent/5 flex items-center justify-center mb-4 border-2 border-accent/20 group-hover:border-accent/40 transition-all"
                >
                  <Upload className="w-8 h-8 text-accent" />
                </motion.div>
                <span className="text-sm font-semibold text-primary mb-1">Add Photo</span>
                <span className="text-xs text-muted-foreground mb-2">Click to upload</span>
                <div className="flex items-center gap-2 text-[10px] text-muted-foreground bg-accent/5 px-3 py-1.5 rounded-full">
                  <BadgeCheck className="w-3 h-3 text-accent" />
                  <span>PNG, JPG up to 10MB</span>
                </div>
              </>
            )}
          </div>

          {/* Progress indicator */}
          {isUploading && (
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 1, ease: "easeInOut" }}
              className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-accent to-accent/80"
            />
          )}
        </motion.div>
      </motion.div>

      {/* Lightbox Modal - Premium redesign */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 bg-black/95 backdrop-blur-2xl z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-6xl w-full"
            >
              <img 
                src={selectedImage.image} 
                alt="Enlarged view" 
                className="w-full h-auto rounded-2xl shadow-2xl border-2 border-white/10"
              />
              
              {/* Close Button - Premium */}
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedImage(null)}
                className="absolute -top-14 right-0 w-12 h-12 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center hover:bg-white/20 transition-all border border-white/20"
              >
                <X className="w-5 h-5 text-white" />
              </motion.button>

              {/* Navigation - Premium */}
              <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-4">
                <motion.button 
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handlePrevImage}
                  className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center hover:bg-white/20 transition-all border border-white/20"
                >
                  <ChevronLeft className="w-5 h-5 text-white" />
                </motion.button>
                <motion.button 
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleNextImage}
                  className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center hover:bg-white/20 transition-all border border-white/20"
                >
                  <ChevronRight className="w-5 h-5 text-white" />
                </motion.button>
              </div>

              {/* Image Info - Premium */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="absolute -bottom-20 left-0 right-0 flex justify-center"
              >
                <div className="bg-white/10 backdrop-blur-md rounded-2xl px-8 py-4 text-white text-sm flex items-center gap-6 border border-white/20 shadow-xl">
                  <span className="font-medium">
                    {portfolio.findIndex(item => item.image === selectedImage.image) + 1} / {portfolio.length}
                  </span>
                  <span className="w-1 h-1 rounded-full bg-white/30" />
                  <span className="font-semibold">{selectedImage.name}</span>
                  <span className="w-1 h-1 rounded-full bg-white/30" />
                  <span className="font-semibold">{selectedImage.category}</span>
                  <span className="w-1 h-1 rounded-full bg-white/30" />
                  <button className="flex items-center gap-2 hover:text-accent transition-colors group">
                    <Heart className="w-4 h-4 group-hover:scale-110 transition-transform" /> Like
                  </button>
                  <span className="w-1 h-1 rounded-full bg-white/30" />
                  <button className="flex items-center gap-2 hover:text-accent transition-colors group">
                    <Download className="w-4 h-4 group-hover:scale-110 transition-transform" /> Download
                  </button>
                  <span className="w-1 h-1 rounded-full bg-white/30" />
                  <button className="flex items-center gap-2 hover:text-accent transition-colors group">
                    <Share2 className="w-4 h-4 group-hover:scale-110 transition-transform" /> Share
                  </button>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Portfolio Tips - Premium redesign */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-gradient-to-br from-accent/5 to-accent/0 rounded-2xl p-6 md:p-8 border border-accent/20 shadow-lg"
      >
        <div className="flex items-start gap-5">
          <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-accent to-accent/80 flex items-center justify-center flex-shrink-0 shadow-lg">
            <Sparkles className="w-7 h-7 text-primary" />
          </div>
          <div className="flex-1">
            <h4 className="font-serif font-semibold text-xl text-primary mb-4">Tips for a Great Portfolio</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { icon: Camera, text: "Upload high-quality, well-lit photos of your best work" },
                { icon: Layers, text: "Include a variety of styles to showcase your range" },
                { icon: Clock, text: "Update regularly with your latest creations" }
              ].map((tip, i) => (
                <motion.div 
                  key={i} 
                  whileHover={{ y: -2 }}
                  className="flex items-start gap-3 p-4 rounded-xl bg-background/50 border border-accent/10 hover:border-accent/30 transition-all"
                >
                  <tip.icon className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-muted-foreground">{tip.text}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Upload Limit Info - Premium */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="flex items-center justify-center"
      >
        <div className="inline-flex items-center gap-2 text-xs text-muted-foreground bg-card/50 backdrop-blur-sm px-4 py-2 rounded-full border border-border/50">
          <Camera className="w-3.5 h-3.5 text-accent" />
          <span>You can upload up to 20 photos.</span>
          <span className="font-semibold text-accent">{portfolio.length}/20</span>
          <span>used</span>
          <Zap className="w-3.5 h-3.5 text-accent" />
        </div>
      </motion.div>
    </div>
  );
};

export default StylistPortfolio;