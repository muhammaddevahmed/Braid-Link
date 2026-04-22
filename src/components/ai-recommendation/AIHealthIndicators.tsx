import React from 'react';
import { Droplets, Wind, Zap, Thermometer } from 'lucide-react';
import { mockHealthReport } from '@/data/ai-data';

const AIHealthIndicators = ({ analysis }: { analysis: typeof mockHealthReport.analysis }) => (
    <div className="grid grid-cols-2 gap-4 text-sm">
      <div className="flex items-center gap-2"><Droplets className="w-4 h-4 text-accent" /><span>Texture: <strong>{analysis.texture}</strong></span></div>
      <div className="flex items-center gap-2"><Wind className="w-4 h-4 text-accent" /><span>Density: <strong>{analysis.density}</strong></span></div>
      <div className="flex items-center gap-2"><Zap className="w-4 h-4 text-accent" /><span>Strength: <strong>{analysis.strength}</strong></span></div>
      <div className="flex items-center gap-2"><Thermometer className="w-4 h-4 text-accent" /><span>Scalp Sensitivity: <strong>{analysis.scalpSensitivity}</strong></span></div>
    </div>
  );

  export default AIHealthIndicators;