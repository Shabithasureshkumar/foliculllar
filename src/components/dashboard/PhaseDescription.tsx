import React from 'react';
import type { PhaseIllustration } from '../../data/phaseContent';

interface PhaseDescriptionProps {
  title: string;
  text: string;
  illustration: PhaseIllustration;
  onLogPeriodClick?: () => void;
  onViewTipsClick?: () => void;
}

export const PhaseDescription: React.FC<PhaseDescriptionProps> = ({
  title,
  text,
  illustration,
  onLogPeriodClick,
  onViewTipsClick,
}) => {
  return (
    <div className="bg-white rounded-[22px] pl-4 sm:pl-5 pt-4 sm:pt-5 border border-[#F1DDE8]/70 shadow-2xs relative overflow-hidden flex items-stretch justify-between gap-3 w-full max-w-none min-w-0 h-full lg:min-h-[192px]">
      {/* Left Content */}
      <div className="flex flex-col justify-center flex-1 min-w-0 z-10 pb-4 sm:pb-5">
        <h3 className="text-card-title font-semibold text-[#17152B] mb-1.5">
          {title}
        </h3>
        <p className="text-body text-[#68708A] font-normal mb-3.5">
          {text}
        </p>

        {/* Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            data-testid="log-period-button"
            onClick={onLogPeriodClick}
            className="px-4 sm:px-5 py-2 rounded-full bg-[#F43F8F] hover:bg-[#E02E7E] active:scale-95 text-white text-[12px] sm:text-[13px] font-semibold shadow-2xs transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-300 focus-visible:ring-offset-1"
          >
            Log period
          </button>
          <button
            type="button"
            onClick={onViewTipsClick}
            className="px-4 sm:px-5 py-2 rounded-full bg-[#FFF0F6] hover:bg-[#FFE4EE] active:scale-95 text-[#F43F8F] text-[12px] sm:text-[13px] font-semibold transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-300 focus-visible:ring-offset-1"
          >
            View Tips
          </button>
        </div>
      </div>

      {/* Right phase illustration (sized fluidly, capped so small bitmaps never upscale badly) */}
      <div
        className="hidden min-[420px]:flex w-[clamp(96px,16vw,230px)] shrink-0 pointer-events-none select-none items-end justify-center pr-2"
        style={{ maxWidth: illustration.maxWidth, paddingBottom: illustration.maxWidth < 200 ? 12 : 0 }}
      >
        <img
          src={illustration.src}
          alt={illustration.alt}
          width={illustration.width}
          height={illustration.height}
          className="w-full h-auto max-h-[170px] object-contain object-bottom"
        />
      </div>
    </div>
  );
};
