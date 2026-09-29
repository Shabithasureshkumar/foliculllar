// DOM ids shared by the tab list and its panel (kept out of the component file for fast refresh)
export const TRACKER_PANEL_ID = 'tracker-tabpanel';

export const tabElementId = (tab: string): string => `tab-${tab.replace(' ', '-').toLowerCase()}`;
