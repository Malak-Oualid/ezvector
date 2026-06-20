import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

export default function HowToSubmitOrdersPage() {
  return (
    <>
      <div className="pt-20 min-h-screen">
        <Header />
        
        <div className="text-center py-16 px-8 bg-gradient-to-br from-blue-50/50 to-blue-100/50 border-b border-gray-200 mb-12">
          <h1 className="text-4xl font-light text-gray-900 mb-3">How to Submit Orders</h1>
          <p className="text-gray-600 max-w-xl mx-auto">Follow these steps to design and submit your plasmid order through VectorWeave.</p>
        </div>

        <div className="max-w-4xl mx-auto px-8 pb-16">
          <div className="mb-12">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-full bg-gray-900 text-white text-xl font-bold flex items-center justify-center flex-shrink-0">1</div>
              <h2 className="text-2xl font-semibold text-gray-900">Choose Your Service</h2>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-7">
              <p className="text-gray-600 leading-relaxed mb-4">Start by selecting the service that matches your needs from our order page:</p>
              <ul className="list-none p-0 m-4">
                <li className="text-gray-600 leading-relaxed pl-6 relative mb-2"><span className="absolute left-0 text-gray-900 font-bold">•</span> <strong className="text-gray-900">Multi-Insert Cloning</strong> - Clone one or more DNA fragments into an existing backbone plasmid</li>
                <li className="text-gray-600 leading-relaxed pl-6 relative mb-2"><span className="absolute left-0 text-gray-900 font-bold">•</span> <strong className="text-gray-900">Site-Directed Mutagenesis</strong> - Introduce specific mutations into your plasmid</li>
                <li className="text-gray-600 leading-relaxed pl-6 relative"><span className="absolute left-0 text-gray-900 font-bold">•</span> <strong className="text-gray-900">Custom Backbone Construction</strong> - Build a new plasmid backbone from scratch</li>
              </ul>
              <p className="text-gray-600 leading-relaxed">Each service has specific requirements and pricing, so choose the one that best fits your experiment.</p>
            </div>
          </div>

          <div className="mb-12">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-full bg-gray-900 text-white text-xl font-bold flex items-center justify-center flex-shrink-0">2</div>
              <h2 className="text-2xl font-semibold text-gray-900">Design Your Plasmid</h2>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-7">
              <p className="text-gray-600 leading-relaxed mb-4">Use our interactive builder to design your plasmid:</p>
              <ul className="list-none p-0 m-4">
                <li className="text-gray-600 leading-relaxed pl-6 relative mb-2"><span className="absolute left-0 text-gray-900 font-bold">•</span> Enter a descriptive name for your plasmid</li>
                <li className="text-gray-600 leading-relaxed pl-6 relative mb-2"><span className="absolute left-0 text-gray-900 font-bold">•</span> Add DNA fragments by name and sequence (or select from our library)</li>
                <li className="text-gray-600 leading-relaxed pl-6 relative mb-2"><span className="absolute left-0 text-gray-900 font-bold">•</span> Specify the backbone plasmid (if applicable)</li>
                <li className="text-gray-600 leading-relaxed pl-6 relative"><span className="absolute left-0 text-gray-900 font-bold">•</span> For mutagenesis, enter the mutations you want to introduce</li>
              </ul>
              <p className="text-gray-600 leading-relaxed mb-6">The builder provides real-time validation and pricing as you design. You'll see a visual representation of your plasmid to confirm the assembly.</p>
              
              <div className="flex items-start gap-3 bg-blue-50/50 border border-blue-200 rounded-lg p-4">
                <svg className="w-5 h-5 text-blue-600 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 16v-4M12 8h.01" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <div className="text-sm text-gray-600 leading-relaxed">
                  <strong className="text-gray-900">Tip:</strong> Save your design as a draft if you need to come back later. Your work is automatically saved in your account.
                </div>
              </div>
            </div>
          </div>

          <div className="mb-12">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-full bg-gray-900 text-white text-xl font-bold flex items-center justify-center flex-shrink-0">3</div>
              <h2 className="text-2xl font-semibold text-gray-900">Review and Add to Cart</h2>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-7">
              <p className="text-gray-600 leading-relaxed mb-4">Before adding to cart, review your design carefully:</p>
              <ul className="list-none p-0 m-4">
                <li className="text-gray-600 leading-relaxed pl-6 relative mb-2"><span className="absolute left-0 text-gray-900 font-bold">•</span> Check that all fragment sequences are correct</li>
                <li className="text-gray-600 leading-relaxed pl-6 relative mb-2"><span className="absolute left-0 text-gray-900 font-bold">•</span> Verify the assembly order matches your intended construct</li>
                <li className="text-gray-600 leading-relaxed pl-6 relative mb-2"><span className="absolute left-0 text-gray-900 font-bold">•</span> Review the pricing breakdown</li>
                <li className="text-gray-600 leading-relaxed pl-6 relative"><span className="absolute left-0 text-gray-900 font-bold">•</span> Confirm the plasmid name is descriptive</li>
              </ul>
              <p className="text-gray-600 leading-relaxed">Once satisfied, click <strong className="text-gray-900">"Add to Cart"</strong> to proceed. You can add multiple plasmids to a single order.</p>
            </div>
          </div>

          <div className="mb-12">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-full bg-gray-900 text-white text-xl font-bold flex items-center justify-center flex-shrink-0">4</div>
              <h2 className="text-2xl font-semibold text-gray-900">Checkout</h2>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-7">
              <p className="text-gray-600 leading-relaxed mb-4">Proceed to checkout when ready:</p>
              <ul className="list-none p-0 m-4">
                <li className="text-gray-600 leading-relaxed pl-6 relative mb-2"><span className="absolute left-0 text-gray-900 font-bold">•</span> Review all items in your cart</li>
                <li className="text-gray-600 leading-relaxed pl-6 relative mb-2"><span className="absolute left-0 text-gray-900 font-bold">•</span> Choose your payment method (credit card or purchase order)</li>
                <li className="text-gray-600 leading-relaxed pl-6 relative mb-2"><span className="absolute left-0 text-gray-900 font-bold">•</span> Enter billing information</li>
                <li className="text-gray-600 leading-relaxed pl-6 relative"><span className="absolute left-0 text-gray-900 font-bold">•</span> Submit your order</li>
              </ul>
              <p className="text-gray-600 leading-relaxed">After submission, you'll receive an order confirmation email with detailed instructions for sending your DNA samples.</p>
            </div>
          </div>

          <div className="mb-12">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-full bg-gray-900 text-white text-xl font-bold flex items-center justify-center flex-shrink-0">5</div>
              <h2 className="text-2xl font-semibold text-gray-900">Send Your Samples</h2>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-7">
              <p className="text-gray-600 leading-relaxed mb-4">Follow the instructions in your confirmation email to send your DNA samples:</p>
              <ul className="list-none p-0 m-4">
                <li className="text-gray-600 leading-relaxed pl-6 relative mb-2"><span className="absolute left-0 text-gray-900 font-bold">•</span> Prepare your DNA fragments according to our guidelines</li>
                <li className="text-gray-600 leading-relaxed pl-6 relative mb-2"><span className="absolute left-0 text-gray-900 font-bold">•</span> Package samples in appropriate tubes with proper labeling</li>
                <li className="text-gray-600 leading-relaxed pl-6 relative mb-2"><span className="absolute left-0 text-gray-900 font-bold">•</span> Use the provided shipping label or dropbox location</li>
                <li className="text-gray-600 leading-relaxed pl-6 relative"><span className="absolute left-0 text-gray-900 font-bold">•</span> Include your order number on the package</li>
              </ul>
              <p className="text-gray-600 leading-relaxed">See our <strong className="text-gray-900">Submit Samples</strong> guide for detailed sample preparation instructions.</p>
            </div>
          </div>

          <div className="mb-12">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-full bg-gray-900 text-white text-xl font-bold flex items-center justify-center flex-shrink-0">6</div>
              <h2 className="text-2xl font-semibold text-gray-900">Track Your Order</h2>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-7">
              <p className="text-gray-600 leading-relaxed mb-4">Monitor your order progress through your account dashboard:</p>
              <ul className="list-none p-0 m-4">
                <li className="text-gray-600 leading-relaxed pl-6 relative mb-2"><span className="absolute left-0 text-gray-900 font-bold">•</span> View real-time status updates</li>
                <li className="text-gray-600 leading-relaxed pl-6 relative mb-2"><span className="absolute left-0 text-gray-900 font-bold">•</span> Receive notifications at each stage</li>
                <li className="text-gray-600 leading-relaxed pl-6 relative mb-2"><span className="absolute left-0 text-gray-900 font-bold">•</span> Download sequence verification files when complete</li>
                <li className="text-gray-600 leading-relaxed pl-6 relative"><span className="absolute left-0 text-gray-900 font-bold">•</span> Track shipping information</li>
              </ul>
              <p className="text-gray-600 leading-relaxed">Typical turnaround time is approximately 1 week from sample receipt.</p>
            </div>
          </div>

          <div className="text-center py-12 px-8 bg-white border border-gray-200 rounded-lg mt-12">
            <h3 className="text-2xl font-semibold text-gray-900 mb-2">Ready to get started?</h3>
            <p className="text-gray-600 mb-6">Design your first plasmid today and experience the VectorWeave difference.</p>
            <Link to="/order" className="inline-block px-6 py-2.5 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition-all">Start Building</Link>
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
}
