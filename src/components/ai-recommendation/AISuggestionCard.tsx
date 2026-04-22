import React from 'react';
import { motion } from 'framer-motion';
import { Check, RefreshCw, ArrowRight, ShieldCheck } from 'lucide-react';
import { mockStyleSuggestion } from '@/data/ai-data';
import AIHealthReportCard from './AIHealthReportCard';

// --- AISuggestionCard Component ---
const AISuggestionCard = ({ onAccept, onTryAnother }: { onAccept: () => void; onTryAnother: () => void; }) => {
    return (
        <div className="max-w-4xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-8">
                {/* Left side: Style Suggestion */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    className="bg-card p-6 rounded-lg border border-border"
                >
                    <h2 className="font-serif text-2xl font-bold text-primary mb-4">AI Style Suggestion</h2>
                    <div className="relative mb-4">
                        <img src={mockStyleSuggestion.image} alt={mockStyleSuggestion.name} className="w-full h-auto rounded-lg" />
                        <div className="absolute top-2 right-2 bg-accent text-primary text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                            <ShieldCheck size={14} /> {mockStyleSuggestion.safety}
                        </div>
                    </div>

                    <h3 className="text-xl font-semibold">{mockStyleSuggestion.name}</h3>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground my-2">
                        <span>Confidence: <strong className="text-primary">{mockStyleSuggestion.confidence}%</strong></span>
                        <span>Tension: <strong className="text-primary">{mockStyleSuggestion.tension}</strong></span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">{mockStyleSuggestion.careNote}</p>

                    <div className="flex justify-between items-center bg-muted p-4 rounded-lg">
                        <div>
                            <p className="text-sm text-muted-foreground">Price</p>
                            <p className="text-2xl font-bold text-primary">£{mockStyleSuggestion.price}</p>
                        </div>
                        <div>
                            <p className="text-sm text-muted-foreground">Duration</p>
                            <p className="text-2xl font-bold text-primary">{mockStyleSuggestion.duration / 60} hrs</p>
                        </div>
                    </div>
                </motion.div>

                {/* Right side: Health Report */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    <AIHealthReportCard />

                    {/* Action Buttons */}
                    <div className="mt-8 grid grid-cols-2 gap-4">
                        <button
                            onClick={onTryAnother}
                            className="bg-muted text-primary font-semibold inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg hover:bg-muted/80 transition-all"
                        >
                            <RefreshCw size={18} /> Try Another
                        </button>
                        <button
                            onClick={onAccept}
                            className="bg-accent text-primary font-semibold inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg hover:bg-accent/90 transition-all"
                        >
                            Accept Suggestion <ArrowRight size={18} />
                        </button>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default AISuggestionCard;

