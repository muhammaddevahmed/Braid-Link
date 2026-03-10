import { Sparkles } from "lucide-react";
import { motion } from "framer-motion";

interface InstantMatchButtonProps {
  onClick: () => void;
  size?: "sm" | "md" | "lg";
  variant?: "primary" | "secondary";
}

const InstantMatchButton = ({ onClick, size = "md", variant = "primary" }: InstantMatchButtonProps) => {
  const buttonClasses = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-6 py-2.5 text-base",
    lg: "px-8 py-3 text-lg",
  };

  const variantClasses = {
    primary: "bg-accent hover:bg-accent-dark text-white",
    secondary: "border-2 border-accent text-accent hover:bg-accent/10",
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`${buttonClasses[size]} ${variantClasses[variant]} rounded-xl font-semibold flex items-center justify-center gap-2 transition-all duration-300 shadow-lg hover:shadow-xl`}
    >
      <Sparkles className="w-4 h-4" />
      Instant Match
    </motion.button>
  );
};

export default InstantMatchButton;
