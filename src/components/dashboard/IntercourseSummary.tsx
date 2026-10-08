import React from 'react';
import { Heart, ChevronRight } from 'lucide-react';
import libidoHeart from '../../assets/libido_heart.png';

interface IntercourseSummaryProps {
  eventCount: number;
  dateLabel: string;
  onOpen: () => void;
}

export const IntercourseSummary: React.FC<IntercourseSummaryProps> = ({ eventCount, dateLabel, onOpen }) => (
  <button
    type="button"
    onClick={onOpen}
    aria-label={`Intercourse: ${eventCount} event logged, ${dateLabel}. Open Daily Log`}
    data-testid="intercourse-summary"
    className="relative w-full overflow-hidden flex items-center gap-3 sm:gap-4 bg-white rounded-[22px] border border-[#F1DDE8]/70 px-4 sm:px-5 py-3 shadow-2xs text-left transition-all hover:border-pink-200 hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-300"
  >
    <div className="w-11 h-11 rounded-full bg-[#FFF0F6] text-[#F43F8F] flex items-center justify-center shrink-0">
      <Heart className="w-5 h-5 fill-[#F43F8F]" />
    </div>
    <div className="min-w-0 flex-1">
      <h3 className="text-[clamp(0.95rem,1.1vw,1.125rem)] leading-tight font-bold text-[#17152B]">Intercourse</h3>
      <p className="text-[14.5px] font-bold text-[#17152B] mt-0.5 whitespace-nowrap">
        {eventCount} {eventCount === 1 ? 'event' : 'events'} logged
      </p>
      <p className="text-[11px] font-medium text-[#68708A]">{dateLabel}</p>
    </div>
    <img src={libidoHeart} alt="" width={624} height={544} className="h-12 w-auto object-contain shrink-0 max-[359px]:hidden pointer-events-none select-none" />
    <ChevronRight className="w-4 h-4 text-[#F43F8F] shrink-0" />
  </button>
);
