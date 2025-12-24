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

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
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
    <main className="flex flex-col h-screen bg-gradient-to-b from-pink-50 to-white safe-area-inset">
      <header className="bg-white border-b border-pink-100 shadow-sm sticky top-0 z-10">
        <div className="max-w-3xl mx-auto px-3 sm:px-4 py-3 sm:py-4">
          <h1 className="text-base sm:text-xl font-semibold text-gray-800">JAPANESE TEACHER SAKURA</h1>
        </div>
      </header>
      <div className="flex-1 overflow-y-auto px-2 sm:px-4 py-4 sm:py-6">
        <div className="max-w-3xl mx-auto space-y-3 sm:space-y-4">
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
          <div ref={messagesEndRef} />
        </div>
      </div>
      <ChatInput onSend={handleSendMessage} disabled={isLoading} />
    </main>
  );
}

