import React from 'react';
import type { PhaseIllustration } from '../../data/phaseContent';
import infoBackground from '../../assets/phase_info_bg.webp';

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
    <div className="rounded-[26px] pl-4 sm:pl-5 lg:pl-[clamp(1.25rem,2vw,2rem)] pt-4 sm:pt-5 border border-white/70 shadow-[0_8px_24px_rgba(236,72,153,0.14)] relative overflow-hidden flex items-stretch justify-between gap-3 w-full max-w-none min-w-0 h-full lg:min-h-[clamp(160px,14.7vw,230px)]">
      {/* Uploaded artwork anchored bottom-right so the floral bouquet stays visible at every width */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none select-none bg-cover bg-no-repeat bg-[position:100%_100%]"
        style={{ backgroundImage: `url(${infoBackground})` }}
      />
      {/* Left Content */}
      <div className="flex flex-col justify-center flex-1 min-w-0 z-10 pb-4 sm:pb-5">
        <h3 className="text-[clamp(1rem,1.3vw,1.3rem)] leading-tight font-semibold text-[#17152B] mb-2">
          {title}
        </h3>
        <p className="text-body text-[#68708A] font-normal mb-4 max-w-[34rem]">
          {text}
        </p>

        {/* Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            data-testid="log-period-button"
            onClick={onLogPeriodClick}
            className="px-4 sm:px-5 py-1.5 sm:py-2 rounded-full bg-[#F43F8F] hover:bg-[#E02E7E] active:scale-95 text-white text-[12px] sm:text-[13px] font-semibold shadow-2xs transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-300 focus-visible:ring-offset-1"
          >
            Log period
          </button>
          <button
            type="button"
            onClick={onViewTipsClick}
            className="px-4 sm:px-5 py-1.5 sm:py-2 rounded-full bg-white/60 hover:bg-white/90 active:scale-95 text-[#F43F8F] text-[12px] sm:text-[13px] font-semibold transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-300 focus-visible:ring-offset-1"
          >
            View Tips
          </button>
        </div>
      </div>

      {/* Right phase illustration (sized fluidly, capped so small bitmaps never upscale badly) */}
      <div
        className="relative z-10 hidden min-[420px]:flex w-[clamp(110px,18vw,260px)] shrink-0 pointer-events-none select-none items-end justify-center pr-2"
        style={{ maxWidth: illustration.maxWidth, paddingBottom: illustration.maxWidth < 200 ? 12 : 0 }}
      >
        <img
          src={illustration.src}
          alt={illustration.alt}
          width={illustration.width}
          height={illustration.height}
          className="w-full h-auto max-h-[230px] object-contain object-bottom"
        />
      </div>
    </div>
  );
};
