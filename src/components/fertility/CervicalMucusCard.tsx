import React from 'react';
import { Droplets, Sparkles } from 'lucide-react';
import type { CervicalMucusType } from '../../types';

interface CervicalMucusCardProps {
  selectedType: CervicalMucusType;
  onSelectType: (type: CervicalMucusType) => void;
}

interface MucusOptionConfig {
  type: CervicalMucusType;
  label: string;
  descriptor: string;
  fertilityLevel: string;
  badgeBg: string;
  badgeText: string;
  iconSvg: React.ReactNode;
}

export const CervicalMucusCard: React.FC<CervicalMucusCardProps> = ({
  selectedType,
  onSelectType,
}) => {
  const options: MucusOptionConfig[] = [
    {
      type: 'dry',
      label: 'Dry',
      descriptor: 'Minimal moisture',
      fertilityLevel: 'Low fertility',
      badgeBg: 'bg-gray-100',
      badgeText: 'text-gray-600',
      iconSvg: (
        <svg viewBox="0 0 48 48" className="w-10 h-10" fill="none" stroke="currentColor">
          {/* Subtle dashed/minimal droplet */}
          <path
            d="M24 6 C24 6, 12 20, 12 29 A12 12 0 0 0 36 29 C36 20, 24 6, 24 6 Z"
            className="stroke-gray-300 stroke-[2] stroke-dasharray-[3,3] fill-gray-50/50"
          />
          {/* Minimal texture dots */}
          <circle cx="24" cy="28" r="1.5" className="fill-gray-400" />
          <circle cx="20" cy="33" r="1.2" className="fill-gray-300" />
          <circle cx="28" cy="33" r="1.2" className="fill-gray-300" />
        </svg>
      ),
    },
    {
      type: 'sticky',
      label: 'Sticky',
      descriptor: 'Adhesive / Tacky',
      fertilityLevel: 'Low fertility',
      badgeBg: 'bg-amber-50',
      badgeText: 'text-amber-700',
      iconSvg: (
        <svg viewBox="0 0 48 48" className="w-10 h-10" fill="none">
          {/* Sticky thick texture droplet */}
          <path
            d="M24 6 C24 6, 11 20, 11 30 A13 13 0 0 0 37 30 C37 20, 24 6, 24 6 Z"
            fill="url(#stickyGrad)"
            className="stroke-amber-300/80 stroke-[1.5]"
          />
          <path
            d="M18 27 Q24 24 30 27 Q24 31 18 27"
            stroke="#D97706"
            strokeWidth="1.8"
            strokeLinecap="round"
            fill="none"
            opacity="0.8"
          />
          <path
            d="M20 33 Q24 31 28 33"
            stroke="#D97706"
            strokeWidth="1.5"
            strokeLinecap="round"
            fill="none"
            opacity="0.6"
          />
          <defs>
            <linearGradient id="stickyGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#FEF3C7" />
              <stop offset="100%" stopColor="#FDE68A" />
            </linearGradient>
          </defs>
        </svg>
      ),
    },
    {
      type: 'creamy',
      label: 'Creamy',
      descriptor: 'Lotion-like',
      fertilityLevel: 'Transitional',
      badgeBg: 'bg-rose-50',
      badgeText: 'text-rose-600',
      iconSvg: (
        <svg viewBox="0 0 48 48" className="w-10 h-10" fill="none">
          {/* Smooth creamy droplet */}
          <path
            d="M24 5 C24 5, 10 19, 10 29 A14 14 0 0 0 38 29 C38 19, 24 5, 24 5 Z"
            fill="url(#creamyGrad)"
            className="stroke-pink-300 stroke-[1.5]"
          />
          {/* Silky cream waves */}
          <path
            d="M16 26 C19 22, 28 22, 32 26 C29 30, 20 30, 16 26 Z"
            fill="#FFFFFF"
            opacity="0.8"
          />
          <ellipse cx="21" cy="20" rx="3" ry="5" transform="rotate(-20 21 20)" fill="#FFFFFF" opacity="0.9" />
          <defs>
            <linearGradient id="creamyGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#FFF1F5" />
              <stop offset="100%" stopColor="#FCE7F3" />
            </linearGradient>
          </defs>
        </svg>
      ),
    },
    {
      type: 'watery',
      label: 'Watery',
      descriptor: 'Clear & fluid',
      fertilityLevel: 'High fertility',
      badgeBg: 'bg-sky-50',
      badgeText: 'text-sky-700',
      iconSvg: (
        <svg viewBox="0 0 48 48" className="w-10 h-10" fill="none">
          {/* Translucent water droplet */}
          <path
            d="M24 5 C24 5, 10 19, 10 29 A14 14 0 0 0 38 29 C38 19, 24 5, 24 5 Z"
            fill="url(#wateryGrad)"
            className="stroke-sky-400/80 stroke-[1.5]"
          />
          {/* Concentric ripple rings */}
          <ellipse cx="24" cy="30" rx="8" ry="4" stroke="#0284C7" strokeWidth="1.2" strokeDasharray="3,2" fill="none" opacity="0.7" />
          <ellipse cx="24" cy="30" rx="4" ry="2" stroke="#0284C7" strokeWidth="1" fill="none" opacity="0.9" />
          <circle cx="19" cy="18" r="2.5" fill="#FFFFFF" opacity="0.9" />
          <defs>
            <linearGradient id="wateryGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#E0F2FE" />
              <stop offset="100%" stopColor="#BAE6FD" />
            </linearGradient>
          </defs>
        </svg>
      ),
    },
    {
      type: 'egg_white',
      label: 'Egg White',
      descriptor: 'Stretchy & clear',
      fertilityLevel: 'Peak fertility',
      badgeBg: 'bg-purple-50',
      badgeText: 'text-purple-700',
      iconSvg: (
        <svg viewBox="0 0 48 48" className="w-10 h-10" fill="none">
          {/* Stretchy elastic peak droplet */}
          <path
            d="M24 3 C24 3, 9 18, 9 29 A15 15 0 0 0 39 29 C39 18, 24 3, 24 3 Z"
            fill="url(#eggWhiteGrad)"
            className="stroke-purple-400 stroke-[1.5]"
          />
          {/* Elastic stretchy tension lines */}
          <path
            d="M17 21 C22 28, 26 28, 31 21"
            stroke="#9333EA"
            strokeWidth="1.6"
            strokeLinecap="round"
            fill="none"
            opacity="0.8"
          />
          <path
            d="M19 28 C23 33, 25 33, 29 28"
            stroke="#9333EA"
            strokeWidth="1.4"
            strokeLinecap="round"
            fill="none"
            opacity="0.7"
          />
          {/* Luster highlight spark */}
          <ellipse cx="19" cy="14" rx="2.5" ry="4" transform="rotate(-25 19 14)" fill="#FFFFFF" opacity="0.95" />
          <circle cx="28" cy="18" r="1.5" fill="#FFFFFF" opacity="0.8" />
          <defs>
            <linearGradient id="eggWhiteGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#FAF5FF" />
              <stop offset="100%" stopColor="#E9D5FF" />
            </linearGradient>
          </defs>
        </svg>
      ),
    },
  ];

  return (
    <div className="bg-white rounded-[clamp(1.25rem,2vw,1.5rem)] p-[clamp(1.2rem,2vw,1.56rem)] border border-[#F3F4F6] shadow-soft w-full min-w-0">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 mb-4 sm:mb-5">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-[#FDF2F8] border border-[#FCE7F3] flex items-center justify-center text-[#EC4899] shrink-0">
            <Droplets className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-[clamp(1rem,1.4vw,1.125rem)] font-bold leading-tight text-[#1F2937]">
              Cervical Mucus & Discharge
            </h3>
            <p className="text-[clamp(0.75rem,1vw,0.825rem)] text-[#6B7280] leading-tight mt-0.5">
              Key indicator of natural fertility and estrogen progression
            </p>
          </div>
        </div>

        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#FAF5FF] border border-[#E9D5FF] text-[12px] font-medium text-[#9333EA] self-start sm:self-auto">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Follicular Phase: Transitional</span>
        </div>
      </div>

      {/* 5 Selectable Cards */}
      <div
        role="radiogroup"
        aria-label="Cervical Mucus Type"
        className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 sm:gap-3"
      >
        {options.map((option) => {
          const isSelected = selectedType === option.type;
          return (
            <button
              key={option.type}
              type="button"
              role="radio"
              aria-checked={isSelected}
              onClick={() => onSelectType(option.type)}
              className={`p-3.5 sm:p-4 rounded-[18px] border transition-all duration-200 flex flex-col items-center justify-between text-center relative group focus:outline-none focus:ring-2 focus:ring-[#EA33A1]/40 min-h-[145px] ${
                isSelected
                  ? 'bg-gradient-to-b from-[#FFF5F9] to-[#FFEDF5] border-[#EA33A1] shadow-md scale-[1.02] ring-2 ring-[#EA33A1]/20'
                  : 'bg-[#F9FAFB]/70 hover:bg-white hover:border-pink-200 border-gray-100 shadow-sm'
              }`}
            >
              {/* Selected Badge */}
              {isSelected && (
                <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#EA33A1] ring-4 ring-pink-100" />
              )}

              {/* Visual Icon Illustration */}
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 mb-2">
                {option.iconSvg}
              </div>

              {/* Title & Descriptors */}
              <div className="w-full">
                <span
                  className={`block font-bold text-[14.5px] leading-tight mb-0.5 ${
                    isSelected ? 'text-[#940D43]' : 'text-[#374151]'
                  }`}
                >
                  {option.label}
                </span>
                <span className="block text-[11.5px] leading-tight text-[#6B7280] mb-2 truncate">
                  {option.descriptor}
                </span>

                {/* Fertility Tag */}
                <span
                  className={`inline-block px-2 py-0.5 rounded-md text-[10.5px] font-semibold ${
                    isSelected
                      ? 'bg-[#EA33A1] text-white shadow-xs'
                      : `${option.badgeBg} ${option.badgeText}`
                  }`}
                >
                  {option.fertilityLevel}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
