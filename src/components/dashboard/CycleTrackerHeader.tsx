import React from 'react';
import headerCalendar from '../../assets/header_calendar.png';
import avatarPatient from '../../assets/avatar.png';
import { PATIENT_PROFILE } from '../../data/mockData';

const bmi = PATIENT_PROFILE.weightKg / (PATIENT_PROFILE.heightCm / 100) ** 2;

export const CycleTrackerHeader: React.FC = () => {
  const p = PATIENT_PROFILE;
  return (
    <div className="w-full max-w-none flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 py-1.5 sm:py-2">
      {/* Left Title Section */}
      <div className="flex items-center gap-3 sm:gap-3.5 min-w-0">
        <div className="w-13 h-13 sm:w-16 sm:h-16 lg:w-20 lg:h-20 shrink-0 flex items-center justify-center">
          <img
            src={headerCalendar}
            alt=""
            width={70}
            height={60}
            className="w-full h-full object-contain select-none drop-shadow-xs"
          />
        </div>

        <div className="flex flex-col min-w-0">
          {/* PERIOD top label with line */}
          <div className="flex items-center gap-2 mb-0.5">
            <span className="text-[#F43F8F] font-bold text-[11px] sm:text-[12px] uppercase tracking-[0.18em]">
              PERIOD
            </span>
            <div className="w-16 sm:w-24 h-[1.5px] bg-[#F43F8F]/70 rounded-full" />
          </div>

          <h1 className="text-display font-bold">
            <span className="text-[#17152B]">Cycle </span>
            <span className="text-[#F43F8F]">Tracker</span>
          </h1>

          <p className="text-body text-[#68708A] font-normal mt-1">
            Understand your body, one day at a time.
          </p>
        </div>
      </div>

      {/* Right Patient Profile Card */}
      <section
        aria-label="Patient profile"
        className="relative bg-gradient-to-r from-[#EC3F8F] to-[#F77DB5] rounded-[20px] pl-4 pr-2 py-2.5 text-white shadow-2xs flex items-center justify-between gap-3 text-left overflow-hidden shrink-0 w-full sm:w-[300px] lg:w-[330px] min-h-[90px]"
      >
        {/* Left Stats Text */}
        <div className="flex flex-col justify-center z-10 space-y-0.5 leading-tight min-w-0">
          <h2 className="text-[15px] sm:text-[16px] font-bold text-white tracking-tight truncate">
            {p.name}
          </h2>
          <p className="text-[10.5px] text-white/95 font-medium">
            Age: {p.age} • {p.gender}
          </p>
          <p className="text-[10.5px] text-white/90 font-medium">
            Height: {p.heightCm} cm • Weight: {p.weightKg} kg
          </p>
          <p className="text-[10.5px] text-white/90 font-medium">
            Cycle Length: {p.cycleLengthDays} days (avg)
          </p>
          <p className="text-[10.5px] text-white/90 font-medium">
            BMI: {bmi.toFixed(1)}
          </p>
        </div>

        {/* Right patient photo with soft circle backdrop */}
        <div className="relative w-[96px] self-stretch shrink-0 flex items-end justify-end -my-2.5">
          <div className="absolute -right-6 top-1/2 -translate-y-1/2 w-28 h-28 rounded-full bg-white/20 pointer-events-none" />
          <img
            src={avatarPatient}
            alt={p.name}
            width={600}
            height={540}
            className="relative z-10 w-[96px] max-w-none h-[92px] object-contain object-bottom select-none pointer-events-none"
          />
        </div>
      </section>
    </div>
  );
};
