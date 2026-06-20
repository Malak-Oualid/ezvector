import { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setSubmitted(true);
    setSubmitting(false);
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <>
      <div className="pt-20 min-h-screen">
        <Header />
        
        <div className="text-center py-16 px-8 bg-gradient-to-br from-blue-50/50 to-blue-100/50 border-b border-gray-200 mb-12">
          <h1 className="text-4xl font-light text-gray-900 mb-3">Contact Us</h1>
          <p className="text-gray-600 max-w-xl mx-auto">Have questions? We're here to help. Reach out and we'll get back to you within 24 hours.</p>
        </div>

        <div className="max-w-7xl mx-auto px-8 pb-16 grid grid-cols-1 md:grid-cols-[1fr_1.5fr] gap-8">
          <div className="flex flex-col gap-6">
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-600 mb-4">Get in Touch</h3>
              
              <div className="flex items-start gap-3 mb-3">
                <svg className="w-5 h-5 flex-shrink-0 text-gray-900" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <div className="flex-1">
                  <div className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1">Email</div>
                  <div className="text-sm text-gray-900">
                    <a href="mailto:support@vectorweave.com" className="text-gray-900 hover:underline">support@vectorweave.com</a>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3 mb-3">
                <svg className="w-5 h-5 flex-shrink-0 text-gray-900" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <div className="flex-1">
                  <div className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1">Phone</div>
                  <div className="text-sm text-gray-900">
                    <a href="tel:+1-555-123-4567" className="text-gray-900 hover:underline">+1 (555) 123-4567</a>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 flex-shrink-0 text-gray-900" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <div className="flex-1">
                  <div className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1">Response Time</div>
                  <div className="text-sm text-gray-900">Within 24 hours</div>
                </div>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-600 mb-4">Office Hours</h3>
              
              <div className="flex items-start gap-3 mb-3">
                <svg className="w-5 h-5 flex-shrink-0 text-gray-900" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <div className="flex-1">
                  <div className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1">Monday - Friday</div>
                  <div className="text-sm text-gray-900">9:00 AM - 6:00 PM EST</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 flex-shrink-0 text-gray-900" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <div className="flex-1">
                  <div className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1">Saturday - Sunday</div>
                  <div className="text-sm text-gray-900">Closed</div>
                </div>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-600 mb-4">Location</h3>
              
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 flex-shrink-0 text-gray-900" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <div className="flex-1">
                  <div className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1">Address</div>
                  <div className="text-sm text-gray-900">
                    123 Science Drive<br />
                    Cambridge, MA 02139
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
            <div className="p-5 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Send us a message</h2>
              <p className="text-sm text-gray-600 mt-1">Fill out the form below and we'll get back to you as soon as possible.</p>
            </div>
            
            <div className="p-6">
              {submitted && (
                <div className="flex items-center gap-3 bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
                  <svg className="w-6 h-6 text-green-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span className="text-sm font-medium text-green-600">Message sent successfully! We'll be in touch soon.</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-600 mb-2">Name <span className="text-gray-900">*</span></label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Your full name"
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-gray-900 focus:ring-2 focus:ring-gray-900/10 transition-all"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-600 mb-2">Email <span className="text-gray-900">*</span></label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="your.email@example.com"
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-gray-900 focus:ring-2 focus:ring-gray-900/10 transition-all"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-600 mb-2">Subject <span className="text-gray-900">*</span></label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-gray-900 focus:ring-2 focus:ring-gray-900/10 transition-all"
                  >
                    <option value="">Select a subject</option>
                    <option value="general">General Inquiry</option>
                    <option value="support">Technical Support</option>
                    <option value="pricing">Pricing Question</option>
                    <option value="orders">Order Status</option>
                    <option value="partnership">Partnership Inquiry</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-600 mb-2">Message <span className="text-gray-900">*</span></label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    placeholder="How can we help you?"
                    rows={6}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-gray-900 focus:ring-2 focus:ring-gray-900/10 transition-all resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full px-4 py-2.5 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {submitting ? "Sending..." : "Send Message"}
                </button>
              </form>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
}
