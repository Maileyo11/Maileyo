import { useState } from "react";
import { EmailMessage } from "@/types/email";
import { Paperclip, Download, Clock } from "lucide-react";

interface MessageBubbleProps {
  message: EmailMessage;
  isCurrentUser: boolean;
}

function MessageBubble({ message, isCurrentUser }: MessageBubbleProps) {
  const [showFullContent, setShowFullContent] = useState(false);

  const formatTimestamp = (timestamp: string) => {
    try {
      const date = new Date(timestamp);
      return date.toLocaleString([], { 
        month: 'short', 
        day: 'numeric',
        hour: '2-digit', 
        minute: '2-digit',
        hour12: true
      });
    } catch {
      return "";
    }
  };

  const truncateContent = (content: string, maxLength: number = 300) => {
    if (content.length <= maxLength) return content;
    return content.slice(0, maxLength);
  };

  const renderContent = () => {
    let content = message.bodyHtml || message.bodyPlain || '';
    
    if (!showFullContent) {
      content = truncateContent(content);
    }

    if (message.bodyHtml && showFullContent) {
      return (
        <div 
          className="prose prose-sm max-w-none dark:prose-invert"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      );
    } else {
      return (
        <div className="whitespace-pre-wrap">
          {content}
          {!showFullContent && (message.bodyHtml || message.bodyPlain || '').length > 300 && (
            <button
              onClick={() => setShowFullContent(true)}
              className="text-indigo-600 dark:text-indigo-400 hover:underline ml-2 text-sm"
            >
              ...Show more
            </button>
          )}
        </div>
      );
    }
  };

  const downloadAttachment = async (attachment: any) => {
    try {
      // This would need to be implemented based on your backend API
      console.log("Downloading attachment:", attachment.filename);
      // Add actual download implementation here
    } catch (error) {
      console.error("Failed to download attachment:", error);
    }
  };

  return (
    <div className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'} mb-4`}>
      <div className={`max-w-[70%] ${isCurrentUser ? 'order-2' : 'order-1'}`}>
        {/* Message bubble */}
        <div
          className={`rounded-lg px-4 py-3 shadow-sm ${
            isCurrentUser
              ? 'bg-indigo-600 text-white'
              : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700'
          }`}
        >
          {/* Subject (if different from previous or important) */}
          {message.subject && (
            <div className={`font-semibold mb-2 text-sm ${
              isCurrentUser ? 'text-indigo-100' : 'text-gray-700 dark:text-gray-300'
            }`}>
              {message.subject}
            </div>
          )}

          {/* Message content */}
          <div className={`text-sm leading-relaxed ${
            isCurrentUser ? 'text-white' : 'text-gray-800 dark:text-gray-200'
          }`}>
            {renderContent()}
          </div>

          {/* Attachments */}
          {message.attachments && message.attachments.length > 0 && (
            <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-600 space-y-2">
              {message.attachments.map((attachment, index) => (
                <div
                  key={index}
                  className={`flex items-center justify-between p-2 rounded ${
                    isCurrentUser
                      ? 'bg-indigo-500/20 text-indigo-100'
                      : 'bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                  }`}
                >
                  <div className="flex items-center space-x-2 flex-1">
                    <Paperclip className="w-4 h-4" />
                    <div>
                      <p className="text-xs font-medium truncate max-w-[200px]">
                        {attachment.filename}
                      </p>
                      <p className={`text-xs ${
                        isCurrentUser ? 'text-indigo-200' : 'text-gray-500 dark:text-gray-400'
                      }`}>
                        {attachment.size ? `${Math.round(attachment.size / 1024)} KB` : 'Unknown size'}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => downloadAttachment(attachment)}
                    className={`p-1 rounded hover:bg-opacity-20 transition-colors ${
                      isCurrentUser
                        ? 'hover:bg-white text-indigo-100'
                        : 'hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-600 dark:text-gray-400'
                    }`}
                  >
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Timestamp */}
          <div className={`flex items-center mt-2 pt-2 text-xs ${
            isCurrentUser 
              ? 'text-indigo-100 justify-end' 
              : 'text-gray-500 dark:text-gray-400 justify-start'
          }`}>
            <Clock className="w-3 h-3 mr-1" />
            {formatTimestamp(message.timestamp)}
          </div>
        </div>

        {/* Show more/less toggle for long content */}
        {showFullContent && (message.bodyHtml || message.bodyPlain || '').length > 300 && (
          <button
            onClick={() => setShowFullContent(false)}
            className="text-sm text-indigo-600 dark:text-indigo-400 hover:underline mt-1"
          >
            Show less
          </button>
        )}
      </div>
    </div>
  );
}

export default MessageBubble;