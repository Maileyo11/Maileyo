import { useState, useRef } from "react";
import { EmailContact, EmailMessage, SendEmailRequest } from "@/types/email";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Send, Paperclip, X, Bold, Italic, Underline } from "lucide-react";
import { emailService } from "@/services/emailService";
import { toast } from "sonner";

interface ComposeMessageProps {
  selectedContact: EmailContact;
  onMessageSent: (message: EmailMessage) => void;
}

function ComposeMessage({ selectedContact, onMessageSent }: ComposeMessageProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isRichText, setIsRichText] = useState(false);
  const [sending, setSending] = useState(false);
  const [formData, setFormData] = useState({
    to: selectedContact.email,
    cc: "",
    bcc: "",
    subject: "",
    body: ""
  });
  const [attachments, setAttachments] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newFiles = Array.from(files);
      setAttachments(prev => [...prev, ...newFiles]);
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const removeAttachment = (index: number) => {
    setAttachments(prev => prev.filter((_, i) => i !== index));
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return Math.round(bytes / 1024) + " KB";
    return Math.round(bytes / (1024 * 1024)) + " MB";
  };

  const applyFormatting = (format: string) => {
    const textarea = textareaRef.current;
    if (!textarea || !isRichText) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = formData.body.substring(start, end);
    
    if (selectedText) {
      let formattedText = "";
      switch (format) {
        case "bold":
          formattedText = `<strong>${selectedText}</strong>`;
          break;
        case "italic":
          formattedText = `<em>${selectedText}</em>`;
          break;
        case "underline":
          formattedText = `<u>${selectedText}</u>`;
          break;
        default:
          formattedText = selectedText;
      }
      
      const newBody = formData.body.substring(0, start) + formattedText + formData.body.substring(end);
      handleInputChange("body", newBody);
    }
  };

  const handleSend = async () => {
    if (!formData.body.trim()) {
      toast.error("Please enter a message");
      return;
    }

    try {
      setSending(true);

      const emailData: SendEmailRequest = {
        to: formData.to.split(",").map(email => email.trim()).filter(Boolean),
        subject: formData.subject || "No Subject",
        body_plain: !isRichText ? formData.body : undefined,
        body_html: isRichText ? formData.body : undefined,
      };

      // Add CC if provided
      if (formData.cc.trim()) {
        emailData.cc = formData.cc.split(",").map(email => email.trim()).filter(Boolean);
      }

      // Add BCC if provided
      if (formData.bcc.trim()) {
        emailData.bcc = formData.bcc.split(",").map(email => email.trim()).filter(Boolean);
      }

      // Handle attachments (simplified - you might need to convert files to base64 or handle differently)
      if (attachments.length > 0) {
        emailData.attachments = await Promise.all(
          attachments.map(async (file) => {
            return new Promise((resolve) => {
              const reader = new FileReader();
              reader.onload = () => {
                resolve({
                  filename: file.name,
                  content: reader.result as string,
                  mimeType: file.type
                });
              };
              reader.readAsDataURL(file);
            });
          })
        );
      }

      const response = await emailService.sendEmail(emailData);

      // Create a new message object for the UI
      const newMessage: EmailMessage = {
        id: response.message_id,
        threadId: response.thread_id,
        from: "me", // Will be replaced with actual user email
        to: emailData.to,
        cc: emailData.cc,
        subject: emailData.subject,
        bodyPlain: emailData.body_plain,
        bodyHtml: emailData.body_html,
        timestamp: response.sent_at,
        attachments: attachments.map(file => ({
          filename: file.name,
          mimeType: file.type,
          size: file.size
        })),
        isSent: true,
        labels: ["SENT"]
      };

      onMessageSent(newMessage);

      // Reset form
      setFormData({
        to: selectedContact.email,
        cc: "",
        bcc: "",
        subject: "",
        body: ""
      });
      setAttachments([]);
      setIsExpanded(false);

      toast.success("Email sent successfully!");

    } catch (error) {
      console.error("Failed to send email:", error);
      toast.error("Failed to send email");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
      {/* Compose header */}
      <div className="p-3 border-b border-gray-100 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium text-gray-900 dark:text-white">
            New Message
          </h3>
          <div className="flex items-center space-x-2">
            {/* Rich text toggle */}
            <button
              onClick={() => setIsRichText(!isRichText)}
              className={`px-2 py-1 text-xs rounded transition-colors ${
                isRichText
                  ? "bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300"
                  : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              }`}
            >
              Rich Text
            </button>
            
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              {isExpanded ? "Collapse" : "Expand"}
            </button>
          </div>
        </div>
      </div>

      {/* Compose form */}
      <div className="p-3 space-y-3">
        {/* Recipients */}
        <div className="space-y-2">
          <Input
            type="email"
            placeholder="To"
            value={formData.to}
            onChange={(e) => handleInputChange("to", e.target.value)}
            className="text-sm"
          />
          
          {isExpanded && (
            <>
              <Input
                type="email"
                placeholder="Cc"
                value={formData.cc}
                onChange={(e) => handleInputChange("cc", e.target.value)}
                className="text-sm"
              />
              <Input
                type="email"
                placeholder="Bcc"
                value={formData.bcc}
                onChange={(e) => handleInputChange("bcc", e.target.value)}
                className="text-sm"
              />
            </>
          )}
        </div>

        {/* Subject */}
        {isExpanded && (
          <Input
            placeholder="Subject"
            value={formData.subject}
            onChange={(e) => handleInputChange("subject", e.target.value)}
            className="text-sm"
          />
        )}

        {/* Formatting tools */}
        {isRichText && (
          <div className="flex items-center space-x-1 py-1 border-b border-gray-200 dark:border-gray-600">
            <button
              onClick={() => applyFormatting("bold")}
              className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400"
            >
              <Bold className="w-4 h-4" />
            </button>
            <button
              onClick={() => applyFormatting("italic")}
              className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400"
            >
              <Italic className="w-4 h-4" />
            </button>
            <button
              onClick={() => applyFormatting("underline")}
              className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400"
            >
              <Underline className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Message body */}
        <div className="relative">
          <Textarea
            ref={textareaRef}
            placeholder="Type your message..."
            value={formData.body}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => handleInputChange("body", e.target.value)}
            className="min-h-[100px] resize-none text-sm"
            rows={4}
          />
        </div>

        {/* Attachments */}
        {attachments.length > 0 && (
          <div className="space-y-1">
            {attachments.map((file, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-700 rounded text-sm"
              >
                <div className="flex items-center space-x-2">
                  <Paperclip className="w-4 h-4 text-gray-500" />
                  <span className="text-gray-700 dark:text-gray-300">{file.name}</span>
                  <span className="text-gray-500 dark:text-gray-400">
                    ({formatFileSize(file.size)})
                  </span>
                </div>
                <button
                  onClick={() => removeAttachment(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center space-x-2">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileSelect}
              multiple
              className="hidden"
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors"
            >
              <Paperclip className="w-4 h-4" />
            </button>
          </div>

          <Button
            onClick={handleSend}
            disabled={sending || !formData.body.trim()}
            size="sm"
            className="flex items-center space-x-2"
          >
            {sending ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Sending...</span>
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span>Send</span>
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ComposeMessage;