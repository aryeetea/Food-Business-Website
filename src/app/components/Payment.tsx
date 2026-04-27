import { useMemo, useState } from 'react';
import { Link, Navigate } from 'react-router';
import {
  ArrowLeft,
  CheckCircle2,
  CreditCard,
  LoaderCircle,
  Mail,
  MessageCircle,
  ShieldCheck,
  Smartphone,
} from 'lucide-react';
import { toast } from 'sonner';
import { useCart } from './CartContext';
import { useAuth } from './AuthContext';
import { type ConfirmationChannel, useOrderHistory } from './OrderHistoryContext';
import { processGatewayPayment } from './paymentGateway';
import { getDescriptionItems } from './menuDescription';

type PaymentMethod = 'mobile' | 'cash';
type GatewaySelection = 'paystack' | 'flutterwave' | 'hubtel';

interface CheckoutForm {
  name: string;
  email: string;
  phone: string;
  address: string;
  instructions: string;
  mobileNumber: string;
  mobileProvider: string;
  gateway: GatewaySelection;
  confirmationChannels: ConfirmationChannel[];
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_PATTERN = /^(?:\+233|0)\d{9}$/;

export function Payment() {
  const { items, total, clearCart } = useCart();
  const { user } = useAuth();
  const { addOrder } = useOrderHistory();
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('mobile');
  const [formData, setFormData] = useState<CheckoutForm>({
    name: user?.fullName ?? '',
    email: user?.email ?? '',
    phone: user?.phone ?? '',
    address: '',
    instructions: '',
    mobileNumber: user?.phone ?? '',
    mobileProvider: 'mtn',
    gateway: 'paystack',
    confirmationChannels: ['email', 'whatsapp'],
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [completedOrderId, setCompletedOrderId] = useState<string | null>(null);

  const deliveryFee = 10;
  const grandTotal = total + deliveryFee;

  const summaryItems = useMemo(
    () =>
      items.map((item) => ({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        description: item.description,
      })),
    [items],
  );

  if (items.length === 0 && !completedOrderId) {
    return <Navigate to="/menu" replace />;
  }

  const handleInputChange = (field: keyof CheckoutForm, value: string | ConfirmationChannel[]) => {
    setFormData((current) => ({
      ...current,
      [field]: value,
    }));

    setErrors((current) => {
      if (!current[field]) {
        return current;
      }

      const nextErrors = { ...current };
      delete nextErrors[field];
      return nextErrors;
    });
  };

  const toggleConfirmationChannel = (channel: ConfirmationChannel) => {
    const nextChannels = formData.confirmationChannels.includes(channel)
      ? formData.confirmationChannels.filter((entry) => entry !== channel)
      : [...formData.confirmationChannels, channel];

    handleInputChange('confirmationChannels', nextChannels);
  };

  const validate = () => {
    const nextErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      nextErrors.name = 'Please enter the customer name for this order.';
    }

    if (!EMAIL_PATTERN.test(formData.email.trim())) {
      nextErrors.email = 'Enter a valid email address for receipts and order history.';
    }

    if (!PHONE_PATTERN.test(formData.phone.trim())) {
      nextErrors.phone = 'Use a Ghana phone number like 0553312217 or +233553312217.';
    }

    if (!formData.address.trim()) {
      nextErrors.address = 'Please enter the delivery address, area, or landmark.';
    }

    if (paymentMethod === 'mobile' && !PHONE_PATTERN.test(formData.mobileNumber.trim())) {
      nextErrors.mobileNumber = 'Enter the mobile money number that should receive the payment prompt.';
    }

    if (formData.confirmationChannels.length === 0) {
      nextErrors.confirmationChannels = 'Select at least one confirmation channel.';
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!validate()) {
      toast.error('Please fix the highlighted fields before continuing.');
      return;
    }

    const orderId = crypto.randomUUID();
    const paymentReference = `GH-${Date.now()}-${orderId.slice(0, 6).toUpperCase()}`;

    setIsSubmitting(true);

    try {
      let paymentStatus: 'paid' | 'pending' = paymentMethod === 'cash' ? 'pending' : 'paid';
      let gatewayNotice = '';

      if (paymentMethod === 'mobile') {
        setIsProcessingPayment(true);

        const gatewayResult = await processGatewayPayment({
          gateway: formData.gateway,
          amount: grandTotal,
          currency: 'GHS',
          customer: {
            name: formData.name,
            email: formData.email,
            phone: formData.mobileNumber,
          },
          reference: paymentReference,
        });

        paymentStatus = gatewayResult.status === 'success' ? 'paid' : 'pending';
        gatewayNotice = gatewayResult.status === 'sandbox' ? gatewayResult.message : '';
      }

      addOrder({
        id: orderId,
        customerName: formData.name.trim(),
        customerEmail: formData.email.trim().toLowerCase(),
        customerPhone: formData.phone.trim(),
        deliveryAddress: formData.address.trim(),
        deliveryInstructions: formData.instructions.trim(),
        confirmationChannels: formData.confirmationChannels,
        paymentGateway: paymentMethod === 'cash' ? 'cash' : formData.gateway,
        paymentStatus,
        paymentReference,
        subtotal: total,
        deliveryFee,
        total: grandTotal,
        createdAt: new Date().toISOString(),
        items: summaryItems,
      });

      clearCart();
      setCompletedOrderId(orderId);
      toast.success('Your order has been submitted successfully.');

      if (gatewayNotice) {
        toast.message(gatewayNotice);
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unable to complete your payment right now.';
      toast.error(message);
    } finally {
      setIsSubmitting(false);
      setIsProcessingPayment(false);
    }
  };

  if (completedOrderId) {
    return (
      <div className="page-shell py-12 sm:py-16">
        <section className="mx-auto max-w-3xl rounded-[2rem] border border-[var(--color-border-soft)] bg-white/95 p-8 text-center shadow-[var(--shadow-soft)] sm:p-12">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
            <CheckCircle2 className="h-11 w-11" />
          </div>
          <p className="eyebrow justify-center">Order Confirmed</p>
          <h1 className="mt-4 text-4xl font-semibold text-[var(--color-ink)]">Your order is in</h1>
          <p className="mt-4 text-lg leading-8 text-[var(--color-muted-ink)]">
            We’ve recorded your order and queued confirmation by {formData.confirmationChannels.join(' and ')}.
            {paymentMethod === 'mobile'
              ? ' Your payment request has been handled through the selected gateway.'
              : ' Payment will be collected on delivery.'}
          </p>

          <div className="mt-8 rounded-[1.75rem] bg-[var(--color-surface)] p-6 text-left">
            <dl className="grid gap-4 sm:grid-cols-2">
              <div>
                <dt className="text-sm text-[var(--color-muted-ink)]">Order reference</dt>
                <dd className="mt-1 text-base font-semibold text-[var(--color-ink)]">{completedOrderId.slice(-6).toUpperCase()}</dd>
              </div>
              <div>
                <dt className="text-sm text-[var(--color-muted-ink)]">Total</dt>
                <dd className="mt-1 text-base font-semibold text-[var(--color-primary)]">GH₵ {grandTotal.toFixed(2)}</dd>
              </div>
              <div>
                <dt className="text-sm text-[var(--color-muted-ink)]">Delivery address</dt>
                <dd className="mt-1 text-base font-semibold text-[var(--color-ink)]">{formData.address}</dd>
              </div>
              <div>
                <dt className="text-sm text-[var(--color-muted-ink)]">Contact</dt>
                <dd className="mt-1 text-base font-semibold text-[var(--color-ink)]">{formData.phone}</dd>
              </div>
            </dl>
          </div>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Link to="/orders" className="primary-button">
              View Order History
            </Link>
            <Link to="/menu" className="secondary-button">
              Order Again
            </Link>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="page-shell py-8 sm:py-10">
      <section className="mx-auto max-w-7xl">
        <div className="hero-panel px-6 py-10 sm:px-10 sm:py-12">
          <Link
            to="/order"
            className="inline-flex items-center gap-2 text-sm font-medium text-white/78 transition-colors hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to cart
          </Link>

          <div className="mt-6 max-w-3xl">
            <p className="eyebrow text-[var(--color-accent)]">Checkout</p>
            <h1 className="mt-4 text-4xl font-semibold text-white sm:text-5xl">Payment and delivery</h1>
            <p className="mt-4 text-base leading-8 text-white/78 sm:text-lg">
              Complete your order with Mobile Money or choose cash on delivery. Order confirmations can be sent by email, WhatsApp, or both.
            </p>
          </div>
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1.55fr_0.95fr]">
          <form id="checkout-form" onSubmit={handleSubmit} className="space-y-6" noValidate>
            <section className="surface-card">
              <div className="mb-6 flex items-start gap-3">
                <div className="rounded-2xl bg-[var(--color-primary)]/10 p-3 text-[var(--color-primary)]">
                  <ShieldCheck className="h-6 w-6" />
                </div>
                <div>
                  <h2 className="text-2xl font-semibold text-[var(--color-ink)]">Customer details</h2>
                  <p className="mt-1 text-sm text-[var(--color-muted-ink)]">We use these details for delivery coordination, receipts, and saved order history.</p>
                </div>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label htmlFor="name" className="form-label">Full name</label>
                  <input
                    id="name"
                    value={formData.name}
                    onChange={(event) => handleInputChange('name', event.target.value)}
                    className="form-input"
                    aria-invalid={Boolean(errors.name)}
                    aria-describedby={errors.name ? 'name-error' : undefined}
                    placeholder="Ama Serwaa"
                  />
                  {errors.name && <p id="name-error" className="form-error">{errors.name}</p>}
                </div>

                <div>
                  <label htmlFor="email" className="form-label">Email address</label>
                  <input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(event) => handleInputChange('email', event.target.value)}
                    className="form-input"
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={errors.email ? 'email-error' : undefined}
                    placeholder="you@example.com"
                  />
                  {errors.email && <p id="email-error" className="form-error">{errors.email}</p>}
                </div>

                <div>
                  <label htmlFor="phone" className="form-label">Phone number</label>
                  <input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(event) => handleInputChange('phone', event.target.value)}
                    className="form-input"
                    aria-invalid={Boolean(errors.phone)}
                    aria-describedby={errors.phone ? 'phone-error' : undefined}
                    placeholder="0553312217"
                  />
                  {errors.phone && <p id="phone-error" className="form-error">{errors.phone}</p>}
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="address" className="form-label">Delivery address</label>
                  <input
                    id="address"
                    value={formData.address}
                    onChange={(event) => handleInputChange('address', event.target.value)}
                    className="form-input"
                    aria-invalid={Boolean(errors.address)}
                    aria-describedby={errors.address ? 'address-error' : undefined}
                    placeholder="Street, area, closest landmark"
                  />
                  {errors.address && <p id="address-error" className="form-error">{errors.address}</p>}
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="instructions" className="form-label">Delivery instructions</label>
                  <textarea
                    id="instructions"
                    rows={4}
                    value={formData.instructions}
                    onChange={(event) => handleInputChange('instructions', event.target.value)}
                    className="form-input min-h-28"
                    placeholder="Gate code, landmark, or any special delivery notes"
                  />
                </div>
              </div>
            </section>

            <section className="surface-card">
              <h2 className="text-2xl font-semibold text-[var(--color-ink)]">Payment method</h2>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('mobile')}
                  className={`selection-card ${paymentMethod === 'mobile' ? 'selection-card-active' : ''}`}
                >
                  <Smartphone className="h-7 w-7" />
                  <div>
                    <div className="text-lg font-semibold">Mobile Money</div>
                    <div className="mt-1 text-sm text-[var(--color-muted-ink)]">Collect payment directly on-site using Paystack, Flutterwave, or Hubtel.</div>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('cash')}
                  className={`selection-card ${paymentMethod === 'cash' ? 'selection-card-active' : ''}`}
                >
                  <CreditCard className="h-7 w-7" />
                  <div>
                    <div className="text-lg font-semibold">Cash on Delivery</div>
                    <div className="mt-1 text-sm text-[var(--color-muted-ink)]">Take the order now and settle payment when it arrives.</div>
                  </div>
                </button>
              </div>

