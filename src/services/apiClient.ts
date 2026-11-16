/**
 * Central API Client for Trip Centre Web
 * Synchronized with trip-center-backend & trip-center-admin
 */

export const API_BASE_URL = (
  import.meta.env.VITE_API_URL || 'http://localhost:8001/api/v1'
).trim().replace(/\/$/, '');

export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
  errors?: Array<{ path?: string; message: string }>;
}

export async function request<T = any>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;
  
  const headers = new Headers(options.headers || {});
  if (!headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json');
  }

  // Auto attach device timezone
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    if (tz && !headers.has('X-Timezone')) {
      headers.set('X-Timezone', tz);
    }
  } catch {
    // ignore
  }

  try {
    const token = localStorage.getItem('trip_centre_token');
    if (token && !headers.has('Authorization')) {
      headers.set('Authorization', `Bearer ${token}`);
    }
  } catch {
    // ignore storage access errors
  }

  const response = await fetch(url, {
    ...options,
    headers,
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    const errorMsg = data?.message || data?.error || `HTTP ${response.status}: Request failed`;
    throw new Error(errorMsg);
  }

  return data as T;
}

