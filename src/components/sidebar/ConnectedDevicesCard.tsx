import React, { useState } from 'react';
import { Watch, Thermometer, Scale, Check, RefreshCw } from 'lucide-react';
import type { ConnectedDevice } from '../../types';

interface ConnectedDevicesCardProps {
  devices: ConnectedDevice[];
  onSyncDevice: (id: string) => void;
}

export const ConnectedDevicesCard: React.FC<ConnectedDevicesCardProps> = ({
  devices,
  onSyncDevice,
}) => {
  const [syncingId, setSyncingId] = useState<string | null>(null);

  const handleSync = (device: ConnectedDevice) => {
    setSyncingId(device.id);
    onSyncDevice(device.id);
    setTimeout(() => {
      setSyncingId(null);
    }, 700);
  };

  const getDeviceIcon = (type: ConnectedDevice['type']) => {
    switch (type) {
      case 'watch':
        return <Watch className="w-4 h-4 text-[#A855F7]" />;
      case 'thermometer':
        return <Thermometer className="w-4 h-4 text-[#A855F7]" />;
      case 'scale':
        return <Scale className="w-4 h-4 text-[#A855F7]" />;
    }
  };

  return (
    <div className="w-full">
      <h3 className="text-[#1F2937] font-bold text-[clamp(0.9rem,1.2vw,0.98rem)] leading-tight mb-2.5">
        Connected Devices
      </h3>

      <div className="space-y-2">
        {devices.map((device) => {
          const isSyncing = syncingId === device.id;
          return (
            <button
              key={device.id}
              type="button"
              onClick={() => handleSync(device)}
              className="w-full bg-[#F9FAFB] border border-[#F3F4F6] rounded-[14.4px] p-3 flex items-center justify-between hover:bg-gray-50 transition-all focus:outline-none focus:ring-2 focus:ring-purple-300 text-left group min-h-[44px]"
              aria-label={`Sync ${device.name}`}
            >
              <div className="flex items-center gap-2.5">
                <div className="w-[33.6px] h-[33.6px] rounded-full bg-[#F3E8FF] flex items-center justify-center shrink-0">
                  {getDeviceIcon(device.type)}
                </div>
                <span className="text-[#374151] font-medium text-[14.4px] leading-[21.6px]">
                  {device.name}
                </span>
              </div>

              <div className="flex items-center gap-1.5">
                <span className="text-[#16A34A] font-semibold text-[12px] leading-[18px]">
                  {isSyncing ? 'Syncing...' : device.lastSyncedText}
                </span>
                <div className="w-4 h-4 rounded-full bg-[#DCFCE7] flex items-center justify-center shrink-0">
                  {isSyncing ? (
                    <RefreshCw className="w-2.5 h-2.5 text-[#16A34A] animate-spin" />
                  ) : (
                    <Check className="w-2.5 h-2.5 text-[#16A34A] stroke-[3]" />
                  )}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
