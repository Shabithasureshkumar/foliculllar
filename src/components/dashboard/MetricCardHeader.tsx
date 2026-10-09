import React from 'react';

export const CardHeader: React.FC<{ icon: React.ReactNode; iconBg: string; title: string; titleId?: string }> = ({ icon, iconBg, title, titleId }) => (
  <div className="flex items-center gap-2 min-w-0">
    <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${iconBg}`}>{icon}</div>
    <span id={titleId} className="text-[clamp(0.8rem,0.9vw+0.1rem,1rem)] leading-tight font-semibold text-[#17152B] truncate">{title}</span>
  </div>
);
