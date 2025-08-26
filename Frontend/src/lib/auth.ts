
export async function fetchAuthenticatedUser(): Promise<null | {
  email: string;
  name: string;
  picture: string;
  google_id: string;
}> {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  try {
    const res = await fetch(`${backendUrl}/auth/google/user`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'accept': 'application/json',
      },
    });
    if (!res.ok) return null;
    const data = await res.json();
    if (data && data.google_id) return data;
    return null;
  } catch (e) {
    return null;
  }
}

// Helper to get backend login URL
export function getGoogleLoginUrl() {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  return `${backendUrl}/login/google`;
}