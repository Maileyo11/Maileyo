import axios from 'axios';

export async function fetchAuthenticatedUser(): Promise<null | {
  email: string;
  name: string;
  picture: string;
  google_id: string;
}> {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  try {
    const res = await axios.get(`${backendUrl}/auth/google/user`, {
      withCredentials: true,
      headers: {
        'accept': 'application/json',
      },
    });
    if (res.data && res.data.google_id) return res.data;
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
