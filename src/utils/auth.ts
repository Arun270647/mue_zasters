interface DecodedToken {
  role: number;
  email: string;
  exp: number;
}

export const decodeJWT = (token: string): DecodedToken | null => {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch (error) {
    return null;
  }
};

export const getToken = (): string | null => {
  return localStorage.getItem('token');
};

export const setToken = (token: string): void => {
  localStorage.setItem('token', token);
};

export const removeToken = (): void => {
  localStorage.removeItem('token');
};

export const getUserRole = (): number | null => {
  const token = getToken();
  if (!token) return null;
  
  const decoded = decodeJWT(token);
  return decoded ? decoded.role : null;
};

export const isAuthenticated = (): boolean => {
  const token = getToken();
  if (!token) return false;
  
  const decoded = decodeJWT(token);
  if (!decoded) return false;
  
  return Date.now() < decoded.exp * 1000;
};