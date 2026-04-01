import { createBrowserRouter } from "react-router";
import { Layout } from "./components/Layout";
import { Home } from "./components/Home";
import { Menu } from "./components/Menu";
import { About } from "./components/About";
import { Contact } from "./components/Contact";
import { Order } from "./components/Order";
import { Payment } from "./components/Payment";
import { CartProvider } from "./components/CartContext";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <CartProvider>
        <Layout />
      </CartProvider>
    ),
    children: [
      { index: true, Component: Home },
      { path: "menu", Component: Menu },
      { path: "about", Component: About },
      { path: "contact", Component: Contact },
      { path: "order", Component: Order },
      { path: "payment", Component: Payment },
    ],
  },
]);