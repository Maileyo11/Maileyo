import { EmailContact } from "@/types/email";


interface ContactItemProps {
  contact: EmailContact;
  isSelected: boolean;
  onClick: () => void;
}

const ContactItem: React.FC<ContactItemProps> = ({ contact, isSelected, onClick }) => {
  // Always use the name from the API response if present, otherwise fallback to email
  const displayName = contact.name && contact.name.trim() !== '' ? contact.name : contact.email;
  return (
    <div
      onClick={onClick}
      className={`p-4 cursor-pointer ${isSelected ? 'bg-gray-100 dark:bg-gray-700' : ''}`}
    >
      <div className="font-medium">{displayName} <span className="text-xs text-gray-400">{contact.email}</span></div>
      <div className="text-sm text-gray-500">{contact.snippet}</div>
    </div>
  );
};

export default ContactItem;