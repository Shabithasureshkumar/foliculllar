import React, { useRef, useState } from 'react';
import { LayoutGrid, Search, Settings, Bell, Menu, X } from 'lucide-react';
import avatarPatient from '../../assets/avatar.png';
import { PATIENT_PROFILE } from '../../data/mockData';
import { useModalA11y } from '../../hooks/useModalA11y';

interface TopNavigationProps {
  /** Dashboard is the Cycle Tracker itself; selecting it returns to Overview */
  onDashboardClick: () => void;
  onSettingsClick: () => void;
}

const NAV_ITEMS = ['Dashboard', 'Appointment', 'Patient', 'Reports', 'Chats', 'Billing'] as const;
type NavItem = (typeof NAV_ITEMS)[number];
const UNAVAILABLE = 'Not available in the Cycle Tracker';
const MOBILE_MENU_ID = 'mobile-main-navigation';

const ICON_BUTTON =
  'w-9 h-9 rounded-full bg-[#F3F4F6] text-[#4B5563] flex items-center justify-center shrink-0 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8B5CF6]/40';

/**
 * Clinic header.
 * - md and up: the pill navigation (compacted slightly between md and lg so all six items fit).
 * - below md: a menu button opens the same items in a sheet (Escape / outside click / X close it).
 * Only Dashboard (current page) and Settings lead somewhere in this project; the other entries keep
 * their appearance but are marked non-actionable (aria-disabled) instead of pretending to work.
 */
export const TopNavigation: React.FC<TopNavigationProps> = ({ onDashboardClick, onSettingsClick }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const closeMenu = () => setIsMenuOpen(false);
  useModalA11y(isMenuOpen, closeMenu, menuRef);

  // Shared by the desktop pill and the mobile sheet so both behave identically
  const navButtonProps = (item: NavItem, onDone?: () => void) => {
    const isActive = item === 'Dashboard';
    return {
      type: 'button' as const,
      'aria-current': isActive ? ('page' as const) : undefined,
      'aria-disabled': isActive ? undefined : true,
      title: isActive ? undefined : UNAVAILABLE,
      onClick: isActive
        ? () => {
            onDashboardClick();
            onDone?.();
          }
        : undefined,
    };
  };

  return (
    <header className="w-full max-w-none flex items-center justify-between gap-3 py-2 px-1">
      {/* Mobile: menu button (the pill nav below would not fit) */}
      <button
        type="button"
        onClick={() => setIsMenuOpen(true)}
        aria-label="Open main navigation"
        aria-expanded={isMenuOpen}
        aria-controls={MOBILE_MENU_ID}
        className={`md:hidden ${ICON_BUTTON} bg-[#FAF5FF] text-[#7C5CFC] border border-[#F3E8FF] hover:bg-[#F3E8FF]`}
      >
        <Menu className="w-5 h-5" aria-hidden="true" />
      </button>

      {/* md+: Pill Navigation */}
      <nav
        aria-label="Main navigation"
        className="hidden md:flex bg-[#FAF5FF] border border-[#F3E8FF] rounded-full p-1 items-center gap-1 min-w-0 max-w-full"
      >
        {NAV_ITEMS.map((item) => {
          const isActive = item === 'Dashboard';
          return (
            <button
              key={item}
              {...navButtonProps(item)}
              className={`flex items-center gap-2 md:px-3 lg:px-4 py-1.5 min-h-8 rounded-full md:text-xs lg:text-[13px] font-semibold transition-all whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8B5CF6]/40 ${
                isActive ? 'bg-[#7C5CFC] text-white shadow-xs' : 'text-[#4B5563] cursor-default'
              }`}
            >
              {isActive && <LayoutGrid className="w-3.5 h-3.5" aria-hidden="true" />}
              <span>{item}</span>
            </button>
          );
        })}
      </nav>

      {/* Right Icons and Patient Profile */}
      <div className="flex items-center gap-2 lg:gap-3 shrink-0 min-w-0">
        <button type="button" aria-label="Search" aria-disabled="true" title={UNAVAILABLE} className={`${ICON_BUTTON} cursor-default`}>
          <Search className="w-4 h-4" aria-hidden="true" />
        </button>

        <button type="button" onClick={onSettingsClick} aria-label="Settings" className={`${ICON_BUTTON} hover:bg-[#E5E7EB]`}>
          <Settings className="w-4 h-4" aria-hidden="true" />
        </button>

        <button type="button" aria-label="Notifications" aria-disabled="true" title={UNAVAILABLE} className={`${ICON_BUTTON} cursor-default`}>
          <Bell className="w-4 h-4" aria-hidden="true" />
        </button>

        {/* Patient profile: photo at every size, name + patient ID from lg up */}
        <div className="flex items-center gap-2.5 pl-2 border-l border-gray-100 shrink-0">
          <img
            src={avatarPatient}
            alt={PATIENT_PROFILE.name}
            width={600}
            height={540}
            className="w-9 h-9 rounded-full object-cover object-top bg-[#FFE4EE] border border-pink-200 shrink-0"
          />
          <div className="hidden lg:flex flex-col text-left">
            <span className="text-[12px] font-bold text-[#17152B] leading-tight whitespace-nowrap">{PATIENT_PROFILE.name}</span>
            <span className="text-[10.5px] text-[#68708A] font-medium leading-tight whitespace-nowrap">{PATIENT_PROFILE.id}</span>
          </div>
        </div>
      </div>

      {/* Mobile navigation sheet */}
      {isMenuOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-black/30 animate-fade" onClick={closeMenu}>
          <div
            ref={menuRef}
            id={MOBILE_MENU_ID}
            role="dialog"
            aria-modal="true"
            aria-label="Main navigation"
            tabIndex={-1}
            onClick={(e) => e.stopPropagation()}
            className="absolute inset-x-0 top-0 max-h-full overflow-y-auto bg-white rounded-b-[24px] border-b border-[#F3E8FF] shadow-xl px-4 pt-3 pb-5 focus:outline-none"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#8B5CF6]">Menu</span>
              <button
                type="button"
                onClick={closeMenu}
                aria-label="Close main navigation"
                className={`${ICON_BUTTON} bg-[#FFF0F6] text-[#EC4899] hover:bg-[#FFE4EE]`}
              >
                <X className="w-4 h-4 stroke-[2.5]" aria-hidden="true" />
              </button>
            </div>

            <nav aria-label="Main navigation (mobile)">
              <ul className="flex flex-col gap-1.5 rounded-[20px] bg-[#FAF5FF] border border-[#F3E8FF] p-1.5">
                {NAV_ITEMS.map((item) => {
                  const isActive = item === 'Dashboard';
                  return (
                    <li key={item}>
                      <button
                        {...navButtonProps(item, closeMenu)}
                        className={`w-full min-h-11 flex items-center gap-2.5 px-4 rounded-full text-[14px] font-semibold text-left transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8B5CF6]/40 ${
                          isActive ? 'bg-[#7C5CFC] text-white shadow-xs' : 'text-[#4B5563] cursor-default'
                        }`}
                      >
                        {isActive && <LayoutGrid className="w-4 h-4" aria-hidden="true" />}
                        <span className="flex-1">{item}</span>
                        {!isActive && <span className="text-[11px] font-medium text-[#9CA3AF]">Unavailable</span>}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};
