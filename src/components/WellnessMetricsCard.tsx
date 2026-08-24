import React from 'react';
import { Pencil, Moon, Smile, Droplets, Footprints, Scale, Heart } from 'lucide-react';
import type { WellnessMetricsState } from '../types';

interface WellnessMetricsCardProps {
  metrics: WellnessMetricsState;
  onOpenEditLog: () => void;
  onQuickLogMetric: (metricKey: keyof WellnessMetricsState) => void;
}

export const WellnessMetricsCard: React.FC<WellnessMetricsCardProps> = ({
  metrics,
  onOpenEditLog,
  onQuickLogMetric,
}) => {
  return (
    <section
      aria-label="Wellness Metrics Section"
      className="bg-white rounded-[clamp(1rem,2vw,1.2rem)] p-[clamp(0.875rem,1.8vw,1.2rem)] border border-[#F3F4F6] shadow-card w-full min-w-0"
    >
      {/* Header */}
      <div className="flex items-center justify-between gap-4 mb-4">
        <div>
          <h3 className="text-[#1F2937] font-bold text-[clamp(0.95rem,1.3vw,1.05rem)] leading-tight">
            Wellness Metrics
          </h3>
          <p className="text-[#9CA3AF] text-[clamp(0.75rem,1vw,0.825rem)] leading-tight mt-0.5">
            Today, 21/06 – Cycle Day 1
          </p>
        </div>

        <button
          type="button"
          onClick={onOpenEditLog}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-[9.6px] border border-[#E9D5FF] hover:bg-[#FAF5FF] transition-all focus:outline-none focus:ring-2 focus:ring-brand-pink/30 active:scale-95 min-h-[44px] sm:min-h-0"
          aria-label="Edit wellness metrics log"
        >
          <Pencil className="w-3.5 h-3.5 text-[#F475C1]" />
          <span className="text-[13.2px] font-normal leading-[19.8px] text-gradient-pink select-none">
            Edit Log
          </span>
        </button>
      </div>

      {/* 6 Metric Tiles */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-[clamp(0.5rem,1vw,0.75rem)]">
        {/* 1. Sleep */}
        <button
          type="button"
          onClick={() => onQuickLogMetric('sleepHours')}
          className="bg-white rounded-[14.4px] p-3 sm:p-3.5 border border-[#F3F4F6] shadow-sm hover:shadow-md hover:border-purple-200 transition-all flex flex-col items-start text-left group focus:outline-none focus:ring-2 focus:ring-purple-300 min-h-[44px]"
          aria-label={`Sleep: ${metrics.sleepHours} hours. Click to update.`}
        >
          <div className="w-[38.4px] h-[38.4px] rounded-full bg-[#FAF5FF] flex items-center justify-center mb-2 group-hover:scale-105 transition-transform shrink-0">
            <Moon className="w-4 h-4 text-purple-600" />
          </div>
          <span className="text-[#9CA3AF] text-[13.2px] leading-[19.8px] mb-0.5">Sleep</span>
          <span className="text-[#1F2937] font-bold text-[15.6px] leading-[23.4px]">
            {metrics.sleepHours} hrs
          </span>
        </button>

        {/* 2. Mood */}
        <button
          type="button"
          onClick={() => onQuickLogMetric('mood')}
          className="bg-white rounded-[14.4px] p-3 sm:p-3.5 border border-[#F3F4F6] shadow-sm hover:shadow-md hover:border-orange-200 transition-all flex flex-col items-start text-left group focus:outline-none focus:ring-2 focus:ring-orange-300 min-h-[44px]"
          aria-label={`Mood: ${metrics.mood}. Click to update.`}
        >
          <div className="w-[38.4px] h-[38.4px] rounded-full bg-[#FFF7ED] flex items-center justify-center mb-2 group-hover:scale-105 transition-transform shrink-0">
            <Smile className="w-4 h-4 text-[#F97316]" />
          </div>
          <span className="text-[#9CA3AF] text-[13.2px] leading-[19.8px] mb-0.5">Mood</span>
          <span className="text-[#1F2937] font-bold text-[15.6px] leading-[23.4px]">
            {metrics.mood}
          </span>
        </button>

        {/* 3. Water */}
        <button
          type="button"
          onClick={() => onQuickLogMetric('waterCurrentL')}
          className="bg-white rounded-[14.4px] p-3 sm:p-3.5 border border-[#F3F4F6] shadow-sm hover:shadow-md hover:border-blue-200 transition-all flex flex-col items-start text-left group focus:outline-none focus:ring-2 focus:ring-blue-300 min-h-[44px]"
          aria-label={`Water: ${metrics.waterCurrentL} of ${metrics.waterTargetL} Liters. Click to update.`}
        >
          <div className="w-[38.4px] h-[38.4px] rounded-full bg-[#EFF6FF] flex items-center justify-center mb-2 group-hover:scale-105 transition-transform shrink-0">
            <Droplets className="w-4 h-4 text-[#3B82F6]" />
          </div>
          <span className="text-[#9CA3AF] text-[13.2px] leading-[19.8px] mb-0.5">Water</span>
          <span className="text-[#1F2937] font-bold text-[15.6px] leading-[23.4px]">
            {metrics.waterCurrentL} / {metrics.waterTargetL} L
          </span>
        </button>

        {/* 4. Steps */}
        <button
          type="button"
          onClick={() => onQuickLogMetric('steps')}
          className="bg-white rounded-[14.4px] p-3 sm:p-3.5 border border-[#F3F4F6] shadow-sm hover:shadow-md hover:border-emerald-200 transition-all flex flex-col items-start text-left group focus:outline-none focus:ring-2 focus:ring-emerald-300 min-h-[44px]"
          aria-label={`Steps: ${metrics.steps.toLocaleString()}. Click to update.`}
        >
          <div className="w-[38.4px] h-[38.4px] rounded-full bg-[#F0FDF4] flex items-center justify-center mb-2 group-hover:scale-105 transition-transform shrink-0">
            <Footprints className="w-4 h-4 text-[#22C55E]" />
          </div>
          <span className="text-[#9CA3AF] text-[13.2px] leading-[19.8px] mb-0.5">Steps</span>
          <span className="text-[#1F2937] font-bold text-[15.6px] leading-[23.4px]">
            {metrics.steps.toLocaleString()}
          </span>
        </button>

        {/* 5. Weight */}
        <button
          type="button"
          onClick={() => onQuickLogMetric('weightKg')}
          className="bg-white rounded-[14.4px] p-3 sm:p-3.5 border border-[#F3F4F6] shadow-sm hover:shadow-md hover:border-pink-200 transition-all flex flex-col items-start text-left group focus:outline-none focus:ring-2 focus:ring-pink-300 min-h-[44px]"
          aria-label={`Weight: ${metrics.weightKg} kg. Click to update.`}
        >
          <div className="w-[38.4px] h-[38.4px] rounded-full bg-[#FAF5FF] flex items-center justify-center mb-2 group-hover:scale-105 transition-transform shrink-0">
            <Scale className="w-4 h-4 text-[#F755AE]" />
          </div>
          <span className="text-[#9CA3AF] text-[13.2px] leading-[19.8px] mb-0.5">Weight</span>
          <span className="text-[#1F2937] font-bold text-[15.6px] leading-[23.4px]">
            {metrics.weightKg} kg
          </span>
        </button>

        {/* 6. Sex Activity */}
        <button
          type="button"
          onClick={() => onQuickLogMetric('sexActivity')}
          className="bg-white rounded-[14.4px] p-3 sm:p-3.5 border border-[#F3F4F6] shadow-sm hover:shadow-md hover:border-rose-200 transition-all flex flex-col items-start text-left group focus:outline-none focus:ring-2 focus:ring-rose-300 min-h-[44px]"
          aria-label={`Sex Activity: ${metrics.sexActivity}. Click to update.`}
        >
          <div className="w-[38.4px] h-[38.4px] rounded-full bg-[#FEF2F2] flex items-center justify-center mb-2 group-hover:scale-105 transition-transform shrink-0">
            <Heart className="w-4 h-4 text-[#EF4444]" />
          </div>
          <span className="text-[#9CA3AF] text-[13.2px] leading-[19.8px] mb-0.5">Sex Activity</span>
          <span className="text-[#1F2937] font-bold text-[15.6px] leading-[23.4px] truncate">
            {metrics.sexActivity}
          </span>
        </button>
      </div>
    </section>
  );
};
