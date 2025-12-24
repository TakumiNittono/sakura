'use client';

import { useState, useEffect, useRef } from 'react';
import ChatMessage from '@/components/ChatMessage';
import ChatInput from '@/components/ChatInput';
import { sendMessage, shouldShowFreeSessionLink, getFreeSessionMessage } from '@/lib/api';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const INITIAL_MESSAGE = `Hi 😊  
Let's study Japanese together!

Don't worry at all.
I'll help you step by step, very gently.

How does that sound?`;

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: INITIAL_MESSAGE }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const messagesContainerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = (instant = false) => {
    setTimeout(() => {
      if (messagesEndRef.current) {
        messagesEndRef.current.scrollIntoView({ 
          behavior: instant ? 'auto' : 'smooth',
          block: 'end'
        });
      }
    }, instant ? 50 : 100);
  };

  useEffect(() => {
    // 初回表示時とメッセージ追加時に下にスクロール
    if (messages.length === 1) {
      // 初回は即座に下にスクロール
      setTimeout(() => {
        scrollToBottom(true);
      }, 100);
    } else {
      // 新しいメッセージ追加時はスムーズに下にスクロール
      scrollToBottom(false);
    }
  }, [messages]);

  const handleSendMessage = async (content: string) => {
    if (!content.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', content };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setIsLoading(true);

    try {
      const response = await sendMessage(updatedMessages);
      setMessages(prev => [...prev, { role: 'assistant', content: response }]);

      // リードマグネット導線のチェック
      const shouldShow = shouldShowFreeSessionLink(updatedMessages, content);
      if (shouldShow && !updatedMessages.some(msg => msg.content.includes('free 1-on-1 session'))) {
        setTimeout(() => {
          setMessages(prev => [...prev, { 
            role: 'assistant', 
            content: getFreeSessionMessage() 
          }]);
        }, 1000);
      }
    } catch (error) {
      console.error('Error sending message:', error);
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: "I'm sorry, I'm having trouble right now. Please try again 😊"
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="flex flex-col h-screen bg-gradient-to-b from-pink-50 to-white safe-area-inset" style={{ height: '100dvh' }}>
      <header className="bg-white border-b border-pink-100 shadow-sm sticky top-0 z-10 flex-shrink-0">
        <div className="w-full px-3 sm:px-4 py-2 sm:py-3">
          <h1 className="text-base sm:text-xl font-semibold text-gray-800">JAPANESE TEACHER SAKURA</h1>
        </div>
      </header>
      <div 
        ref={messagesContainerRef}
        className="flex-1 overflow-y-auto px-2 sm:px-3" 
        style={{ minHeight: 0, WebkitOverflowScrolling: 'touch', display: 'flex', flexDirection: 'column' }}
      >
        <div className="w-full space-y-3 sm:space-y-4 flex-1 flex flex-col justify-end pb-2">
          {messages.map((message, index) => (
            <ChatMessage
              key={index}
              role={message.role}
              content={message.content}
            />
          ))}
          {isLoading && (
            <ChatMessage
              role="assistant"
              content="..."
            />
          )}
          <div ref={messagesEndRef} style={{ height: '1px', flexShrink: 0 }} />
        </div>
      </div>
      <ChatInput onSend={handleSendMessage} disabled={isLoading} />
    </main>
  );
}

