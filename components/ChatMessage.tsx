import Image from 'next/image';

interface ChatMessageProps {
  role: 'user' | 'assistant';
  content: string;
}

export default function ChatMessage({ role, content }: ChatMessageProps) {
  const isAssistant = role === 'assistant';

  // Markdownリンクを処理
  const renderContent = (text: string) => {
    const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
    const parts = [];
    let lastIndex = 0;
    let match;

    while ((match = linkRegex.exec(text)) !== null) {
      // リンク前のテキスト
      if (match.index > lastIndex) {
        parts.push(text.substring(lastIndex, match.index));
      }
      // リンク
      parts.push(
        <a
          key={match.index}
          href={match[2]}
          target="_blank"
          rel="noopener noreferrer"
          className="underline font-semibold hover:text-pink-600 transition-colors"
        >
          {match[1]}
        </a>
      );
      lastIndex = linkRegex.lastIndex;
    }
    // 残りのテキスト
    if (lastIndex < text.length) {
      parts.push(text.substring(lastIndex));
    }

    return parts.length > 0 ? parts : text;
  };

  return (
    <div className={`flex gap-2 sm:gap-3 ${isAssistant ? 'justify-start' : 'justify-end'}`}>
      {isAssistant && (
        <div className="flex-shrink-0">
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full overflow-hidden bg-pink-100 border-2 border-pink-200">
            <Image
              src="/avatar/IMG_8820.jpg"
              alt="Japanese Coach"
              width={40}
              height={40}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      )}
      <div
        className={`max-w-[85%] sm:max-w-[80%] rounded-xl sm:rounded-2xl px-3 py-2 sm:px-4 sm:py-3 ${
          isAssistant
            ? 'bg-white border border-pink-100 shadow-sm text-gray-800'
            : 'bg-pink-500 text-white'
        }`}
      >
        <p className="whitespace-pre-wrap text-xs sm:text-sm leading-relaxed break-words">
          {renderContent(content)}
        </p>
      </div>
      {!isAssistant && (
        <div className="flex-shrink-0">
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-pink-500 flex items-center justify-center text-white font-semibold text-[10px] sm:text-xs">
            You
          </div>
        </div>
      )}
    </div>
  );
}

