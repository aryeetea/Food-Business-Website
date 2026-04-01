import { Link, useNavigate } from 'react-router';
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from './CartContext';

export function Order() {
  const { items, updateQuantity, removeItem, total } = useCart();
  const navigate = useNavigate();

  const deliveryFee = 10;
  const grandTotal = total + (items.length > 0 ? deliveryFee : 0);

  const handleCheckout = () => {
    if (items.length > 0) {
      navigate('/payment');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <div className="bg-[#7d3d2b] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl mb-4">
            Your <span className="text-[#ffd700]">Order</span>
          </h1>
          <p className="text-xl text-white/80">Review and complete your order</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {items.length === 0 ? (
          /* Empty Cart */
          <div className="text-center py-20">
            <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingBag className="h-12 w-12 text-gray-400" />
            </div>
            <h2 className="text-3xl mb-4 text-gray-700">Your cart is empty</h2>
            <p className="text-lg text-gray-600 mb-8">
              Add some delicious items from our menu!
            </p>
            <Link
              to="/menu"
              className="inline-flex items-center bg-[#7d3d2b] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#6a3424] transition-colors"
            >
              Browse Menu
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-md p-6">
                <h2 className="text-2xl mb-6 text-[#7d3d2b]">Cart Items</h2>
                <div className="space-y-4">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg"
                    >
                      <div className="flex-1">
                        <h3 className="text-lg text-[#7d3d2b] mb-1">{item.name}</h3>
                        <p className="text-gray-600">GH₵ {item.price}</p>
                      </div>
                      <div className="flex items-center space-x-3">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors"
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="text-lg min-w-[2rem] text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>
                      <div className="text-lg text-[#7d3d2b] min-w-[5rem] text-right">
                        GH₵ {item.price * item.quantity}
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-md p-6 sticky top-24">
                <h2 className="text-2xl mb-6 text-[#7d3d2b]">Order Summary</h2>
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-gray-700">
                    <span>Subtotal</span>
                    <span>GH₵ {total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-700">
                    <span>Delivery Fee</span>
                    <span>GH₵ {deliveryFee.toFixed(2)}</span>
                  </div>
                  <div className="border-t pt-3">
                    <div className="flex justify-between text-xl text-[#7d3d2b]">
                      <span>Total</span>
                      <span>GH₵ {grandTotal.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={handleCheckout}
                  className="w-full bg-[#7d3d2b] text-white py-4 rounded-lg font-semibold hover:bg-[#6a3424] transition-colors mb-4 flex items-center justify-center space-x-2"
                >
                  <span>Proceed to Payment</span>
                  <ArrowRight className="h-5 w-5" />
                </button>
                <Link
                  to="/menu"
                  className="block w-full text-center border-2 border-[#7d3d2b] text-[#7d3d2b] py-4 rounded-lg font-semibold hover:bg-[#7d3d2b] hover:text-white transition-colors"
                >
                  Add More Items
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Alternative Order Methods */}
      {items.length > 0 && (
        <section className="py-12 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl md:text-3xl mb-4 text-[#7d3d2b]">
              Prefer to Order Directly?
            </h2>
            <p className="text-lg text-gray-600 mb-6">
              You can also place your order via WhatsApp or phone
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://wa.me/233553312217"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-[#25D366] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#20BD5A] transition-colors"
              >
                Order on WhatsApp
              </a>
              <a
                href="tel:0505647668"
                className="inline-block bg-[#7d3d2b] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#6a3424] transition-colors"
              >
                Call to Order
              </a>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
