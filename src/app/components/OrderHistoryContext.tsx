import { createContext, useContext, useEffect, useMemo, useState, useCallback, type ReactNode } from 'react';
import { createOrder, fetchOrdersByEmail, isApiConfigured } from '../api';

export type PaymentGateway = 'paystack' | 'flutterwave' | 'hubtel' | 'cash';
export type PaymentStatus = 'paid' | 'pending' | 'failed';
export type ConfirmationChannel = 'email' | 'whatsapp';

export interface OrderRecordItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
  description?: string;
}

export interface OrderRecord {
  id: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  deliveryAddress: string;
  deliveryInstructions?: string;
  confirmationChannels: ConfirmationChannel[];
  paymentGateway: PaymentGateway;
  paymentStatus: PaymentStatus;
  paymentReference: string;
  subtotal: number;
  deliveryFee: number;
  total: number;
  createdAt: string;
  items: OrderRecordItem[];
}

interface OrderHistoryContextType {
  orders: OrderRecord[];
  addOrder: (order: OrderRecord) => Promise<void>;
  getOrdersByEmail: (email: string) => OrderRecord[];
  loadOrdersByEmail: (email: string) => Promise<void>;
  isLoadingOrders: boolean;
}

const STORAGE_KEY = 'gobe-hemaa-orders';

const OrderHistoryContext = createContext<OrderHistoryContextType | undefined>(undefined);

export function OrderHistoryProvider({ children }: { children: ReactNode }) {
  const [orders, setOrders] = useState<OrderRecord[]>([]);
  const [isLoadingOrders, setIsLoadingOrders] = useState(false);

  useEffect(() => {
    const savedOrders = window.localStorage.getItem(STORAGE_KEY);

    if (!savedOrders) {
      return;
    }

    try {
      setOrders(JSON.parse(savedOrders) as OrderRecord[]);
    } catch {
      window.localStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  const persistLocalOrders = useCallback((nextOrders: OrderRecord[]) => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(nextOrders));
    setOrders(nextOrders);
  }, []);

  const addOrder = useCallback(async (order: OrderRecord) => {
    if (isApiConfigured) {
      const savedOrder = await createOrder(order);
      setOrders((currentOrders) => [savedOrder, ...currentOrders.filter((entry) => entry.id !== savedOrder.id)]);
      return;
    }

    setOrders((currentOrders) => {
      const nextOrders = [order, ...currentOrders];
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(nextOrders));
      return nextOrders;
    });
  }, []);

  const getOrdersByEmail = useCallback(
    (email: string) => orders.filter((order) => order.customerEmail.toLowerCase() === email.trim().toLowerCase()),
    [orders],
  );

  const loadOrdersByEmail = useCallback(async (email: string) => {
    if (!isApiConfigured) {
      return;
    }

    setIsLoadingOrders(true);

    try {
      const remoteOrders = await fetchOrdersByEmail(email);
      persistLocalOrders(remoteOrders);
    } finally {
      setIsLoadingOrders(false);
    }
  }, [persistLocalOrders]);

  const value = useMemo(
    () => ({
      orders,
      addOrder,
      getOrdersByEmail,
      loadOrdersByEmail,
      isLoadingOrders,
    }),
    [addOrder, getOrdersByEmail, isLoadingOrders, loadOrdersByEmail, orders],
  );

  return <OrderHistoryContext.Provider value={value}>{children}</OrderHistoryContext.Provider>;
}

export function useOrderHistory() {
  const context = useContext(OrderHistoryContext);

  if (!context) {
    throw new Error('useOrderHistory must be used within OrderHistoryProvider');
  }

  return context;
}
