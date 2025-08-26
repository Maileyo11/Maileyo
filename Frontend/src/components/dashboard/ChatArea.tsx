import { useEffect, useCallback, useRef } from "react";
import { EmailContact, EmailMessage } from "@/types/email";
import MessageBubble from "./MessageBubble";
import ComposeMessage from "./ComposeMessage";
import { emailService } from "@/services/emailService";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

interface ChatAreaProps {
  selectedContact: EmailContact | null;
  messages: EmailMessage[];
  loading: boolean;
  pageToken: string;
  onMessagesUpdate: (messages: EmailMessage[], pageToken: string) => void;
  onLoadingChange: (loading: boolean) => void;
  onMessageSent: (message: EmailMessage) => void;
}

// Add type definitions for email structures
interface EmailHeader {
  name: string;
  value: string;
}

interface EmailBody {
  data?: string;
  size?: number;
  attachmentId?: string;
}

interface EmailPart {
  mimeType: string;
  body?: EmailBody;
  filename?: string;
  parts?: EmailPart[];
}

interface EmailPayload {
  headers?: EmailHeader[];
  body?: EmailBody;
  parts?: EmailPart[];
}

interface RawEmail {
  id: string;
  threadId: string;
  payload?: EmailPayload;
  internalDate: string;
  labelIds?: string[];
}


function ChatArea({
  selectedContact,
  messages,
  loading,
  pageToken,
  onMessagesUpdate,
  onLoadingChange,
  onMessageSent
}: ChatAreaProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const fetchMessages = useCallback(async (contact: EmailContact, loadMore = false) => {
    if (!contact) return;

    try {
      onLoadingChange(true);
      
      const currentPageToken = loadMore ? pageToken : "";
      const response = await emailService.fetchByContact({
        email_address: contact.email,
        max_results: 20,
        page_token: currentPageToken
      });

      // Transform response to EmailMessage format
      const newMessages: EmailMessage[] = response.data?.emails?.map((email: RawEmail) => ({
        id: email.id,
        threadId: email.threadId,
        from: extractEmail(email.payload?.headers, 'From'),
        to: extractEmails(email.payload?.headers, 'To'),
        cc: extractEmails(email.payload?.headers, 'Cc'),
        subject: extractHeader(email.payload?.headers, 'Subject') || '',
        bodyPlain: extractTextContent(email.payload),
        bodyHtml: extractHtmlContent(email.payload),
        timestamp: new Date(parseInt(email.internalDate)).toISOString(),
        attachments: extractAttachments(email.payload),
        isSent: email.labelIds?.includes('SENT') || false,
        labels: email.labelIds || []
      })) || [];

      const updatedMessages = loadMore ? [...messages, ...newMessages] : newMessages;
      // Sort messages by timestamp
      updatedMessages.sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
      
      onMessagesUpdate(updatedMessages, response.data?.next_page_token || "");
      
    } catch (error) {
      console.error("Failed to fetch messages:", error);
      toast.error("Failed to load messages");
    } finally {
      onLoadingChange(false);
    }
  }, [messages, pageToken, onMessagesUpdate, onLoadingChange]);

  const extractHeader = (headers: EmailHeader[] | undefined, name: string) => {
    return headers?.find(h => h.name === name)?.value || '';
  };

  const extractEmail = (headers: EmailHeader[] | undefined, name: string) => {
    const headerValue = extractHeader(headers, name);
    const match = headerValue.match(/<(.+?)>/);
    return match ? match[1] : headerValue.split('@')[0] ? headerValue : '';
  };

  const extractEmails = (headers: EmailHeader[] | undefined, name: string) => {
    const headerValue = extractHeader(headers, name);
    if (!headerValue) return [];
    
    const emails = headerValue.split(',').map((email: string) => {
      const match = email.match(/<(.+?)>/);
      return match ? match[1] : email.trim();
    });
    
    return emails.filter((email: string) => email.includes('@'));
  };

  const extractTextContent = (payload: EmailPayload | undefined): string => {
    if (payload?.body?.data) {
      return atob(payload.body.data.replace(/-/g, '+').replace(/_/g, '/'));
    }
    
    if (payload?.parts) {
      for (const part of payload.parts) {
        if (part.mimeType === 'text/plain' && part.body?.data) {
          return atob(part.body.data.replace(/-/g, '+').replace(/_/g, '/'));
        }
      }
    }
    
    return '';
  };

  const extractHtmlContent = (payload: EmailPayload | undefined): string => {
    if (payload?.parts) {
      for (const part of payload.parts) {
        if (part.mimeType === 'text/html' && part.body?.data) {
          return atob(part.body.data.replace(/-/g, '+').replace(/_/g, '/'));
        }
      }
    }
    
    return '';
  };

  const extractAttachments = (payload: EmailPayload | undefined) => {
    const attachments: any[] = [];
    
    if (payload?.parts) {
      payload.parts.forEach((part: EmailPart) => {
        if (part.filename && part.body?.attachmentId) {
          attachments.push({
            filename: part.filename,
            mimeType: part.mimeType,
            size: part.body.size,
            attachmentId: part.body.attachmentId
          });
        }
      });
    }
    
    return attachments;
  };

  useEffect(() => {
    if (selectedContact) {
      fetchMessages(selectedContact);
    }
  }, [selectedContact]);

  useEffect(() => {
    if (messages.length > 0) {
      scrollToBottom();
    }
  }, [messages]);

  const handleLoadMore = () => {
    if (pageToken && !loading && selectedContact) {
      fetchMessages(selectedContact, true);
    }
  };

  if (!selectedContact) {
    return (
      <div className="flex-1 flex items-center justify-center bg-white dark:bg-gray-900 -mt-60">
        <div className="text-center">
          <img src="/LogoPNG.png" alt="Maileyo" className="w-40 h-40 mx-auto mb-4" />
          <h1 className="text-3xl font-semibold text-gray-900 dark:text-white mb-2">
            Work Effortlessly With Maileyo
          </h1>
          <p className="text-gray-500 dark:text-gray-400">
            Your AI-powered copilot for mails
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4">
        <div className="flex items-center">
          <div className="w-10 h-10 bg-indigo-500 rounded-full flex items-center justify-center text-white font-semibold">
            {selectedContact.name.charAt(0).toUpperCase()}
          </div>
          <div className="ml-3">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              {selectedContact.name}
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {selectedContact.email}
            </p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div 
        ref={messagesContainerRef}
        className="flex-1 overflow-y-auto p-4 space-y-4"
      >
        {loading && messages.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <Loader2 className="w-6 h-6 animate-spin text-gray-400" />
          </div>
        ) : messages.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-500 dark:text-gray-400">
              No messages found with this contact
            </p>
          </div>
        ) : (
          <>
            {/* Load More Button */}
            {pageToken && (
              <div className="text-center mb-4">
                <button
                  onClick={handleLoadMore}
                  disabled={loading}
                  className="px-4 py-2 text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 rounded-lg transition-colors disabled:opacity-50"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin mr-2 inline" />
                      Loading...
                    </>
                  ) : (
                    "Load Earlier Messages"
                  )}
                </button>
              </div>
            )}

            {messages.map((message) => (
              <MessageBubble
                key={message.id}
                message={message}
                isCurrentUser={message.isSent}
              />
            ))}
            <div ref={messagesEndRef} />
          </>
        )}
      </div>

      {/* Compose Message */}
      <ComposeMessage
        selectedContact={selectedContact}
        onMessageSent={onMessageSent}
      />
    </div>
  );
}

export default ChatArea;