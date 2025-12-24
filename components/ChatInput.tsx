'use client';

import { useState, KeyboardEvent, useRef, useEffect } from 'react';

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
}

export default function ChatInput({ onSend, disabled }: ChatInputProps) {
  const [input, setInput] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = '48px';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
    }
  }, [input]);

  const handleSend = () => {
    if (input.trim() && !disabled) {
      onSend(input);
      setInput('');
      if (textareaRef.current) {
        textareaRef.current.style.height = '48px';
      }
    }
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="border-t border-pink-100 bg-white flex-shrink-0" style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}>
      <div className="w-full px-2 sm:px-3 py-2" style={{ paddingBottom: 'max(8px, env(safe-area-inset-bottom, 0px))' }}>
        <div className="flex gap-2 items-end">
          <textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message..."
            disabled={disabled}
            className="flex-1 px-3 py-2 sm:px-4 sm:py-3 border border-pink-200 rounded-full focus:outline-none focus:ring-2 focus:ring-pink-300 resize-none disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden text-gray-900 placeholder:text-gray-400 bg-white text-xs sm:text-sm"
            rows={1}
            style={{
              minHeight: '44px',
              maxHeight: '120px',
            }}
          />
          <button
            onClick={handleSend}
            disabled={disabled || !input.trim()}
            className="px-4 py-2 sm:px-6 sm:py-3 bg-pink-500 text-white rounded-full hover:bg-pink-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium h-11 sm:h-12 flex-shrink-0 text-xs sm:text-sm"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

