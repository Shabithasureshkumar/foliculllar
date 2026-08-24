import React, { useState } from 'react';

interface PersonalNotesCardProps {
  onSaveNote: (note: string) => void;
}

export const PersonalNotesCard: React.FC<PersonalNotesCardProps> = ({ onSaveNote }) => {
  const [note, setNote] = useState('');
  const maxLength = 300;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (note.trim()) {
      onSaveNote(note);
      setNote('');
    }
  };

  return (
    <form onSubmit={handleSave} className="w-full">
      <h3 className="text-[#1F2937] font-bold text-[clamp(0.9rem,1.2vw,0.98rem)] leading-tight mb-1">
        Personal Notes
      </h3>
      <p className="text-[#9CA3AF] text-[13.2px] leading-[19.8px] mb-2.5">
        Add your thoughts for today
      </p>

      <div className="relative mb-2">
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value.slice(0, maxLength))}
          placeholder="Example: Today I felt nauseous after eating lunch."
          className="w-full h-24 p-3 rounded-[14.4px] bg-[#F9FAFB] border border-[#E5E7EB] text-[#374151] placeholder:text-[#9CA3AF] text-[13.2px] leading-[19.8px] focus:outline-none focus:ring-2 focus:ring-[#EA33A1]/30 focus:border-[#EA33A1] transition-all resize-none"
          maxLength={maxLength}
          aria-label="Personal thoughts and daily notes"
        />
      </div>

      <div className="flex items-center justify-between mb-3 text-[12px] leading-[18px] text-[#9CA3AF]">
        <span />
        <span>{note.length} / {maxLength}</span>
      </div>

      <button
        type="submit"
        disabled={note.trim().length === 0}
        className="w-full py-2.5 px-4 rounded-[14.4px] bg-[#EA33A1] hover:bg-[#D92690] disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98] text-white font-semibold text-[14.4px] leading-[21.6px] transition-all shadow-sm focus:outline-none focus:ring-2 focus:ring-[#EA33A1]/40 min-h-[44px]"
      >
        Save Note
      </button>
    </form>
  );
};
