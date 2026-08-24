import React, { useState, useEffect } from 'react';
import { X, Flame, Footprints, Wind, Dumbbell, Activity, Check } from 'lucide-react';
import type { ActivityLog } from '../../types';

interface LogActivityModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSaveActivity: (activity: Omit<ActivityLog, 'id'>) => void;
}

export const LogActivityModal: React.FC<LogActivityModalProps> = ({
  isOpen,
  onClose,
  onSaveActivity,
}) => {
  const [selectedType, setSelectedType] = useState<ActivityLog['type']>('walking');
  const [name, setName] = useState('Walking');
  const [durationMin, setDurationMin] = useState(30);
  const [targetMin, setTargetMin] = useState(45);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const activityPresets: Array<{
    type: ActivityLog['type'];
    name: string;
    icon: React.ReactNode;
    defaultTarget: number;
    gradientFrom: string;
    gradientTo: string;
  }> = [
    {
      type: 'walking',
      name: 'Walking',
      icon: <Footprints className="w-5 h-5" />,
      defaultTarget: 40,
      gradientFrom: '#FA7EBA',
      gradientTo: '#B91075',
    },
    {
      type: 'cardio',
      name: 'Cardio',
      icon: <Flame className="w-5 h-5" />,
      defaultTarget: 30,
      gradientFrom: '#FB923C',
      gradientTo: '#EF4444',
    },
    {
      type: 'yoga',
      name: 'Yoga',
      icon: <Wind className="w-5 h-5" />,
      defaultTarget: 30,
      gradientFrom: '#C084FC',
      gradientTo: '#9333EA',
    },
    {
      type: 'strength',
      name: 'Strength Training',
      icon: <Dumbbell className="w-5 h-5" />,
      defaultTarget: 35,
      gradientFrom: '#60A5FA',
      gradientTo: '#2563EB',
    },
    {
      type: 'custom',
      name: 'Pilates / Dance',
      icon: <Activity className="w-5 h-5" />,
      defaultTarget: 30,
      gradientFrom: '#34D399',
      gradientTo: '#059669',
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const preset = activityPresets.find((p) => p.type === selectedType) || activityPresets[0];
    onSaveActivity({
      name: name || preset.name,
      type: selectedType,
      durationMin: Number(durationMin),
      targetMin: Number(targetMin) || preset.defaultTarget,
      gradientFrom: preset.gradientFrom,
      gradientTo: preset.gradientTo,
    });
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="log-activity-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="bg-white rounded-[28px] max-w-md w-full p-6 shadow-2xl border border-pink-100 flex flex-col gap-5">
        {/* Modal Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-[#FFDEE9] flex items-center justify-center text-brand-berry">
              <Activity className="w-5 h-5" />
            </div>
            <h3 id="log-activity-title" className="text-xl font-bold text-gray-900">
              Log Activity
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-brand-pink"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Preset Buttons */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2">
              Select Workout Type
            </label>
            <div className="grid grid-cols-3 gap-2">
              {activityPresets.map((preset) => (
                <button
                  key={preset.type}
                  type="button"
                  onClick={() => {
                    setSelectedType(preset.type);
                    setName(preset.name);
                    setTargetMin(preset.defaultTarget);
                  }}
                  className={`p-3 rounded-2xl border flex flex-col items-center gap-1.5 transition-all text-xs font-medium focus:outline-none ${
                    selectedType === preset.type
                      ? 'border-brand-pink bg-pink-50/80 text-brand-berry ring-2 ring-brand-pink/20'
                      : 'border-gray-200 bg-gray-50/50 text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <div className={selectedType === preset.type ? 'text-brand-pink' : 'text-gray-500'}>
                    {preset.icon}
                  </div>
                  <span className="text-center truncate w-full">{preset.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Activity Name */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1">
              Activity Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-pink/40 focus:border-brand-pink"
              required
            />
          </div>

          {/* Duration & Target */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1">
                Duration (min)
              </label>
              <input
                type="number"
                min="1"
                max="360"
                value={durationMin}
                onChange={(e) => setDurationMin(Math.max(1, Number(e.target.value)))}
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-pink/40 focus:border-brand-pink"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1">
                Daily Goal (min)
              </label>
              <input
                type="number"
                min="5"
                max="360"
                value={targetMin}
                onChange={(e) => setTargetMin(Math.max(5, Number(e.target.value)))}
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-pink/40 focus:border-brand-pink"
                required
              />
            </div>
          </div>

          {/* Submit */}
          <div className="pt-2 flex items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-100 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-brand-rose hover:bg-brand-hotpink active:scale-95 text-white text-sm font-semibold transition-all shadow-sm flex items-center gap-1.5"
            >
              <Check className="w-4 h-4" />
              Save Workout
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
