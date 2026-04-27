import type { AuthUser } from './components/AuthContext';
import type { OrderRecord } from './components/OrderHistoryContext';

const API_BASE_URL = (import.meta.env.VITE_API_URL ?? '').replace(/\/$/, '');

export const isApiConfigured = Boolean(API_BASE_URL);

async function requestJson<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(init?.headers ?? {}),
    },
    ...init,
  });

  if (!response.ok) {
    const payload = (await response.json().catch(() => null)) as { error?: string } | null;
    throw new Error(payload?.error ?? 'Request failed.');
  }

  return (await response.json()) as T;
}

export function upsertUser(payload: AuthUser) {
  return requestJson<AuthUser>('/api/auth/signin', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export function fetchOrdersByEmail(email: string) {
  const query = new URLSearchParams({ email: email.trim().toLowerCase() });
  return requestJson<OrderRecord[]>(`/api/orders?${query.toString()}`);
}

export function createOrder(order: OrderRecord) {
  return requestJson<OrderRecord>('/api/orders', {
    method: 'POST',
    body: JSON.stringify(order),
  });
}
