import React, { useState } from 'react';
import { Plus, Star, Sparkles, Activity, Flame, Dumbbell, Footprints, Wind, BarChart3, Target, Droplet } from 'lucide-react';
import type { BodyChangesState, ActivityLog } from '../types';
import meditationImg from '../assets/meditation.png';
import { ENERGY_TREND_DATA } from '../data/mockData';

interface FollicularSectionProps {
  bodyChanges: BodyChangesState;
  activities: ActivityLog[];
  onOpenLogActivity: () => void;
  onUpdateBodyChanges: (newChanges: Partial<BodyChangesState>) => void;
}

export const FollicularSection: React.FC<FollicularSectionProps> = ({
  bodyChanges,
  activities,
  onOpenLogActivity,
  onUpdateBodyChanges,
}) => {
  const [hoveredBarIndex, setHoveredBarIndex] = useState<number | null>(null);

  const completedActivitiesCount = activities.filter((a) => a.durationMin > 0).length;
  const totalActivitiesCount = activities.length;
  const completionPercentage = Math.round((completedActivitiesCount / (totalActivitiesCount || 1)) * 100);

  const getActivityIcon = (type: ActivityLog['type']) => {
    switch (type) {
      case 'walking':
        return <Footprints className="w-4 h-4 text-gray-700" />;
      case 'cardio':
        return <Flame className="w-4 h-4 text-orange-500" />;
      case 'yoga':
        return <Wind className="w-4 h-4 text-purple-600" />;
      case 'strength':
        return <Dumbbell className="w-4 h-4 text-blue-600" />;
      default:
        return <Activity className="w-4 h-4 text-pink-600" />;
    }
  };

  return (
    <section className="bg-[#FFDEE9] rounded-[clamp(1.25rem,2.5vw,2rem)] p-[clamp(1rem,2vw,1.75rem)] border border-[#EBE6EC] shadow-section w-full min-w-0">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 mb-[clamp(1rem,1.8vw,1.5rem)]">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-[18px] bg-white/70 backdrop-blur-md flex items-center justify-center shadow-icon border border-white/70 shrink-0">
            <Droplet className="w-5 h-5 text-[#E5469D] fill-[#E5469D]" />
          </div>
          <h2 className="text-[clamp(1.25rem,1.8vw,1.5rem)] font-bold leading-tight tracking-[-0.75px] text-[#26214E]">
            Follicular Phase
          </h2>
        </div>
        <div className="text-[clamp(0.8rem,1vw,0.875rem)] text-[#716D8D] font-normal self-start sm:self-auto pl-1 sm:pl-0">
          Today, 21 June 2026
        </div>
      </div>

      {/* Top 2 Highlight Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-[clamp(0.875rem,1.8vw,1.25rem)] mb-[clamp(0.875rem,1.8vw,1.25rem)]">
        {/* Card 1: Energy is rising */}
        <div className="bg-gradient-energy-card rounded-[clamp(1.5rem,3vw,3rem)] p-[clamp(1.2rem,2.2vw,1.75rem)] flex flex-col justify-between shadow-soft border border-white/60 min-h-[175px]">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/50 backdrop-blur-sm mb-3">
              <span className="text-base" role="img" aria-label="sprout">🌱</span>
              <span className="text-[clamp(0.8rem,1vw,0.88rem)] font-medium text-[#801543]">
                Follicular Phase
              </span>
            </div>
            <h3 className="text-[clamp(1.25rem,2vw,1.58rem)] font-bold leading-snug text-[#1F2937] mb-2">
              Energy is rising.
            </h3>
            <p className="text-[clamp(0.85rem,1.15vw,0.98rem)] leading-relaxed text-[#4B5563]">
              Your body is preparing for ovulation. This is a great time to stay active, eat well, and build healthy habits.
            </p>
          </div>
        </div>

        {/* Card 2: Current Phase & 3D Illustration */}
        <div className="bg-white rounded-[clamp(1.5rem,3vw,2.94rem)] p-[clamp(1.2rem,2.2vw,1.75rem)] border-[clamp(6px,0.8vw,10.8px)] border-[#FFF1F5] shadow-float relative overflow-hidden flex flex-col justify-between min-h-[175px]">
          <div className="relative z-10 max-w-[200px] sm:max-w-[240px]">
            <div className="flex items-center gap-1.5 text-[28px] mb-1">
              <span role="img" aria-label="tulip">🌷</span>
            </div>
            <span className="text-[clamp(0.75rem,1vw,0.98rem)] font-normal uppercase tracking-[0.79px] text-[#191928]/60 block mb-1">
              CURRENT PHASE
            </span>
            <h3 className="text-[clamp(1.2rem,1.8vw,1.47rem)] font-semibold leading-tight text-[#191928] mb-0.5">
              Follicular
            </h3>
            <p className="text-[clamp(0.85rem,1.1vw,0.98rem)] leading-snug text-[#191928]/60">
              High energy days
            </p>
          </div>

          {/* Floating 3D meditating character image */}
          <div className="absolute right-1 bottom-0 sm:right-3 sm:-bottom-1 w-[clamp(115px,16vw,190px)] h-[clamp(115px,16vw,190px)] pointer-events-none drop-shadow-glow-pink">
            <img
              src={meditationImg}
              alt="Meditation yoga illustration"
              className="w-full h-full object-contain object-bottom select-none"
              loading="eager"
            />
          </div>
        </div>
      </div>

      {/* Body Changes Card */}
      <div className="bg-white rounded-[clamp(1.25rem,2vw,1.5rem)] p-[clamp(1.2rem,2vw,1.56rem)] border border-[#F3F4F6] shadow-soft mb-[clamp(0.875rem,1.8vw,1.25rem)]">
        <h3 className="text-[clamp(1rem,1.4vw,1.125rem)] font-bold leading-tight text-[#1F2937] mb-4 sm:mb-5">
          Body Changes
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-[clamp(0.875rem,1.8vw,1.56rem)]">
          {/* Skin Changes */}
          <div className="bg-gradient-skin rounded-[16px] p-[clamp(1rem,1.5vw,1.3rem)] border border-[#FCE7F3]">
            <div className="flex items-center gap-2 mb-3.5">
              <Sparkles className="w-5 h-5 text-[#EC4899]" />
              <h4 className="text-[16px] font-medium leading-[25px] text-[#374151]">
                Skin Changes
              </h4>
            </div>

            <div className="space-y-3 text-[13.5px] leading-[20px]">
              <div className="flex items-center justify-between">
                <span className="text-[#4B5563]">Glow</span>
                <div className="flex items-center gap-1" aria-label={`Glow rating: ${bodyChanges.glowRating} of 5 stars`}>
                  {[1, 2, 3, 4, 5].map((starIndex) => (
                    <button
                      key={starIndex}
                      type="button"
                      onClick={() => onUpdateBodyChanges({ glowRating: starIndex })}
                      className="focus:outline-none focus:scale-125 transition-transform p-0.5"
                      title={`Set glow to ${starIndex} stars`}
                      aria-label={`Rate glow ${starIndex} stars`}
                    >
                      <Star
                        className={`w-4 h-4 ${
                          starIndex <= bodyChanges.glowRating
                            ? 'text-amber-400 fill-amber-400'
                            : 'text-gray-300'
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-[#4B5563]">Acne</span>
                <button
                  type="button"
                  onClick={() => {
                    const next: Record<string, BodyChangesState['acne']> = {
                      Minimal: 'Mild',
                      Mild: 'Moderate',
                      Moderate: 'Severe',
                      Severe: 'Minimal',
                    };
                    onUpdateBodyChanges({ acne: next[bodyChanges.acne] });
                  }}
                  className="text-[#9CA3AF] hover:text-gray-700 font-normal focus:outline-none transition-colors p-1 -m-1"
                  aria-label={`Change acne level, currently ${bodyChanges.acne}`}
                >
                  {bodyChanges.acne}
                </button>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-[#4B5563]">Oiliness</span>
                <button
                  type="button"
                  onClick={() => {
                    const next: Record<string, BodyChangesState['oiliness']> = {
                      Low: 'Normal',
                      Normal: 'High',
                      High: 'Low',
                    };
                    onUpdateBodyChanges({ oiliness: next[bodyChanges.oiliness] });
                  }}
                  className="text-[#9CA3AF] hover:text-gray-700 font-normal focus:outline-none transition-colors p-1 -m-1"
                  aria-label={`Change oiliness level, currently ${bodyChanges.oiliness}`}
                >
                  {bodyChanges.oiliness}
                </button>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-[#4B5563]">Texture</span>
                <button
                  type="button"
                  onClick={() => {
                    const next: Record<string, BodyChangesState['texture']> = {
                      Smooth: 'Uneven',
                      Uneven: 'Rough',
                      Rough: 'Smooth',
                    };
                    onUpdateBodyChanges({ texture: next[bodyChanges.texture] });
                  }}
                  className="text-[#A3165F] font-medium hover:underline focus:outline-none p-1 -m-1"
                  aria-label={`Change texture, currently ${bodyChanges.texture}`}
                >
                  {bodyChanges.texture}
                </button>
              </div>
            </div>
          </div>

          {/* Digestive Health */}
          <div className="bg-gradient-digestive rounded-[16px] p-[clamp(1rem,1.5vw,1.3rem)] border border-[#FEF3C7]">
            <div className="flex items-center gap-2 mb-3.5">
              <Activity className="w-5 h-5 text-amber-500" />
              <h4 className="text-[15.7px] font-medium leading-[25px] text-[#374151]">
                Digestive Health
              </h4>
            </div>

            <div className="space-y-3 text-[13.5px] leading-[20px]">
              <div className="flex items-center justify-between">
                <span className="text-[#4B5563]">Status</span>
                <button
                  type="button"
                  onClick={() => {
                    const next: Record<string, BodyChangesState['digestiveStatus']> = {
                      Normal: 'Sluggish',
                      Sluggish: 'Active',
                      Active: 'Normal',
                    };
                    onUpdateBodyChanges({ digestiveStatus: next[bodyChanges.digestiveStatus] });
                  }}
                  className="text-[#A3165F] font-medium hover:underline focus:outline-none p-1 -m-1"
                  aria-label={`Change digestive status, currently ${bodyChanges.digestiveStatus}`}
                >
                  {bodyChanges.digestiveStatus}
                </button>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-[#4B5563]">Bloating</span>
                <button
                  type="button"
                  onClick={() => {
                    const next: Record<string, BodyChangesState['bloating']> = {
                      None: 'Mild',
                      Mild: 'Moderate',
                      Moderate: 'Severe',
                      Severe: 'None',
                    };
                    onUpdateBodyChanges({ bloating: next[bodyChanges.bloating] });
                  }}
                  className="text-[#9CA3AF] hover:text-gray-700 font-normal focus:outline-none transition-colors p-1 -m-1"
                  aria-label={`Change bloating level, currently ${bodyChanges.bloating}`}
                >
                  {bodyChanges.bloating}
                </button>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-[#4B5563]">Constipation</span>
                <button
                  type="button"
                  onClick={() => {
                    const next: Record<string, BodyChangesState['constipation']> = {
                      None: 'Mild',
                      Mild: 'Moderate',
                      Moderate: 'None',
                    };
                    onUpdateBodyChanges({ constipation: next[bodyChanges.constipation] });
                  }}
                  className="text-[#9CA3AF] hover:text-gray-700 font-normal focus:outline-none transition-colors p-1 -m-1"
                  aria-label={`Change constipation level, currently ${bodyChanges.constipation}`}
                >
                  {bodyChanges.constipation}
                </button>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-[#4B5563]">Appetite</span>
                <button
                  type="button"
                  onClick={() => {
                    const next: Record<string, BodyChangesState['appetite']> = {
                      Healthy: 'Low',
                      Low: 'High',
                      High: 'Cravings',
                      Cravings: 'Healthy',
                    };
                    onUpdateBodyChanges({ appetite: next[bodyChanges.appetite] });
                  }}
                  className="text-[#A3165F] font-medium hover:underline focus:outline-none p-1 -m-1"
                  aria-label={`Change appetite level, currently ${bodyChanges.appetite}`}
                >
                  {bodyChanges.appetite}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Energy & Fitness Card */}
      <div className="bg-white rounded-[clamp(1.25rem,2vw,1.5rem)] p-[clamp(1.2rem,2vw,1.56rem)] border border-[#F3F4F6] shadow-soft">
        <div className="flex items-center justify-between gap-4 mb-5 sm:mb-6">
          <h3 className="text-[clamp(1rem,1.4vw,1.125rem)] font-bold leading-tight text-[#1F2937]">
            Energy & Fitness
          </h3>
          <button
            type="button"
            onClick={onOpenLogActivity}
            className="flex items-center gap-1.5 px-3.5 sm:px-4 py-2 rounded-[12px] bg-[#FF70A4] hover:bg-[#F43F5E] text-white text-[clamp(0.8rem,1vw,0.875rem)] font-medium transition-all shadow-sm active:scale-95 focus:outline-none focus:ring-2 focus:ring-brand-pink/40 min-h-[44px] sm:min-h-0"
          >
            <Plus className="w-4 h-4" />
            <span>Log Activity</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Left: Activity Tracker */}
          <div className="lg:col-span-6 flex flex-col justify-between">
            <h4 className="text-[14px] font-medium leading-[20px] text-[#374151] mb-3.5">
              Activity Tracker
            </h4>

            <div className="space-y-3.5 sm:space-y-4">
              {activities.map((act) => {
                const progressPct = Math.min(100, Math.round((act.durationMin / (act.targetMin || 1)) * 100));
                return (
                  <button
                    key={act.id}
                    type="button"
                    onClick={onOpenLogActivity}
                    className="w-full flex items-center gap-3 p-1.5 -m-1.5 rounded-xl hover:bg-gray-50/80 transition-colors text-left focus:outline-none focus:ring-2 focus:ring-brand-pink/30 group"
                    aria-label={`Log more ${act.name}, currently ${act.durationMin} minutes of ${act.targetMin} minutes goal`}
                  >
                    <div className="w-9 h-9 rounded-xl bg-[#F9FAFB] flex items-center justify-center shrink-0 border border-gray-100 group-hover:scale-105 transition-transform">
                      {getActivityIcon(act.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between text-[14px] leading-[20px] mb-1.5">
                        <span className="text-[#374151] font-normal truncate group-hover:text-brand-berry transition-colors">
                          {act.name}
                        </span>
                        <span className="text-[#6B7280] font-normal text-[13.7px] shrink-0">
                          {act.durationMin} min
                        </span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-[#F1F5F9] overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-500"
                          style={{
                            width: `${progressPct}%`,
                            background:
                              act.durationMin > 0
                                ? `linear-gradient(180deg, ${act.gradientFrom} 0%, ${act.gradientTo} 100%)`
                                : '#F1F5F9',
                          }}
                        />
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right: Trend & Donut Completion */}
          <div className="lg:col-span-6 flex flex-col gap-4">
            {/* Energy Trend */}
            <div className="bg-gradient-trend rounded-[16px] p-4 sm:p-4.5 border border-[#FCDCE8] flex-1 flex flex-col justify-between">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <BarChart3 className="w-4 h-4 text-[#A3165F]" />
                  <h4 className="text-[13.7px] font-medium text-[#374151]">
                    Energy Trend
                  </h4>
                </div>
                {hoveredBarIndex !== null && (
                  <span className="text-xs font-semibold text-brand-berry animate-in fade-in">
                    {ENERGY_TREND_DATA[hoveredBarIndex].fullDay}: {ENERGY_TREND_DATA[hoveredBarIndex].energyLevel}
                  </span>
                )}
              </div>

              {/* Bar Chart Visual */}
              <div className="flex items-end justify-between gap-1.5 h-16 pt-2 px-1">
                {ENERGY_TREND_DATA.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex-1 flex flex-col items-center justify-end group relative cursor-pointer"
                    onMouseEnter={() => setHoveredBarIndex(idx)}
                    onMouseLeave={() => setHoveredBarIndex(null)}
                  >
                    <div
                      className="w-full max-w-[39px] rounded-t-[4px] bg-gradient-to-b from-[#DE4A92] to-[#E76EA2] transition-all duration-300 group-hover:brightness-110 group-hover:scale-y-105 origin-bottom"
                      style={{ height: `${item.heightPx}px` }}
                      title={`${item.day}: ${item.energyLevel}`}
                    />
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-between text-[12px] leading-[16px] text-[#9CA3AF] pt-1 px-1">
                <span>Mon</span>
                <span>Today</span>
              </div>
            </div>

            {/* Activity Completion */}
            <div className="bg-gradient-completion rounded-[16px] p-4 sm:p-4.5 border border-[#FBCCE8] flex items-center gap-4">
              {/* Circular Donut Gauge */}
              <div className="relative w-16 h-16 shrink-0 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                  <path
                    className="text-pink-100"
                    strokeWidth="3.5"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <path
                    className="text-[#DE4A92]"
                    strokeDasharray={`${completionPercentage}, 100`}
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center text-[14px] font-bold text-[#374151]">
                  {completionPercentage}%
                </div>
              </div>

              <div>
                <div className="flex items-center gap-1.5 mb-0.5">
                  <Target className="w-3.5 h-3.5 text-[#940D43]" />
                  <span className="text-[13px] font-medium text-[#374151]">
                    Activity Completion
                  </span>
                </div>
                <h5 className="text-[14px] font-medium leading-[20px] text-[#374151]">
                  Great progress!
                </h5>
                <p className="text-[11.6px] leading-[16px] text-[#6B7280]">
                  {completedActivitiesCount} of {totalActivitiesCount} activities logged
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
