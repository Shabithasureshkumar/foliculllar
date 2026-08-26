import React from 'react';
import { TestTube, Heart, Flame, Sparkles, AlertCircle } from 'lucide-react';
import type { LhTestResult, LibidoLevel } from '../../types';

interface HormoneAndLibidoCardProps {
  selectedLh: LhTestResult;
  selectedLibido: LibidoLevel;
  onSelectLh: (lh: LhTestResult) => void;
  onSelectLibido: (libido: LibidoLevel) => void;
}

export const HormoneAndLibidoCard: React.FC<HormoneAndLibidoCardProps> = ({
  selectedLh,
  selectedLibido,
  onSelectLh,
  onSelectLibido,
}) => {
  // LH Test Configurations
  const lhOptions: Array<{
    value: LhTestResult;
    label: string;
    sublabel: string;
    ratio: string;
    intensityColor: string;
    testLineWidth: number;
    testLineOpacity: number;
  }> = [
    {
      value: 'negative',
      label: 'Negative',
      sublabel: 'Baseline',
      ratio: '< 10 mIU',
      intensityColor: 'border-gray-200',
      testLineWidth: 0,
      testLineOpacity: 0,
    },
    {
      value: 'low',
      label: 'Low',
      sublabel: 'Faint line',
      ratio: '10–25 mIU',
      intensityColor: 'border-pink-200',
      testLineWidth: 2,
      testLineOpacity: 0.4,
    },
    {
      value: 'high',
      label: 'High',
      sublabel: 'Surge rising',
      ratio: '25–40 mIU',
      intensityColor: 'border-pink-400',
      testLineWidth: 3,
      testLineOpacity: 0.8,
    },
    {
      value: 'peak',
      label: 'Peak',
      sublabel: 'LH Surge!',
      ratio: '≥ 40 mIU',
      intensityColor: 'border-[#EA33A1]',
      testLineWidth: 4,
      testLineOpacity: 1.0,
    },
  ];

  // Libido Configurations
  const libidoOptions: Array<{
    value: LibidoLevel;
    label: string;
    sublabel: string;
    iconSvg: React.ReactNode;
    activeGradient: string;
  }> = [
    {
      value: 'low',
      label: 'Low',
      sublabel: 'Calm & resting',
      iconSvg: (
        <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
          <Heart className="w-4 h-4 text-purple-400" />
        </div>
      ),
      activeGradient: 'from-[#FAF5FF] to-[#F3E8FF] border-purple-300 text-purple-900',
    },
    {
      value: 'medium',
      label: 'Medium',
      sublabel: 'Moderate desire',
      iconSvg: (
        <div className="w-9 h-9 rounded-xl bg-pink-50 text-pink-500 flex items-center justify-center">
          <Sparkles className="w-4 h-4 text-pink-500" />
        </div>
      ),
      activeGradient: 'from-[#FFF1F5] to-[#FCE7F3] border-pink-300 text-pink-900',
    },
    {
      value: 'high',
      label: 'High',
      sublabel: 'Surging drive',
      iconSvg: (
        <div className="w-9 h-9 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center">
          <Flame className="w-4 h-4 text-rose-500 fill-rose-500" />
        </div>
      ),
      activeGradient: 'from-[#FFE4E6] to-[#FECDD3] border-rose-400 text-rose-900',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-[clamp(0.875rem,1.8vw,1.56rem)] w-full min-w-0">
      {/* 1. LH / Ovulation Test Result Card */}
      <div className="bg-white rounded-[clamp(1.25rem,2vw,1.5rem)] p-[clamp(1.2rem,2vw,1.56rem)] border border-[#F3F4F6] shadow-soft flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between gap-2 mb-3">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-pink-50 border border-pink-100 flex items-center justify-center text-pink-500 shrink-0">
                <TestTube className="w-3.5 h-3.5" />
              </div>
              <h3 className="text-[15.5px] font-bold text-[#1F2937]">
                LH / Ovulation Test
              </h3>
            </div>
            {selectedLh === 'peak' ? (
              <span className="px-2 py-0.5 rounded-full bg-rose-100 text-rose-700 font-bold text-[11px] animate-pulse">
                Ovulation in 24–36h
              </span>
            ) : (
              <span className="text-[11.5px] text-[#6B7280]">OPK Strip Tracker</span>
            )}
          </div>

          <p className="text-[12.5px] text-[#4B5563] leading-snug mb-3.5">
            Log your daily ovulation predictor kit test line intensity:
          </p>

          {/* 4 Progression Options */}
          <div
            role="radiogroup"
            aria-label="LH Ovulation Test Result"
            className="grid grid-cols-2 sm:grid-cols-4 gap-2"
          >
            {lhOptions.map((opt) => {
              const isSelected = selectedLh === opt.value;
              return (
                <button
                  key={opt.value}
                  type="button"
                  role="radio"
                  aria-checked={isSelected}
                  onClick={() => onSelectLh(opt.value)}
                  className={`p-2.5 rounded-[16px] border text-center flex flex-col items-center justify-between transition-all relative focus:outline-none focus:ring-2 focus:ring-pink-300 min-h-[96px] ${
                    isSelected
                      ? 'bg-gradient-to-b from-[#FFF5F9] to-[#FFEDF5] border-[#EA33A1] shadow-xs ring-2 ring-[#EA33A1]/20 scale-102'
                      : 'bg-[#F9FAFB] hover:bg-gray-50 border-gray-200'
                  }`}
                >
                  {/* Test Strip Visual Representation */}
                  <div className="w-11 h-4 rounded bg-white border border-gray-200 flex items-center justify-around px-1 mb-1.5 shadow-2xs">
                    {/* Control line C */}
                    <div className="w-1 h-3 rounded-full bg-[#EC4899]" title="Control Line (C)" />
                    {/* Test line T */}
                    <div
                      className="w-1 h-3 rounded-full bg-[#9333EA] transition-opacity"
                      style={{
                        opacity: opt.testLineOpacity,
                        backgroundColor: opt.value === 'peak' ? '#BE185D' : '#EC4899',
                      }}
                      title={`Test Line (T) intensity: ${opt.ratio}`}
                    />
                  </div>

                  <div>
                    <span
                      className={`block text-[13px] font-bold leading-tight ${
                        isSelected ? 'text-[#940D43]' : 'text-[#374151]'
                      }`}
                    >
                      {opt.label}
                    </span>
                    <span className="block text-[10.5px] text-[#6B7280] leading-tight">
                      {opt.ratio}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-3 pt-2.5 border-t border-gray-100 text-[11px] text-[#6B7280] flex items-center gap-1.5">
          <AlertCircle className="w-3.5 h-3.5 text-pink-400 shrink-0" />
          <span>Peak LH stimulates egg release within 24 to 36 hours.</span>
        </div>
      </div>

      {/* 2. Libido / Desire Level Card */}
      <div className="bg-white rounded-[clamp(1.25rem,2vw,1.5rem)] p-[clamp(1.2rem,2vw,1.56rem)] border border-[#F3F4F6] shadow-soft flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between gap-2 mb-3">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-rose-50 border border-rose-100 flex items-center justify-center text-rose-500 shrink-0">
                <Flame className="w-3.5 h-3.5 fill-rose-400" />
              </div>
              <h3 className="text-[15.5px] font-bold text-[#1F2937]">
                Libido & Desire Level
              </h3>
            </div>
            <span className="text-[11.5px] text-[#6B7280]">Estrogen Peak Metric</span>
          </div>

          <p className="text-[12.5px] text-[#4B5563] leading-snug mb-3.5">
            Track your natural sex drive and vitality throughout the cycle:
          </p>

          {/* 3 Selectable Options */}
          <div
            role="radiogroup"
            aria-label="Libido Desire Level"
            className="grid grid-cols-3 gap-2.5"
          >
            {libidoOptions.map((opt) => {
              const isSelected = selectedLibido === opt.value;
              return (
                <button
                  key={opt.value}
                  type="button"
                  role="radio"
                  aria-checked={isSelected}
                  onClick={() => onSelectLibido(opt.value)}
                  className={`p-3 rounded-[16px] border text-center flex flex-col items-center justify-between transition-all relative focus:outline-none focus:ring-2 focus:ring-pink-300 min-h-[96px] ${
                    isSelected
                      ? `bg-gradient-to-b ${opt.activeGradient} shadow-xs ring-2 ring-[#EA33A1]/20 scale-102`
                      : 'bg-[#F9FAFB] hover:bg-gray-50 border-gray-200'
                  }`}
                >
                  <div className="mb-1">{opt.iconSvg}</div>
                  <div>
                    <span
                      className={`block text-[13.5px] font-bold leading-tight ${
                        isSelected ? 'text-[#940D43]' : 'text-[#374151]'
                      }`}
                    >
                      {opt.label}
                    </span>
                    <span className="block text-[10.5px] text-[#6B7280] leading-tight truncate">
                      {opt.sublabel}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-3 pt-2.5 border-t border-gray-100 text-[11px] text-[#6B7280] flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-rose-400 shrink-0" />
          <span>Libido naturally surges as estrogen rises towards ovulation.</span>
        </div>
      </div>
    </div>
  );
};
