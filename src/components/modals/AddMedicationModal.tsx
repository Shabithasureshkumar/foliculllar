import React, { useRef, useState } from 'react';
import { X, ChevronDown } from 'lucide-react';
import type { MedicationEntry } from '../../types';
import { ToggleSwitch } from '../ToggleSwitch';
import { MedicationIcon } from '../MedicationIcon';
import { useModalA11y } from '../../hooks/useModalA11y';
import { addDays, formatShortDate } from '../../utils/calendarUtils';

interface AddMedicationModalProps {
  isOpen: boolean;
  /** Day the medication is being logged for (prefills Start/End date) */
  defaultDate: Date;
  onClose: () => void;
  onSave: (medication: MedicationEntry) => void;
}

export const AddMedicationModal: React.FC<AddMedicationModalProps> = ({
  isOpen,
  defaultDate,
  onClose,
  onSave,
}) => {
  const [name, setName] = useState('');
  const [medType, setMedType] = useState('Capsule');
  const [dosage, setDosage] = useState('');
  const [frequency, setFrequency] = useState('Once daily');
  const [time, setTime] = useState('08:00 AM');
  const defaultStartStr = formatShortDate(defaultDate);
  const defaultEndStr = formatShortDate(addDays(defaultDate, 30));
  const [startDate, setStartDate] = useState(defaultStartStr);
  const [endDate, setEndDate] = useState(defaultEndStr);
  const [reminder, setReminder] = useState(true);
  const [errors, setErrors] = useState<{ name?: string; dosage?: string }>({});
  const dialogRef = useRef<HTMLDivElement>(null);
  useModalA11y(isOpen, onClose, dialogRef);

  if (!isOpen) return null;

  const typeOptions = [
    'Capsule',
    'Tablet',
    'Liquid',
    'Injection',
    'Topical',
    'Drops',
    'Powder',
    'Other',
  ];

  const frequencyOptions = [
    'Once daily',
    'Twice daily',
    'Three times daily',
    'As needed',
    'Every other day',
    'Weekly',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const trimmedName = name.trim();
    const trimmedDosage = dosage.trim();

    const newErrors: { name?: string; dosage?: string } = {};
    if (!trimmedName) {
      newErrors.name = 'Medication name is required';
    }
    if (!trimmedDosage) {
      newErrors.dosage = 'Dosage is required';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const newMed: MedicationEntry = {
      id: `med-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      name: trimmedName,
      dosage: `${trimmedDosage} · ${medType}`,
      type: medType,
      frequency,
      time: time.trim() || '08:00 AM',
      startDate: startDate.trim() || defaultStartStr,
      endDate: endDate.trim() || defaultEndStr,
      reminder,
      status: 'pending',
    };

    onSave(newMed);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-black/35 backdrop-blur-[2px] animate-fade"
      onClick={onClose}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="add-medication-title"
        tabIndex={-1}
        className="bg-white rounded-[24px] sm:rounded-[28px] p-5 sm:p-6 md:p-7 border border-[#F1DDE8]/80 shadow-2xl w-full max-w-[480px] max-h-[92vh] overflow-y-auto relative text-left box-border font-sans transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Handle Pill */}
        <div className="w-12 h-1 bg-gray-200 rounded-full mx-auto mb-3" />

        {/* Top Header */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex items-start gap-3 min-w-0">
            <MedicationIcon />
            <div className="min-w-0">
            <h2 id="add-medication-title" className="text-[18px] sm:text-[20px] font-bold text-[#17152B] leading-tight">
              Add Medication
            </h2>
            <p className="text-[11.5px] sm:text-[12px] text-[#68708A] font-normal mt-0.5">
              Only the details you enter are stored. No recommendations are made.
            </p>
            </div>
          </div>

          {/* Close button */}
          <button
            type="button"
            onClick={onClose}
            aria-label="Close add medication modal"
            className="w-7 h-7 rounded-full bg-[#FFF0F6] text-[#EC4899] hover:bg-[#FFE4EE] flex items-center justify-center transition-all focus:outline-none focus:ring-2 focus:ring-pink-300 shrink-0 cursor-pointer"
          >
            <X className="w-4 h-4 stroke-[2.5]" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3.5">
          {/* 1. Medication Name */}
          <div>
            <label htmlFor="med-name" className="text-[12px] sm:text-[12.5px] font-bold text-[#17152B] mb-1.5 block">
              Medication Name
            </label>
            <input
              id="med-name"
              data-autofocus
              type="text"
              value={name}
              aria-invalid={Boolean(errors.name)}
              onChange={(e) => {
                setName(e.target.value);
                if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }));
              }}
              placeholder="e.g. Iron Supplement"
              className={`w-full rounded-full border px-4 py-2 sm:py-2.5 text-xs text-[#17152B] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-300 bg-white ${
                errors.name ? 'border-red-400 ring-1 ring-red-300' : 'border-gray-200'
              }`}
            />
            {errors.name && (
              <p className="text-[10px] text-red-500 font-medium mt-1 px-2">{errors.name}</p>
            )}
          </div>

          {/* 2. Medication Type */}
          <div>
            <label htmlFor="med-type" className="text-[12px] sm:text-[12.5px] font-bold text-[#17152B] mb-1.5 block">
              Medication Type
            </label>
            <div className="relative">
              <select
                id="med-type"
                value={medType}
                onChange={(e) => setMedType(e.target.value)}
                className="w-full rounded-full border border-gray-200 px-4 py-2 sm:py-2.5 text-xs font-semibold text-[#17152B] focus:outline-none focus:ring-2 focus:ring-pink-300 bg-white appearance-none pr-9 cursor-pointer"
              >
                {typeOptions.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-4 h-4 text-gray-400 pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          {/* 3. Dosage */}
          <div>
            <label htmlFor="med-dosage" className="text-[12px] sm:text-[12.5px] font-bold text-[#17152B] mb-1.5 block">
              Dosage
            </label>
            <input
              id="med-dosage"
              type="text"
              value={dosage}
              aria-invalid={Boolean(errors.dosage)}
              onChange={(e) => {
                setDosage(e.target.value);
                if (errors.dosage) setErrors((prev) => ({ ...prev, dosage: undefined }));
              }}
              placeholder="e.g. 400 mg"
              className={`w-full rounded-full border px-4 py-2 sm:py-2.5 text-xs text-[#17152B] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-300 bg-white ${
                errors.dosage ? 'border-red-400 ring-1 ring-red-300' : 'border-gray-200'
              }`}
            />
            {errors.dosage && (
              <p className="text-[10px] text-red-500 font-medium mt-1 px-2">{errors.dosage}</p>
            )}
          </div>

          {/* 4. Frequency */}
          <div>
            <label htmlFor="med-frequency" className="text-[12px] sm:text-[12.5px] font-bold text-[#17152B] mb-1.5 block">
              Frequency
            </label>
            <div className="relative">
              <select
                id="med-frequency"
                value={frequency}
                onChange={(e) => setFrequency(e.target.value)}
                className="w-full rounded-full border border-gray-200 px-4 py-2 sm:py-2.5 text-xs font-semibold text-[#17152B] focus:outline-none focus:ring-2 focus:ring-pink-300 bg-white appearance-none pr-9 cursor-pointer"
              >
                {frequencyOptions.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-4 h-4 text-gray-400 pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          {/* 5. Time */}
          <div>
            <label htmlFor="med-time" className="text-[12px] sm:text-[12.5px] font-bold text-[#17152B] mb-1.5 block">
              Time
            </label>
            <input
              id="med-time"
              type="text"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              placeholder="08:00 AM"
              className="w-full rounded-full border border-gray-200 px-4 py-2 sm:py-2.5 text-xs text-[#17152B] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-300 bg-white"
            />
          </div>

          {/* 6. Start Date */}
          <div>
            <label htmlFor="med-start" className="text-[12px] sm:text-[12.5px] font-bold text-[#17152B] mb-1.5 block">
              Start Date
            </label>
            <input
              id="med-start"
              type="text"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              placeholder={defaultStartStr}
              className="w-full rounded-full border border-gray-200 px-4 py-2 sm:py-2.5 text-xs text-[#17152B] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-300 bg-white"
            />
          </div>

          {/* 7. End Date */}
          <div>
            <label htmlFor="med-end" className="text-[12px] sm:text-[12.5px] font-bold text-[#17152B] mb-1.5 block">
              End Date
            </label>
            <input
              id="med-end"
              type="text"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              placeholder={defaultEndStr}
              className="w-full rounded-full border border-gray-200 px-4 py-2 sm:py-2.5 text-xs text-[#17152B] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-300 bg-white"
            />
          </div>

          {/* 8. Reminder Toggle */}
          <ToggleSwitch
            id="reminder-toggle-switch"
            checked={reminder}
            onChange={setReminder}
            label="Reminder"
            description="Remind me at the scheduled time"
            className="border border-gray-200 rounded-[20px] px-4 py-2.5 sm:py-3"
          />

          {/* 9. Bottom Action Buttons */}
          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="text-xs sm:text-[12.5px] font-semibold text-[#68708A] hover:text-[#17152B] px-4 py-2.5 transition-all focus:outline-none cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-[#EC4899] hover:bg-[#DB2777] text-white font-bold text-xs sm:text-sm px-7 py-2.5 rounded-full shadow-sm active:scale-95 transition-all focus:outline-none focus:ring-2 focus:ring-pink-300 cursor-pointer"
            >
              Save Medication
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
