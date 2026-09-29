import React from 'react';
import { Info, Zap } from 'lucide-react';
import type { FollicularMood, FollicularEnergy } from '../../types';
import moodAvatar from '../../assets/mood_avatar_small.png';
import moodHappy from '../../assets/mood_happy.png';
import moodCalm from '../../assets/mood_calm.png';
import moodNeutral from '../../assets/mood_neutral.png';
import moodIrritable from '../../assets/mood_irritable.png';
import moodSad from '../../assets/mood_sad.png';

interface MoodAndEnergySectionProps {
  selectedMood: FollicularMood;
  selectedEnergy: FollicularEnergy;
  onSelectMood: (mood: FollicularMood) => void;
  onSelectEnergy: (energy: FollicularEnergy) => void;
}

export const MoodAndEnergySection: React.FC<MoodAndEnergySectionProps> = ({
  selectedMood,
  selectedEnergy,
  onSelectMood,
  onSelectEnergy,
}) => {
  const moodOptions: Array<{ type: FollicularMood; label: string; img: string }> = [
    { type: 'Happy', label: 'Happy', img: moodHappy },
    { type: 'Calm', label: 'Calm', img: moodCalm },
    { type: 'Neutral', label: 'Neutral', img: moodNeutral },
    { type: 'Irritable', label: 'Irritable', img: moodIrritable },
    { type: 'Sad', label: 'Sad', img: moodSad },
  ];

  const energyOptions: Array<{ type: FollicularEnergy; label: string; color: string; fill: string }> = [
    { type: 'Low', label: 'Low', color: 'text-pink-500', fill: 'fill-pink-500' },
    { type: 'Moderate', label: 'Moderate', color: 'text-amber-500', fill: 'fill-amber-500' },
    { type: 'High', label: 'High', color: 'text-red-500', fill: 'fill-red-500' },
  ];

  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-3.5 sm:gap-4 items-stretch text-left">
      {/* 1. Mood Card */}
      <div className="bg-white rounded-[24px] p-4 sm:p-5 border border-[#F1DDE8]/70 shadow-sm flex flex-col justify-between">
        <div>
          {/* Header */}
          <div className="flex items-center justify-between gap-2 mb-1">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-full overflow-hidden border border-pink-200 shrink-0">
                <img
                  src={moodAvatar}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-card-title font-semibold text-[#17152B]">
                Mood
              </h3>
            </div>
            <span title="Mood is shown in Overview: Cycle Insights (Body & Mind)" role="img" aria-label="Mood is shown in Overview Cycle Insights">
              <Info className="w-4 h-4 text-[#68708A]" aria-hidden="true" />
            </span>
          </div>

          <p className="text-[11px] text-[#68708A] mb-3">
            Select how you feel today
          </p>

          {/* 5 Faces Grid */}
          <div className="grid grid-cols-5 gap-1.5 sm:gap-2">
            {moodOptions.map((opt) => {
              const isSelected = selectedMood === opt.type;
              return (
                <button
                  key={opt.type}
                  type="button"
                  aria-pressed={isSelected}
                  data-testid={`mood-option-${opt.type}`}
                  onClick={() => onSelectMood(opt.type)}
                  className={`flex flex-col items-center justify-between p-2 rounded-[18px] border transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-300 min-h-[72px] ${
                    isSelected
                      ? 'bg-[#FFF0F6] border-[#F43F8F] shadow-2xs scale-102'
                      : 'bg-white hover:bg-gray-50 border-gray-100'
                  }`}
                >
                  <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-full overflow-hidden mb-1 shrink-0">
                    <img
                      src={opt.img}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span
                    className={`text-[10px] sm:text-[11px] font-semibold leading-tight ${
                      isSelected ? 'text-[#F43F8F]' : 'text-[#17152B]'
                    }`}
                  >
                    {opt.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* 2. Energy Level Card */}
      <div className="bg-white rounded-[24px] p-4 sm:p-5 border border-[#F1DDE8]/70 shadow-sm flex flex-col justify-between">
        <div>
          {/* Header */}
          <div className="flex items-center justify-between gap-2 mb-1">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-full bg-[#FFF0F6] text-[#F43F8F] flex items-center justify-center shrink-0">
                <Zap className="w-3.5 h-3.5 fill-[#F43F8F]" />
              </div>
              <h3 className="text-card-title font-semibold text-[#17152B]">
                Energy Level
              </h3>
            </div>
            <span title="Energy is shown in Overview: Cycle Insights (Energy Level)" role="img" aria-label="Energy is shown in Overview Cycle Insights">
              <Info className="w-4 h-4 text-[#68708A]" aria-hidden="true" />
            </span>
          </div>

          <p className="text-[11px] text-[#68708A] mb-3">
            How is your energy today?
          </p>

          {/* 3 Energy Level Options */}
          <div className="grid grid-cols-3 gap-2">
            {energyOptions.map((opt) => {
              const isSelected = selectedEnergy === opt.type;
              return (
                <button
                  key={opt.type}
                  type="button"
                  aria-pressed={isSelected}
                  data-testid={`energy-option-${opt.type}`}
                  onClick={() => onSelectEnergy(opt.type)}
                  className={`flex flex-col items-center justify-center p-3 rounded-[18px] border transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-300 min-h-[72px] ${
                    isSelected
                      ? 'bg-[#FFF0F6] border-[#F43F8F] shadow-2xs scale-102'
                      : 'bg-white hover:bg-gray-50 border-gray-100'
                  }`}
                >
                  <Zap className={`w-5 h-5 mb-1 ${opt.color} ${opt.fill}`} />
                  <span
                    className={`text-[11px] sm:text-[12px] font-bold ${
                      isSelected ? 'text-[#F43F8F]' : 'text-[#17152B]'
                    }`}
                  >
                    {opt.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
