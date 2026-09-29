import React from 'react';
import { Droplets, Sparkles } from 'lucide-react';
import type { CervicalMucusType } from '../../types';
import mucusDry from '../../assets/mucus_dry.png';
import mucusSticky from '../../assets/mucus_sticky.png';
import mucusCreamy from '../../assets/mucus_creamy.png';
import mucusWatery from '../../assets/mucus_watery.png';
import mucusEggwhite from '../../assets/mucus_eggwhite.png';

interface CervicalMucusSectionProps {
  /** Short phase name, e.g. "Follicular" */
  phaseBadge: string;
  selectedMucus: CervicalMucusType;
  onSelectMucus: (mucus: CervicalMucusType) => void;
}

export const CervicalMucusSection: React.FC<CervicalMucusSectionProps> = ({
  phaseBadge,
  selectedMucus,
  onSelectMucus,
}) => {
  const mucusList: Array<{
    type: CervicalMucusType;
    label: string;
    description: string;
    fertilityTag: string;
    tagColor: string;
    img: string;
  }> = [
    {
      type: 'dry',
      label: 'Dry',
      description: 'Minimal moisture',
      fertilityTag: 'Low fertility',
      tagColor: 'bg-gray-100 text-gray-600',
      img: mucusDry,
    },
    {
      type: 'sticky',
      label: 'Sticky',
      description: 'Adhesive / Tacky',
      fertilityTag: 'Low fertility',
      tagColor: 'bg-amber-50 text-amber-700 border border-amber-200',
      img: mucusSticky,
    },
    {
      type: 'creamy',
      label: 'Creamy',
      description: 'Lotion-like',
      fertilityTag: 'Transitional',
      tagColor: 'bg-[#FDF2F8] text-[#EC4899] border border-pink-200',
      img: mucusCreamy,
    },
    {
      type: 'watery',
      label: 'Watery',
      description: 'Clear & fluid',
      fertilityTag: 'High fertility',
      tagColor: 'bg-blue-50 text-blue-700 border border-blue-200',
      img: mucusWatery,
    },
    {
      type: 'egg_white',
      label: 'Egg White',
      description: 'Stretchy & clear',
      fertilityTag: 'Peak fertility',
      tagColor: 'bg-pink-50 text-pink-700 border border-pink-200',
      img: mucusEggwhite,
    },
  ];

  const selectedTag = mucusList.find((m) => m.type === selectedMucus)?.fertilityTag ?? '';

  return (
    <div className="w-full bg-white rounded-[24px] p-4 sm:p-5 border border-[#F1DDE8]/70 shadow-sm text-left">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3.5">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-full bg-[#FFF0F6] text-[#F43F8F] flex items-center justify-center shrink-0">
            <Droplets className="w-3.5 h-3.5 fill-[#F43F8F]" />
          </div>
          <div>
            <h3 className="text-section-title font-semibold text-[#17152B]">
              Cervical Mucus & Discharge
            </h3>
            <p className="text-[11px] sm:text-[11.5px] text-[#68708A] leading-tight mt-0.5">
              Key indicator of natural fertility and estrogen progression
            </p>
          </div>
        </div>

        {/* Phase Pill */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF5FF] border border-[#F3E8FF] text-[11px] font-semibold text-[#8B5CF6] self-start sm:self-auto">
          <Sparkles className="w-3 h-3 text-[#9333EA]" />
          <span>{phaseBadge} Phase: {selectedTag}</span>
        </div>
      </div>

      {/* 5 Selectable Illustrated Cards */}
      <div
        role="radiogroup"
        aria-label="Cervical Mucus Type"
        className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 sm:gap-3"
      >
        {mucusList.map((item) => {
          const isSelected = selectedMucus === item.type;
          return (
            <button
              key={item.type}
              type="button"
              role="radio"
              aria-checked={isSelected}
              data-testid={`mucus-option-${item.type}`}
              onClick={() => onSelectMucus(item.type)}
              className={`relative p-3 rounded-[20px] border flex flex-col items-center justify-between text-center transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-300 min-h-[150px] ${
                isSelected
                  ? 'bg-[#FFF0F6] border-[#F43F8F] shadow-2xs ring-2 ring-[#F43F8F]/20 scale-102'
                  : 'bg-[#FCFCFD] hover:bg-gray-50 border-gray-100 shadow-3xs'
              }`}
            >
              {/* Pink dot in top-right when selected */}
              {isSelected && (
                <div className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-[#F43F8F]" />
              )}

              {/* Hand/Finger Image */}
              <div className="w-12 h-12 sm:w-14 sm:h-14 my-1 shrink-0 flex items-center justify-center">
                <img
                  src={item.img}
                  alt=""
                  width={268}
                  height={313}
                  className="w-full h-full object-contain"
                />
              </div>

              <div>
                <span
                  className={`text-[13px] font-bold block leading-tight ${
                    isSelected ? 'text-[#17152B]' : 'text-gray-800'
                  }`}
                >
                  {item.label}
                </span>
                <span className="text-[10px] text-[#68708A] block leading-tight mt-0.5 mb-2">
                  {item.description}
                </span>

                <span
                  className={`inline-block px-2 py-0.5 rounded-full text-[9px] font-semibold leading-tight ${item.tagColor}`}
                >
                  {item.fertilityTag}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
