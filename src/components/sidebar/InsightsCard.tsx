import React from 'react';
import { INSIGHTS_LIST } from '../../data/mockData';

export const InsightsCard: React.FC = () => {
  return (
    <div className="w-full">
      <h3 className="text-[#1F2937] font-bold text-[clamp(0.9rem,1.2vw,0.98rem)] leading-tight mb-2.5">
        Today's Insights
      </h3>

      <div className="space-y-2.5">
        {INSIGHTS_LIST.map((insight, idx) => (
          <div key={idx} className="flex items-start gap-2.5">
            <span className="w-2 h-2 rounded-full bg-[#A855F7] shrink-0 mt-1.5" />
            <p className="text-[#4B5563] text-[clamp(0.8rem,1vw,0.85rem)] leading-snug font-normal">
              {insight}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
