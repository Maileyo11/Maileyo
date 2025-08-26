import { useEffect, useState } from "react";
import { fetchAuthenticatedUser, getGoogleLoginUrl } from "../lib/auth";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    let isMounted = true;
    fetchAuthenticatedUser().then((user) => {
      if (!isMounted) return;
      if (user) {
        setAuthenticated(true);
      } else {
        // Not authenticated, redirect to Google login
        window.location.href = getGoogleLoginUrl();
      }
      setLoading(false);
    });
    return () => {
      isMounted = false;
    };
  }, []);

  if (loading) {
    // Optionally show a loading spinner
    return <div>Loading...</div>;
  }
  if (!authenticated) {
    // Should never render this, as redirect happens above
    return null;
  }
  return <>{children}</>;
}