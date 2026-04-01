import { useState } from 'react';
import { useNavigate, Link } from 'react-router';
import { CreditCard, Smartphone, CheckCircle, ArrowLeft } from 'lucide-react';
import { useCart } from './CartContext';
import { toast } from 'sonner';
import { Toaster } from './ui/sonner';

export function Payment() {
  const { items, total, clearCart } = useCart();
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState<'mobile' | 'cash'>('mobile');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    mobileNumber: '',
    mobileProvider: 'mtn',
    instructions: '',
  });
  const [orderPlaced, setOrderPlaced] = useState(false);

  const deliveryFee = 10;
  const grandTotal = total + deliveryFee;

  if (items.length === 0 && !orderPlaced) {
    navigate('/menu');
    return null;
  }

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form
    if (!formData.name || !formData.phone || !formData.address) {
      toast.error('Please fill in all required fields');
      return;
    }

    if (paymentMethod === 'mobile' && !formData.mobileNumber) {
      toast.error('Please enter your mobile money number');
      return;
    }

    // Simulate order placement
    setOrderPlaced(true);
    clearCart();
    toast.success('Order placed successfully!');
  };

  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
        <Toaster position="top-center" />
        <div className="max-w-2xl w-full bg-white rounded-2xl shadow-xl p-8 md:p-12 text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="h-12 w-12 text-green-600" />
          </div>
          <h1 className="text-3xl md:text-4xl mb-4 text-[#7d3d2b]">
            Order Placed Successfully!
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            Thank you for your order! We've received it and will contact you shortly 
            to confirm your delivery details.
          </p>
          <div className="bg-[#7d3d2b]/10 rounded-lg p-6 mb-8">
            <h2 className="text-xl mb-4 text-[#7d3d2b]">What's Next?</h2>
            <ul className="text-left space-y-2 text-gray-700">
              <li>• You'll receive a confirmation call/WhatsApp message shortly</li>
              <li>• We'll prepare your delicious meal fresh</li>
              <li>• Your order will be delivered to: {formData.address}</li>
              <li>• Estimated delivery: 30-45 minutes</li>
            </ul>
          </div>
          <div className="space-y-4">
            <p className="text-gray-600">
              Order Total: <span className="text-2xl text-[#7d3d2b]">GH₵ {grandTotal.toFixed(2)}</span>
            </p>
            <p className="text-sm text-gray-500">
              Payment Method: {paymentMethod === 'mobile' ? 'Mobile Money' : 'Cash on Delivery'}
            </p>
          </div>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/"
              className="inline-block bg-[#7d3d2b] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#6a3424] transition-colors"
            >
              Back to Home
            </Link>
            <Link
              to="/menu"
              className="inline-block border-2 border-[#7d3d2b] text-[#7d3d2b] px-8 py-3 rounded-lg font-semibold hover:bg-[#7d3d2b] hover:text-white transition-colors"
            >
              Order Again
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Toaster position="top-center" />
      
      {/* Header */}
      <div className="bg-[#7d3d2b] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            to="/order"
            className="inline-flex items-center text-white/80 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Cart
          </Link>
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl mb-4">
              <span className="text-[#ffd700]">Payment</span> & Delivery
            </h1>
            <p className="text-xl text-white/80">Complete your order details</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Payment Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Delivery Information */}
              <div className="bg-white rounded-xl shadow-md p-6">
                <h2 className="text-2xl mb-6 text-[#7d3d2b]">Delivery Information</h2>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm mb-2 text-gray-700">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7d3d2b] focus:border-transparent outline-none"
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm mb-2 text-gray-700">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7d3d2b] focus:border-transparent outline-none"
                      placeholder="0XX XXX XXXX"
                    />
                  </div>
                  <div>
                    <label htmlFor="address" className="block text-sm mb-2 text-gray-700">
                      Delivery Address *
                    </label>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7d3d2b] focus:border-transparent outline-none"
                      placeholder="Street, Area, Landmark"
                    />
                  </div>
                  <div>
                    <label htmlFor="instructions" className="block text-sm mb-2 text-gray-700">
                      Delivery Instructions (Optional)
                    </label>
                    <textarea
                      id="instructions"
                      name="instructions"
                      value={formData.instructions}
                      onChange={handleInputChange}
                      rows={3}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7d3d2b] focus:border-transparent outline-none resize-none"
                      placeholder="Any special instructions for delivery..."
                    />
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div className="bg-white rounded-xl shadow-md p-6">
                <h2 className="text-2xl mb-6 text-[#7d3d2b]">Payment Method</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('mobile')}
                    className={`p-6 rounded-lg border-2 transition-all ${
                      paymentMethod === 'mobile'
                        ? 'border-[#7d3d2b] bg-[#7d3d2b]/5'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    <Smartphone className="h-8 w-8 mx-auto mb-3 text-[#7d3d2b]" />
                    <div className="text-lg text-[#7d3d2b]">Mobile Money</div>
                    <div className="text-sm text-gray-600">MTN, Vodafone, AirtelTigo</div>
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('cash')}
                    className={`p-6 rounded-lg border-2 transition-all ${
                      paymentMethod === 'cash'
                        ? 'border-[#7d3d2b] bg-[#7d3d2b]/5'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    <CreditCard className="h-8 w-8 mx-auto mb-3 text-[#7d3d2b]" />
                    <div className="text-lg text-[#7d3d2b]">Cash on Delivery</div>
                    <div className="text-sm text-gray-600">Pay when you receive</div>
                  </button>
                </div>

                {paymentMethod === 'mobile' && (
                  <div className="space-y-4 pt-4 border-t">
                    <div>
                      <label htmlFor="mobileProvider" className="block text-sm mb-2 text-gray-700">
                        Mobile Money Provider *
                      </label>
                      <select
                        id="mobileProvider"
                        name="mobileProvider"
                        value={formData.mobileProvider}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7d3d2b] focus:border-transparent outline-none"
                      >
                        <option value="mtn">MTN Mobile Money</option>
                        <option value="vodafone">Vodafone Cash</option>
                        <option value="airteltigo">AirtelTigo Money</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="mobileNumber" className="block text-sm mb-2 text-gray-700">
                        Mobile Money Number *
                      </label>
                      <input
                        type="tel"
                        id="mobileNumber"
                        name="mobileNumber"
                        value={formData.mobileNumber}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7d3d2b] focus:border-transparent outline-none"
                        placeholder="0XX XXX XXXX"
                      />
                    </div>
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <p className="text-sm text-blue-800">
                        You'll receive a prompt on your phone to approve the payment after placing your order.
                      </p>
                    </div>
                  </div>
                )}

                {paymentMethod === 'cash' && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <p className="text-sm text-green-800">
                      Please have exact change ready for the delivery person. GH₵ {grandTotal.toFixed(2)}
                    </p>
                  </div>
                )}
              </div>

              <button
                type="submit"
                className="w-full bg-[#7d3d2b] text-white py-4 rounded-lg font-semibold hover:bg-[#6a3424] transition-colors text-lg"
              >
                Place Order - GH₵ {grandTotal.toFixed(2)}
              </button>
            </form>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-md p-6 sticky top-24">
              <h2 className="text-2xl mb-6 text-[#7d3d2b]">Order Summary</h2>
              <div className="space-y-3 mb-6 max-h-64 overflow-y-auto">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="text-gray-700">
                      {item.quantity}x {item.name}
                    </span>
                    <span className="text-gray-900">
                      GH₵ {(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
              <div className="space-y-2 pt-4 border-t">
                <div className="flex justify-between text-gray-700">
                  <span>Subtotal</span>
                  <span>GH₵ {total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>Delivery Fee</span>
                  <span>GH₵ {deliveryFee.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-xl text-[#7d3d2b] pt-2 border-t">
                  <span>Total</span>
                  <span>GH₵ {grandTotal.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
