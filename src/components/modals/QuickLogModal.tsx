import React, { useState, useEffect } from 'react';
import { X, Droplets, Activity, Smile, Scale, Moon, GlassWater, Check, Thermometer, TestTube, Flame } from 'lucide-react';
import type { QuickLogCategory, WellnessMetricsState, FertilityTrackingState, CervicalMucusType, LhTestResult, LibidoLevel } from '../../types';

interface QuickLogModalProps {
  category: QuickLogCategory | null;
  currentMetrics?: WellnessMetricsState;
  currentFertility?: FertilityTrackingState;
  onClose: () => void;
  onLogComplete: (
    message: string,
    metricUpdate?: Partial<WellnessMetricsState>,
    fertilityUpdate?: Partial<FertilityTrackingState>
  ) => void;
}

export const QuickLogModal: React.FC<QuickLogModalProps> = ({
  category,
  currentMetrics,
  currentFertility,
  onClose,
  onLogComplete,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (category) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [category, onClose]);

  if (!category) return null;

  return (
    <QuickLogModalContent
      key={category}
      category={category}
      currentMetrics={currentMetrics}
      currentFertility={currentFertility}
      onClose={onClose}
      onLogComplete={onLogComplete}
    />
  );
};

interface ContentProps {
  category: QuickLogCategory;
  currentMetrics?: WellnessMetricsState;
  currentFertility?: FertilityTrackingState;
  onClose: () => void;
  onLogComplete: (
    message: string,
    metricUpdate?: Partial<WellnessMetricsState>,
    fertilityUpdate?: Partial<FertilityTrackingState>
  ) => void;
}

