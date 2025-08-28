import axios, { AxiosRequestConfig } from "axios";
import { 
  SidebarFolder, 
  SendEmailRequest, 
  SendEmailResponse, 
  FetchContactRequest, 
} from "@/types/email";

const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

interface EmailsApiResponse {
  emails: Array<{
    id: string;
    threadId?: string;
    labelIds?: string[];
    snippet?: string;
    payload?: {
      headers?: Array<{
        name: string;
        value: string;
      }>;
      body?: {
        data?: string;
        size?: number;
      };
      parts?: Array<{
        mimeType: string;
        filename?: string;
        body?: {
          data?: string;
          size?: number;
          attachmentId?: string;
        };
        parts?: any[];
      }>;
    };
    sizeEstimate?: number;
    historyId?: string;
    internalDate: string;
  }>;
  next_page_token?: string | null;
  result_size_estimate?: number;
  total_count?: number;
}

// Define the fetch by contact response structure
interface FetchByContactResponse {
  emails: Array<{
    id: string;
    threadId: string;
    labelIds?: string[];
    snippet?: string;
    payload?: {
      headers?: Array<{
        name: string;
        value: string;
      }>;
      body?: {
        data?: string;
        size?: number;
      };
      parts?: Array<{
        mimeType: string;
        filename?: string;
        body?: {
          data?: string;
          size?: number;
          attachmentId?: string;
        };
        parts?: any[];
      }>;
    };
    sizeEstimate?: number;
    historyId?: string;
    internalDate: string;
  }>;
  next_page_token?: string | null;
  result_size_estimate?: number;
  total_count?: number;
}

class EmailService {
  private async makeRequest<T>(endpoint: string, options: AxiosRequestConfig = {}): Promise<T> {
    try {
      console.log(`Making API request to: ${endpoint}`, options);
      const response = await axiosInstance({
        url: endpoint,
        ...options,
      });
      console.log(`API response from ${endpoint}:`, response.data);
      return response.data;
    } catch (error: any) {
      console.error(`API request failed for ${endpoint}:`, error);
      if (error.response) {
        console.error('Error response:', error.response.data);
        throw new Error(`API request failed: ${error.response.status} ${error.response.statusText}`);
      }
      throw new Error(`API request error: ${error.message}`);
    }
  }

  async fetchEmails(folder: SidebarFolder, maxResults: number = 10, pageToken?: string): Promise<EmailsApiResponse> {
    const params: Record<string, string> = {
      folder,
      max_results: maxResults.toString(),
    };

    if (pageToken) {
      params.page_token = pageToken;
    }

    return this.makeRequest<EmailsApiResponse>("/emails/fetch", {
      method: "GET",
      params,
    });
  }

  async fetchByContact(request: FetchContactRequest): Promise<FetchByContactResponse> {
    console.log('fetchByContact request:', request);
    const response = await this.makeRequest<FetchByContactResponse>("/emails/fetch-by-contact", {
      method: "POST",
      data: request,
    });
    console.log('fetchByContact response:', response);
    return response;
  }

  async sendEmail(emailData: SendEmailRequest): Promise<SendEmailResponse> {
    return this.makeRequest<SendEmailResponse>("/emails/send", {
      method: "POST",
      data: emailData,
    });
  }

  async downloadAttachment(messageId: string, attachmentId: string): Promise<Blob> {
    try {
      const response = await axiosInstance.get(
        `/emails/${messageId}/attachments/${attachmentId}`,
        {
          responseType: "blob",
        }
      );
      return response.data;
    } catch (error: any) {
      if (error.response) {
        throw new Error(`Failed to download attachment: ${error.response.status} ${error.response.statusText}`);
      }
      throw new Error(`Download error: ${error.message}`);
    }
  }
}

export const emailService = new EmailService();