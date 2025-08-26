import { useEffect, useCallback, useState, useRef } from "react";
import { Loader2 } from "lucide-react";
import { EmailContact, SidebarFolder } from "@/types/email";
import { emailService } from "@/services/emailService";
import { toast } from "sonner";
import { fetchAuthenticatedUser } from "../../lib/auth";

// Add type definitions for email structures
interface EmailHeader {
  name: string;
  value: string;
}

interface EmailPayload {
  headers?: EmailHeader[];
}

interface RawEmail {
  id: string;
  payload?: EmailPayload;
  snippet?: string;
  internalDate: string;
  labelIds?: string[];
  threadId?: string;
}

interface ContactListProps {
  selectedFolder: SidebarFolder;
  selectedContact: EmailContact | null;
  contacts: EmailContact[];
  loading: boolean;
  pageToken: string;
  onContactSelect: (contact: EmailContact) => void;
  onContactsUpdate: (contacts: EmailContact[], pageToken: string) => void;
  onLoadingChange: (loading: boolean) => void;
}

interface AuthenticatedUser {
  email: string;
  name: string;
  picture: string;
  google_id: string;
}

function ContactList({
  selectedFolder,
  selectedContact,
  contacts,
  loading,
  pageToken,
  onContactSelect,
  onContactsUpdate,
  onLoadingChange
}: ContactListProps) {
  const [currentUser, setCurrentUser] = useState<AuthenticatedUser | null>(null);
  const observer = useRef<IntersectionObserver | null>(null);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const loadUser = async () => {
      const user = await fetchAuthenticatedUser();
      setCurrentUser(user);
    };
    loadUser();
  }, []);

  const fetchContacts = useCallback(async (folder: SidebarFolder, loadMore = false) => {
    try {
      onLoadingChange(true);
      
      const currentPageToken = loadMore ? pageToken : "";
      
      // Don't make API call if we're trying to load more but there's no page token
      if (loadMore && !currentPageToken) {
        onLoadingChange(false);
        return;
      }
      
      const response = await emailService.fetchEmails(folder, 20, currentPageToken);
      
      // Access emails directly from response
      const emailsArray = response.emails || [];
      
      // Transform the response to EmailContact format
      const newContacts: EmailContact[] = emailsArray.map((email: RawEmail) => {
        const { contactName, contactEmail } = extractContactInfo(email.payload?.headers, currentUser?.email);
        
        return {
          id: email.id,
          name: contactName,
          email: contactEmail,
          lastMessage: email.snippet || "",
          timestamp: new Date(Number(email.internalDate)).toISOString(),
          labels: email.labelIds || [],
          unread: email.labelIds ? email.labelIds.includes('UNREAD') : false,
          snippet: email.snippet || ""
        };
      });

      const updatedContacts = loadMore ? [...contacts, ...newContacts] : newContacts;
      onContactsUpdate(updatedContacts, response.next_page_token || "");
      
    } catch (error) {
      console.error("Failed to fetch contacts:", error);
      toast.error("Failed to load contacts");
    } finally {
      onLoadingChange(false);
    }
  }, [contacts, pageToken, onContactsUpdate, onLoadingChange, currentUser?.email]);

  const extractContactInfo = (headers: EmailHeader[] | undefined, userEmail?: string) => {
    if (!headers) return { contactName: "Unknown", contactEmail: "" };
    
    const fromHeader = headers.find(h => h.name === 'From')?.value || "";
    const toHeader = headers.find(h => h.name === 'To')?.value || "";
    
    // Determine which header to use based on user's email
    let targetHeader = fromHeader;
    if (userEmail) {
      // If user is the sender (from), use the "To" header for contact info
      if (fromHeader.includes(userEmail)) {
        targetHeader = toHeader;
      }
    }
    
    if (!targetHeader) return { contactName: "Unknown", contactEmail: "" };
    
    // Extract name from "Name <email>" format
    const nameMatch = targetHeader.match(/^(.+?)\s*<.+>$/);
    let contactName = "Unknown";
    let contactEmail = "";
    
    if (nameMatch) {
      contactName = nameMatch[1].replace(/"/g, '').trim();
      const emailMatch = targetHeader.match(/<(.+)>/);
      contactEmail = emailMatch ? emailMatch[1] : "";
    } else {
      // If no name found, use email
      contactEmail = targetHeader;
      if (contactEmail.includes('@')) {
        contactName = contactEmail.split('@')[0];
      } else {
        contactName = targetHeader;
      }
    }
    
    return { contactName, contactEmail };
  };

  useEffect(() => {
    if (currentUser) {
      fetchContacts(selectedFolder);
    }
  }, [selectedFolder, currentUser]);

  // Set up Intersection Observer for infinite scroll
  useEffect(() => {
    if (loading || !pageToken) return;
    
    if (observer.current) {
      observer.current.disconnect();
    }
    
    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      if (entries[0].isIntersecting && pageToken && !loading) {
        fetchContacts(selectedFolder, true);
      }
    };
    
    observer.current = new IntersectionObserver(observerCallback, {
      root: null,
      rootMargin: "20px",
      threshold: 0.1
    });
    
    if (loadMoreRef.current) {
      observer.current.observe(loadMoreRef.current);
    }
    
    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, [loading, pageToken, selectedFolder, fetchContacts]);

  const getCategoryTabs = () => {
    if (selectedFolder === "Primary" || selectedFolder === "Promotions" || selectedFolder === "Social") {
      return ["Primary", "Promotions", "Social"];
    }
    return [];
  };

  const categoryTabs = getCategoryTabs();

  // Format timestamp to show relative time
  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    const diffInDays = Math.floor(diffInHours / 24);
    const diffInMonths = Math.floor(diffInDays / 30);

    if (diffInHours < 1) return "now";
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInDays < 30) return `${diffInDays}d ago`;
    return `${diffInMonths}mo ago`;
  };

  // Generate profile image with first letter
  const getProfileImage = (name: string) => {
    const firstLetter = name.charAt(0).toUpperCase() || "U";
    const colors = [
      "bg-red-500", "bg-blue-500", "bg-green-500", "bg-yellow-500", 
      "bg-purple-500", "bg-pink-500", "bg-indigo-500", "bg-teal-500"
    ];
    const colorIndex = name.charCodeAt(0) % colors.length;
    
    return (
      <div className={`w-10 h-10 rounded-full ${colors[colorIndex]} flex items-center justify-center text-white font-semibold text-sm`}>
        {firstLetter}
      </div>
    );
  };

  // Truncate snippet text
  const truncateSnippet = (text: string, maxLength: number = 60) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength).trim() + "...";
  };

  // Get label badges
  const getLabelBadges = (labels: string[]) => {
    const importantLabels = labels.filter(label => 
      !['INBOX', 'SENT', 'DRAFT', 'TRASH', 'SPAM'].includes(label)
    );
    
    return importantLabels.slice(0, 3).map(label => {
      let badgeClass = "px-2 py-1 text-xs rounded-full ";
      switch (label) {
        case 'IMPORTANT':
          badgeClass += "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
          break;
        case 'UNREAD':
          badgeClass += "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
          break;
        case 'STARRED':
          badgeClass += "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200";
          break;
        default:
          badgeClass += "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200";
      }

      // ✅ Normalize Gmail category labels
      let displayLabel = label.toLowerCase();
      if (label === "CATEGORY_PROMOTIONS") displayLabel = "promotions";
      if (label === "CATEGORY_SOCIAL") displayLabel = "social";
      if (label === "CATEGORY_PERSONAL") displayLabel = "personal";

      return (
        <span key={label} className={badgeClass}>
          {displayLabel}
        </span>
      );
    });
  };

  return (
    <div className="w-full md:w-96 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white capitalize">
          {selectedFolder.replace("+", " + ")}
        </h2>
        
        {/* Category tabs for inbox */}
        {categoryTabs.length > 0 && (
          <div className="flex mt-2 space-x-1 bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
            {categoryTabs.map((tab) => (
              <button
                key={tab}
                onClick={() => onContactsUpdate([], "")}
                className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
                  selectedFolder === tab
                    ? "bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm"
                    : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Contact List */}
      <div className="flex-1 overflow-y-auto">
        {loading && contacts.length === 0 ? (
          <div className="flex items-center justify-center h-32">
            <Loader2 className="w-6 h-6 animate-spin text-gray-400" />
          </div>
        ) : contacts.length === 0 ? (
          <div className="flex items-center justify-center h-32">
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              No emails found
            </p>
          </div>
        ) : (
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {contacts.map((contact) => (
              <div
                key={contact.id}
                onClick={() => onContactSelect(contact)}
                className={`p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors h-20 flex items-center space-x-3 ${
                  selectedContact?.id === contact.id 
                    ? 'bg-blue-50 dark:bg-blue-900/20 border-r-2 border-blue-500' 
                    : ''
                }`}
              >
                {/* Profile Image */}
                {getProfileImage(contact.name)}
                
                {/* Content */}
                <div className="flex-1 min-w-0">
                  {/* Name and Timestamp Row */}
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="text-sm font-medium text-gray-900 dark:text-white truncate">
                      {contact.name}
                    </h3>
                    <span className="text-xs text-gray-500 dark:text-gray-400 ml-2 flex-shrink-0">
                      {formatTimestamp(contact.timestamp)}
                    </span>
                  </div>
                  
                  {/* Email and Labels Row */}
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-gray-500 dark:text-gray-400 truncate">
                      {contact.email}
                    </span>
                    <div className="flex space-x-1 ml-2 flex-shrink-0">
                      {getLabelBadges(contact.labels)}
                    </div>
                  </div>
                  
                  {/* Snippet */}
                  <p className="text-xs text-gray-600 dark:text-gray-300 truncate">
                    {truncateSnippet(contact.snippet)}
                  </p>
                </div>
                
                {/* Unread indicator */}
                {contact.unread && (
                  <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></div>
                )}
              </div>
            ))}
            
            {/* Load More indicator for infinite scroll */}
            {pageToken && (
              <div ref={loadMoreRef} className="p-4 flex justify-center">
                {loading && (
                  <Loader2 className="w-5 h-5 animate-spin text-gray-400" />
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default ContactList;