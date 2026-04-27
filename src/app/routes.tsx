import { createBrowserRouter } from "react-router";
import { Layout } from "./components/Layout";
import { Home } from "./components/Home";
import { Menu } from "./components/Menu";
import { About } from "./components/About";
import { Contact } from "./components/Contact";
import { Order } from "./components/Order";
import { Payment } from "./components/Payment";
import { AuthProvider } from "./components/AuthContext";
import { CartProvider } from "./components/CartContext";
import { OrderHistoryProvider } from "./components/OrderHistoryContext";
import { OrderHistory } from "./components/OrderHistory";
import { SignIn } from "./components/SignIn";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <AuthProvider>
        <OrderHistoryProvider>
          <CartProvider>
            <Layout />
          </CartProvider>
        </OrderHistoryProvider>
      </AuthProvider>
    ),
    children: [
      { index: true, Component: Home },
      { path: "menu", Component: Menu },
      { path: "about", Component: About },
      { path: "contact", Component: Contact },
      { path: "order", Component: Order },
      { path: "payment", Component: Payment },
      { path: "orders", Component: OrderHistory },
      { path: "signin", Component: SignIn },
      { path: "signup", Component: SignIn },
    ],
  },
]);