              {paymentMethod === 'mobile' && (
                <div className="mt-6 grid gap-5 border-t border-[var(--color-border-soft)] pt-6 sm:grid-cols-2">
                  <div>
                    <label htmlFor="gateway" className="form-label">Gateway</label>
                    <select
                      id="gateway"
                      value={formData.gateway}
                      onChange={(event) => handleInputChange('gateway', event.target.value)}
                      className="form-input"
                    >
                      <option value="paystack">Paystack</option>
                      <option value="flutterwave">Flutterwave</option>
                      <option value="hubtel">Hubtel</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="mobileProvider" className="form-label">Provider</label>
                    <select
                      id="mobileProvider"
                      value={formData.mobileProvider}
                      onChange={(event) => handleInputChange('mobileProvider', event.target.value)}
                      className="form-input"
                    >
                      <option value="mtn">MTN Mobile Money</option>
                      <option value="telecel">Telecel Cash</option>
                      <option value="airteltigo">AirtelTigo Money</option>
                    </select>
                  </div>

                  <div className="sm:col-span-2">
                    <label htmlFor="mobileNumber" className="form-label">Mobile Money number</label>
                    <input
                      id="mobileNumber"
                      type="tel"
                      value={formData.mobileNumber}
                      onChange={(event) => handleInputChange('mobileNumber', event.target.value)}
                      className="form-input"
                      aria-invalid={Boolean(errors.mobileNumber)}
                      aria-describedby={errors.mobileNumber ? 'mobileNumber-error' : undefined}
                      placeholder="0553312217"
                    />
                    {errors.mobileNumber && <p id="mobileNumber-error" className="form-error">{errors.mobileNumber}</p>}
                  </div>
                </div>
              )}
            </section>

