import React from 'react';
import { Droplet, Sparkles, Calendar, Moon } from 'lucide-react';

interface CycleSummaryCardProps {
  onSelectPhase?: (phaseName: string) => void;
}

export const CycleSummaryCard: React.FC<CycleSummaryCardProps> = ({ onSelectPhase }) => {
  return (
    <div className="w-full">
      <h3 className="text-[#1F2937] font-bold text-[clamp(0.9rem,1.2vw,0.98rem)] leading-tight mb-2.5">
        Cycle Summary
      </h3>

      <div className="space-y-2.5">
        {/* Current Phase */}
        <button
          type="button"
          onClick={() => onSelectPhase?.('Follicular Phase')}
          className="w-full bg-[#FEF2F2] border border-[#FEE2E2] rounded-[14.4px] p-3 flex items-center gap-3 hover:bg-red-50/80 transition-all text-left focus:outline-none focus:ring-2 focus:ring-rose-300 min-h-[44px]"
          aria-label="View Follicular Phase summary"
        >
          <div className="w-[33.6px] h-[33.6px] rounded-full bg-[#FEE2E2] flex items-center justify-center shrink-0">
            <Droplet className="w-4 h-4 text-[#EF4444] fill-[#EF4444]" />
          </div>
          <div>
            <span className="text-[#6B7280] text-[12px] leading-[18px] block">
              Current Phase
            </span>
            <span className="text-[#EF4444] font-bold text-[14.4px] leading-[21.6px]">
              Folicullar
            </span>
          </div>
        </button>

        {/* Ovulation */}
        <button
          type="button"
          onClick={() => onSelectPhase?.('Ovulation')}
          className="w-full bg-[#F9FAFB] border border-[#F3F4F6] rounded-[14.4px] p-3 flex items-center gap-3 hover:bg-gray-50 transition-all text-left focus:outline-none focus:ring-2 focus:ring-emerald-300 min-h-[44px]"
          aria-label="View Ovulation prediction: Jul 6, 2025"
        >
          <div className="w-[33.6px] h-[33.6px] rounded-full bg-[#DCFCE7] flex items-center justify-center shrink-0">
            <Sparkles className="w-4 h-4 text-[#22C55E]" />
          </div>
          <div>
            <span className="text-[#6B7280] text-[12px] leading-[18px] block">
              Ovulation
            </span>
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-[#374151] font-semibold text-[13.2px] leading-[19.8px]">
                Predicted on
              </span>
              <span className="text-[#6B7280] text-[12px] leading-[18px]">
                Jul 6, 2025
              </span>
            </div>
          </div>
        </button>

        {/* Fertile Window */}
        <button
          type="button"
          onClick={() => onSelectPhase?.('Fertile Window')}
          className="w-full bg-[#F9FAFB] border border-[#F3F4F6] rounded-[14.4px] p-3 flex items-center gap-3 hover:bg-gray-50 transition-all text-left focus:outline-none focus:ring-2 focus:ring-blue-300 min-h-[44px]"
          aria-label="View Fertile Window: Jul 2 – Jul 6, 2025"
        >
          <div className="w-[33.6px] h-[33.6px] rounded-full bg-[#DBEAFE] flex items-center justify-center shrink-0">
            <Calendar className="w-4 h-4 text-[#3B82F6]" />
          </div>
          <div>
            <span className="text-[#6B7280] text-[12px] leading-[18px] block">
              Fertile Window
            </span>
            <span className="text-[#374151] font-semibold text-[13.2px] leading-[19.8px]">
              Jul 2 – Jul 6, 2025
            </span>
          </div>
        </button>

        {/* Luteal Phase */}
        <button
          type="button"
          onClick={() => onSelectPhase?.('Luteal Phase')}
          className="w-full bg-[#F9FAFB] border border-[#F3F4F6] rounded-[14.4px] p-3 flex items-center gap-3 hover:bg-gray-50 transition-all text-left focus:outline-none focus:ring-2 focus:ring-purple-300 min-h-[44px]"
          aria-label="View Luteal Phase: Jul 7 – Jul 20, 2025"
        >
          <div className="w-[33.6px] h-[33.6px] rounded-full bg-[#F3E8FF] flex items-center justify-center shrink-0">
            <Moon className="w-4 h-4 text-[#9333EA]" />
          </div>
          <div>
            <span className="text-[#6B7280] text-[12px] leading-[18px] block">
              Luteal Phase
            </span>
            <span className="text-[#374151] font-semibold text-[13.2px] leading-[19.8px]">
              Jul 7 – Jul 20, 2025
            </span>
          </div>
        </button>
      </div>
    </div>
  );
};
