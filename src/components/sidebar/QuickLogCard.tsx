import React from 'react';
import { Plus, Droplets, Activity, Smile, Scale, Moon, GlassWater } from 'lucide-react';
import type { QuickLogCategory } from '../../types';

interface QuickLogCardProps {
  onSelectCategory: (category: QuickLogCategory) => void;
}

export const QuickLogCard: React.FC<QuickLogCardProps> = ({ onSelectCategory }) => {
  const quickActions: Array<{
    id: QuickLogCategory;
    label: string;
    icon: React.ReactNode;
    gradient: string;
  }> = [
    {
      id: 'flow',
      label: 'Flow',
      icon: <Droplets className="w-5 h-5 text-white" />,
      gradient: 'from-[#FB7185] to-[#F43F5E]',
    },
    {
      id: 'symptoms',
      label: 'Symptoms',
      icon: <Activity className="w-5 h-5 text-white" />,
      gradient: 'from-[#FA8BCE] to-[#F65CBE]',
    },
    {
      id: 'mood',
      label: 'Mood',
      icon: <Smile className="w-5 h-5 text-white" />,
      gradient: 'from-[#FBBF24] to-[#FB923C]',
    },
    {
      id: 'weight',
      label: 'Weight',
      icon: <Scale className="w-5 h-5 text-white" />,
      gradient: 'from-[#60A5FA] to-[#3B82F6]',
    },
    {
      id: 'sleep',
      label: 'Sleep',
      icon: <Moon className="w-5 h-5 text-white" />,
      gradient: 'from-[#F881F0] to-[#F163C6]',
    },
    {
      id: 'water',
      label: 'Water',
      icon: <GlassWater className="w-5 h-5 text-white" />,
      gradient: 'from-[#22D3EE] to-[#06B6D4]',
    },
  ];

  return (
    <div className="w-full">
      {/* Header */}
      <div className="flex items-center justify-between gap-2 mb-3">
        <h3 className="text-[#1F2937] font-bold text-[16px] leading-[24px]">
          Quick Log
        </h3>
        <button
          type="button"
          onClick={() => onSelectCategory('flow')}
          className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-brand-pink/30 min-h-[44px] min-w-[44px] sm:min-h-0 sm:min-w-0"
          aria-label="Add quick log item"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>

      {/* 2x3 Grid */}
      <div className="grid grid-cols-2 gap-3">
        {quickActions.map((action) => (
          <button
            key={action.id}
            type="button"
            onClick={() => onSelectCategory(action.id)}
            className="bg-white/80 backdrop-blur-sm border border-white/90 rounded-[16px] p-4 flex flex-col items-center justify-center gap-2 shadow-tile hover:shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all focus:outline-none focus:ring-2 focus:ring-brand-pink/40 group min-h-[44px]"
            aria-label={`Log ${action.label}`}
          >
            <div
              className={`w-11 h-11 rounded-[16px] bg-gradient-to-br ${action.gradient} flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform`}
            >
              {action.icon}
            </div>
            <span className="text-[#374151] font-semibold text-[12px] leading-[16px] text-center">
              {action.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};
