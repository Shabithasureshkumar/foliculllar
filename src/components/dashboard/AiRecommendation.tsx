import React from 'react';
import aiRobot from '../../assets/ai_robot.png';

interface AiRecommendationProps {
  text: string;
  chips: Array<{ label: string; emoji: string }>;
  onAskAvaClick: () => void;
  onChipClick: (chip: string) => void;
}

export const AiRecommendation: React.FC<AiRecommendationProps> = ({
  text,
  chips,
  onAskAvaClick,
  onChipClick,
}) => {
  return (
    <section
      aria-labelledby="ai-recommendation-title"
      className="w-full bg-white border border-[#F3E8FF] rounded-[22px] p-3.5 sm:p-4 shadow-2xs"
    >
      {/* Header */}
      <div className="flex items-center justify-between gap-2 mb-3">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#FAF5FF] to-[#FFE4EE] flex items-center justify-center shrink-0">
            <img src={aiRobot} alt="" width={484} height={484} className="w-7 h-7 object-contain" />
          </div>
          <h3 id="ai-recommendation-title" className="text-card-title font-semibold text-[#17152B]">
            AI Recommendation
          </h3>
        </div>

        <button
          type="button"
          onClick={onAskAvaClick}
          aria-haspopup="dialog"
          className="px-4 sm:px-5 py-1.5 sm:py-2 rounded-full bg-[#F3E8FF] hover:bg-[#EADCFE] text-[#8B5CF6] text-[12px] sm:text-[13px] font-medium shadow-2xs transition-all shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-300"
        >
          Ask Ava
        </button>
      </div>

      {/* Body panel */}
      <div className="flex items-start gap-3 sm:gap-4 rounded-[18px] bg-gradient-to-r from-[#FFF5FA] via-[#FAF5FF] to-[#F5EEFF] p-3 sm:p-4">
        <div className="w-12 h-12 sm:w-16 sm:h-16 shrink-0 select-none pointer-events-none">
          <img src={aiRobot} alt="" width={484} height={484} className="w-full h-full object-contain" />
        </div>

        <div className="flex-1 min-w-0 text-left">
          <p className="text-body text-[#374151] mb-3">{text}</p>

          <div className="flex items-center gap-2 flex-wrap">
            {chips.map((chip) => (
              <button
                key={chip.label}
                type="button"
                onClick={() => onChipClick(chip.label)}
                className="px-3 py-1 rounded-full bg-[#EDE4FF]/80 hover:bg-[#E4D8FE] text-[11.5px] sm:text-[12px] font-medium text-[#8B5CF6] transition-all active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-300"
              >
                {chip.label} <span aria-hidden="true">{chip.emoji}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
