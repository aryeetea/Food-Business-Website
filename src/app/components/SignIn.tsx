import { useState } from 'react';
import { Link, Navigate, useLocation, useNavigate } from 'react-router';
import { ArrowRight, LockKeyhole, UserCircle2 } from 'lucide-react';
import { useAuth } from './AuthContext';
import { toast } from 'sonner';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_PATTERN = /^(?:\+233|0)\d{9}$/;

export function SignIn() {
  const { isAuthenticated, signIn, user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: user?.fullName ?? '',
    email: user?.email ?? '',
    phone: user?.phone ?? '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const redirectTo = (location.state as { from?: string } | null)?.from ?? '/orders';

  if (isAuthenticated) {
    return <Navigate to={redirectTo} replace />;
  }

  const validate = () => {
    const nextErrors: Record<string, string> = {};

    if (!formData.fullName.trim()) {
      nextErrors.fullName = 'Please enter your full name.';
    }

    if (!EMAIL_PATTERN.test(formData.email.trim())) {
      nextErrors.email = 'Enter a valid email address to access your saved orders.';
    }

    if (!PHONE_PATTERN.test(formData.phone.trim())) {
      nextErrors.phone = 'Use a Ghana phone number like 0553312217 or +233553312217.';
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!validate()) {
      toast.error('Please correct the highlighted fields.');
      return;
    }

    signIn(formData);
    toast.success('You are signed in and your order history is ready.');
    navigate(redirectTo, { replace: true });
  };

  return (
    <div className="page-shell py-12 sm:py-16">
      <section className="mx-auto max-w-2xl rounded-[2rem] border border-[var(--color-border-soft)] bg-white/95 p-6 shadow-[var(--shadow-soft)] sm:p-10">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-[var(--color-primary)]/10 text-[var(--color-primary)]">
            <LockKeyhole className="h-8 w-8" />
          </div>
          <p className="eyebrow justify-center">Account Access</p>
          <h1 className="mt-4 text-4xl font-semibold text-[var(--color-ink)]">View your order history</h1>
          <p className="mt-3 text-base leading-7 text-[var(--color-muted-ink)] sm:text-lg">
            Sign in with the email and phone number you use for checkout so we can attach your saved orders to your account.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5" noValidate>
          <div>
            <label htmlFor="fullName" className="form-label">Full name</label>
            <input
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={(event) => setFormData((current) => ({ ...current, fullName: event.target.value }))}
              aria-invalid={Boolean(errors.fullName)}
              aria-describedby={errors.fullName ? 'fullName-error' : undefined}
              className="form-input"
              placeholder="Ama Serwaa"
            />
            {errors.fullName && <p id="fullName-error" className="form-error">{errors.fullName}</p>}
          </div>

          <div>
            <label htmlFor="email" className="form-label">Email address</label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={(event) => setFormData((current) => ({ ...current, email: event.target.value }))}
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? 'email-error' : undefined}
              className="form-input"
              placeholder="you@example.com"
            />
            {errors.email && <p id="email-error" className="form-error">{errors.email}</p>}
          </div>

          <div>
            <label htmlFor="phone" className="form-label">Phone number</label>
            <input
              id="phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={(event) => setFormData((current) => ({ ...current, phone: event.target.value }))}
              aria-invalid={Boolean(errors.phone)}
              aria-describedby={errors.phone ? 'phone-error' : undefined}
              className="form-input"
              placeholder="0553312217"
            />
            {errors.phone && <p id="phone-error" className="form-error">{errors.phone}</p>}
          </div>

          <button type="submit" className="primary-button w-full">
            <UserCircle2 className="h-5 w-5" />
            Sign In
          </button>
        </form>

        <div className="mt-8 rounded-3xl border border-[var(--color-border-soft)] bg-[var(--color-surface)] p-5 text-sm text-[var(--color-muted-ink)]">
          Checkout still works for guests. Signing in simply unlocks your saved order history and faster repeat orders.
        </div>

        <div className="mt-6 text-center">
          <Link to="/menu" className="inline-flex items-center gap-2 text-sm font-medium text-[var(--color-primary)] hover:text-[var(--color-primary-strong)]">
            Continue browsing the menu
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
