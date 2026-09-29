import React, { useEffect } from 'react';
import { TRACKER_PANEL_ID, tabElementId } from './trackerTabIds';

export type TrackerTabType = 'Overview' | 'Calendar' | 'Daily Log' | 'Insights' | 'Settings';

interface TrackerTabsProps {
  activeTab: TrackerTabType;
  onTabChange: (tab: TrackerTabType) => void;
}

export const TrackerTabs: React.FC<TrackerTabsProps> = ({ activeTab, onTabChange }) => {
  const tabs: TrackerTabType[] = ['Overview', 'Calendar', 'Daily Log', 'Insights', 'Settings'];

  // On narrow screens the strip scrolls horizontally inside itself; keep the active tab in view
  useEffect(() => {
    document.getElementById(tabElementId(activeTab))?.scrollIntoView({ block: 'nearest', inline: 'nearest' });
  }, [activeTab]);

  return (
    <div
      role="tablist"
      aria-label="Cycle Tracker View Tabs"
      className="w-full min-w-0 bg-[#FFF0F6] border border-[#F9E1EC] rounded-full p-1 sm:p-1.5 flex items-center justify-start gap-1 sm:gap-2 overflow-x-auto scrollbar-none my-0.5"
    >
      {tabs.map((tab) => {
        const isActive = tab === activeTab;
        return (
          <button
            key={tab}
            type="button"
            role="tab"
            id={tabElementId(tab)}
            aria-selected={isActive}
            aria-controls={TRACKER_PANEL_ID}
            aria-current={isActive ? 'page' : undefined}
            tabIndex={isActive ? 0 : -1}
            onKeyDown={(e) => {
              // Arrow-key roving focus per the WAI-ARIA tabs pattern
              if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
              e.preventDefault();
              const idx = tabs.indexOf(tab);
              const next = tabs[(idx + (e.key === 'ArrowRight' ? 1 : tabs.length - 1)) % tabs.length];
              onTabChange(next);
              document.getElementById(tabElementId(next))?.focus();
            }}
            onClick={() => onTabChange(tab)}
            className={`px-3 sm:px-6 py-1.5 sm:py-2 min-h-9 rounded-full text-[13px] sm:text-[14px] lg:text-[15px] transition-all whitespace-nowrap shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F43F8F]/40 ${
              isActive
                ? 'bg-white text-[#F43F8F] font-semibold shadow-2xs'
                : 'text-[#4B5563] hover:text-[#17152B] font-semibold'
            }`}
          >
            {tab}
          </button>
        );
      })}
    </div>
  );
};
