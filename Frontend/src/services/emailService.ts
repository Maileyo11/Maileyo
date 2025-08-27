import axios, { AxiosRequestConfig } from "axios";
import { 
  SidebarFolder, 
  SendEmailRequest, 
  SendEmailResponse, 
  FetchContactRequest, 
  ApiResponse 
} from "@/types/email";

const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // always send cookies
  headers: {
    "Content-Type": "application/json",
  },
});

// Define the emails response structure
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
      const response = await axiosInstance({
        url: endpoint,
        ...options,
      });
      return response.data;
    } catch (error: any) {
      if (error.response) {
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

  async fetchByContact(request: FetchContactRequest): Promise<ApiResponse<any>> {
    return this.makeRequest<ApiResponse<any>>("/emails/fetch-by-contact", {
      method: "POST",
      data: request,
    });
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