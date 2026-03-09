import { useState } from "react";
import { motion } from "framer-motion";
import { stylists } from "@/data/demo-data";
import { Upload, X } from "lucide-react";
import { toast } from "sonner";

const StylistPortfolio = () => {
  const [portfolio, setPortfolio] = useState(stylists[0].portfolio);
  const [isUploading, setIsUploading] = useState(false);

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
          toast.success("Photo added to portfolio!");
        };
        reader.readAsDataURL(file);
      }, 1000);
    }
  };

  const handleRemovePhoto = (index: number) => {
    setPortfolio(portfolio.filter((_, i) => i !== index));
    toast.success("Photo removed from portfolio");
  };

  return (
    <div className="space-y-6">
      <motion.h2 
        className="font-serif text-2xl font-bold"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        My Portfolio
      </motion.h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {portfolio.map((img, i) => (
          <motion.div 
            key={i} 
            className="aspect-square rounded-xl overflow-hidden relative group"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.05 }}
          >
            <img src={img} alt={`Work ${i+1}`} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" />
            <button
              onClick={() => handleRemovePhoto(i)}
              className="absolute top-2 right-2 w-8 h-8 rounded-full bg-destructive text-destructive-foreground flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:scale-110"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        ))}
        <motion.label
          className="aspect-square rounded-xl border-2 border-dashed border-input bg-card flex flex-col items-center justify-center gap-2 hover:border-primary/50 hover:bg-primary/5 transition-all cursor-pointer hover-scale"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: portfolio.length * 0.05 }}
        >
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
            disabled={isUploading}
          />
          {isUploading ? (
            <>
              <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
              <span className="text-sm text-muted-foreground">Uploading...</span>
            </>
          ) : (
            <>
              <Upload className="w-8 h-8 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Add Photo</span>
            </>
          )}
        </motion.label>
      </div>
    </div>
  );
};

export default StylistPortfolio;
