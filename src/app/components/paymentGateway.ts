import type { PaymentGateway } from './OrderHistoryContext';

interface CheckoutCustomer {
  name: string;
  email: string;
  phone: string;
}

interface CheckoutOptions {
  amount: number;
  currency: string;
  customer: CheckoutCustomer;
  reference: string;
  gateway: Exclude<PaymentGateway, 'cash'>;
}

declare global {
  interface Window {
    PaystackPop?: {
      setup: (config: Record<string, unknown>) => { openIframe: () => void };
    };
    FlutterwaveCheckout?: (config: Record<string, unknown>) => void;
  }
}

const scriptCache = new Map<string, Promise<void>>();

function loadScript(src: string) {
  if (scriptCache.has(src)) {
    return scriptCache.get(src)!;
  }

  const promise = new Promise<void>((resolve, reject) => {
    const existing = document.querySelector(`script[src="${src}"]`);

    if (existing) {
      resolve();
      return;
    }

    const script = document.createElement('script');
    script.src = src;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error(`Failed to load payment script: ${src}`));
    document.body.appendChild(script);
  });

  scriptCache.set(src, promise);
  return promise;
}

function getGatewayConfig(gateway: Exclude<PaymentGateway, 'cash'>) {
  if (gateway === 'paystack') {
    return {
      publicKey: import.meta.env.VITE_PAYSTACK_PUBLIC_KEY,
      scriptUrl: 'https://js.paystack.co/v1/inline.js',
    };
  }

  if (gateway === 'flutterwave') {
    return {
      publicKey: import.meta.env.VITE_FLUTTERWAVE_PUBLIC_KEY,
      scriptUrl: 'https://checkout.flutterwave.com/v3.js',
    };
  }

  return {
    publicKey: import.meta.env.VITE_HUBTEL_PUBLIC_KEY,
    scriptUrl: '',
  };
}

export async function processGatewayPayment(options: CheckoutOptions) {
  const config = getGatewayConfig(options.gateway);

  if (!config.publicKey) {
    await new Promise((resolve) => window.setTimeout(resolve, 1400));

    return {
      status: 'sandbox' as const,
      reference: options.reference,
      message: `${options.gateway} public key is missing, so sandbox mode was used instead.`,
    };
  }

  if (options.gateway === 'hubtel') {
    await new Promise((resolve) => window.setTimeout(resolve, 1400));

    return {
      status: 'sandbox' as const,
      reference: options.reference,
      message:
        'Hubtel is scaffolded but still needs your secure backend/session endpoint before it can charge live customers.',
    };
  }

  await loadScript(config.scriptUrl);

  if (options.gateway === 'paystack' && window.PaystackPop) {
    return new Promise<{ status: 'success'; reference: string }>((resolve, reject) => {
      const handler = window.PaystackPop?.setup({
        key: config.publicKey,
        email: options.customer.email,
        amount: Math.round(options.amount * 100),
        currency: options.currency,
        ref: options.reference,
        firstname: options.customer.name.split(' ')[0],
        phone: options.customer.phone,
        channels: ['mobile_money', 'card'],
        callback: (response: { reference: string }) => {
          resolve({ status: 'success', reference: response.reference || options.reference });
        },
        onClose: () => reject(new Error('Payment was cancelled before completion.')),
      });

      handler?.openIframe();
    });
  }

  if (options.gateway === 'flutterwave' && window.FlutterwaveCheckout) {
    return new Promise<{ status: 'success'; reference: string }>((resolve, reject) => {
      window.FlutterwaveCheckout?.({
        public_key: config.publicKey,
        tx_ref: options.reference,
        amount: options.amount,
        currency: options.currency,
        payment_options: 'mobilemoneyghana,card',
        customer: {
          email: options.customer.email,
          phonenumber: options.customer.phone,
          name: options.customer.name,
        },
        callback: (response: { status?: string; tx_ref?: string }) => {
          if (response.status === 'successful') {
            resolve({ status: 'success', reference: response.tx_ref || options.reference });
            return;
          }

          reject(new Error('Payment was not completed successfully.'));
        },
        onclose: () => reject(new Error('Payment was cancelled before completion.')),
        customizations: {
          title: 'Gobɛ Hemaa',
          description: 'Order payment',
        },
      });
    });
  }

  throw new Error(`Unable to initialize ${options.gateway} checkout.`);
}
