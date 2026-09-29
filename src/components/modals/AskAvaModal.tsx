import React, { useEffect, useRef, useState } from 'react';
import { X, Send, Sparkles } from 'lucide-react';
import aiRobot from '../../assets/ai_robot.png';
import { useModalA11y } from '../../hooks/useModalA11y';
import { AVA_DISCLAIMER, answerQuestion, suggestedQuestions, type AvaContext } from '../../services/avaAssistant';

interface AskAvaModalProps {
  isOpen: boolean;
  context: AvaContext;
  onClose: () => void;
}

interface ChatMessage {
  id: number;
  from: 'user' | 'ava';
  text: string;
}

const REPLY_DELAY_MS = 450;

export const AskAvaModal: React.FC<AskAvaModalProps> = ({ isOpen, context, onClose }) => {
  const [question, setQuestion] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isThinking, setIsThinking] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const replyTimer = useRef<number | undefined>(undefined);
  const nextId = useRef(0);
  useModalA11y(isOpen, onClose, dialogRef);

  // Cancel a pending reply if the modal closes mid-answer
  useEffect(() => () => window.clearTimeout(replyTimer.current), []);

  useEffect(() => {
    const list = listRef.current;
    if (list) list.scrollTop = list.scrollHeight;
  }, [messages, isThinking]);

  if (!isOpen) return null;

  const ask = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || isThinking) return;
    setMessages((prev) => [...prev, { id: nextId.current++, from: 'user', text: trimmed }]);
    setQuestion('');
    setIsThinking(true);
    replyTimer.current = window.setTimeout(() => {
      setMessages((prev) => [...prev, { id: nextId.current++, from: 'ava', text: answerQuestion(trimmed, context) }]);
      setIsThinking(false);
    }, REPLY_DELAY_MS);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    ask(question);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 md:p-6 bg-black/35 backdrop-blur-[2px] animate-fade"
      onClick={onClose}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="ask-ava-title"
        aria-describedby="ask-ava-desc"
        tabIndex={-1}
        className="bg-white rounded-t-[24px] sm:rounded-[28px] border border-[#F1DDE8]/80 shadow-2xl w-full sm:max-w-[520px] max-h-[92vh] sm:max-h-[86vh] flex flex-col relative text-left font-sans focus:outline-none"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-3 px-5 sm:px-6 pt-5 sm:pt-6 pb-3 border-b border-[#F1DDE8]/60">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#FAF5FF] to-[#FFF0F6] border border-[#F3E8FF] flex items-center justify-center shrink-0">
              <img src={aiRobot} alt="" className="w-9 h-9 object-contain" />
            </div>
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                <h2 id="ask-ava-title" className="text-[18px] sm:text-[20px] font-bold text-[#17152B] leading-tight">
                  Ask Ava
                </h2>
                <span className="px-2.5 py-0.5 rounded-full bg-[#F5EEFF] text-[#8B5CF6] text-[11px] font-semibold whitespace-nowrap">
                  {context.phaseLabel} · Day {context.cycleDay}
                </span>
              </div>
              <p id="ask-ava-desc" className="text-[11.5px] sm:text-[12px] text-[#68708A] leading-snug mt-0.5">
                Your cycle assistant. Answers use your {context.phaseLabel.toLowerCase()} data for {context.dateLabel} (cycle day {context.cycleDay}).
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close Ask Ava"
            className="w-8 h-8 rounded-full bg-[#FFF0F6] text-[#EC4899] hover:bg-[#FFE4EE] flex items-center justify-center transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-300 shrink-0"
          >
            <X className="w-4 h-4 stroke-[2.5]" />
          </button>
        </div>

        {/* Conversation */}
        <div
          ref={listRef}
          className="flex-1 min-h-[180px] overflow-y-auto px-5 sm:px-6 py-4 space-y-3 bg-gradient-to-b from-white to-[#FFF8FC]"
          aria-live="polite"
        >
          {messages.length === 0 && (
            <div className="bg-[#FAF5FF] border border-[#F3E8FF] rounded-[18px] p-3.5">
              <div className="inline-flex items-center gap-1.5 text-[10px] font-extrabold uppercase tracking-wider text-[#8B5CF6] mb-1.5">
                <Sparkles className="w-3 h-3" />
                <span>Try asking</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {suggestedQuestions(context.phase).map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => ask(s)}
                    className="px-3 py-1.5 rounded-full bg-white border border-purple-200 text-[11.5px] font-medium text-[#17152B] hover:bg-purple-50 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-300"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {messages.map((m) => (
            <div key={m.id} className={`flex ${m.from === 'user' ? 'justify-end' : 'justify-start'}`}>
              <p
                className={`max-w-[85%] px-3.5 py-2.5 text-[12.5px] leading-relaxed rounded-[18px] ${
                  m.from === 'user'
                    ? 'bg-[#F43F8F] text-white rounded-br-md'
                    : 'bg-white border border-[#F1DDE8] text-[#17152B] rounded-bl-md shadow-2xs'
                }`}
              >
                {m.text}
              </p>
            </div>
          ))}

          {isThinking && (
            <p className="text-[11.5px] text-[#8B5CF6] font-medium" role="status">
              Ava is thinking…
            </p>
          )}
        </div>

        {/* Input */}
        <form onSubmit={handleSubmit} className="px-5 sm:px-6 pt-3 pb-5 sm:pb-6 border-t border-[#F1DDE8]/60">
          <label htmlFor="ask-ava-input" className="sr-only">
            Your question for Ava
          </label>
          <div className="flex items-center gap-2">
            <input
              id="ask-ava-input"
              data-autofocus
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Ask about BBT, mucus, LH, symptoms…"
              autoComplete="off"
              maxLength={300}
              className="flex-1 min-w-0 rounded-full border border-gray-200 px-4 py-2.5 text-[12.5px] text-[#17152B] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-300 bg-white"
            />
            <button
              type="submit"
              disabled={!question.trim() || isThinking}
              className="h-10 px-4 rounded-full bg-[#F43F8F] hover:bg-[#E02E7E] text-white text-[12.5px] font-bold flex items-center gap-1.5 shadow-sm active:scale-95 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Ask</span>
            </button>
          </div>
          <p className="text-[10px] text-[#9CA3AF] mt-2 leading-snug">{AVA_DISCLAIMER}</p>
        </form>
      </div>
    </div>
  );
};
