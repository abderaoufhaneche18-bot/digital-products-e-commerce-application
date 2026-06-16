import React, { useState } from 'react';
import { useStore } from '../store/useStore';
import { CreditCardIcon, LockIcon, ChevronLeftIcon } from '../components/Icons';

interface CheckoutPageProps {
  onNavigate: (page: string, data?: unknown) => void;
}

const CheckoutPage: React.FC<CheckoutPageProps> = ({ onNavigate }) => {
  const { cart, getCartTotal, addOrder, clearCart } = useStore();
  const total = getCartTotal();

  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');
  const [processing, setProcessing] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  if (cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-20 text-center animate-fade-in">
        <h2 className="text-2xl font-bold text-surface-900 dark:text-white mb-2">Nothing to checkout</h2>
        <button onClick={() => onNavigate('products')} className="text-primary-600 font-medium">
          Browse Products
        </button>
      </div>
    );
  }

  const formatCardNumber = (value: string) => {
    const cleaned = value.replace(/\D/g, '').slice(0, 16);
    const groups = cleaned.match(/.{1,4}/g);
    return groups ? groups.join(' ') : cleaned;
  };

  const formatExpiry = (value: string) => {
    const cleaned = value.replace(/\D/g, '').slice(0, 4);
    if (cleaned.length > 2) {
      return cleaned.slice(0, 2) + '/' + cleaned.slice(2);
    }
    return cleaned;
  };

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!customerName.trim()) newErrors.name = 'Name is required';
    if (!customerEmail.trim()) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customerEmail)) newErrors.email = 'Invalid email';

    const rawCard = cardNumber.replace(/\s/g, '');
    if (rawCard.length < 16) newErrors.card = 'Enter a valid card number';

    if (expiry.length < 5) newErrors.expiry = 'Invalid expiry';
    if (cvc.length < 3) newErrors.cvc = 'Invalid CVC';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setProcessing(true);

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const order = {
      id: `ord-${Date.now()}`,
      items: [...cart],
      total,
      customerName,
      customerEmail,
      createdAt: new Date().toISOString(),
      status: 'completed' as const,
    };

    addOrder(order);
    clearCart();
    setProcessing(false);
    onNavigate('order-success', order.id);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 animate-fade-in">
      <button
        onClick={() => onNavigate('cart')}
        className="flex items-center gap-1 text-sm text-surface-500 dark:text-surface-400 hover:text-primary-600 mb-6 transition-colors"
      >
        <ChevronLeftIcon size={16} />
        Back to Cart
      </button>

      <h1 className="text-3xl font-bold text-surface-900 dark:text-white mb-8">Checkout</h1>

      <form onSubmit={handleSubmit}>
        <div className="grid lg:grid-cols-5 gap-8">
          {/* Form */}
          <div className="lg:col-span-3 space-y-6">
            {/* Customer Info */}
            <div className="p-6 bg-white dark:bg-surface-800/50 rounded-2xl border border-surface-200 dark:border-surface-700/50">
              <h2 className="text-lg font-semibold text-surface-900 dark:text-white mb-4">
                Customer Information
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1.5">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="John Doe"
                    className={`w-full px-4 py-3 bg-surface-50 dark:bg-surface-800 border rounded-xl text-sm text-surface-900 dark:text-surface-100 outline-none transition-colors ${
                      errors.name ? 'border-red-400' : 'border-surface-200 dark:border-surface-700 focus:border-primary-400'
                    }`}
                  />
                  {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1.5">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    placeholder="john@example.com"
                    className={`w-full px-4 py-3 bg-surface-50 dark:bg-surface-800 border rounded-xl text-sm text-surface-900 dark:text-surface-100 outline-none transition-colors ${
                      errors.email ? 'border-red-400' : 'border-surface-200 dark:border-surface-700 focus:border-primary-400'
                    }`}
                  />
                  {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
                </div>
              </div>
            </div>

            {/* Payment */}
            <div className="p-6 bg-white dark:bg-surface-800/50 rounded-2xl border border-surface-200 dark:border-surface-700/50">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-surface-900 dark:text-white">
                  Payment Details
                </h2>
                <div className="flex items-center gap-1.5 text-xs text-surface-400">
                  <LockIcon size={12} />
                  Secure
                </div>
              </div>

              <div className="space-y-4">
                {/* Card Number */}
                <div>
                  <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1.5">
                    Card Number
                  </label>
                  <div className="relative">
                    <CreditCardIcon size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-surface-400" />
                    <input
                      type="text"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                      placeholder="4242 4242 4242 4242"
                      maxLength={19}
                      className={`w-full pl-11 pr-4 py-3 bg-surface-50 dark:bg-surface-800 border rounded-xl text-sm text-surface-900 dark:text-surface-100 outline-none transition-colors font-mono tracking-wider ${
                        errors.card ? 'border-red-400' : 'border-surface-200 dark:border-surface-700 focus:border-primary-400'
                      }`}
                    />
                  </div>
                  {errors.card && <p className="text-xs text-red-500 mt-1">{errors.card}</p>}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1.5">
                      Expiry Date
                    </label>
                    <input
                      type="text"
                      value={expiry}
                      onChange={(e) => setExpiry(formatExpiry(e.target.value))}
                      placeholder="MM/YY"
                      maxLength={5}
                      className={`w-full px-4 py-3 bg-surface-50 dark:bg-surface-800 border rounded-xl text-sm text-surface-900 dark:text-surface-100 outline-none transition-colors font-mono ${
                        errors.expiry ? 'border-red-400' : 'border-surface-200 dark:border-surface-700 focus:border-primary-400'
                      }`}
                    />
                    {errors.expiry && <p className="text-xs text-red-500 mt-1">{errors.expiry}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1.5">
                      CVC
                    </label>
                    <input
                      type="text"
                      value={cvc}
                      onChange={(e) => setCvc(e.target.value.replace(/\D/g, '').slice(0, 4))}
                      placeholder="123"
                      maxLength={4}
                      className={`w-full px-4 py-3 bg-surface-50 dark:bg-surface-800 border rounded-xl text-sm text-surface-900 dark:text-surface-100 outline-none transition-colors font-mono ${
                        errors.cvc ? 'border-red-400' : 'border-surface-200 dark:border-surface-700 focus:border-primary-400'
                      }`}
                    />
                    {errors.cvc && <p className="text-xs text-red-500 mt-1">{errors.cvc}</p>}
                  </div>
                </div>
              </div>

              <div className="mt-4 p-3 bg-amber-50 dark:bg-amber-900/20 rounded-lg border border-amber-200 dark:border-amber-800/50">
                <p className="text-xs text-amber-700 dark:text-amber-300">
                  💡 This is a demo. Use any card number starting with 4242 to test.
                </p>
              </div>
            </div>
          </div>

          {/* Summary */}
          <div className="lg:col-span-2">
            <div className="sticky top-24 p-6 bg-white dark:bg-surface-800/50 rounded-2xl border border-surface-200 dark:border-surface-700/50">
              <h3 className="text-lg font-semibold text-surface-900 dark:text-white mb-4">
                Order Summary
              </h3>

              <div className="space-y-3 mb-4">
                {cart.map((item) => (
                  <div key={item.product.id} className="flex items-center gap-3">
                    <img
                      src={item.product.coverImage}
                      alt={item.product.name}
                      className="w-12 h-12 object-cover rounded-lg"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-surface-900 dark:text-white truncate">
                        {item.product.name}
                      </p>
                      <p className="text-xs text-surface-400">Qty: {item.quantity}</p>
                    </div>
                    <span className="text-sm font-medium text-surface-900 dark:text-white">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="border-t border-surface-200 dark:border-surface-700 pt-4 space-y-2 mb-6">
                <div className="flex justify-between text-sm text-surface-500">
                  <span>Subtotal</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm text-surface-500">
                  <span>Processing Fee</span>
                  <span>$0.00</span>
                </div>
                <div className="flex justify-between font-semibold text-surface-900 dark:text-white pt-2 border-t border-surface-200 dark:border-surface-700">
                  <span>Total</span>
                  <span className="text-lg">${total.toFixed(2)}</span>
                </div>
              </div>

              <button
                type="submit"
                disabled={processing}
                className={`w-full py-3.5 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 ${
                  processing
                    ? 'bg-surface-300 dark:bg-surface-600 text-surface-500 cursor-not-allowed'
                    : 'bg-primary-600 hover:bg-primary-700 text-white shadow-lg shadow-primary-500/25'
                }`}
              >
                {processing ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <LockIcon size={16} />
                    Pay ${total.toFixed(2)}
                  </>
                )}
              </button>

              <div className="flex items-center justify-center gap-4 mt-4 text-surface-400">
                <span className="text-xs">🔒 SSL Encrypted</span>
                <span className="text-xs">💳 PCI Compliant</span>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CheckoutPage;
