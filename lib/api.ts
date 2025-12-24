export async function sendMessage(messages: Array<{ role: string; content: string }>) {
  const response = await fetch('/api/chat', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ messages }),
  });

  if (!response.ok) {
    throw new Error('Failed to send message');
  }

  const data = await response.json();
  return data.response;
}

export function shouldShowFreeSessionLink(messages: Array<{ role: string; content: string }>, userMessage: string): boolean {
  // 2〜3ターン会話後
  const userMessages = messages.filter(msg => msg.role === 'user');
  if (userMessages.length >= 2) {
    return true;
  }

  // キーワード検出
  const keywords = ['fun', 'enjoy', 'like', 'love', 'want to learn', 'more', 'learn more', 'japanese'];
  const lowerMessage = userMessage.toLowerCase();
  return keywords.some(keyword => lowerMessage.includes(keyword));
}

export function getFreeSessionMessage(): string {
  const url = typeof window !== 'undefined' 
    ? (process.env.NEXT_PUBLIC_FREE_SESSION_URL || '/free-session')
    : '/free-session';
  return `You're doing amazing 🌸  

If you want to learn Japanese a little more,
I offer a **free 1-on-1 session**.

It's very relaxed.
No pressure at all.

You can book here:
👉 [Book a Free Session](${url})`;
}

