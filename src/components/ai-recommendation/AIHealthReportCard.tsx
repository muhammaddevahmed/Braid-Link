import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Activity, 
  Heart, 
  Shield, 
  AlertCircle, 
  CheckCircle, 
  TrendingUp, 
  Info, 
  ChevronRight,
  Droplets,
  Zap,
  Thermometer,
  Eye,
  Sparkles
} from 'lucide-react';
import AIHealthIndicators from './AIHealthIndicators';
import { mockHealthReport } from '@/data/ai-data';

const AIHealthReportCard = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const getRiskColor = (riskLevel: string) => {
    switch (riskLevel.toLowerCase()) {
      case 'low':
        return { bg: 'bg-green-500/10', text: 'text-green-500', border: 'border-green-500/20', icon: CheckCircle };
      case 'medium':
        return { bg: 'bg-yellow-500/10', text: 'text-yellow-500', border: 'border-yellow-500/20', icon: AlertCircle };
      case 'high':
        return { bg: 'bg-red-500/10', text: 'text-red-500', border: 'border-red-500/20', icon: AlertCircle };
      default:
        return { bg: 'bg-accent/10', text: 'text-accent', border: 'border-accent/20', icon: Activity };
    }
  };

  const riskConfig = getRiskColor(mockHealthReport.riskLevel);
  const RiskIcon = riskConfig.icon;
  
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'from-green-500 to-emerald-500';
    if (score >= 60) return 'from-accent to-amber-500';
    if (score >= 40) return 'from-amber-500 to-orange-500';
    return 'from-red-500 to-rose-500';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="relative group"
    >
      {/* Card with gradient border effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-accent/20 to-transparent rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div className="relative bg-card rounded-2xl border border-border/50 overflow-hidden shadow-md hover:shadow-xl transition-all duration-300">
        
        {/* Header with decorative accent */}
        <div className="relative">
          <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-accent to-accent/20 rounded-l-2xl" />
          <div className="p-5 md:p-6">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-accent/20 to-accent/5 flex items-center justify-center">
                  <Activity className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <h3 className="font-serif text-lg md:text-xl font-semibold text-primary">Hair Health Report</h3>
                  <p className="text-xs text-muted-foreground">AI-powered analysis</p>
                </div>
              </div>
              
              <motion.div
                whileHover={{ scale: 1.05 }}
                className={`${riskConfig.bg} ${riskConfig.text} border ${riskConfig.border} rounded-full px-3 py-1.5 flex items-center gap-1.5 shadow-sm`}
              >
                <RiskIcon size={14} />
                <span className="text-xs font-semibold">Risk: {mockHealthReport.riskLevel}</span>
              </motion.div>
            </div>

            {/* Health Score Section */}
            <div className="bg-gradient-to-br from-muted/30 to-transparent rounded-xl p-4 mb-5">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1 flex items-center gap-1.5">
                    <Heart size={14} className="text-accent" />
                    Overall Health Score
                  </p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl md:text-5xl font-bold text-primary">{mockHealthReport.hairHealthScore}</span>
                    <span className="text-lg text-muted-foreground">/100</span>
                  </div>
                </div>
                
                {/* Score Ring */}
                <div className="relative">
                  <svg className="w-20 h-20 md:w-24 md:h-24 transform -rotate-90">
                    <circle
                      cx="40"
                      cy="40"
                      r="36"
                      stroke="currentColor"
                      strokeWidth="6"
                      fill="none"
                      className="text-muted/30"
                      strokeLinecap="round"
                    />
                    <motion.circle
                      cx="40"
                      cy="40"
                      r="36"
                      stroke="currentColor"
                      strokeWidth="6"
                      fill="none"
                      className={`text-transparent ${getScoreColor(mockHealthReport.hairHealthScore)}`}
                      strokeLinecap="round"
                      initial={{ strokeDashoffset: 226.2 }}
                      animate={{ strokeDashoffset: 226.2 * (1 - mockHealthReport.hairHealthScore / 100) }}
                      transition={{ duration: 1, ease: "easeOut" }}
                      strokeDasharray="226.2"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-sm font-bold text-primary">{mockHealthReport.hairHealthScore}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Health Indicators */}
            <div className="mb-5">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles size={14} className="text-accent" />
                <h4 className="font-semibold text-sm text-primary">Key Indicators</h4>
              </div>
              <AIHealthIndicators analysis={mockHealthReport.analysis} />
            </div>

            {/* Recommendations Section */}
            <div className="bg-accent/5 rounded-xl p-4 border border-accent/10">
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="flex items-center justify-between w-full group"
              >
                <div className="flex items-center gap-2">
                  <Shield size={16} className="text-accent" />
                  <h4 className="font-semibold text-sm text-primary">Professional Recommendations</h4>
                </div>
                <motion.div
                  animate={{ rotate: isExpanded ? 90 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronRight size={16} className="text-muted-foreground group-hover:text-accent transition-colors" />
                </motion.div>
              </button>
              
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ opacity: 0, height: 0, marginTop: 0 }}
                    animate={{ opacity: 1, height: "auto", marginTop: 12 }}
                    exit={{ opacity: 0, height: 0, marginTop: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ul className="space-y-2">
                      {mockHealthReport.recommendations.map((rec, i) => (
                        <motion.li
                          key={i}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.05 }}
                          className="flex items-start gap-2.5 text-sm text-muted-foreground"
                        >
                          <CheckCircle size={14} className="text-green-500 mt-0.5 flex-shrink-0" />
                          <span>{rec}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
              
              {!isExpanded && (
                <div className="flex items-center gap-2 mt-2 pt-2 border-t border-border/30">
                  <Info size={12} className="text-muted-foreground" />
                  <p className="text-xs text-muted-foreground">
                    {mockHealthReport.recommendations.length} recommendations available
                  </p>
                </div>
              )}
            </div>

            {/* Footer Note */}
            <div className="mt-4 pt-3 border-t border-border/30 flex items-center justify-between text-xs text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <Activity size={12} />
                <span>AI Confidence: High</span>
              </div>
              <div className="flex items-center gap-1.5">
                <TrendingUp size={12} />
                <span>Updated just now</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Subtle decoration */}
        <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-accent/5 to-transparent rounded-full pointer-events-none" />
      </div>
    </motion.div>
  );
};

export default AIHealthReportCard;