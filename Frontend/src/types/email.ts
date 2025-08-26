export type SidebarFolder = 
  | "Primary+Sent" 
  | "Primary" 
  | "Promotions" 
  | "Social" 
  | "Starred" 
  | "Sent" 
  | "Spam" 
  | "Drafts";

export interface EmailContact {
  id: string;
  name: string;
  email: string;
  lastMessage: string;
  timestamp: string;
  labels: string[];
  unread: boolean;
  snippet: string;
}

export interface EmailMessage {
  id: string;
  threadId: string;
  from: string;
  to: string[];
  cc?: string[];
  bcc?: string[];
  subject: string;
  bodyPlain?: string;
  bodyHtml?: string;
  timestamp: string;
  attachments?: EmailAttachment[];
  isSent: boolean;
  labels: string[];
}

export interface EmailAttachment {
  filename: string;
  mimeType: string;
  size: number;
  data?: string;
}

export interface SendEmailRequest {
  to: string[];
  cc?: string[];
  bcc?: string[];
  subject: string;
  body_plain?: string;
  body_html?: string;
  attachments?: Record<string, any>[];
}

export interface SendEmailResponse {
  message_id: string;
  thread_id: string;
  status: string;
  sent_at: string;
}

export interface FetchContactRequest {
  email_address: string;
  max_results: number;
  page_token?: string;
}

export interface ApiResponse<T> {
  data: T;
  next_page_token?: string;
  result_size_estimate?: number;
  total_count?: number;
}