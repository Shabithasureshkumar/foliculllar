import React, { useState } from 'react';
import { ChevronUp, ChevronDown, Plus } from 'lucide-react';
import type { MedicationEntry } from '../../types';
import { MedicationIcon } from '../MedicationIcon';
import { BBT_MAX, BBT_MIN } from '../../services/cycleStore';

const TIME_OPTIONS = ['06:00 AM', '06:30 AM', '06:45 AM', '07:00 AM', '07:30 AM', '08:00 AM', '08:30 AM', '09:00 AM'];
const DEVICE_OPTIONS = ['Connected Thermometer', 'Manual Oral Thermometer', 'Apple Watch / Sensor', 'Oura Ring'];
const PRESETS = [36.3, 36.5, 36.35, 36.4, 36.45];

interface BbtAndMedicationSectionProps {
  /** null = not logged for this day */
  bbtTempC: number | null;
  bbtTime: string;
  bbtDevice: string;
  bbtManualNotes?: string;
  medications: MedicationEntry[];
  onUpdateBbtTemp: (temp: number | null) => void;
  onUpdateBbtTime: (time: string) => void;
  onUpdateBbtDevice: (device: string) => void;
  onUpdateBbtNotes: (notes: string) => void;
  onToggleMedicationStatus: (medId: string, status: 'taken' | 'skipped') => void;
  onAddMedication: () => void;
}

