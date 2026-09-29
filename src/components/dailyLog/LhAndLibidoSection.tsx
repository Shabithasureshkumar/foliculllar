import React from 'react';
import { TestTube, Flame, Heart, Sparkles, AlertCircle } from 'lucide-react';
import type { LhTestResult, LibidoLevel } from '../../types';

interface LhAndLibidoSectionProps {
  selectedLh: LhTestResult | null;
  selectedLibido: LibidoLevel | null;
  /** Receive null when the selected option is clicked again (clears it) */
  onSelectLh: (lh: LhTestResult | null) => void;
  onSelectLibido: (libido: LibidoLevel | null) => void;
}

export const LhAndLibidoSection: React.FC<LhAndLibidoSectionProps> = ({
  selectedLh,
  selectedLibido,
  onSelectLh,
  onSelectLibido,
}) => {
  const lhOptions: Array<{
    value: LhTestResult;
    label: string;
    ratio: string;
    testOpacity: number;
    isPeak?: boolean;
  }> = [
    { value: 'negative', label: 'Negative', ratio: '< 10 mIU', testOpacity: 0 },
    { value: 'low', label: 'Low', ratio: '10–25 mIU', testOpacity: 0.4 },
    { value: 'high', label: 'High', ratio: '25–40 mIU', testOpacity: 0.75 },
    { value: 'peak', label: 'Peak', ratio: '≥ 40 mIU', testOpacity: 1.0, isPeak: true },
  ];

  const libidoOptions: Array<{
    value: LibidoLevel;
    label: string;
    subtitle: string;
    icon: React.ReactNode;
  }> = [
    {
      value: 'low',
      label: 'Low',
      subtitle: 'Calm & resting',
      icon: <Heart className="w-4 h-4 text-purple-400" />,
    },
    {
      value: 'medium',
      label: 'Medium',
      subtitle: 'Moderate desire',
      icon: <Sparkles className="w-4 h-4 text-pink-500" />,
    },
    {
      value: 'high',
      label: 'High',
      subtitle: 'Surging drive',
      icon: <Flame className="w-4 h-4 text-rose-500 fill-rose-500" />,
    },
  ];

  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-3.5 sm:gap-4 items-stretch text-left">
      {/* 1. LH / Ovulation Test */}
      <div className="bg-white rounded-[24px] p-4 sm:p-5 border border-[#F1DDE8]/70 shadow-sm flex flex-col justify-between">
        <div>
          {/* Header */}
          <div className="flex items-center justify-between gap-2 mb-1">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-[#FFF0F6] text-[#F43F8F] flex items-center justify-center shrink-0">
                <TestTube className="w-3.5 h-3.5" />
              </div>
              <h3 className="text-card-title font-semibold text-[#17152B]">
                LH / Ovulation Test
              </h3>
            </div>
            <span className="text-[10.5px] text-[#68708A] text-right">OPK Strip Tracker</span>
          </div>

          <p className="text-[11px] text-[#68708A] mb-3">
            Log your daily ovulation predictor kit test line intensity:
          </p>

          {/* 4 Progression Cards */}
          <div
            role="group"
            aria-label="LH ovulation test result"
            className="grid grid-cols-2 sm:grid-cols-4 gap-2"
          >
            {lhOptions.map((opt) => {
              const isSelected = selectedLh === opt.value;
              return (
                <button
                  key={opt.value}
                  type="button"
                  aria-pressed={isSelected}
                  data-testid={`lh-option-${opt.value}`}
                  onClick={() => onSelectLh(isSelected ? null : opt.value)}
                  className={`p-2.5 rounded-[18px] border flex flex-col items-center justify-between text-center transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-300 min-h-[92px] ${
                    isSelected
                      ? 'bg-[#FFF0F6] border-[#F43F8F] shadow-2xs scale-102'
                      : 'bg-[#F9FAFB] hover:bg-gray-100 border-gray-200/80'
                  }`}
                >
                  {/* Cassette visualization */}
                  <div className="w-10 h-3.5 rounded bg-white border border-gray-200 flex items-center justify-around px-1 mb-1.5 shadow-3xs">
                    <div className="w-1 h-2.5 rounded-full bg-[#F43F8F]" title="Control Line (C)" />
                    <div
                      className="w-1 h-2.5 rounded-full transition-opacity"
                      style={{
                        opacity: opt.testOpacity,
                        backgroundColor: opt.isPeak ? '#BE185D' : '#F43F8F',
                      }}
                      title="Test Line (T)"
                    />
                  </div>

                  <div>
                    <span
                      className={`text-[12.5px] font-bold block leading-tight ${
                        isSelected ? 'text-[#F43F8F]' : 'text-[#17152B]'
                      }`}
                    >
                      {opt.label}
                    </span>
                    <span className="text-[10px] text-[#68708A] block leading-tight mt-0.5">
                      {opt.ratio}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-3 pt-2.5 border-t border-[#F1DDE8]/50 text-[10.5px] text-[#68708A] flex items-center gap-1.5">
          <AlertCircle className="w-3.5 h-3.5 text-pink-400 shrink-0" />
          <span>Peak LH stimulates egg release within 24 to 36 hours.</span>
        </div>
      </div>

      {/* 2. Libido & Desire Level */}
      <div className="bg-white rounded-[24px] p-4 sm:p-5 border border-[#F1DDE8]/70 shadow-sm flex flex-col justify-between">
        <div>
          {/* Header */}
          <div className="flex items-center justify-between gap-2 mb-1">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-[#FFF0F6] text-[#F43F8F] flex items-center justify-center shrink-0">
                <Flame className="w-3.5 h-3.5 fill-[#F43F8F]" />
              </div>
              <h3 className="text-card-title font-semibold text-[#17152B]">
                Libido & Desire Level
              </h3>
            </div>
            <span className="text-[10.5px] text-[#68708A] text-right">Estrogen Peak Metric</span>
          </div>

          <p className="text-[11px] text-[#68708A] mb-3">
            Track your natural sex drive and vitality throughout the cycle:
          </p>

          {/* 3 Selectable Options */}
          <div
            role="group"
            aria-label="Libido and desire level"
            className="grid grid-cols-3 gap-2"
          >
            {libidoOptions.map((opt) => {
              const isSelected = selectedLibido === opt.value;
              return (
                <button
                  key={opt.value}
                  type="button"
                  aria-pressed={isSelected}
                  data-testid={`libido-option-${opt.value}`}
                  onClick={() => onSelectLibido(isSelected ? null : opt.value)}
                  className={`p-3 rounded-[18px] border flex flex-col items-center justify-between text-center transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-300 min-h-[92px] ${
                    isSelected
                      ? 'bg-[#FFF0F6] border-[#F43F8F] shadow-2xs scale-102'
                      : 'bg-[#F9FAFB] hover:bg-gray-100 border-gray-200/80'
                  }`}
                >
                  <div className="mb-1">{opt.icon}</div>
                  <div>
                    <span
                      className={`text-[12.5px] font-bold block leading-tight ${
                        isSelected ? 'text-[#F43F8F]' : 'text-[#17152B]'
                      }`}
                    >
                      {opt.label}
                    </span>
                    <span className="text-[10px] text-[#68708A] block leading-tight mt-0.5 truncate">
                      {opt.subtitle}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-3 pt-2.5 border-t border-[#F1DDE8]/50 text-[10.5px] text-[#68708A] flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-pink-400 shrink-0" />
          <span>Libido naturally surges as estrogen rises towards ovulation.</span>
        </div>
      </div>
    </div>
  );
};
