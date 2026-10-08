import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import type { MedicationHistoryItem } from '../../services/cycleStore';
import { PHASE_CONTENT } from '../../data/phaseContent';
import { formatMonthDayYear } from '../../utils/calendarUtils';
import { MedicationIcon } from '../MedicationIcon';

interface MedicationHistoryProps {
  medications: MedicationHistoryItem[];
  onAddMedication: () => void;
}

const COLLAPSED_COUNT = 4;

const STATUS_STYLE: Record<MedicationHistoryItem['status'], { label: string; className: string }> = {
  taken: { label: 'Taken', className: 'text-[#16A34A]' },
  skipped: { label: 'Skipped', className: 'text-rose-500' },
  pending: { label: 'Not marked', className: 'text-[#9CA3AF]' },
};

export const MedicationHistory: React.FC<MedicationHistoryProps> = ({ medications, onAddMedication }) => {
  const [showAll, setShowAll] = useState(false);
  const canExpand = medications.length > COLLAPSED_COUNT;
  const visible = showAll ? medications : medications.slice(0, COLLAPSED_COUNT);

  return (
    <section
      aria-labelledby="medication-history-title"
      className="w-full max-w-none bg-white border border-[#F9C6DD] rounded-[22px] p-4 sm:p-5 shadow-2xs"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
        <div className="flex items-center gap-3 min-w-0">
          <MedicationIcon />
          <div className="text-left min-w-0">
            <h3 id="medication-history-title" className="text-card-title font-semibold text-[#17152B]">
              Medication History
            </h3>
            <p className="text-caption text-[#68708A] mt-0.5">
              Medications you've logged throughout your cycle
            </p>
          </div>
        </div>

        {canExpand && (
          <button
            type="button"
            onClick={() => setShowAll((v) => !v)}
            aria-expanded={showAll}
            className="text-[12.5px] sm:text-[13.5px] font-medium text-[#F43F8F] hover:text-[#E02E7E] flex items-center gap-1.5 transition-all self-start sm:self-auto rounded-full px-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-300"
          >
            <span>{showAll ? 'Show Less' : `View All History (${medications.length})`}</span>
            <ArrowRight className={`w-3.5 h-3.5 transition-transform ${showAll ? '-rotate-90' : ''}`} />
          </button>
        )}
      </div>

      {medications.length === 0 ? (
        <div className="rounded-[18px] border border-dashed border-[#F1DDE8] bg-[#FFF8FC] p-5 text-center">
          <p className="text-body text-[#68708A]">No medications logged yet.</p>
          <button
            type="button"
            onClick={onAddMedication}
            className="mt-2 text-[12.5px] font-semibold text-[#F43F8F] hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-300 rounded"
          >
            + Log a medication
          </button>
        </div>
      ) : (
        <ul className="grid grid-cols-1 min-[560px]:grid-cols-2 lg:grid-cols-4 gap-3 w-full max-w-none">
          {visible.map((med) => {
            const status = STATUS_STYLE[med.status];
            return (
              <li
                key={`${med.dateKey}-${med.id}`}
                className="w-full min-w-0 bg-white border border-[#F1DDE8] rounded-[20px] p-3.5 sm:p-4 shadow-3xs flex flex-col gap-3 text-left"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <MedicationIcon />
                  <div className="min-w-0">
                    <h4 className="text-[13px] sm:text-[14px] font-semibold text-[#17152B] truncate leading-tight">
                      {med.name}
                    </h4>
                    <p className="text-[11.5px] text-[#68708A] leading-tight mt-1 truncate">{med.dosage}</p>
                  </div>
                </div>

                <div className="flex items-end justify-between gap-2 text-[11.5px]">
                  <div className="text-[#68708A] leading-snug min-w-0">
                    <span className="block">{formatMonthDayYear(med.date)}</span>
                    <span className="block">
                      {med.time || '—'} · <span className={`font-medium ${status.className}`}>{status.label}</span>
                    </span>
                  </div>
                  <span className="bg-[#F3E8FF] text-[#8B5CF6] font-medium px-2.5 py-0.5 rounded-full text-[11px] shrink-0">
                    {PHASE_CONTENT[med.phase].badge}
                  </span>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
};
