import React from 'react';
import { LayoutGrid, Search, Settings, Bell } from 'lucide-react';
import avatarDoctor from '../../assets/avatar_doctor_female.svg';
import { PROVIDER_PROFILE } from '../../data/mockData';

interface TopNavigationProps {
  activeNavItem?: string;
  onSelectNav?: (item: string) => void;
  onSearchClick?: () => void;
  onSettingsClick?: () => void;
  onNotificationsClick?: () => void;
}

export const TopNavigation: React.FC<TopNavigationProps> = ({
  activeNavItem = 'Dashboard',
  onSelectNav,
  onSearchClick,
  onSettingsClick,
  onNotificationsClick,
}) => {
  const navItems = ['Dashboard', 'Appointment', 'Patient', 'Reports', 'Chats', 'Billing'];

  return (
    <header className="w-full max-w-none flex items-center justify-between gap-3 py-2 px-1">
      {/* Left Pill Navigation */}
      <nav
        aria-label="Main Navigation"
        className="bg-[#FAF5FF] border border-[#F3E8FF] rounded-full p-1 flex items-center gap-1 overflow-x-auto min-w-0 max-w-full scrollbar-none"
      >
        {navItems.map((item) => {
          const isActive = item === activeNavItem;
          return (
            <button
              key={item}
              type="button"
              onClick={() => onSelectNav?.(item)}
              aria-current={isActive ? 'page' : undefined}
              className={`flex items-center gap-2 px-3.5 sm:px-4 py-1.5 rounded-full text-xs sm:text-[13px] font-semibold transition-all whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8B5CF6]/40 ${
                isActive
                  ? 'bg-[#7C5CFC] text-white shadow-xs font-semibold'
                  : 'text-[#4B5563] hover:text-[#1F2937] hover:bg-white/60'
              }`}
            >
              {item === 'Dashboard' && <LayoutGrid className="w-3.5 h-3.5" />}
              <span>{item}</span>
            </button>
          );
        })}
      </nav>

      {/* Right Icons and Patient Profile */}
      <div className="flex items-center gap-2 sm:gap-3 shrink-0">
        {/* Search */}
        <button
          type="button"
          onClick={onSearchClick}
          className="w-9 h-9 rounded-full bg-[#F3F4F6] hover:bg-[#E5E7EB] text-[#4B5563] flex items-center justify-center transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8B5CF6]/40"
          aria-label="Search"
        >
          <Search className="w-4 h-4" />
        </button>

        {/* Settings */}
        <button
          type="button"
          onClick={onSettingsClick}
          className="w-9 h-9 rounded-full bg-[#F3F4F6] hover:bg-[#E5E7EB] text-[#4B5563] flex items-center justify-center transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8B5CF6]/40"
          aria-label="Settings"
        >
          <Settings className="w-4 h-4" />
        </button>

        {/* Bell */}
        <button
          type="button"
          onClick={onNotificationsClick}
          className="w-9 h-9 rounded-full bg-[#F3F4F6] hover:bg-[#E5E7EB] text-[#4B5563] flex items-center justify-center transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8B5CF6]/40"
          aria-label="Notifications"
        >
          <Bell className="w-4 h-4" />
        </button>

        {/* Signed-in provider (not the patient) */}
        <div className="hidden sm:flex items-center gap-2.5 pl-2 border-l border-gray-100">
          <img
            src={avatarDoctor}
            alt={PROVIDER_PROFILE.name}
            width={32}
            height={32}
            className="w-8 h-8 rounded-full object-cover border border-purple-100 shrink-0"
          />
          <div className="hidden md:flex flex-col text-left">
            <span className="text-[12px] font-bold text-[#17152B] leading-tight whitespace-nowrap">
              {PROVIDER_PROFILE.name}
            </span>
            <span className="text-[10px] text-[#68708A] font-medium leading-tight whitespace-nowrap">
              {PROVIDER_PROFILE.role}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};
