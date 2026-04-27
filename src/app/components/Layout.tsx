import { Outlet, Link, useLocation } from 'react-router';
import { Menu, X, ShoppingCart, Phone, Instagram, LogOut, User, MessageCircle } from 'lucide-react';
import { useState } from 'react';
import logo from "../../assets/logo-refined.png";
import { useCart } from './CartContext';
import { useAuth } from './AuthContext';
import { Toaster } from './ui/sonner';

export function Layout() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { items } = useCart();
  const { isAuthenticated, user, signOut } = useAuth();

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/menu', label: 'Menu' },
    { path: '/about', label: 'About' },
    { path: '/contact', label: 'Contact' },
    { path: '/orders', label: 'Order History' },
  ];

  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  const cartItemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen" style={{ background: 'var(--color-page-gradient)' }}>
      <Toaster position="top-center" richColors />
      <a href="#main-content" className="skip-link">Skip to content</a>

      <header className="sticky top-0 z-50 border-b border-[var(--color-border-soft)] bg-white/85 shadow-sm backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <Link to="/" className="flex items-center space-x-3 group">
              <img
                src={logo}
                alt="Gobɛ Hemaa logo"
                className="h-14 w-auto object-contain transition-transform duration-300 group-hover:-translate-y-0.5"
              />
              <div>
                <div className="text-2xl font-black tracking-[0.12em] text-[var(--color-ink)]">GOBƐ HEMAA</div>
                <div className="text-xs italic text-[var(--color-muted-ink)]">...eat local, feel royal</div>
              </div>
            </Link>

            <nav aria-label="Primary" className="hidden md:flex items-center space-x-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`rounded-full px-4 py-2 transition-all duration-300 ${
                    isActive(link.path)
                      ? 'bg-[var(--color-primary)] text-white shadow-md'
                      : 'text-[var(--color-muted-ink)] hover:bg-[var(--color-surface)] hover:text-[var(--color-ink)]'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                to="/order"
                aria-label="View cart"
                className="relative ml-2 rounded-full p-3 transition-all hover:bg-[var(--color-surface)]"
              >
                <ShoppingCart className="h-6 w-6 text-[var(--color-ink)]" />
                {cartItemCount > 0 && (
                  <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-[var(--color-primary)] text-xs font-bold text-white shadow-lg">
                    {cartItemCount}
                  </span>
                )}
              </Link>
              {isAuthenticated ? (
                <>
                  <Link
                    to="/orders"
                    className="ml-2 inline-flex items-center gap-2 rounded-full border border-[var(--color-border-soft)] px-4 py-2 text-sm font-semibold text-[var(--color-ink)] transition-all hover:border-[var(--color-primary)] hover:bg-[var(--color-surface)]"
                  >
                    <User className="h-4 w-4" />
                    {user?.fullName.split(' ')[0]}
                  </Link>
                  <button
                    onClick={signOut}
                    className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold text-[var(--color-muted-ink)] transition-all hover:bg-[var(--color-surface)] hover:text-[var(--color-ink)]"
                  >
                    <LogOut className="h-4 w-4" />
                    Sign Out
                  </button>
                </>
              ) : (
                <Link to="/signin" className="secondary-button ml-2 !h-auto !rounded-full !px-4 !py-2 text-sm">
                  Sign In
                </Link>
              )}
              <a
                href="tel:0505647668"
                className="primary-button ml-2 !h-auto !rounded-full !px-5 !py-2.5 text-sm"
              >
                <Phone className="h-4 w-4" />
                <span>Call Now</span>
              </a>
            </nav>

            <button
              type="button"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-expanded={isMenuOpen}
              aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              className="rounded-xl p-2 transition-colors hover:bg-[var(--color-surface)] md:hidden"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {isMenuOpen && (
            <nav aria-label="Mobile" className="space-y-2 py-4 md:hidden">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`block rounded-2xl px-4 py-3 transition-all ${
                    isActive(link.path)
                      ? 'bg-[var(--color-primary)] text-white'
                      : 'hover:bg-[var(--color-surface)]'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                to="/order"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center justify-between rounded-2xl px-4 py-3 transition-all hover:bg-[var(--color-surface)]"
              >
                <span>Cart</span>
                {cartItemCount > 0 && (
                  <span className="rounded-full bg-[var(--color-primary)] px-3 py-1 text-sm font-bold text-white">
                    {cartItemCount}
                  </span>
                )}
              </Link>
              {isAuthenticated ? (
                <>
                  <Link
                    to="/orders"
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center gap-2 rounded-2xl px-4 py-3 transition-all hover:bg-[var(--color-surface)]"
                  >
                    <User className="h-4 w-4" />
                    My Account
                  </Link>
                  <button
                    type="button"
                    onClick={() => {
                      signOut();
                      setIsMenuOpen(false);
                    }}
                    className="flex w-full items-center gap-2 rounded-2xl px-4 py-3 text-left transition-all hover:bg-[var(--color-surface)]"
                  >
                    <LogOut className="h-4 w-4" />
                    Sign Out
                  </button>
                </>
              ) : (
                <Link
                  to="/signin"
                  onClick={() => setIsMenuOpen(false)}
                  className="block rounded-2xl px-4 py-3 transition-all hover:bg-[var(--color-surface)]"
                >
                  Sign In
                </Link>
              )}
              <a
                href="tel:0505647668"
                className="primary-button mt-4 flex !h-auto justify-center !rounded-2xl !px-4 !py-3"
              >
                <Phone className="h-4 w-4" />
                <span>Call Now</span>
              </a>
            </nav>
          )}
        </div>
      </header>

      <main id="main-content">
        <Outlet />
      </main>

      <footer className="mt-20 bg-[linear-gradient(160deg,#221714,#3b231d)] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-4 mb-8">
            <div>
              <img
                src={logo}
                alt="Gobɛ Hemaa logo"
                className="mb-4 h-14 w-auto object-contain"
              />
              <h3 className="mb-4 text-xl font-bold text-[var(--color-accent)]">Gobɛ Hemaa</h3>
              <p className="text-sm leading-relaxed text-white/72">
                Local Ghanaian meals prepared beautifully and delivered quickly across Accra.
              </p>
            </div>

            <div>
              <h3 className="mb-4 text-xl font-bold text-[var(--color-accent)]">Explore</h3>
              <ul className="space-y-2 text-sm">
                {navLinks.map((link) => (
                  <li key={link.path}>
                    <Link to={link.path} className="text-white/72 transition-colors hover:text-[var(--color-accent)]">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="mb-4 text-xl font-bold text-[var(--color-accent)]">Contact</h3>
              <ul className="space-y-2 text-sm text-white/72">
                <li><a href="tel:0505647668" className="hover:text-[var(--color-accent)]">Office: 0505647668</a></li>
                <li><a href="https://wa.me/233553312217" className="hover:text-[var(--color-accent)]">WhatsApp: 0553312217</a></li>
                <li><a href="mailto:orders@gobehemaa.com" className="hover:text-[var(--color-accent)]">Email: orders@gobehemaa.com</a></li>
                <li>Location: University of Ghana, Accra City Campus</li>
              </ul>
            </div>

            <div>
              <h3 className="mb-4 text-xl font-bold text-[var(--color-accent)]">Follow</h3>
              <div className="flex flex-wrap gap-3 text-sm">
                <a href="https://wa.me/233553312217" className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-white/85 transition-colors hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]">
                  <MessageCircle className="h-4 w-4" />
                  WhatsApp
                </a>
                <a href="https://instagram.com/gob3.hemaa" className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-white/85 transition-colors hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]">
                  <Instagram className="h-4 w-4" />
                  Instagram
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-white/10 pt-8 text-center text-sm text-white/55">
            © 2026 Gobɛ Hemaa. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
