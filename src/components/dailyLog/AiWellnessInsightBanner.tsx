import React from 'react';
import { Sparkles, Zap, TrendingUp } from 'lucide-react';

interface AiWellnessInsightBannerProps {
  text: string;
  chips: readonly string[];
}

export const AiWellnessInsightBanner: React.FC<AiWellnessInsightBannerProps> = ({ text, chips }) => {
  return (
    <div className="w-full bg-gradient-to-r from-[#F7F0FF] via-[#FBF3FC] to-[#FFF0F6] border border-[#F3E8FF] rounded-[22px] p-4 sm:p-5 text-left shadow-2xs">
      {/* Header Badge */}
      <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#F3E8FF] text-[#8B5CF6] text-[10px] font-extrabold uppercase tracking-wider mb-2">
        <Sparkles className="w-3 h-3 text-[#9333EA]" />
        <span>AI WELLNESS INSIGHT</span>
      </div>

      {/* Main Text */}
      <p className="text-body text-[#17152B] mb-3 font-normal">
        {text}
      </p>

      {/* Chips */}
      <div className="flex items-center gap-2 flex-wrap">
        {chips.map((chip, idx) => (
          <span
            key={chip}
            className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white/90 border border-purple-200 text-[#68708A] text-[11px] font-semibold shadow-2xs"
          >
            {idx === 0 ? <Zap className="w-3 h-3 text-amber-500 fill-amber-500" /> : <TrendingUp className="w-3 h-3 text-[#F43F8F]" />}
            <span>{chip}</span>
          </span>
        ))}
      </div>
    </div>
  );
};
