import React, { useState, useEffect } from 'react';
import { X, Moon, Smile, Droplets, Footprints, Scale, Heart, Check } from 'lucide-react';
import type { WellnessMetricsState } from '../../types';

interface EditWellnessModalProps {
  isOpen: boolean;
  initialMetrics: WellnessMetricsState;
  onClose: () => void;
  onSave: (updated: WellnessMetricsState) => void;
}

export const EditWellnessModal: React.FC<EditWellnessModalProps> = ({
  isOpen,
  initialMetrics,
  onClose,
  onSave,
}) => {
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

  return (
    <EditWellnessModalContent
      initialMetrics={initialMetrics}
      onClose={onClose}
      onSave={onSave}
    />
  );
};

interface ContentProps {
  initialMetrics: WellnessMetricsState;
  onClose: () => void;
  onSave: (updated: WellnessMetricsState) => void;
}

const EditWellnessModalContent: React.FC<ContentProps> = ({
  initialMetrics,
  onClose,
  onSave,
}) => {
  const [metrics, setMetrics] = useState<WellnessMetricsState>(initialMetrics);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(metrics);
    onClose();
  };

  const moodOptions: WellnessMetricsState['mood'][] = ['Great', 'Good', 'Neutral', 'Low', 'Sensitive'];
  const sexOptions: WellnessMetricsState['sexActivity'][] = ['Not Logged', 'Protected', 'Unprotected', 'High Drive'];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="edit-wellness-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="bg-white rounded-[28px] max-w-lg w-full p-6 shadow-2xl border border-pink-100 max-h-[90vh] overflow-y-auto flex flex-col gap-5">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h3 id="edit-wellness-title" className="text-xl font-bold text-gray-900">
              Edit Wellness Metrics
            </h3>
            <p className="text-xs text-gray-500">Today, 21 June 2026 – Cycle Day 1</p>
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
          {/* Sleep Hours */}
          <div className="bg-purple-50/50 p-3.5 rounded-2xl border border-purple-100 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-purple-100 flex items-center justify-center text-purple-600">
                <Moon className="w-4 h-4" />
              </div>
              <div>
                <span className="text-sm font-semibold text-gray-800 block">Sleep Duration</span>
                <span className="text-xs text-gray-500">Hours of sleep last night</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                step="0.1"
                min="0"
                max="24"
                value={metrics.sleepHours}
                onChange={(e) => setMetrics({ ...metrics, sleepHours: parseFloat(e.target.value) || 0 })}
                className="w-20 px-2.5 py-1.5 text-center font-bold text-sm bg-white border border-purple-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
              <span className="text-xs font-semibold text-gray-600">hrs</span>
            </div>
          </div>

          {/* Mood */}
          <div className="bg-orange-50/50 p-3.5 rounded-2xl border border-orange-100">
            <div className="flex items-center gap-2 mb-2.5">
              <div className="w-7 h-7 rounded-full bg-orange-100 flex items-center justify-center text-orange-600">
                <Smile className="w-4 h-4" />
              </div>
              <span className="text-sm font-semibold text-gray-800">Mood</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {moodOptions.map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => setMetrics({ ...metrics, mood: m })}
                  className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all focus:outline-none ${
                    metrics.mood === m
                      ? 'bg-orange-500 text-white shadow-sm'
                      : 'bg-white text-gray-700 hover:bg-orange-100 border border-orange-200'
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>

          {/* Water Intake */}
          <div className="bg-blue-50/50 p-3.5 rounded-2xl border border-blue-100 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                <Droplets className="w-4 h-4" />
              </div>
              <div>
                <span className="text-sm font-semibold text-gray-800 block">Water Intake</span>
                <span className="text-xs text-gray-500">Current / Target (Liters)</span>
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              <input
                type="number"
                step="0.1"
                min="0"
                max="10"
                value={metrics.waterCurrentL}
                onChange={(e) => setMetrics({ ...metrics, waterCurrentL: parseFloat(e.target.value) || 0 })}
                className="w-16 px-2 py-1.5 text-center font-bold text-sm bg-white border border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <span className="text-gray-400">/</span>
              <input
                type="number"
                step="0.1"
                min="0.5"
                max="10"
                value={metrics.waterTargetL}
                onChange={(e) => setMetrics({ ...metrics, waterTargetL: parseFloat(e.target.value) || 0 })}
                className="w-16 px-2 py-1.5 text-center font-bold text-sm bg-white border border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <span className="text-xs font-semibold text-gray-600">L</span>
            </div>
          </div>

          {/* Daily Steps */}
          <div className="bg-emerald-50/50 p-3.5 rounded-2xl border border-emerald-100 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                <Footprints className="w-4 h-4" />
              </div>
              <div>
                <span className="text-sm font-semibold text-gray-800 block">Step Count</span>
                <span className="text-xs text-gray-500">Synced from device</span>
              </div>
            </div>
            <input
              type="number"
              min="0"
              max="100000"
              value={metrics.steps}
              onChange={(e) => setMetrics({ ...metrics, steps: parseInt(e.target.value, 10) || 0 })}
              className="w-24 px-2.5 py-1.5 text-center font-bold text-sm bg-white border border-emerald-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-400"
            />
          </div>

          {/* Weight */}
          <div className="bg-pink-50/50 p-3.5 rounded-2xl border border-pink-100 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-pink-100 flex items-center justify-center text-brand-hotpink">
                <Scale className="w-4 h-4" />
              </div>
              <div>
                <span className="text-sm font-semibold text-gray-800 block">Body Weight</span>
                <span className="text-xs text-gray-500">Measured in kg</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                step="0.1"
                min="20"
                max="300"
                value={metrics.weightKg}
                onChange={(e) => setMetrics({ ...metrics, weightKg: parseFloat(e.target.value) || 0 })}
                className="w-20 px-2.5 py-1.5 text-center font-bold text-sm bg-white border border-pink-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-pink"
              />
              <span className="text-xs font-semibold text-gray-600">kg</span>
            </div>
          </div>

          {/* Sex Activity */}
          <div className="bg-rose-50/50 p-3.5 rounded-2xl border border-rose-100">
            <div className="flex items-center gap-2 mb-2.5">
              <div className="w-7 h-7 rounded-full bg-rose-100 flex items-center justify-center text-rose-600">
                <Heart className="w-4 h-4" />
              </div>
              <span className="text-sm font-semibold text-gray-800">Sex Activity</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {sexOptions.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setMetrics({ ...metrics, sexActivity: s })}
                  className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all focus:outline-none ${
                    metrics.sexActivity === s
                      ? 'bg-rose-500 text-white shadow-sm'
                      : 'bg-white text-gray-700 hover:bg-rose-100 border border-rose-200'
                  }`}
                >
                  {s}
                </button>
              ))}
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
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