const QuickLogModalContent: React.FC<ContentProps> = ({
  category,
  currentMetrics,
  currentFertility,
  onClose,
  onLogComplete,
}) => {
  const [activeSubOption, setActiveSubOption] = useState<string>('Medium Flow');
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>(['Cramps']);
  const [customValue, setCustomValue] = useState<number | string>(
    category === 'weight'
      ? currentMetrics?.weightKg || 58.5
      : category === 'sleep'
      ? currentMetrics?.sleepHours || 7.5
      : category === 'water'
      ? 250
      : category === 'bbt'
      ? currentFertility?.bbtTempC || 36.40
      : ''
  );
  const [bloodColor, setBloodColor] = useState<string>('Dark Red');
  const [productCount, setProductCount] = useState<number>(2);
  const [selectedMucus, setSelectedMucus] = useState<CervicalMucusType>(currentFertility?.cervicalMucus || 'creamy');
  const [selectedLh, setSelectedLh] = useState<LhTestResult>(currentFertility?.lhTest || 'low');
  const [selectedLibido, setSelectedLibido] = useState<LibidoLevel>(currentFertility?.libido || 'medium');

  const toggleSymptom = (symp: string) => {
    setSelectedSymptoms((prev) =>
      prev.includes(symp) ? prev.filter((s) => s !== symp) : [...prev, symp]
    );
  };

  const handleSave = () => {
    switch (category) {
      case 'flow':
        onLogComplete(`Logged ${activeSubOption} (${bloodColor}, ${productCount} pads used)`);
        break;
      case 'symptoms':
        onLogComplete(
          selectedSymptoms.length > 0
            ? `Logged symptoms: ${selectedSymptoms.join(', ')}`
            : 'No symptoms logged today'
        );
        break;
      case 'mood':
        onLogComplete(`Mood updated to: ${activeSubOption || 'Good'}`, {
          mood: (activeSubOption as WellnessMetricsState['mood']) || 'Good',
        });
        break;
      case 'weight':
        onLogComplete(`Logged weight: ${customValue || '58.5'} kg`, {
          weightKg: parseFloat(String(customValue)) || 58.5,
        });
        break;
      case 'sleep':
        onLogComplete(`Logged sleep: ${customValue || '7.5'} hours`, {
          sleepHours: parseFloat(String(customValue)) || 7.5,
        });
        break;
      case 'water': {
        const addedL = (Number(customValue) || 250) / 1000;
        const newWater = Math.round(((currentMetrics?.waterCurrentL || 2.1) + addedL) * 10) / 10;
        onLogComplete(`Logged +${customValue || '250'} ml water`, {
          waterCurrentL: newWater,
        });
        break;
      }
      case 'cervical_mucus':
        onLogComplete(`Logged Cervical Mucus: ${selectedMucus.replace('_', ' ').toUpperCase()}`, undefined, {
          cervicalMucus: selectedMucus,
        });
        break;
      case 'bbt': {
        const temp = parseFloat(String(customValue)) || 36.40;
        const updatedTrend = currentFertility?.bbtTrend.map((pt) =>
          pt.isToday ? { ...pt, tempC: temp } : pt
        );
        onLogComplete(`Logged BBT: ${temp.toFixed(2)}°C`, undefined, {
          bbtTempC: temp,
          bbtTrend: updatedTrend,
        });
        break;
      }
      case 'lh_test':
        onLogComplete(`Logged LH Ovulation Test: ${selectedLh.toUpperCase()}`, undefined, {
          lhTest: selectedLh,
        });
        break;
      case 'libido':
        onLogComplete(`Logged Libido Level: ${selectedLibido.toUpperCase()}`, undefined, {
          libido: selectedLibido,
        });
        break;
    }
    onClose();
  };

  const renderContent = () => {
    switch (category) {
      case 'flow':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                Flow Intensity
              </label>
              <div className="grid grid-cols-2 gap-2">
                {['Spotting', 'Light Flow', 'Medium Flow', 'Heavy Flow'].map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => setActiveSubOption(opt)}
                    className={`p-2.5 rounded-xl border text-xs font-semibold transition-all focus:outline-none ${
                      activeSubOption === opt
                        ? 'border-rose-500 bg-rose-50 text-rose-700 ring-2 ring-rose-200'
                        : 'border-gray-200 hover:bg-gray-50 text-gray-700'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                Blood Color
              </label>
              <div className="flex flex-wrap gap-1.5">
                {['Bright Red', 'Dark Red', 'Pink', 'Brown'].map((color) => (
                  <button
                    key={color}
                    type="button"
                    onClick={() => setBloodColor(color)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-medium border transition-all ${
                      bloodColor === color
                        ? 'bg-rose-500 text-white border-rose-500 shadow-sm'
                        : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100'
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-gray-50 border border-gray-200">
              <span className="text-xs font-medium text-gray-700">Pads / Tampons Used</span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setProductCount((c) => Math.max(0, c - 1))}
                  className="w-7 h-7 rounded-lg bg-white border border-gray-200 text-gray-600 font-bold flex items-center justify-center hover:bg-gray-100"
                >
                  -
                </button>
                <span className="font-bold text-sm text-gray-900 w-6 text-center">{productCount}</span>
                <button
                  type="button"
                  onClick={() => setProductCount((c) => c + 1)}
                  className="w-7 h-7 rounded-lg bg-white border border-gray-200 text-gray-600 font-bold flex items-center justify-center hover:bg-gray-100"
                >
                  +
                </button>
              </div>
            </div>
          </div>
        );

      case 'symptoms':
        return (
          <div className="space-y-3">
            <p className="text-xs text-gray-500">Tap to select all symptoms experienced today:</p>
            <div className="flex flex-wrap gap-2 max-h-52 overflow-y-auto pr-1">
              {[
                'Cramps',
                'Headache',
                'Fatigue',
                'Tender Breasts',
                'Backache',
                'Bloating',
                'Cravings',
                'Mood Swings',
                'Nausea',
                'Insomnia',
                'Hot Flashes',
              ].map((symp) => {
                const isSelected = selectedSymptoms.includes(symp);
                return (
                  <button
                    key={symp}
                    type="button"
                    onClick={() => toggleSymptom(symp)}
                    className={`px-3 py-2 rounded-xl text-xs font-medium border transition-all flex items-center gap-1.5 ${
                      isSelected
                        ? 'bg-pink-500 text-white border-pink-500 shadow-sm'
                        : 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {isSelected && <Check className="w-3 h-3" />}
                    <span>{symp}</span>
                  </button>
                );
              })}
            </div>
          </div>
        );

      case 'mood':
        return (
          <div className="space-y-3">
            <p className="text-xs text-gray-500">How are you feeling right now?</p>
            <div className="grid grid-cols-3 gap-2.5">
              {[
                { name: 'Great', emoji: '😄' },
                { name: 'Good', emoji: '😊' },
                { name: 'Neutral', emoji: '😐' },
                { name: 'Low', emoji: '😔' },
                { name: 'Sensitive', emoji: '🥺' },
              ].map((m) => (
                <button
                  key={m.name}
                  type="button"
                  onClick={() => setActiveSubOption(m.name)}
                  className={`p-3 rounded-2xl border flex flex-col items-center gap-1 text-xs font-semibold transition-all focus:outline-none ${
                    activeSubOption === m.name
                      ? 'bg-amber-500 text-white border-amber-500 shadow-sm scale-105'
                      : 'bg-amber-50/50 border-amber-100 text-amber-900 hover:bg-amber-100'
                  }`}
                >
                  <span className="text-xl">{m.emoji}</span>
                  <span>{m.name}</span>
                </button>
              ))}
            </div>
          </div>
        );

      case 'weight':
        return (
          <div className="space-y-3">
            <p className="text-xs text-gray-500">Enter today's weight measurement:</p>
            <div className="flex items-center gap-3">
              <input
                type="number"
                step="0.1"
                placeholder="58.5"
                value={customValue}
                onChange={(e) => setCustomValue(e.target.value)}
                className="flex-1 px-4 py-3 rounded-2xl border border-gray-200 text-lg font-bold text-center focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <span className="text-base font-bold text-gray-600">kg</span>
            </div>
            <div className="flex justify-center gap-2 pt-1">
              {[-0.5, -0.1, 0.1, 0.5].map((delta) => (
                <button
                  key={delta}
                  type="button"
                  onClick={() =>
                    setCustomValue((prev) =>
                      (Math.round(((parseFloat(String(prev)) || 58.5) + delta) * 10) / 10).toFixed(1)
                    )
                  }
                  className="px-2.5 py-1 rounded-lg bg-gray-100 hover:bg-gray-200 text-xs font-semibold text-gray-700"
                >
                  {delta > 0 ? `+${delta}` : delta}
                </button>
              ))}
            </div>
          </div>
        );

      case 'sleep':
        return (
          <div className="space-y-3">
            <p className="text-xs text-gray-500">Enter sleep duration:</p>
            <div className="flex items-center gap-3">
              <input
                type="number"
                step="0.5"
                placeholder="7.5"
                value={customValue}
                onChange={(e) => setCustomValue(e.target.value)}
                className="flex-1 px-4 py-3 rounded-2xl border border-gray-200 text-lg font-bold text-center focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
              <span className="text-base font-bold text-gray-600">hours</span>
            </div>
            <div className="flex justify-center gap-2 pt-1">
              {[6, 7, 7.5, 8, 8.5, 9].map((hrs) => (
                <button
                  key={hrs}
                  type="button"
                  onClick={() => setCustomValue(hrs)}
                  className="px-2.5 py-1 rounded-lg bg-purple-50 hover:bg-purple-100 text-xs font-semibold text-purple-800"
                >
                  {hrs}h
                </button>
              ))}
            </div>
          </div>
        );

      case 'water':
        return (
          <div className="space-y-3">
            <p className="text-xs text-gray-500">Quick add water to today's hydration:</p>
            <div className="grid grid-cols-3 gap-2">
              {['250', '500', '750'].map((ml) => (
                <button
                  key={ml}
                  type="button"
                  onClick={() => setCustomValue(ml)}
                  className={`p-3 rounded-2xl border text-sm font-semibold transition-all ${
                    String(customValue) === ml
                      ? 'bg-cyan-500 text-white border-cyan-500 shadow-sm'
                      : 'bg-cyan-50/50 border-cyan-100 text-cyan-800 hover:bg-cyan-100'
                  }`}
                >
                  +{ml} ml
                </button>
              ))}
            </div>
            <div className="flex items-center gap-2 pt-1">
              <label className="text-xs text-gray-500">Custom amount:</label>
              <input
                type="number"
                step="50"
                value={customValue}
                onChange={(e) => setCustomValue(e.target.value)}
                className="w-24 px-2 py-1 rounded-lg border border-gray-200 text-xs text-center font-bold"
              />
              <span className="text-xs text-gray-500">ml</span>
            </div>
          </div>
        );

      case 'cervical_mucus':
        return (
          <div className="space-y-3">
            <p className="text-xs text-gray-500">Select today's cervical fluid consistency:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {[
                { type: 'dry' as CervicalMucusType, name: 'Dry (Low fertility)' },
                { type: 'sticky' as CervicalMucusType, name: 'Sticky (Low fertility)' },
                { type: 'creamy' as CervicalMucusType, name: 'Creamy (Transitional)' },
                { type: 'watery' as CervicalMucusType, name: 'Watery (High fertility)' },
                { type: 'egg_white' as CervicalMucusType, name: 'Egg White (Peak fertility)' },
              ].map((item) => (
                <button
                  key={item.type}
                  type="button"
                  onClick={() => setSelectedMucus(item.type)}
                  className={`p-3 rounded-xl border text-left text-xs font-semibold transition-all ${
                    selectedMucus === item.type
                      ? 'bg-pink-500 text-white border-pink-500 shadow-xs'
                      : 'bg-gray-50 text-gray-700 hover:bg-gray-100 border-gray-200'
                  }`}
                >
                  {item.name}
                </button>
              ))}
            </div>
          </div>
        );

      case 'bbt':
        return (
          <div className="space-y-3">
            <p className="text-xs text-gray-500">Enter today's waking Basal Body Temperature:</p>
            <div className="flex items-center gap-3">
              <input
                type="number"
                step="0.05"
                min="35.0"
                max="38.5"
                placeholder="36.40"
                value={customValue}
                onChange={(e) => setCustomValue(e.target.value)}
                className="flex-1 px-4 py-3 rounded-2xl border border-gray-200 text-lg font-bold text-center focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
              <span className="text-base font-bold text-gray-600">°C</span>
            </div>
          </div>
        );

      case 'lh_test':
        return (
          <div className="space-y-3">
            <p className="text-xs text-gray-500">Select LH ovulation predictor kit result:</p>
            <div className="grid grid-cols-2 gap-2">
              {[
                { type: 'negative' as LhTestResult, label: 'Negative (< 10 mIU)' },
                { type: 'low' as LhTestResult, label: 'Low (10–25 mIU)' },
                { type: 'high' as LhTestResult, label: 'High (25–40 mIU)' },
                { type: 'peak' as LhTestResult, label: 'Peak (LH Surge!)' },
              ].map((item) => (
                <button
                  key={item.type}
                  type="button"
                  onClick={() => setSelectedLh(item.type)}
                  className={`p-3 rounded-xl border text-center text-xs font-semibold transition-all ${
                    selectedLh === item.type
                      ? 'bg-purple-600 text-white border-purple-600 shadow-xs'
                      : 'bg-gray-50 text-gray-700 hover:bg-gray-100 border-gray-200'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        );

      case 'libido':
        return (
          <div className="space-y-3">
            <p className="text-xs text-gray-500">Select today's sex drive / vitality level:</p>
            <div className="grid grid-cols-3 gap-2">
              {[
                { type: 'low' as LibidoLevel, label: 'Low' },
                { type: 'medium' as LibidoLevel, label: 'Medium' },
                { type: 'high' as LibidoLevel, label: 'High' },
              ].map((item) => (
                <button
                  key={item.type}
                  type="button"
                  onClick={() => setSelectedLibido(item.type)}
                  className={`p-3 rounded-xl border text-center text-xs font-bold transition-all ${
                    selectedLibido === item.type
                      ? 'bg-rose-500 text-white border-rose-500 shadow-xs'
                      : 'bg-gray-50 text-gray-700 hover:bg-gray-100 border-gray-200'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        );
    }
  };

  const getHeaderIcon = () => {
    switch (category) {
      case 'flow':
        return <Droplets className="w-5 h-5 text-rose-500" />;
      case 'symptoms':
        return <Activity className="w-5 h-5 text-pink-500" />;
      case 'mood':
        return <Smile className="w-5 h-5 text-amber-500" />;
      case 'weight':
        return <Scale className="w-5 h-5 text-blue-500" />;
      case 'sleep':
        return <Moon className="w-5 h-5 text-purple-500" />;
      case 'water':
        return <GlassWater className="w-5 h-5 text-cyan-500" />;
      case 'cervical_mucus':
        return <Droplets className="w-5 h-5 text-pink-500" />;
      case 'bbt':
        return <Thermometer className="w-5 h-5 text-purple-500" />;
      case 'lh_test':
        return <TestTube className="w-5 h-5 text-pink-500" />;
      case 'libido':
        return <Flame className="w-5 h-5 text-rose-500" />;
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="quick-log-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="bg-white rounded-[28px] max-w-sm w-full p-6 shadow-2xl border border-pink-100 flex flex-col gap-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
              {getHeaderIcon()}
            </div>
            <h3 id="quick-log-title" className="text-lg font-bold text-gray-900 capitalize">
              Log {category.replace('_', ' ')}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-7 h-7 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-brand-pink min-h-[44px] min-w-[44px]"
            aria-label="Close dialog"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {renderContent()}

        {/* Action buttons */}
        <div className="pt-2 flex items-center justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="px-3.5 py-2 rounded-xl text-xs font-medium text-gray-600 hover:bg-gray-100 transition-colors min-h-[44px]"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="px-4 py-2 rounded-xl bg-brand-hotpink hover:bg-brand-berry active:scale-95 text-white text-xs font-semibold transition-all shadow-sm flex items-center gap-1.5 min-h-[44px]"
          >
            <Check className="w-3.5 h-3.5" />
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};