            <section className="surface-card">
              <h2 className="text-2xl font-semibold text-[var(--color-ink)]">Confirmation preferences</h2>
              <p className="mt-2 text-sm text-[var(--color-muted-ink)]">Choose how the customer should receive post-payment confirmation.</p>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <button
                  type="button"
                  onClick={() => toggleConfirmationChannel('email')}
                  aria-pressed={formData.confirmationChannels.includes('email')}
                  className={`selection-card ${formData.confirmationChannels.includes('email') ? 'selection-card-active' : ''}`}
                >
                  <Mail className="h-6 w-6" />
                  <div>
                    <div className="text-lg font-semibold">Email confirmation</div>
                    <div className="mt-1 text-sm text-[var(--color-muted-ink)]">Send a receipt, order summary, and follow-up details.</div>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => toggleConfirmationChannel('whatsapp')}
                  aria-pressed={formData.confirmationChannels.includes('whatsapp')}
                  className={`selection-card ${formData.confirmationChannels.includes('whatsapp') ? 'selection-card-active' : ''}`}
                >
                  <MessageCircle className="h-6 w-6" />
                  <div>
                    <div className="text-lg font-semibold">WhatsApp confirmation</div>
                    <div className="mt-1 text-sm text-[var(--color-muted-ink)]">Share payment success and delivery updates directly in chat.</div>
                  </div>
                </button>
              </div>

              {errors.confirmationChannels && <p className="form-error mt-4">{errors.confirmationChannels}</p>}
            </section>
          </form>

          <aside className="space-y-6 lg:sticky lg:top-28 lg:self-start">
            <section className="surface-card">
              <h2 className="text-2xl font-semibold text-[var(--color-ink)]">Order summary</h2>
              <p className="mt-2 text-sm text-[var(--color-muted-ink)]">
                Quantity-based extras stay in the order exactly as selected. For example, <span className="font-medium">Rice (per scoop) x 3</span> means 3 scoops.
              </p>
              <div className="mt-6 space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="flex items-start justify-between gap-4 border-b border-[var(--color-border-soft)] pb-4 last:border-b-0">
                    <div>
                      <h3 className="font-semibold text-[var(--color-ink)]">{item.name}</h3>
                      <p className="mt-1 text-sm text-[var(--color-muted-ink)]">Qty {item.quantity}</p>
                      {getDescriptionItems(item.description).length > 0 && (
                        <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-[var(--color-muted-ink)] marker:text-[var(--color-primary)]">
                          {getDescriptionItems(item.description).map((detail) => (
                            <li key={`${item.id}-${detail}`}>{detail}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                    <p className="font-semibold text-[var(--color-ink)]">GH₵ {(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                ))}
              </div>

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

              <button type="submit" form="checkout-form" disabled={isSubmitting} className="primary-button mt-6 w-full">
                {isProcessingPayment ? (
                  <>
                    <LoaderCircle className="h-5 w-5 animate-spin" />
                    Processing payment...
                  </>
                ) : isSubmitting ? (
                  <>
                    <LoaderCircle className="h-5 w-5 animate-spin" />
                    Placing order...
                  </>
                ) : (
                  <>
                    {paymentMethod === 'mobile' ? 'Pay and place order' : 'Place order'}
                  </>
                )}
              </button>

              <p className="mt-4 text-sm leading-6 text-[var(--color-muted-ink)]">
                Live gateway charging works when you provide the relevant public key environment variables. Hubtel still needs a secure backend session endpoint before production use.
              </p>
            </section>
          </aside>
        </div>
      </section>
    </div>
  );
}
