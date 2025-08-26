import { useState } from "react";
import Sidebar from "@/components/dashboard/Sidebar";
import ContactList from "@/components/dashboard/ContactList";
import ChatArea from "@/components/dashboard/ChatArea";
import { EmailContact, EmailMessage, SidebarFolder } from "@/types/email";

export interface DashboardState {
  selectedFolder: SidebarFolder;
  selectedContact: EmailContact | null;
  contacts: EmailContact[];
  messages: EmailMessage[];
  contactsLoading: boolean;
  messagesLoading: boolean;
  contactsPageToken: string;
  messagesPageToken: string;
}

function Dashboard() {
  const [state, setState] = useState<DashboardState>({
    selectedFolder: "Primary+Sent" as SidebarFolder,
    selectedContact: null,
    contacts: [],
    messages: [],
    contactsLoading: false,
    messagesLoading: false,
    contactsPageToken: "",
    messagesPageToken: ""
  });

  const updateState = (updates: Partial<DashboardState>) => {
    setState(prev => ({ ...prev, ...updates }));
  };

  const handleFolderSelect = (folder: SidebarFolder) => {
    updateState({ 
      selectedFolder: folder, 
      selectedContact: null,
      contacts: [],
      messages: [],
      contactsPageToken: "",
      messagesPageToken: ""
    });
  };

  const handleContactSelect = (contact: EmailContact) => {
    updateState({ 
      selectedContact: contact,
      messages: [],
      messagesPageToken: ""
    });
  };

  const handleMessageSent = (newMessage: EmailMessage) => {
    updateState({
      messages: [...state.messages, newMessage]
    });
  };

  return (
    <div className="flex h-[calc(100vh-70px)] bg-gray-50 dark:bg-gray-900">
      {/* Sidebar */}
      <Sidebar
        selectedFolder={state.selectedFolder}
        onFolderSelect={handleFolderSelect}
      />
      
      {/* Contact List */}
      <ContactList
        selectedFolder={state.selectedFolder}
        selectedContact={state.selectedContact}
        contacts={state.contacts}
        loading={state.contactsLoading}
        pageToken={state.contactsPageToken}
        onContactSelect={handleContactSelect}
        onContactsUpdate={(contacts, pageToken) => 
          updateState({ contacts, contactsPageToken: pageToken })
        }
        onLoadingChange={(loading) => updateState({ contactsLoading: loading })}
      />
      
      {/* Chat Area */}
      <ChatArea
        selectedContact={state.selectedContact}
        messages={state.messages}
        loading={state.messagesLoading}
        pageToken={state.messagesPageToken}
        onMessagesUpdate={(messages, pageToken) => 
          updateState({ messages, messagesPageToken: pageToken })
        }
        onLoadingChange={(loading) => updateState({ messagesLoading: loading })}
        onMessageSent={handleMessageSent}
      />
    </div>
  );
}

export default Dashboard;