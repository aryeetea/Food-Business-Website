import { Phone, MessageCircle, Instagram, Mail, MapPin, Clock } from 'lucide-react';

export function Contact() {
  const contactMethods = [
    {
      icon: Phone,
      title: 'Office Line',
      value: '0505647668',
      link: 'tel:0505647668',
      color: 'bg-blue-500',
    },
    {
      icon: MessageCircle,
      title: 'WhatsApp',
      value: '0553312217',
      link: 'https://wa.me/233553312217',
      color: 'bg-[#25D366]',
    },
    {
      icon: Instagram,
      title: 'Instagram',
      value: '@gob3.hemaa',
      link: 'https://instagram.com/gob3.hemaa',
      color: 'bg-gradient-to-br from-purple-500 to-pink-500',
    },
  ];

  const businessHours = [
    { day: 'Monday - Friday', hours: '7:00 AM - 9:00 PM' },
    { day: 'Saturday', hours: '8:00 AM - 9:00 PM' },
    { day: 'Sunday', hours: '9:00 AM - 7:00 PM' },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-[#7d3d2b] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl mb-4">
            <span className="text-[#ffd700]">Contact</span> Us
          </h1>
          <p className="text-xl text-white/80">
            We'd love to hear from you!
          </p>
        </div>
      </div>

      {/* Contact Methods */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl mb-4 text-[#7d3d2b]">Get In Touch</h2>
            <p className="text-lg text-gray-600">
              Choose your preferred way to reach us
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {contactMethods.map((method, index) => (
              <a
                key={index}
                href={method.link}
                target={method.link.startsWith('http') ? '_blank' : undefined}
                rel={method.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all hover:scale-105 overflow-hidden group"
              >
                <div className={`${method.color} p-6 text-white`}>
                  <method.icon className="h-12 w-12 mx-auto" />
                </div>
                <div className="p-6 text-center">
                  <h3 className="text-xl mb-2 text-[#7d3d2b]">{method.title}</h3>
                  <p className="text-gray-600 group-hover:text-[#7d3d2b] transition-colors">
                    {method.value}
                  </p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* WhatsApp CTA */}
      <section className="py-20 bg-gradient-to-br from-[#25D366]/10 to-[#25D366]/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 text-center">
            <div className="w-20 h-20 bg-[#25D366] rounded-full flex items-center justify-center mx-auto mb-6">
              <MessageCircle className="h-10 w-10 text-white" />
            </div>
            <h2 className="text-3xl md:text-4xl mb-4 text-[#7d3d2b]">
              Order via WhatsApp
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              The fastest way to place your order! Chat with us directly on WhatsApp 
              for quick responses and easy ordering.
            </p>
            <a
              href="https://wa.me/233553312217"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-3 bg-[#25D366] text-white px-8 py-4 rounded-lg font-semibold hover:bg-[#20BD5A] transition-colors text-lg"
            >
              <MessageCircle className="h-6 w-6" />
              <span>Message Gobɛ Hemaa on WhatsApp</span>
            </a>
          </div>
        </div>
      </section>

      {/* Business Info */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Location */}
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-[#7d3d2b] text-[#ffd700] rounded-lg flex items-center justify-center">
                  <MapPin className="h-6 w-6" />
                </div>
                <h3 className="text-2xl text-[#7d3d2b]">Location</h3>
              </div>
              <p className="text-lg text-gray-700 mb-4">
                We serve customers throughout Accra, Ghana
              </p>
              <p className="text-gray-600">
                Fast delivery to your location in Accra. Contact us to confirm 
                if we deliver to your area!
              </p>
            </div>

            {/* Business Hours */}
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-[#7d3d2b] text-[#ffd700] rounded-lg flex items-center justify-center">
                  <Clock className="h-6 w-6" />
                </div>
                <h3 className="text-2xl text-[#7d3d2b]">Business Hours</h3>
              </div>
              <div className="space-y-3">
                {businessHours.map((schedule, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center py-3 border-b border-gray-200 last:border-0"
                  >
                    <span className="text-gray-700">{schedule.day}</span>
                    <span className="text-[#7d3d2b]">{schedule.hours}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Media Section */}
      <section className="py-20 bg-gradient-to-br from-[#7d3d2b] to-[#5a2b1d] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl mb-6 text-[#ffd700]">
            Follow Us on Social Media
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Stay updated with our latest menu items, special offers, and more!
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="https://instagram.com/gob3.hemaa"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 bg-gradient-to-br from-purple-500 to-pink-500 px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity"
            >
              <Instagram className="h-5 w-5" />
              <span>@gob3.hemaa</span>
            </a>
          </div>
        </div>
      </section>

      {/* Contact Form Alternative */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Mail className="h-16 w-16 text-[#7d3d2b] mx-auto mb-6" />
          <h2 className="text-3xl md:text-4xl mb-4 text-[#7d3d2b]">
            Have Questions?
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Don't hesitate to reach out! We're here to answer any questions about our menu, 
            delivery areas, catering services, or anything else.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://wa.me/233553312217"
              className="inline-block bg-[#25D366] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#20BD5A] transition-colors"
            >
              WhatsApp Us
            </a>
            <a
              href="tel:0505647668"
              className="inline-block bg-[#7d3d2b] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#6a3424] transition-colors"
            >
              Call Us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}