import React from 'react';
import { Activity, ChevronRight, Heart } from 'lucide-react';
import { PROTECTION_LABELS } from '../../data/intercourse';
import { OTHER_SYMPTOM_ID, symptomLabel } from '../../data/symptoms';
import type { FollicularDailyLogData } from '../../types';
import { CARD_BASE } from './metricCardStyles';
import { CardHeader } from './MetricCardHeader';

interface DailyLogSummaryCardsProps {
  log: FollicularDailyLogData;
  /** e.g. "Oct 8, 2026" */
  dateLabel: string;
  isToday: boolean;
  onOpenDailyLog: () => void;
}

const EditLink: React.FC<{ onClick: () => void; label: string }> = ({ onClick, label }) => (
  <button
    type="button"
    onClick={onClick}
    aria-label={label}
    className="mt-auto pt-3 self-start inline-flex items-center gap-1 text-[12.5px] font-semibold text-[#F43F8F] hover:text-[#E02E7E] focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-300 rounded"
  >
    View / Edit Log <ChevronRight className="w-3.5 h-3.5" aria-hidden="true" />
  </button>
);

/** Today's Symptoms + Intercourse Log: read-only views of the saved Daily Log for the selected date */
export const DailyLogSummaryCards: React.FC<DailyLogSummaryCardsProps> = ({ log, dateLabel, isToday, onOpenDailyLog }) => {
  const symptomsLogged = log.symptoms.length > 0;
  const customText = log.symptoms.includes(OTHER_SYMPTOM_ID) ? log.otherSymptomText.trim() : '';
  const chips = log.symptoms.map((id) =>
    id === OTHER_SYMPTOM_ID ? (customText ? `Other: ${customText}` : 'Other') : symptomLabel(id)
  );

  const method = log.protectionMethod;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 lg:gap-5 w-full items-stretch" data-testid="daily-log-summary">
      {/* Symptoms */}
      <section aria-labelledby="symptoms-summary-title" className={CARD_BASE} data-testid="symptoms-summary">
        <CardHeader
          icon={<Activity className="w-3.5 h-3.5 stroke-[2.3]" />}
          iconBg="bg-[#FFF0F6] text-[#F43F8F]"
          title={isToday ? "Today's Symptoms" : 'Symptoms'}
          titleId="symptoms-summary-title"
        />
        <p className="text-caption text-[#68708A] mt-1">{dateLabel}</p>

        {symptomsLogged ? (
          <>
            <ul className="flex flex-wrap gap-1.5 mt-3 list-none p-0 m-0">
              {chips.map((c) => (
                <li key={c} className="px-2.5 py-1 rounded-full bg-[#FFF0F6] text-[#BE185D] text-[11.5px] font-medium break-words max-w-full">
                  {c}
                </li>
              ))}
            </ul>
            {log.symptomSeverity !== null && (
              <p className="text-body text-[#68708A] mt-2">
                Severity: <strong className="text-[#17152B] font-semibold">{log.symptomSeverity}/10</strong>
              </p>
            )}
          </>
        ) : (
          <span className="text-metric-value font-bold text-[#17152B] block mt-3">
            {log.noSymptoms ? 'No symptoms logged today' : 'Not logged'}
          </span>
        )}
        <EditLink onClick={onOpenDailyLog} label={`View or edit the ${dateLabel} symptom log`} />
      </section>

      {/* Intercourse */}
      <section aria-labelledby="intercourse-summary-title" className={CARD_BASE} data-testid="intercourse-summary">
        <CardHeader
          icon={<Heart className="w-3.5 h-3.5 fill-[#F43F8F] stroke-[2.3]" />}
          iconBg="bg-[#FFF0F6] text-[#F43F8F]"
          title="Intercourse Log"
          titleId="intercourse-summary-title"
        />
        <p className="text-caption text-[#68708A] mt-1">{dateLabel}</p>

        <span className="text-metric-value font-bold text-[#17152B] block mt-3">
          {log.intercourse === 'yes' ? 'Yes' : log.intercourse === 'no' ? 'No' : 'Not logged'}
        </span>
        {log.intercourse === 'yes' && (
          <div className="text-body text-[#68708A] mt-1 min-w-0">
            <p>
              Protection:{' '}
              <strong className="text-[#17152B] font-semibold">{method ? PROTECTION_LABELS[method] : 'Not specified'}</strong>
            </p>
            {method === 'other' && log.additionalDetails.trim() && (
              <p className="mt-0.5 break-words">{log.additionalDetails.trim()}</p>
            )}
          </div>
        )}
        <EditLink onClick={onOpenDailyLog} label={`View or edit the ${dateLabel} intercourse log`} />
      </section>
    </div>
  );
};
