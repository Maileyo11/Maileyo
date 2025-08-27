import { useState, useEffect } from "react";
import axios from "axios";
import {
  Inbox,
  Star,
  Send,
  AlertTriangle,
  FileText,
  User,
  LogOut,
  Mail,
  Users,
  Tag
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { SidebarFolder } from "@/types/email";
import { fetchAuthenticatedUser, getGoogleLoginUrl } from "../../lib/auth";

interface SidebarProps {
  selectedFolder: SidebarFolder;
  onFolderSelect: (folder: SidebarFolder) => void;
}

interface User {
  email: string;
  name: string;
  picture: string;
  google_id: string;
}

const folderItems = [
  {
    id: "Primary+Sent" as SidebarFolder,
    label: "Primary + Sent",
    icon: Mail,
    count: 0
  },
  {
    id: "Inbox:Primary" as SidebarFolder,
    label: "Primary",
    icon: Inbox,
    count: 0
  },
  {
    id: "Inbox:Social" as SidebarFolder,
    label: "Social",
    icon: Users,
    count: 0
  },
  {
    id: "Inbox:Promotions" as SidebarFolder,
    label: "Promotions",
    icon: Tag,
    count: 0
  },
  {
    id: "Starred" as SidebarFolder,
    label: "Starred",
    icon: Star,
    count: 0
  },
  {
    id: "Sent" as SidebarFolder,
    label: "Sent",
    icon: Send,
    count: 0
  },
  {
    id: "Spam" as SidebarFolder,
    label: "Spam",
    icon: AlertTriangle,
    count: 0
  },
  {
    id: "Drafts" as SidebarFolder,
    label: "Drafts",
    icon: FileText,
    count: 0
  },
];

function Sidebar({ selectedFolder, onFolderSelect }: SidebarProps) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const userData = await fetchAuthenticatedUser();
        setUser(userData);
      } catch (error) {
        console.error('Failed to fetch user:', error);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  const handleLogin = () => {
    window.location.href = getGoogleLoginUrl();
  };

  const handleLogout = async () => {
    try {
      const backendUrl = import.meta.env.VITE_BACKEND_URL;
      await axios.post(`${backendUrl}/auth/logout`, {}, {
        withCredentials: true
      });
      setUser(null);
      window.location.href = "/";
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
  <div className="p-1 w-24 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 flex flex-col h-full justify-between">
      {/* Logo/Brand */}
      <div className="p-3 border-b border-gray-200 dark:border-gray-700 flex justify-center">
        <a href="/">
          <img src="/LogoPNG.png" alt="Maileyo" className="w-8 h-8" />
        </a>
      </div>

  {/* Navigation */}
  <nav className="flex-1 p-2 flex flex-col gap-4">
        {folderItems.map((item) => {
          const Icon = item.icon;
          const isSelected = selectedFolder === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onFolderSelect(item.id)}
              className={`w-full flex flex-col items-center justify-center p-2 rounded-lg transition-all duration-200 group relative ${
                isSelected
                  ? "bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 shadow-md"
                  : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800/50"
              }`}
            >
              <div className={`p-1 rounded-md transition-colors ${
                isSelected 
                  ? "bg-indigo-200 dark:bg-indigo-800" 
                  : "group-hover:bg-gray-100 dark:group-hover:bg-gray-700"
              }`}>
                <Icon className="w-4 h-4" />
              </div>
              <span className="text-xs font-medium mt-1 text-center leading-tight">
                {item.label}
              </span>
              
              {/* Count badge */}
              {item.count > 0 && (
                <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center font-medium">
                  {item.count > 99 ? '99+' : item.count}
                </div>
              )}
            </button>
          );
        })}
      </nav>

      {/* Profile Section */}
      <div className="p-3 border-t border-gray-200 dark:border-gray-700">
        {loading ? (
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-indigo-500"></div>
          </div>
        ) : user ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="w-full flex flex-col items-center justify-center p-1 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-all duration-200 group">
                <div className="p-1 rounded-md group-hover:bg-gray-100 dark:group-hover:bg-gray-700 transition-colors">
                  <Avatar className="w-6 h-6">
                    <AvatarImage src={user.picture} alt={user.name} />
                    <AvatarFallback className="bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-400 text-xs font-medium">
                      {user.name.split(' ').map(n => n[0]).join('').substring(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                </div>
                <span className="text-xs font-medium mt-1 text-gray-600 dark:text-gray-300 text-center leading-tight">
                  Profile
                </span>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="center" side="right" className="w-56">
              <div className="px-3 py-2 border-b border-gray-200 dark:border-gray-700">
                <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                  {user.name}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                  {user.email}
                </p>
              </div>
              <DropdownMenuItem 
                onClick={handleLogout} 
                className="text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <button
            onClick={handleLogin}
            className="w-full flex flex-col items-center justify-center p-1 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-all duration-200 group text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
          >
            <div className="p-1 rounded-md group-hover:bg-gray-100 dark:group-hover:bg-gray-700 transition-colors">
              <User className="w-4 h-4" />
            </div>
            <span className="text-xs font-medium mt-1 text-center leading-tight">
              Login
            </span>
          </button>
        )}
      </div>
    </div>
  );
}

export default Sidebar;