import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';

export type PaymentGateway = 'paystack' | 'flutterwave' | 'hubtel' | 'cash';
export type PaymentStatus = 'paid' | 'pending' | 'failed';
export type ConfirmationChannel = 'email' | 'whatsapp';

export interface OrderRecordItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
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
  addOrder: (order: OrderRecord) => void;
  getOrdersByEmail: (email: string) => OrderRecord[];
}

const STORAGE_KEY = 'gobe-hemaa-orders';

const OrderHistoryContext = createContext<OrderHistoryContextType | undefined>(undefined);

export function OrderHistoryProvider({ children }: { children: ReactNode }) {
  const [orders, setOrders] = useState<OrderRecord[]>([]);

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

  const addOrder = (order: OrderRecord) => {
    setOrders((currentOrders) => {
      const nextOrders = [order, ...currentOrders];
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(nextOrders));
      return nextOrders;
    });
  };

  const getOrdersByEmail = (email: string) =>
    orders.filter((order) => order.customerEmail.toLowerCase() === email.trim().toLowerCase());

  const value = useMemo(
    () => ({
      orders,
      addOrder,
      getOrdersByEmail,
    }),
    [orders],
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
