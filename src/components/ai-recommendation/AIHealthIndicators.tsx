import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Droplets, 
  Wind, 
  Zap, 
  Thermometer, 
  Info, 
  CheckCircle,
  AlertTriangle,
  HelpCircle,
  TrendingUp,
  Activity
} from 'lucide-react';
import { mockHealthReport } from '@/data/ai-data';

interface IndicatorProps {
  icon: React.ElementType;
  label: string;
  value: string;
  description?: string;
  color?: string;
  index: number;
}

const getValueStatus = (value: string): 'good' | 'warning' | 'info' => {
  const lowerValue = value.toLowerCase();
  if (lowerValue.includes('healthy') || lowerValue.includes('strong') || lowerValue.includes('normal')) {
    return 'good';
  }
  if (lowerValue.includes('weak') || lowerValue.includes('sensitive') || lowerValue.includes('dry')) {
    return 'warning';
  }
  return 'info';
};

const getStatusColor = (status: 'good' | 'warning' | 'info') => {
  switch (status) {
    case 'good':
      return { bg: 'bg-green-500/10', border: 'border-green-500/20', text: 'text-green-500', icon: CheckCircle };
    case 'warning':
      return { bg: 'bg-yellow-500/10', border: 'border-yellow-500/20', text: 'text-yellow-500', icon: AlertTriangle };
    default:
      return { bg: 'bg-accent/10', border: 'border-accent/20', text: 'text-accent', icon: Info };
  }
};

const IndicatorCard: React.FC<IndicatorProps> = ({ icon: Icon, label, value, description, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  const status = getValueStatus(value);
  const statusConfig = getStatusColor(status);
  const StatusIcon = statusConfig.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
      whileHover={{ y: -2, transition: { duration: 0.2 } }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="relative group"
    >
      <div className={`
        relative overflow-hidden rounded-xl p-3.5 transition-all duration-300
        ${isHovered ? 'shadow-md' : 'shadow-sm'}
        bg-card border ${statusConfig.border}
      `}>
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        <div className="relative flex items-center gap-3">
          {/* Icon Container */}
          <div className={`
            relative w-10 h-10 rounded-xl flex items-center justify-center
            ${statusConfig.bg} transition-all duration-300
            ${isHovered ? 'scale-105' : 'scale-100'}
          `}>
            <Icon className={`w-5 h-5 ${statusConfig.text}`} />
            
            {/* Status Badge */}
            <div className={`absolute -top-1 -right-1 w-4 h-4 rounded-full ${statusConfig.bg} border-2 border-card flex items-center justify-center`}>
              <StatusIcon className="w-2.5 h-2.5" />
            </div>
          </div>
          
          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between flex-wrap gap-1">
              <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                {label}
              </span>
              {description && (
                <motion.div
                  animate={{ opacity: isHovered ? 1 : 0.5 }}
                  className="cursor-help"
                >
                  <HelpCircle size={12} className="text-muted-foreground" />
                </motion.div>
              )}
            </div>
            <div className="flex items-baseline gap-1.5 mt-0.5">
              <span className="text-sm md:text-base font-semibold text-primary">
                {value}
              </span>
              {status === 'warning' && (
                <span className="text-xs text-yellow-500 animate-pulse">!</span>
              )}
            </div>
          </div>
        </div>
        
        {/* Hover Tooltip */}
        {description && (
          <AnimatePresence>
            {isHovered && (
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 5 }}
                transition={{ duration: 0.2 }}
                className="absolute left-0 right-0 bottom-full mb-2 z-10"
              >
                <div className="bg-primary/90 backdrop-blur-sm text-white text-xs rounded-lg px-3 py-2 shadow-lg mx-2">
                  <div className="flex items-center gap-1.5">
                    <Info size={10} />
                    <span>{description}</span>
                  </div>
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 rotate-45 w-2 h-2 bg-primary/90" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        )}
        
        {/* Bottom accent line */}
        <motion.div
          className={`absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r ${statusConfig.text.replace('text', 'from')} to-transparent`}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />
      </div>
    </motion.div>
  );
};

const AIHealthIndicators = ({ analysis }: { analysis: typeof mockHealthReport.analysis }) => {
  const indicators = [
    {
      icon: Droplets,
      label: "Hair Texture",
      value: analysis.texture,
      description: "Indicates the thickness and diameter of individual hair strands. Affects how products absorb and styles hold."
    },
    {
      icon: Wind,
      label: "Hair Density",
      value: analysis.density,
      description: "Number of hair strands per square inch on your scalp. Determines volume and fullness potential."
    },
    {
      icon: Zap,
      label: "Hair Strength",
      value: analysis.strength,
      description: "Resistance to breakage and damage. Influenced by protein levels and overall hair health."
    },
    {
      icon: Thermometer,
      label: "Scalp Sensitivity",
      value: analysis.scalpSensitivity,
      description: "Reactivity level of your scalp to products, styling tools, and environmental factors."
    }
  ];

  return (
    <div className="space-y-4">
      {/* Header with trend indicator */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Activity size={14} className="text-accent" />
          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
            Hair Analysis
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <TrendingUp size={12} className="text-accent" />
          <span className="text-xs text-muted-foreground">AI Assessment</span>
        </div>
      </div>

      {/* Indicators Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {indicators.map((indicator, idx) => (
          <IndicatorCard
            key={indicator.label}
            icon={indicator.icon}
            label={indicator.label}
            value={indicator.value}
            description={indicator.description}
            index={idx}
          />
        ))}
      </div>

      {/* Summary note */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="flex items-center justify-center gap-2 pt-2 text-xs text-muted-foreground border-t border-border/30"
      >
        <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
        <span>Normal Range</span>
        <div className="w-1.5 h-1.5 rounded-full bg-yellow-500 ml-2" />
        <span>Attention Needed</span>
        <div className="w-1.5 h-1.5 rounded-full bg-accent ml-2" />
        <span>Monitor</span>
      </motion.div>
    </div>
  );
};

export default AIHealthIndicators;