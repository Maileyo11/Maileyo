import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { fetchAuthenticatedUser, getGoogleLoginUrl } from "../lib/auth";
import { Button } from "./ui/button";
import { Avatar, AvatarImage } from "./ui/avatar";
import Container from "./Container";

interface User {
  email: string;
  name: string;
  picture: string;
  google_id: string;
}

function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Hide auth button on secured pages
  const isSecuredPage = location.pathname.startsWith("/chat-dashboard");

  useEffect(() => {
    let isMounted = true;
    
    const checkAuthentication = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const authenticatedUser = await fetchAuthenticatedUser();
        
        if (!isMounted) return;
        
        setUser(authenticatedUser);
      } catch (err) {
        if (!isMounted) return;
        
        console.error("Authentication check failed:", err);
        setError("Failed to check authentication");
        setUser(null);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    checkAuthentication();

    return () => {
      isMounted = false;
    };
  }, [location.pathname]);

  // Button click handlers
  const handleContinueWithGmail = () => {
    try {
      const loginUrl = getGoogleLoginUrl();
      window.location.href = loginUrl;
    } catch (err) {
      console.error("Failed to get Google login URL:", err);
      setError("Failed to initiate login");
    }
  };

  const handleDashboard = () => {
    navigate("/chat-dashboard");
  };

  const toggleMobileMenu = () => {
    const navbar = document.getElementById("navbar-with-text");
    if (navbar) {
      navbar.classList.toggle("hidden");
    }
  };

  console.log("Header render state:", { user, loading, isSecuredPage, pathname: location.pathname });

  return (
    <Container>
  <nav className="fixed top-0 border-solid border-gray-200 w-full py-[15px] bg-white z-50 bg-inherit shadow-[0_2px_8px_0_rgba(0,0,0,0.06)]">
        <div className="container mx-auto">
          <div className="w-full flex flex-col lg:flex-row">
            <div className="flex justify-between lg:flex-row">
              <a href="/" className="flex items-center">
                <img src="/LogoPNG.png" alt="Maileyo Logo" className="w-[55px] h-[33px] mr-2" />
                <h1 className="scroll-m-20 text-2xl font-extrabold tracking-tight lg:text-3xl">
                  Maileyo
                </h1>
              </a>
              
              <button
                onClick={toggleMobileMenu}
                data-collapse-toggle="navbar-with-text"
                type="button"
                className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                aria-controls="navbar-with-text"
                aria-expanded="false"
                aria-label="Open main menu"
              >
                <span className="sr-only">Open main menu</span>
                <svg
                  className="w-6 h-6"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
            
            <div className="hidden w-full lg:flex item-center lg:pl-11" id="navbar-with-text">
              <ul className="flex items-center flex-col mt-4 lg:mt-0 lg:mx-auto lg:flex-row gap-4">
                <li>
                  <a
                    href="/about"
                    className="flex items-center justify-between text-gray-500 text-sm lg:text-base font-medium hover:text-indigo-700 transition-all duration-500 mb-2 lg:mr-6 md:mb-0 md:mr-3"
                  >
                    About
                  </a>
                </li>
                <li>
                  <a
                    href="#how"
                    className="flex items-center justify-between text-gray-500 text-sm lg:text-base font-medium hover:text-indigo-700 transition-all duration-500 mb-2 lg:mr-6 md:mb-0 md:mr-3"
                  >
                    How It works
                  </a>
                </li>
                <li>
                  <a
                    href="#feature"
                    className="flex items-center justify-between text-gray-500 text-sm lg:text-base font-medium hover:text-indigo-700 transition-all duration-500 mb-2 lg:mr-6 md:mb-0 md:mr-3"
                  >
                    Features
                  </a>
                </li>
                <li>
                  <a
                    href="/contact"
                    className="flex items-center justify-between text-gray-500 text-sm lg:text-base font-medium hover:text-indigo-700 transition-all duration-500 mb-2 lg:mr-6 md:mb-0 md:mr-3"
                  >
                    Contact
                  </a>
                </li>
              </ul>

              {/* Auth button logic, hidden on secured pages */}
              {!isSecuredPage && (
                <div className="flex items-center">
                  {loading ? (
                    <Button
                      disabled
                      className="inline-flex justify-center items-center gap-x-3 text-center bg-gradient-to-tl from-blue-600 to-violet-600 border border-transparent text-white text-sm font-medium rounded-full py-3 px-4 opacity-50 cursor-not-allowed"
                    >
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Loading...
                    </Button>
                  ) : user ? (
                    <Button
                      className="inline-flex justify-center items-center gap-x-3 text-center bg-gradient-to-tl from-blue-600 to-violet-600 hover:from-violet-600 hover:to-blue-600 focus:outline-none focus:from-violet-600 focus:to-blue-600 border border-transparent text-white text-sm font-medium rounded-full py-3 px-4 transition-all duration-200"
                      onClick={handleDashboard}
                    >
                      <Avatar className="w-7 h-7">
                        <AvatarImage 
                          src={user.picture} 
                          alt={user.name}
                          onError={(e) => {
                            // Fallback for broken images
                            (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=6366f1&color=ffffff`;
                          }}
                        />
                      </Avatar>
                      Dashboard
                    </Button>
                  ) : (
                    <Button
                      className="inline-flex justify-center items-center gap-x-3 text-center bg-gradient-to-tl from-blue-600 to-violet-600 hover:from-violet-600 hover:to-blue-600 focus:outline-none focus:from-violet-600 focus:to-blue-600 border border-transparent text-white text-sm font-medium rounded-full py-3 px-4 transition-all duration-200"
                      onClick={handleContinueWithGmail}
                      disabled={!!error}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        x="0px"
                        y="0px"
                        width="18"
                        height="18"
                        viewBox="0 0 48 48"
                      >
                        <path fill="#4caf50" d="M45,16.2l-5,2.75l-5,4.75L35,40h7c1.657,0,3-1.343,3-3V16.2z"></path>
                        <path fill="#1e88e5" d="M3,16.2l3.614,1.71L13,23.7V40H6c-1.657,0-3-1.343-3-3V16.2z"></path>
                        <polygon fill="#e53935" points="35,11.2 24,19.45 13,11.2 12,17 13,23.7 24,31.95 35,23.7 36,17"></polygon>
                        <path fill="#c62828" d="M3,12.298V16.2l10,7.5V11.2L9.876,8.859C9.132,8.301,8.228,8,7.298,8h0C4.924,8,3,9.924,3,12.298z"></path>
                        <path fill="#fbc02d" d="M45,12.298V16.2l-10,7.5V11.2l3.124-2.341C38.868,8.301,39.772,8,40.702,8h0 C43.076,8,45,9.924,45,12.298z"></path>
                      </svg>
                      {error ? "Login Error" : "Continue with Gmail"}
                    </Button>
                  )}
                  
                  {error && (
                    <div className="ml-2 text-red-500 text-xs">
                      {error}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
    </Container>
  );
}

export default Header;