import React from 'react';
import AIHealthIndicators from './AIHealthIndicators';
import { mockHealthReport } from '@/data/ai-data';

const AIHealthReportCard = () => (
    <div className="bg-card p-6 rounded-lg border border-border">
        <h3 className="font-semibold text-lg mb-4">Hair Health Report</h3>
        <div className="flex items-center justify-between mb-4">
            <div>
                <p className="text-sm text-muted-foreground">Health Score</p>
                <p className="text-3xl font-bold text-primary">{mockHealthReport.hairHealthScore}/100</p>
            </div>
            <div className={`text-sm font-semibold px-3 py-1 rounded-full ${mockHealthReport.riskLevel === 'Low' ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
                Risk: {mockHealthReport.riskLevel}
            </div>
        </div>
        <AIHealthIndicators analysis={mockHealthReport.analysis} />
        <div className="mt-4">
            <h4 className="font-semibold mb-2">Recommendations:</h4>
            <ul className="list-disc list-inside text-muted-foreground text-sm space-y-1">
                {mockHealthReport.recommendations.map((rec, i) => <li key={i}>{rec}</li>)}
            </ul>
        </div>
    </div>
);

export default AIHealthReportCard;
