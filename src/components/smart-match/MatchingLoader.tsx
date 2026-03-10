import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

interface MatchingLoaderProps {
  message?: string;
}

const MatchingLoader = ({ message = "Finding your perfect stylist..." }: MatchingLoaderProps) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 gap-6">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        className="relative"
      >
        <div className="w-16 h-16 rounded-full border-4 border-accent/30 border-t-accent" />
        <motion.div
          animate={{ scale: [1, 1.3, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="absolute inset-0 rounded-full"
        >
          <Sparkles className="w-8 h-8 text-accent absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
        </motion.div>
      </motion.div>

      <motion.p
        initial={{ opacity: 0.6 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, repeat: Infinity, repeatType: "reverse" }}
        className="text-text text-lg font-medium text-center max-w-xs"
      >
        {message}
      </motion.p>

      <motion.div
        className="flex gap-1"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            animate={{ y: [-8, 0, -8] }}
            transition={{
              duration: 1,
              repeat: Infinity,
              delay: i * 0.15,
            }}
            className="w-2 h-2 rounded-full bg-accent"
          />
        ))}
      </motion.div>
    </div>
  );
};

export default MatchingLoader;
