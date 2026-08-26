import React, { useState } from 'react';
import { Thermometer, ChevronUp, ChevronDown, Check, TrendingUp } from 'lucide-react';
import type { BbtDataPoint } from '../../types';

interface BbtTrackingCardProps {
  currentTempC: number;
  trendData: BbtDataPoint[];
  onUpdateTemp: (newTemp: number) => void;
}

export const BbtTrackingCard: React.FC<BbtTrackingCardProps> = ({
  currentTempC,
  trendData,
  onUpdateTemp,
}) => {
  const [hoveredPoint, setHoveredPoint] = useState<BbtDataPoint | null>(null);
  const [localInput, setLocalInput] = useState<string | null>(null);

  const displayTemp = localInput !== null ? localInput : currentTempC.toFixed(2);

  const minTemp = 36.1;
  const maxTemp = 36.6;

  const handleStep = (delta: number) => {
    const next = Math.round((currentTempC + delta) * 100) / 100;
    if (next >= 35.0 && next <= 38.5) {
      setLocalInput(null);
      onUpdateTemp(next);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalInput(e.target.value);
    const parsed = parseFloat(e.target.value);
    if (!isNaN(parsed) && parsed >= 35.0 && parsed <= 38.5) {
      onUpdateTemp(Math.round(parsed * 100) / 100);
    }
  };

  const handleBlur = () => {
    setLocalInput(null);
  };

  // SVG Chart Geometry Calculations
  const chartWidth = 360;
  const chartHeight = 110;
  const paddingX = 24;
  const paddingY = 16;

  const getX = (index: number) => {
    const total = trendData.length - 1 || 1;
    return paddingX + (index / total) * (chartWidth - paddingX * 2);
  };

  const getY = (temp: number) => {
    const normalized = (temp - minTemp) / (maxTemp - minTemp || 1);
    const clamped = Math.max(0, Math.min(1, normalized));
    return chartHeight - paddingY - clamped * (chartHeight - paddingY * 2);
  };

  // Build SVG Path Line
  const points = trendData.map((d, i) => ({
    x: getX(i),
    y: getY(d.tempC),
    data: d,
  }));

  const linePath = points.reduce((acc, pt, i, arr) => {
    if (i === 0) return `M ${pt.x} ${pt.y}`;
    const prev = arr[i - 1];
    const midX = (prev.x + pt.x) / 2;
    return `${acc} C ${midX} ${prev.y}, ${midX} ${pt.y}, ${pt.x} ${pt.y}`;
  }, '');

  const areaPath = `${linePath} L ${points[points.length - 1].x} ${chartHeight} L ${points[0].x} ${chartHeight} Z`;
  const coverlineY = getY(36.35);

  return (
    <div className="bg-white rounded-[clamp(1.25rem,2vw,1.5rem)] p-[clamp(1.2rem,2vw,1.56rem)] border border-[#F3F4F6] shadow-soft w-full min-w-0">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 mb-5">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-[#FAF5FF] border border-[#F3E8FF] flex items-center justify-center text-[#9333EA] shrink-0">
            <Thermometer className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-[clamp(1rem,1.4vw,1.125rem)] font-bold leading-tight text-[#1F2937]">
              Basal Body Temperature (BBT)
            </h3>
            <p className="text-[clamp(0.75rem,1vw,0.825rem)] text-[#6B7280] leading-tight mt-0.5">
              Waking temperature indicates pre-ovulatory hormone baseline
            </p>
          </div>
        </div>

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F0FDF4] border border-[#DCFCE7] text-[12px] font-semibold text-[#16A34A] self-start sm:self-auto">
          <Check className="w-3.5 h-3.5 stroke-[2.5]" />
          <span>Synced · 36.40°C recorded</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-stretch">
        {/* Left Column: Temperature Input & Stepper */}
        <div className="lg:col-span-5 bg-gradient-to-br from-[#FFF5F9] to-[#FAF5FF] rounded-[20px] p-4 sm:p-5 border border-pink-100 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[12.5px] font-bold uppercase tracking-wider text-[#801543]">
                Today's BBT Reading
              </span>
              <span className="text-[11.5px] text-[#6B7280]">Morning 06:45 AM</span>
            </div>

            {/* Main Digital Temp Display */}
            <div className="flex items-center justify-between gap-3 bg-white rounded-2xl p-3.5 border border-pink-200/80 shadow-xs mb-3">
              <div className="flex items-baseline gap-1.5">
                <input
                  type="number"
                  step="0.05"
                  min="35.0"
                  max="38.5"
                  value={displayTemp}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  className="w-28 text-[28px] sm:text-[32px] font-extrabold text-[#1F2937] leading-none tracking-tight focus:outline-none focus:ring-1 focus:ring-[#EA33A1] rounded-lg px-1 bg-transparent"
                  aria-label="Basal body temperature in degrees Celsius"
                />
                <span className="text-[18px] font-bold text-[#EA33A1]">°C</span>
              </div>

              {/* Stepper Buttons */}
              <div className="flex flex-col gap-1">
                <button
                  type="button"
                  onClick={() => handleStep(0.05)}
                  className="w-8 h-8 rounded-lg bg-[#FAF5FF] hover:bg-[#F3E8FF] text-[#9333EA] flex items-center justify-center border border-purple-100 active:scale-95 transition-all focus:outline-none"
                  aria-label="Increase temperature by 0.05 degrees Celsius"
                >
                  <ChevronUp className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => handleStep(-0.05)}
                  className="w-8 h-8 rounded-lg bg-[#FAF5FF] hover:bg-[#F3E8FF] text-[#9333EA] flex items-center justify-center border border-purple-100 active:scale-95 transition-all focus:outline-none"
                  aria-label="Decrease temperature by 0.05 degrees Celsius"
                >
                  <ChevronDown className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Quick Preset Buttons */}
            <div className="flex items-center gap-1.5 mb-3 flex-wrap">
              {[36.30, 36.35, 36.40, 36.45, 36.50].map((val) => (
                <button
                  key={val}
                  type="button"
                  onClick={() => {
                    setLocalInput(null);
                    onUpdateTemp(val);
                  }}
                  className={`px-2.5 py-1 rounded-lg text-[12px] font-semibold transition-all ${
                    currentTempC.toFixed(2) === val.toFixed(2)
                      ? 'bg-[#EA33A1] text-white shadow-xs'
                      : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  {val.toFixed(2)}°
                </button>
              ))}
            </div>
          </div>

          <div className="pt-2 border-t border-pink-100/80 text-[11.5px] leading-relaxed text-[#6B7280]">
            <p>
              <strong className="text-[#801543]">Pre-ovulatory range:</strong> Low & steady (36.20°C – 36.50°C). A 0.3°C – 0.5°C thermal shift marks ovulation.
            </p>
          </div>
        </div>

        {/* Right Column: Dedicated "BBT Trend" Chart */}
        <div className="lg:col-span-7 bg-[#F9FAFB] rounded-[20px] p-4 sm:p-5 border border-[#F3F4F6] flex flex-col justify-between">
          <div className="flex items-center justify-between gap-2 mb-2">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-[#9333EA]" />
              <h4 className="text-[14px] font-bold text-[#1F2937]">BBT Trend</h4>
            </div>

            <div className="flex items-center gap-3 text-[11.5px]">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-0.5 bg-[#EA33A1] rounded-full inline-block" />
                <span className="text-[#6B7280]">Daily BBT</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-0.5 border-t border-dashed border-purple-400 inline-block" />
                <span className="text-[#6B7280]">Coverline (36.35°)</span>
              </div>
            </div>
          </div>

          {/* SVG BBT Line Graph */}
          <div className="relative w-full h-[125px] select-none">
            <svg
              viewBox={`0 0 ${chartWidth} ${chartHeight}`}
              className="w-full h-full overflow-visible"
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient id="bbtAreaGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#EA33A1" stopOpacity="0.22" />
                  <stop offset="100%" stopColor="#EA33A1" stopOpacity="0.01" />
                </linearGradient>
              </defs>

              {/* Horizontal Grid lines */}
              <line x1={paddingX} y1={getY(36.6)} x2={chartWidth - paddingX} y2={getY(36.6)} stroke="#E5E7EB" strokeWidth="0.8" />
              <line x1={paddingX} y1={getY(36.4)} x2={chartWidth - paddingX} y2={getY(36.4)} stroke="#E5E7EB" strokeWidth="0.8" />
              <line x1={paddingX} y1={getY(36.2)} x2={chartWidth - paddingX} y2={getY(36.2)} stroke="#E5E7EB" strokeWidth="0.8" />

              {/* Dashed Coverline Reference */}
              <line
                x1={paddingX}
                y1={coverlineY}
                x2={chartWidth - paddingX}
                y2={coverlineY}
                stroke="#C084FC"
                strokeWidth="1.2"
                strokeDasharray="4,3"
              />

              {/* Shaded Area */}
              <path d={areaPath} fill="url(#bbtAreaGradient)" />

              {/* Trend Line Curve */}
              <path
                d={linePath}
                fill="none"
                stroke="#EA33A1"
                strokeWidth="2.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* Data Points */}
              {points.map((pt) => {
                const isSelected = hoveredPoint?.id === pt.data.id || (hoveredPoint === null && pt.data.isToday);
                return (
                  <g
                    key={pt.data.id}
                    className="cursor-pointer group"
                    onMouseEnter={() => setHoveredPoint(pt.data)}
                    onMouseLeave={() => setHoveredPoint(null)}
                  >
                    {/* Pulsing ring on today or hovered */}
                    {isSelected && (
                      <circle
                        cx={pt.x}
                        cy={pt.y}
                        r="7"
                        className="fill-[#EA33A1]/20 animate-ping origin-center"
                      />
                    )}
                    <circle
                      cx={pt.x}
                      cy={pt.y}
                      r={isSelected ? '5' : '3.5'}
                      className={isSelected ? 'fill-[#EA33A1] stroke-white stroke-2' : 'fill-white stroke-[#EA33A1] stroke-[2]'}
                    />
                  </g>
                );
              })}
            </svg>

            {/* Hover Tooltip Overlay */}
            {hoveredPoint && (
              <div
                className="absolute top-0 transform -translate-x-1/2 bg-gray-900 text-white text-[11px] font-semibold py-1 px-2.5 rounded-lg shadow-lg pointer-events-none transition-all z-20"
                style={{
                  left: `${(points.find((p) => p.data.id === hoveredPoint.id)?.x || chartWidth / 2) / chartWidth * 100}%`,
                }}
              >
                {hoveredPoint.dateStr} (CD {hoveredPoint.cycleDay}): {hoveredPoint.tempC.toFixed(2)}°C
              </div>
            )}
          </div>

          {/* X Axis Labels */}
          <div className="flex items-center justify-between text-[11.5px] font-medium text-[#6B7280] pt-1 px-1">
            {trendData.map((d) => (
              <div key={d.id} className="text-center flex flex-col items-center">
                <span className={d.isToday ? 'text-[#EA33A1] font-bold' : ''}>
                  {d.day}
                </span>
                <span className="text-[10px] text-gray-400">CD {d.cycleDay}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
