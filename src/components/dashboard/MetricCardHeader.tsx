import React from 'react';

export const CardHeader: React.FC<{ icon: React.ReactNode; iconBg: string; title: string }> = ({ icon, iconBg, title }) => (
  <div className="flex items-center gap-2 min-w-0">
    <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${iconBg}`}>{icon}</div>
    <span className="text-card-title font-semibold text-[#17152B] truncate">{title}</span>
  </div>
);
