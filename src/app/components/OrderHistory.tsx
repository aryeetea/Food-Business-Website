import { useEffect } from 'react';
import { Link, Navigate, useLocation } from 'react-router';
import { Clock3, PackageCheck, ShoppingBag } from 'lucide-react';
import { format } from 'date-fns';
import { useAuth } from './AuthContext';
import { useOrderHistory } from './OrderHistoryContext';
import { getDescriptionItems } from './menuDescription';

export function OrderHistory() {
  const { isAuthenticated, isReady, user } = useAuth();
  const { getOrdersByEmail, isLoadingOrders, loadOrdersByEmail } = useOrderHistory();
  const location = useLocation();

  useEffect(() => {
    if (!user) {
      return;
    }

    void loadOrdersByEmail(user.email);
  }, [loadOrdersByEmail, user]);

  if (!isReady || isLoadingOrders) {
    return (
      <div className="page-shell py-16">
        <div className="mx-auto max-w-3xl rounded-[2rem] border border-[var(--color-border-soft)] bg-white/90 p-10 text-center shadow-[var(--shadow-soft)]">
          <div className="loading-dots mx-auto mb-4" aria-hidden="true">
            <span></span>
            <span></span>
            <span></span>
          </div>
          <p className="text-[var(--color-muted-ink)]">Loading your account…</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    return <Navigate to="/signin" replace state={{ from: location.pathname }} />;
  }

  const orders = getOrdersByEmail(user.email);

  return (
    <div className="page-shell py-12 sm:py-16">
      <section className="mx-auto max-w-6xl space-y-8">
        <div className="hero-panel p-8 text-white sm:p-10">
          <p className="eyebrow text-[var(--color-accent)]">My Orders</p>
          <h1 className="mt-4 text-4xl font-semibold">Welcome back, {user.fullName.split(' ')[0]}</h1>
          <p className="mt-3 max-w-2xl text-base leading-7 text-white/80 sm:text-lg">
            Track recent purchases, repeat your favorites, and confirm which payments were completed successfully.
          </p>
        </div>

        {orders.length === 0 ? (
          <div className="rounded-[2rem] border border-dashed border-[var(--color-border-soft)] bg-white/90 p-10 text-center shadow-[var(--shadow-soft)]">
            <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-[var(--color-primary)]/10 text-[var(--color-primary)]">
              <ShoppingBag className="h-9 w-9" />
            </div>
            <h2 className="text-2xl font-semibold text-[var(--color-ink)]">No orders saved yet</h2>
            <p className="mt-3 text-[var(--color-muted-ink)]">
              Place your first order with this email address and it will appear here automatically.
            </p>
            <Link to="/menu" className="primary-button mt-6 inline-flex">
              Start an Order
            </Link>
          </div>
        ) : (
          <div className="grid gap-6">
            {orders.map((order) => (
              <article key={order.id} className="surface-card animate-fade-in">
                <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
                  <div className="space-y-4">
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="inline-flex items-center rounded-full bg-emerald-50 px-3 py-1 text-sm font-semibold text-emerald-700">
                        <PackageCheck className="mr-2 h-4 w-4" />
                        {order.paymentStatus === 'paid' ? 'Paid' : 'Pending confirmation'}
                      </span>
                      <span className="inline-flex items-center rounded-full bg-[var(--color-surface)] px-3 py-1 text-sm font-medium text-[var(--color-muted-ink)]">
                        {order.paymentGateway === 'cash' ? 'Cash on delivery' : `${order.paymentGateway} checkout`}
                      </span>
                    </div>

                    <div>
                      <h2 className="text-2xl font-semibold text-[var(--color-ink)]">Order #{order.id.slice(-6).toUpperCase()}</h2>
                      <p className="mt-2 flex items-center gap-2 text-sm text-[var(--color-muted-ink)]">
                        <Clock3 className="h-4 w-4" />
                        {format(new Date(order.createdAt), "PPP 'at' p")}
                      </p>
                    </div>

                    <ul className="space-y-2 text-sm text-[var(--color-muted-ink)]">
                      {order.items.map((item) => (
                        <li key={item.id} className="flex items-start justify-between gap-4 border-b border-[var(--color-border-soft)] pb-2 last:border-b-0 last:pb-0">
                          <div>
                            <span>{item.name} x {item.quantity}</span>
                            {getDescriptionItems(item.description).length > 0 && (
                              <ul className="mt-2 list-disc space-y-1 pl-5 text-xs text-[var(--color-muted-ink)] marker:text-[var(--color-primary)]">
                                {getDescriptionItems(item.description).map((detail) => (
                                  <li key={`${item.id}-${detail}`}>{detail}</li>
                                ))}
                              </ul>
                            )}
                          </div>
                          <span className="font-medium text-[var(--color-ink)]">GH₵ {(item.price * item.quantity).toFixed(2)}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="min-w-[260px] rounded-3xl bg-[var(--color-surface)] p-5">
                    <dl className="space-y-3 text-sm">
                      <div className="flex justify-between gap-3">
                        <dt className="text-[var(--color-muted-ink)]">Delivery</dt>
                        <dd className="text-right font-medium text-[var(--color-ink)]">{order.deliveryAddress}</dd>
                      </div>
                      <div className="flex justify-between gap-3">
                        <dt className="text-[var(--color-muted-ink)]">Reference</dt>
                        <dd className="text-right font-medium text-[var(--color-ink)]">{order.paymentReference}</dd>
                      </div>
                      <div className="flex justify-between gap-3">
                        <dt className="text-[var(--color-muted-ink)]">Confirmation</dt>
                        <dd className="text-right font-medium capitalize text-[var(--color-ink)]">{order.confirmationChannels.join(' & ')}</dd>
                      </div>
                      <div className="border-t border-[var(--color-border-soft)] pt-3">
                        <div className="flex justify-between gap-3">
                          <dt className="text-[var(--color-muted-ink)]">Total</dt>
                          <dd className="text-right text-lg font-semibold text-[var(--color-primary)]">GH₵ {order.total.toFixed(2)}</dd>
                        </div>
                      </div>
                    </dl>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