export const BbtAndMedicationSection: React.FC<BbtAndMedicationSectionProps> = ({
  bbtTempC,
  bbtTime,
  bbtDevice,
  bbtManualNotes = '',
  medications,
  onUpdateBbtTemp,
  onUpdateBbtTime,
  onUpdateBbtDevice,
  onUpdateBbtNotes,
  onToggleMedicationStatus,
  onAddMedication,
}) => {
  const [localInput, setLocalInput] = useState<string | null>(null);

  const displayTemp = localInput !== null ? localInput : bbtTempC !== null ? bbtTempC.toFixed(2) : '';
  const parsedLocal = localInput !== null ? parseFloat(localInput) : bbtTempC;
  // An empty field is valid (it clears the reading); anything else must be a number in range
  const isInputInvalid =
    localInput !== null && localInput.trim() !== '' && !(parsedLocal !== null && parsedLocal >= BBT_MIN && parsedLocal <= BBT_MAX);
  // Steppers start from a typical waking temperature when nothing is logged yet
  const stepBase = bbtTempC ?? 36.4;

  // Keep previously saved custom values selectable
  const timeOptions = TIME_OPTIONS.includes(bbtTime) ? TIME_OPTIONS : [bbtTime, ...TIME_OPTIONS];
  const deviceOptions = DEVICE_OPTIONS.includes(bbtDevice) ? DEVICE_OPTIONS : [bbtDevice, ...DEVICE_OPTIONS];

  const handleStep = (delta: number) => {
    const next = Math.round((stepBase + (bbtTempC === null ? 0 : delta)) * 100) / 100;
    if (next >= BBT_MIN && next <= BBT_MAX) {
      setLocalInput(null);
      onUpdateBbtTemp(next);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalInput(e.target.value);
    if (e.target.value.trim() === '') {
      onUpdateBbtTemp(null);
      return;
    }
    const parsed = parseFloat(e.target.value);
    if (!isNaN(parsed) && parsed >= BBT_MIN && parsed <= BBT_MAX) {
      onUpdateBbtTemp(Math.round(parsed * 100) / 100);
    }
  };

  return (
    <div className="w-full flex flex-col gap-3.5 sm:gap-4 text-left">
      {/* Left 8 Cols: BBT Container */}
      <div className="w-full min-w-0 bg-white rounded-[24px] p-4 sm:p-5 border border-[#F1DDE8]/70 shadow-sm flex flex-col justify-between">
        <div className="mb-3.5">
          <h3 className="text-section-title font-semibold text-[#17152B]">
            Basal Body Temperature (BBT)
          </h3>
          <p className="text-[11px] sm:text-[11.5px] text-[#68708A] leading-tight mt-0.5">
            Measured on waking
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {/* Sub-card 1: Today's BBT Reading */}
          <div className="bg-[#FAF5FF]/50 border border-purple-100 rounded-[20px] p-3.5 sm:p-4 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-1 mb-2">
                <span className="text-[10.5px] font-extrabold uppercase tracking-wider text-[#9333EA]">
                  TODAY'S BBT READING
                </span>
                <span className="text-[10.5px] text-[#68708A]">Morning {bbtTime}</span>
              </div>

              {/* Temp Input & Stepper */}
              <div
                className={`flex items-center justify-between gap-2 bg-white rounded-2xl p-3 border shadow-2xs mb-3 ${
                  isInputInvalid ? 'border-amber-300' : 'border-[#F1DDE8]'
                }`}
              >
                <div className="flex items-baseline gap-1">
                  <input
                    type="number"
                    inputMode="decimal"
                    step="0.05"
                    min={BBT_MIN}
                    max={BBT_MAX}
                    value={displayTemp}
                    aria-invalid={isInputInvalid}
                    aria-describedby="bbt-range-hint"
                    onChange={handleInputChange}
                    onBlur={() => setLocalInput(null)}
                    className="w-[5.5ch] min-w-0 text-metric font-bold text-[#17152B] focus:outline-none bg-transparent [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                    aria-label="Basal body temperature in degrees Celsius"
                    placeholder="--.--"
                  />
                  <span className="text-[16px] font-bold text-[#F43F8F]">°C</span>
                </div>

                {/* Steppers */}
                <div className="flex flex-col gap-1">
                  <button
                    type="button"
                    onClick={() => handleStep(0.05)}
                    disabled={stepBase + 0.05 > BBT_MAX}
                    className="disabled:opacity-40 disabled:cursor-not-allowed w-8 h-8 rounded-lg bg-[#FAF5FF] hover:bg-[#F3E8FF] text-[#8B5CF6] flex items-center justify-center border border-purple-100 active:scale-95 transition-all"
                    aria-label="Increase temperature"
                  >
                    <ChevronUp className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleStep(-0.05)}
                    disabled={stepBase - 0.05 < BBT_MIN}
                    className="disabled:opacity-40 disabled:cursor-not-allowed w-8 h-8 rounded-lg bg-[#FAF5FF] hover:bg-[#F3E8FF] text-[#8B5CF6] flex items-center justify-center border border-purple-100 active:scale-95 transition-all"
                    aria-label="Decrease temperature"
                  >
                    <ChevronDown className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Quick Preset Buttons */}
              <div className="flex items-center gap-1.5 mb-2.5 flex-wrap">
                {PRESETS.map((val) => {
                  const isActive = bbtTempC !== null && Math.abs(bbtTempC - val) < 0.02;
                  return (
                    <button
                      key={val}
                      type="button"
                      aria-pressed={isActive}
                      onClick={() => {
                        setLocalInput(null);
                        onUpdateBbtTemp(val);
                      }}
                      className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-300 ${
                        isActive
                          ? 'bg-[#F43F8F] text-white shadow-2xs'
                          : 'bg-white text-[#17152B] border border-gray-200 hover:bg-gray-50'
                      }`}
                    >
                      {val.toFixed(2)}°
                    </button>
                  );
                })}
              </div>
            </div>

            <p id="bbt-range-hint" className="text-[10.5px] text-[#68708A] leading-snug pt-1 border-t border-purple-100/60">
              {isInputInvalid && (
                <span className="block text-amber-700 font-semibold mb-0.5">
                  Enter a value between {BBT_MIN.toFixed(1)}°C and {BBT_MAX.toFixed(1)}°C.
                </span>
              )}
              <strong className="text-[#801543]">Pre-ovulatory range:</strong> Low & steady (36.20°C – 36.50°C). A 0.3°C – 0.5°C thermal shift marks ovulation.
            </p>
          </div>

          {/* Sub-card 2: Time, Device, Manual Enter */}
          <div className="flex flex-col gap-2.5 justify-between">
            <div>
              {/* Time Measured */}
              <div className="mb-2">
                <label htmlFor="bbt-time" className="text-[10px] font-bold uppercase tracking-wider text-[#68708A] block mb-1">
                  TIME MEASURED
                </label>
                <select
                  id="bbt-time"
                  value={bbtTime}
                  onChange={(e) => onUpdateBbtTime(e.target.value)}
                  className="w-full bg-[#FAF5FF] border border-[#F3E8FF] rounded-xl px-3 py-2 text-xs font-semibold text-[#17152B] focus:outline-none focus:ring-1 focus:ring-purple-300"
                >
                  {timeOptions.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>

              {/* Device */}
              <div className="mb-2">
                <label htmlFor="bbt-device" className="text-[10px] font-bold uppercase tracking-wider text-[#68708A] block mb-1">
                  DEVICE
                </label>
                <select
                  id="bbt-device"
                  value={bbtDevice}
                  onChange={(e) => onUpdateBbtDevice(e.target.value)}
                  className="w-full bg-[#FAF5FF] border border-[#F3E8FF] rounded-xl px-3 py-2 text-xs font-semibold text-[#17152B] focus:outline-none focus:ring-1 focus:ring-purple-300"
                >
                  {deviceOptions.map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Manual Enter Notes */}
            <div>
              <label htmlFor="bbt-notes" className="text-[10px] font-bold uppercase tracking-wider text-[#68708A] block mb-1">
                MANUAL ENTER
              </label>
              <textarea
                id="bbt-notes"
                rows={3}
                maxLength={500}
                placeholder="Optional notes / symptom trigger..."
                value={bbtManualNotes}
                onChange={(e) => onUpdateBbtNotes(e.target.value)}
                className="w-full resize-none bg-white border border-[#F1DDE8] rounded-xl px-3 py-2 text-xs text-[#17152B] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-300"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Medication Card: full content width, items flow into a responsive grid */}
      <div className="w-full min-w-0 bg-white rounded-[24px] p-4 sm:p-5 border border-[#F1DDE8]/70 shadow-sm flex flex-col">
        <div>
          {/* Header */}
          <div className="flex items-center justify-between gap-2 mb-3">
            <div className="flex items-center gap-2">
              <MedicationIcon size="sm" />
              <h3 className="text-card-title font-semibold text-[#17152B]">
                Medication
              </h3>
            </div>

            <button
              type="button"
              data-testid="add-medication-button"
              aria-label="Add medication"
              onClick={onAddMedication}
              className="px-3 py-1 rounded-full bg-[#F43F8F] hover:bg-[#E02E7E] active:scale-95 text-white text-[11px] font-semibold flex items-center gap-1 shadow-2xs transition-all cursor-pointer"
            >
              <Plus className="w-3 h-3" />
              <span>Log</span>
            </button>
          </div>

          {/* Medications List */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-2.5 sm:gap-3">
            {medications.length === 0 ? (
              <div className="col-span-full bg-[#FAF5FF]/30 border border-dashed border-purple-200 rounded-[18px] p-4 text-center">
                <p className="text-xs text-[#68708A]">No medications logged for this day.</p>
                <button
                  type="button"
                  onClick={onAddMedication}
                  className="mt-2 text-xs font-bold text-[#F43F8F] hover:underline"
                >
                  + Add Medication
                </button>
              </div>
            ) : (
              medications.map((med) => {
                return (
                  <div
                    key={med.id}
                    className="min-w-0 bg-[#FAF5FF]/40 border border-purple-100/60 rounded-[18px] p-2.5 sm:p-3 flex items-center justify-between gap-2 transition-all hover:bg-[#FAF5FF]/70"
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <MedicationIcon size="sm" />
                      <div className="min-w-0">
                        <h4 className="text-[12.5px] font-semibold text-[#17152B] leading-tight truncate">
                          {med.name}
                        </h4>
                        <span className="text-[10px] text-[#68708A] leading-tight block truncate">
                          {med.dosage}
                        </span>
                        <div className="flex items-center gap-1.5 mt-0.5">
                          <span className="text-[9.5px] text-[#8B5CF6] font-medium leading-tight">
                            {med.time || '08:00 AM'}{med.frequency ? ` · ${med.frequency}` : ''}
                          </span>
                          {med.reminder && (
                            <span className="text-[9px] bg-pink-100 text-[#EC4899] font-bold px-1.5 py-0.5 rounded-full leading-tight">
                              Reminder ON
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Taken / Skipped Buttons */}
                    <div className="flex flex-col items-stretch gap-1 shrink-0" role="group" aria-label={`${med.name} status`}>
                      <button
                        type="button"
                        onClick={() => onToggleMedicationStatus(med.id, 'taken')}
                        aria-pressed={med.status === 'taken'}
                        className={`min-h-6 px-3 py-1 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-300 text-[10px] font-semibold transition-all cursor-pointer ${
                          med.status === 'taken'
                            ? 'bg-[#16A34A] text-white shadow-2xs font-bold'
                            : 'bg-white border border-gray-200 text-[#68708A] hover:bg-gray-50'
                        }`}
                      >
                        Taken
                      </button>
                      <button
                        type="button"
                        onClick={() => onToggleMedicationStatus(med.id, 'skipped')}
                        aria-pressed={med.status === 'skipped'}
                        className={`min-h-6 px-3 py-1 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-300 text-[10px] font-semibold transition-all cursor-pointer ${
                          med.status === 'skipped'
                            ? 'bg-rose-500 text-white shadow-2xs font-bold'
                            : 'bg-white border border-gray-200 text-[#68708A] hover:bg-gray-50'
                        }`}
                      >
                        Skipped
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        <p className="text-[10.5px] text-[#68708A] mt-3">
          Tap Taken or Skipped; tap again to clear. Saved to this day's log.
        </p>
      </div>
    </div>
  );
};
