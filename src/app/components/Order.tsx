import { Link, useNavigate } from 'react-router';
import { ArrowRight, Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react';
import { useCart } from './CartContext';

export function Order() {
  const { items, updateQuantity, removeItem, total } = useCart();
  const navigate = useNavigate();

  const deliveryFee = 10;
  const grandTotal = total + (items.length > 0 ? deliveryFee : 0);

  return (
    <div className="page-shell py-8 sm:py-10">
      <section className="mx-auto max-w-7xl">
        <div className="hero-panel px-6 py-10 sm:px-10 sm:py-12">
          <p className="eyebrow text-[var(--color-accent)]">Cart Review</p>
          <h1 className="mt-4 text-4xl font-semibold text-white sm:text-5xl">Your order</h1>
          <p className="mt-4 max-w-2xl text-base leading-8 text-white/78 sm:text-lg">
            Review quantities, update your cart, and move on to payment when everything looks right.
          </p>
        </div>

        <div className="mt-8">
          {items.length === 0 ? (
            <div className="surface-card py-14 text-center">
              <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-[var(--color-surface)] text-[var(--color-primary)]">
                <ShoppingBag className="h-12 w-12" />
              </div>
              <h2 className="text-3xl font-semibold text-[var(--color-ink)]">Your cart is empty</h2>
              <p className="mt-3 text-lg text-[var(--color-muted-ink)]">Add some delicious items from the menu to get started.</p>
              <Link to="/menu" className="primary-button mt-8 inline-flex">
                Browse Menu
                <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
          ) : (
            <div className="grid gap-8 lg:grid-cols-[1.55fr_0.95fr]">
              <div className="surface-card">
                <h2 className="text-2xl font-semibold text-[var(--color-ink)]">Cart items</h2>
                <p className="mt-2 text-sm text-[var(--color-muted-ink)]">
                  For items like <span className="font-medium">Rice (per scoop)</span>, the quantity equals the number of scoops in your order.
                </p>
                <div className="mt-6 space-y-4">
                  {items.map((item) => (
                    <article
                      key={item.id}
                      className="animate-fade-in rounded-[1.5rem] border border-[var(--color-border-soft)] bg-[var(--color-surface)] p-4 sm:p-5"
                    >
                      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                        <div className="min-w-0 flex-1">
                          <h3 className="text-xl font-semibold text-[var(--color-ink)]">{item.name}</h3>
                          <p className="mt-1 text-sm text-[var(--color-muted-ink)]">{item.category}</p>
                        </div>

                        <div className="flex items-center justify-between gap-4 sm:justify-end">
                          <div className="inline-flex items-center gap-3 rounded-full border border-[var(--color-border-soft)] bg-white px-2 py-2">
                            <button
                              type="button"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              aria-label={`Decrease quantity of ${item.name}`}
                              className="inline-flex h-9 w-9 items-center justify-center rounded-full text-[var(--color-ink)] transition-colors hover:bg-[var(--color-surface)]"
                            >
                              <Minus className="h-4 w-4" />
                            </button>
                            <span className="min-w-[2rem] text-center text-base font-semibold text-[var(--color-ink)]">{item.quantity}</span>
                            <button
                              type="button"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              aria-label={`Increase quantity of ${item.name}`}
                              className="inline-flex h-9 w-9 items-center justify-center rounded-full text-[var(--color-ink)] transition-colors hover:bg-[var(--color-surface)]"
                            >
                              <Plus className="h-4 w-4" />
                            </button>
                          </div>

                          <div className="min-w-[5.5rem] text-right text-lg font-semibold text-[var(--color-primary)]">
                            GH₵ {(item.price * item.quantity).toFixed(2)}
                          </div>

                          <button
                            type="button"
                            onClick={() => removeItem(item.id)}
                            aria-label={`Remove ${item.name} from cart`}
                            className="inline-flex h-11 w-11 items-center justify-center rounded-full text-rose-600 transition-colors hover:bg-rose-50"
                          >
                            <Trash2 className="h-5 w-5" />
                          </button>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </div>

              <aside className="lg:sticky lg:top-28 lg:self-start">
                <div className="surface-card">
                  <h2 className="text-2xl font-semibold text-[var(--color-ink)]">Order summary</h2>
                  <div className="mt-6 space-y-3 text-sm">
                    <div className="flex justify-between text-[var(--color-muted-ink)]">
                      <span>Subtotal</span>
                      <span>GH₵ {total.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-[var(--color-muted-ink)]">
                      <span>Delivery fee</span>
                      <span>GH₵ {deliveryFee.toFixed(2)}</span>
                    </div>
                    <div className="border-t border-[var(--color-border-soft)] pt-3">
                      <div className="flex justify-between text-lg font-semibold text-[var(--color-primary)]">
                        <span>Total</span>
                        <span>GH₵ {grandTotal.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => navigate('/payment')}
                    className="primary-button mt-6 w-full"
                  >
                    Proceed to Payment
                    <ArrowRight className="h-5 w-5" />
                  </button>

                  <Link to="/menu" className="secondary-button mt-4 w-full justify-center">
                    Add More Items
                  </Link>
                </div>
              </aside>
            </div>
          )}
        </div>
      </section>

      {items.length > 0 && (
        <section className="mx-auto mt-10 max-w-5xl rounded-[2rem] bg-white/85 p-8 text-center shadow-[var(--shadow-soft)]">
          <h2 className="text-2xl font-semibold text-[var(--color-ink)]">Prefer to order directly?</h2>
          <p className="mt-3 text-[var(--color-muted-ink)]">You can still place your order by WhatsApp or phone if that works better for you.</p>
          <div className="mt-6 flex flex-col justify-center gap-4 sm:flex-row">
            <a
              href="https://wa.me/233553312217"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full bg-[#25D366] px-6 py-3 font-semibold text-white transition-transform duration-300 hover:-translate-y-0.5 hover:bg-[#20BD5A]"
            >
              Order on WhatsApp
            </a>
            <a href="tel:0505647668" className="secondary-button justify-center">
              Call to Order
            </a>
          </div>
        </section>
      )}
    </div>
  );
}
