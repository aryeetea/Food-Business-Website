import { Outlet, Link, useLocation } from 'react-router';
import { Menu, X, ShoppingCart, Phone } from 'lucide-react';
import { useState } from 'react';
import logo from "../../assets/logo.png";
import { useCart } from './CartContext';

export function Layout() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { items } = useCart();

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/menu', label: 'Menu' },
    { path: '/about', label: 'About' },
    { path: '/contact', label: 'Contact' },
  ];

  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  const cartItemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-yellow-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-lg border-b border-yellow-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="w-14 h-14 bg-gradient-to-br from-[#7d3d2b] to-[#5a2a1e] rounded-2xl p-2 shadow-lg group-hover:shadow-xl transition-shadow">
                <img src={logo} alt="Gobɛ Hemaa" className="w-full h-full object-contain" />
              </div>
              <div>
                <div className="text-2xl font-black text-[#7d3d2b]">
                  GOBƐ HEMAA
                </div>
                <div className="text-xs text-[#7d3d2b]/70 italic">...the life saver</div>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-4 py-2 rounded-xl transition-all ${
                    isActive(link.path)
                      ? 'bg-[#7d3d2b] text-[#ffd700] shadow-md'
                      : 'text-gray-700 hover:bg-yellow-50'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                to="/order"
                className="relative p-3 hover:bg-yellow-50 rounded-xl transition-all ml-2"
              >
                <ShoppingCart className="h-6 w-6 text-gray-700" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#7d3d2b] text-[#ffd700] text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center shadow-lg">
                    {cartItemCount}
                  </span>
                )}
              </Link>
              <a
                href="tel:0505647668"
                className="flex items-center space-x-2 bg-[#7d3d2b] text-[#ffd700] px-5 py-2.5 rounded-xl font-semibold hover:shadow-lg transition-all ml-2"
              >
                <Phone className="h-4 w-4" />
                <span>Call Now</span>
              </a>
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 hover:bg-yellow-50 rounded-xl transition-colors"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <nav className="md:hidden py-4 space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`block py-3 px-4 rounded-xl transition-all ${
                    isActive(link.path)
                      ? 'bg-[#7d3d2b] text-[#ffd700]'
                      : 'hover:bg-yellow-50'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                to="/order"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center justify-between py-3 px-4 rounded-xl hover:bg-yellow-50 transition-all"
              >
                <span>Cart</span>
                {cartItemCount > 0 && (
                  <span className="bg-[#7d3d2b] text-[#ffd700] px-3 py-1 rounded-full text-sm font-bold">
                    {cartItemCount}
                  </span>
                )}
              </Link>
              <a
                href="tel:0505647668"
                className="flex items-center justify-center space-x-2 bg-[#7d3d2b] text-[#ffd700] px-4 py-3 rounded-xl font-semibold mt-4"
              >
                <Phone className="h-4 w-4" />
                <span>Call Now</span>
              </a>
            </nav>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main>
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {/* About */}
            <div>
              <h3 className="text-xl font-bold text-[#ffd700] mb-4">About Gobɛ Hemaa</h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                Traditional fast-growing indigenous food business providing healthy, hygienic, 
                and affordable meals in Accra.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-xl font-bold text-[#ffd700] mb-4">Quick Links</h3>
              <ul className="space-y-2 text-sm">
                {navLinks.map((link) => (
                  <li key={link.path}>
                    <Link to={link.path} className="text-gray-300 hover:text-[#ffd700] transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="text-xl font-bold text-[#ffd700] mb-4">Contact Us</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>Office: 0505647668</li>
                <li>WhatsApp: 0553312217</li>
                <li>Social: @gob3.hemaa</li>
                <li>Location: Accra, Ghana</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-700 pt-8 text-center text-sm text-gray-400">
            © 2026 Gobɛ Hemaa. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}