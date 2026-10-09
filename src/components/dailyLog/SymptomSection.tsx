import React, { useState } from 'react';
import { Activity } from 'lucide-react';
import { OTHER_SYMPTOM_ID, OTHER_SYMPTOM_MAX, SYMPTOMS_BY_PHASE } from '../../data/symptoms';
import type { FollicularDailyLogData, PhaseType } from '../../types';

interface SymptomSectionProps {
  phase: PhaseType;
  /** Short phase name for the subtitle, e.g. "Follicular" */
  phaseBadge: string;
  symptoms: string[];
  noSymptoms: boolean;
  otherSymptomText: string;
  severity: number | null;
  /** Validation message from a failed save (e.g. Other selected without a description) */
  error: string | null;
  onUpdate: (updated: Partial<FollicularDailyLogData>) => void;
}

const SEVERITY_LEVELS = Array.from({ length: 11 }, (_, i) => i);

export const SymptomSection: React.FC<SymptomSectionProps> = ({
  phase,
  phaseBadge,
  symptoms,
  noSymptoms,
  otherSymptomText,
  severity,
  error,
  onUpdate,
}) => {
  // Keeps what was typed so deselecting and re-selecting Other during this visit doesn't lose it
  const [draft, setDraft] = useState(otherSymptomText);
  const options = SYMPTOMS_BY_PHASE[phase];
  const otherSelected = symptoms.includes(OTHER_SYMPTOM_ID);

  const toggleSymptom = (id: string) => {
    if (symptoms.includes(id)) {
      const next = symptoms.filter((s) => s !== id);
      onUpdate({
        symptoms: next,
        otherSymptomText: id === OTHER_SYMPTOM_ID ? '' : otherSymptomText,
        symptomSeverity: next.length ? severity : null,
      });
    } else {
      onUpdate({
        symptoms: [...symptoms, id],
        noSymptoms: false,
        otherSymptomText: id === OTHER_SYMPTOM_ID ? draft : otherSymptomText,
      });
    }
  };

  const toggleNoSymptoms = () => {
    if (noSymptoms) {
      onUpdate({ noSymptoms: false });
    } else {
      onUpdate({ noSymptoms: true, symptoms: [], otherSymptomText: '', symptomSeverity: null });
    }
  };

  const chip = (selected: boolean) =>
    `px-3.5 py-1.5 rounded-full border text-[12.5px] font-medium transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-300 ${
      selected
        ? 'bg-[#FFF0F6] border-[#F43F8F] text-[#F43F8F]'
        : 'bg-white border-[#F1DDE8] text-[#17152B] hover:bg-gray-50'
    }`;

  return (
    <section
      aria-labelledby="symptoms-title"
      className="w-full bg-white rounded-[24px] p-4 sm:p-5 border border-[#F1DDE8]/70 shadow-sm text-left"
    >
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-10 h-10 rounded-xl bg-[#FFF0F6] text-[#F43F8F] flex items-center justify-center shrink-0">
            <Activity className="w-5 h-5" />
          </div>
          <h3 id="symptoms-title" className="text-card-title font-bold text-[#17152B]">
            Symptom Tracking
          </h3>
        </div>
        <span className="text-[12px] text-[#68708A]">{phaseBadge} Phase symptoms</span>
      </div>

      <p id="symptoms-hint" className="text-[13px] text-[#4B5563] mt-4">
        Select everything you're feeling today:
      </p>

      <div role="group" aria-labelledby="symptoms-hint" className="flex flex-wrap gap-2 mt-3">
        {options.map((o) => {
          const selected = symptoms.includes(o.id);
          return (
            <button
              key={o.id}
              type="button"
              aria-pressed={selected}
              data-testid={`symptom-${o.id}`}
              onClick={() => toggleSymptom(o.id)}
              className={chip(selected)}
            >
              {o.label}
            </button>
          );
        })}
        <button
          type="button"
          aria-pressed={noSymptoms}
          data-testid="symptom-none"
          onClick={toggleNoSymptoms}
          className={`px-3 py-1.5 rounded-full border border-dashed text-[11.5px] font-medium transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-300 ${
            noSymptoms
              ? 'bg-[#FFF0F6] border-[#F43F8F] text-[#F43F8F]'
              : 'bg-white border-gray-300 text-[#68708A] hover:bg-gray-50'
          }`}
        >
          No symptoms today
        </button>
      </div>

      {otherSelected && (
        <div className="mt-4">
          <label htmlFor="other-symptom" className="text-[12.5px] font-medium text-[#17152B] block mb-1.5">
            Describe your symptom
          </label>
          <input
            id="other-symptom"
            data-testid="other-symptom-input"
            type="text"
            value={otherSymptomText}
            maxLength={OTHER_SYMPTOM_MAX}
            aria-invalid={error ? true : undefined}
            aria-describedby={error ? 'other-symptom-error' : undefined}
            onChange={(e) => {
              setDraft(e.target.value);
              onUpdate({ otherSymptomText: e.target.value });
            }}
            placeholder="Enter your symptom..."
            className={`w-full rounded-xl border bg-white px-3.5 py-2.5 text-[13px] text-[#17152B] placeholder:text-[#A0A6B8] focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-300 ${
              error ? 'border-[#F43F8F]' : 'border-[#F1DDE8]'
            }`}
          />
          {error && (
            <p id="other-symptom-error" role="alert" className="text-[12px] text-[#E11D48] mt-1.5">
              {error}
            </p>
          )}
        </div>
      )}

      {!noSymptoms && (
        <div className="mt-4">
          <span id="severity-label" className="text-[12.5px] font-medium text-[#17152B]">
            Severity <span className="text-[#68708A] font-normal">(optional, 0 none – 10 worst)</span>
          </span>
          <div role="group" aria-labelledby="severity-label" className="flex flex-wrap gap-2 mt-2">
            {SEVERITY_LEVELS.map((n) => {
              const selected = severity === n;
              return (
                <button
                  key={n}
                  type="button"
                  aria-pressed={selected}
                  aria-label={`Severity ${n}`}
                  data-testid={`severity-${n}`}
                  disabled={symptoms.length === 0}
                  onClick={() => onUpdate({ symptomSeverity: selected ? null : n })}
                  className={`w-8 h-8 rounded-full border text-[12px] font-medium flex items-center justify-center transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-300 disabled:opacity-50 disabled:cursor-not-allowed ${
                    selected
                      ? 'bg-[#FFF0F6] border-[#F43F8F] text-[#F43F8F]'
                      : 'bg-white border-[#F1DDE8] text-[#17152B] hover:bg-gray-50'
                  }`}
                >
                  {n}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </section>
  );
};
