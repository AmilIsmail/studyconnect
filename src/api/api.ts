const API_BASE_URL = import.meta.env.VITE_API_URL ?? "http://localhost:3001/api";

export async function apiRequest<T>(
  path: string,
  options: RequestInit = {},
): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...(options.headers ?? {}),
    },
    ...options,
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.message ?? "Request failed");
  }

  return data as T;
}

export function authHeader(token: string | null) {
  return token ? { Authorization: `Bearer ${token}` } : {};
}
