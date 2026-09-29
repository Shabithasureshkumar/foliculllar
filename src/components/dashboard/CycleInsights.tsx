import React from 'react';
import { Zap, Brain, Activity } from 'lucide-react';
import type { FollicularEnergy, FollicularMood } from '../../types';

interface CycleInsightsProps {
  energyLevel: FollicularEnergy;
  mood: FollicularMood;
  hormone: { title: string; desc: string };
}

export const CycleInsights: React.FC<CycleInsightsProps> = ({ energyLevel, mood, hormone }) => {
  // Dynamic calculation of energy segments (out of 13)
  const energyFilledSegments = energyLevel === 'High' ? 10 : energyLevel === 'Moderate' ? 7 : 3;

  const energyText =
    energyLevel === 'High'
      ? 'You may feel more energetic as estrogen levels rise.'
      : energyLevel === 'Moderate'
      ? 'Your energy is steady. Great balance for productive daily focus.'
      : 'Rest and restorative sleep can help your body recharge today.';

  // Mood description mapping
  const moodMap: Record<FollicularMood, { title: string; desc: string }> = {
    Irritable: {
      title: 'Energy may be lower',
      desc: 'You may feel more tired or less energetic during this phase. Rest and balanced nutrition can help support your wellbeing.',
    },
    Happy: {
      title: 'Positive & Radiant',
      desc: 'Rising estrogen enhances dopamine and mood elevation, boosting motivation and social connections.',
    },
    Calm: {
      title: 'Calm & Centered',
      desc: 'Your autonomic nervous system is well-regulated today. Ideal for steady focus and mindfulness.',
    },
    Sad: {
      title: 'Rest & Gentle Care',
      desc: 'Hormone fluctuations can trigger emotional sensitivity. Prioritize warm nutrition and self-care.',
    },
    Neutral: {
      title: 'Balanced Equilibrium',
      desc: 'Your body and mind are in stable balance today, supporting consistent productivity and recovery.',
    },
  };

  const currentMoodInfo = moodMap[mood] || moodMap.Irritable;

  return (
    <section aria-labelledby="cycle-insights-title" className="w-full flex flex-col text-left bg-white border border-[#F1DDE8]/70 rounded-[22px] p-4 sm:p-5 shadow-2xs">
      {/* Header */}
      <div className="mb-4">
        <h3 id="cycle-insights-title" className="text-section-title font-semibold text-[#17152B]">
          Cycle Insights
        </h3>
        <p className="text-body text-[#68708A] mt-0.5">
          Based on your logged data and current cycle phase.
        </p>
      </div>

      {/* 3 Insight Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-3.5 w-full max-w-none">
        {/* Card 1: Energy Level */}
        <div className="w-full max-w-none min-w-0 bg-[#FFF8FB] rounded-[20px] p-4 sm:p-5 flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-full bg-[#ECFDF5] text-[#059669] flex items-center justify-center mb-3">
              <Zap className="w-5 h-5 stroke-[2.3]" />
            </div>

            <span className="text-body text-[#68708A] block mb-0.5">
              Energy Level
            </span>
            <span className="text-card-title font-semibold text-[#17152B] block mb-2.5">
              {energyLevel}
            </span>

            {/* 13-Segment Progress Bar */}
            <div className="flex items-center gap-1 mb-3" role="img" aria-label={`Energy ${energyLevel}: ${energyFilledSegments} of 13`}>
              {[...Array(13)].map((_, i) => (
                <div
                  key={i}
                  className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${
                    i < energyFilledSegments ? 'bg-[#F43F8F]' : 'bg-[#FCE7F3]'
                  }`}
                />
              ))}
            </div>
          </div>

          <p className="text-body text-[#68708A]">
            {energyText}
          </p>
        </div>

        {/* Card 2: Body & Mind */}
        <div className="w-full max-w-none min-w-0 bg-[#FFF8FB] rounded-[20px] p-4 sm:p-5 flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-full bg-[#FFF0F6] text-[#F43F8F] flex items-center justify-center mb-3 shadow-2xs">
              <Brain className="w-5 h-5 stroke-[2.3]" />
            </div>

            <span className="text-body text-[#68708A] block mb-0.5">
              Body & Mind
            </span>
            <span className="text-card-title font-semibold text-[#17152B] block mb-2.5">
              {currentMoodInfo.title}
            </span>
          </div>

          <p className="text-body text-[#68708A]">
            {currentMoodInfo.desc}
          </p>
        </div>

        {/* Card 3: Hormonal Changes */}
        <div className="w-full max-w-none min-w-0 bg-[#FFF8FB] rounded-[20px] p-4 sm:p-5 flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-full bg-[#FAF5FF] text-[#8B5CF6] flex items-center justify-center mb-3 shadow-2xs">
              <Activity className="w-5 h-5 stroke-[2.3]" />
            </div>

            <span className="text-body text-[#68708A] block mb-0.5">
              Hormonal Changes
            </span>
            <span className="text-card-title font-semibold text-[#17152B] block mb-2.5">
              {hormone.title}
            </span>
          </div>

          <p className="text-body text-[#68708A]">
            {hormone.desc}
          </p>
        </div>
      </div>
    </section>
  );
};
