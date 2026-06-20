import Header from "../components/Header";
import Footer from "../components/Footer";

export default function HowToCancelOrderPage() {
  return (
    <>
      <div className="pt-20 min-h-screen">
        <Header />
        
        <div className="text-center py-16 px-8 bg-gradient-to-br from-blue-50/50 to-blue-100/50 border-b border-gray-200 mb-12">
          <h1 className="text-4xl font-light text-gray-900 mb-3">How to Cancel an Order</h1>
          <p className="text-gray-600 max-w-xl mx-auto">Learn about our cancellation policy and how to cancel your order if needed.</p>
        </div>

        <div className="max-w-4xl mx-auto px-8 pb-16">
          <div className="mb-12">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-full bg-gray-900 text-white text-xl font-bold flex items-center justify-center flex-shrink-0">1</div>
              <h2 className="text-2xl font-semibold text-gray-900">Cancellation Policy</h2>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-7">
              <p className="text-gray-600 leading-relaxed mb-4">Our cancellation policy depends on the current status of your order:</p>
              
              <div className="flex flex-col gap-4 my-6">
                <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                  <div className="w-3 h-3 rounded-full bg-green-600 flex-shrink-0 mt-1"></div>
                  <div>
                    <h4 className="text-sm font-semibold text-gray-900 mb-1">Order Submitted (No Samples Received)</h4>
                    <p className="text-xs text-gray-600">Full refund available. No cancellation fees.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                  <div className="w-3 h-3 rounded-full bg-green-600 flex-shrink-0 mt-1"></div>
                  <div>
                    <h4 className="text-sm font-semibold text-gray-900 mb-1">Samples Received (Processing Not Started)</h4>
                    <p className="text-xs text-gray-600">Full refund available. 10% restocking fee may apply for custom synthetic DNA.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                  <div className="w-3 h-3 rounded-full bg-orange-500 flex-shrink-0 mt-1"></div>
                  <div>
                    <h4 className="text-sm font-semibold text-gray-900 mb-1">In Progress (Cloning/Mutagenesis Started)</h4>
                    <p className="text-xs text-gray-600">Partial refund (50%) available. Lab work has begun.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                  <div className="w-3 h-3 rounded-full bg-orange-500 flex-shrink-0 mt-1"></div>
                  <div>
                    <h4 className="text-sm font-semibold text-gray-900 mb-1">Sequencing in Progress</h4>
                    <p className="text-xs text-gray-600">Partial refund (25%) available. Sequencing costs are non-refundable.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                  <div className="w-3 h-3 rounded-full bg-red-600 flex-shrink-0 mt-1"></div>
                  <div>
                    <h4 className="text-sm font-semibold text-gray-900 mb-1">Complete / Shipped</h4>
                    <p className="text-xs text-gray-600">No refunds available. Order is complete.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-12">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-full bg-gray-900 text-white text-xl font-bold flex items-center justify-center flex-shrink-0">2</div>
              <h2 className="text-2xl font-semibold text-gray-900">How to Cancel</h2>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-7">
              <p className="text-gray-600 leading-relaxed mb-4">To cancel your order, follow these steps:</p>
              <ul className="list-none p-0 m-4">
                <li className="text-gray-600 leading-relaxed pl-6 relative mb-2"><span className="absolute left-0 text-gray-900 font-bold">•</span> Log in to your VectorWeave account</li>
                <li className="text-gray-600 leading-relaxed pl-6 relative mb-2"><span className="absolute left-0 text-gray-900 font-bold">•</span> Navigate to <strong className="text-gray-900">Orders</strong> in your dashboard</li>
                <li className="text-gray-600 leading-relaxed pl-6 relative mb-2"><span className="absolute left-0 text-gray-900 font-bold">•</span> Find the order you wish to cancel</li>
                <li className="text-gray-600 leading-relaxed pl-6 relative mb-2"><span className="absolute left-0 text-gray-900 font-bold">•</span> Click the <strong className="text-gray-900">Cancel Order</strong> button</li>
                <li className="text-gray-600 leading-relaxed pl-6 relative mb-2"><span className="absolute left-0 text-gray-900 font-bold">•</span> Select a reason for cancellation from the dropdown</li>
                <li className="text-gray-600 leading-relaxed pl-6 relative"><span className="absolute left-0 text-gray-900 font-bold">•</span> Confirm the cancellation request</li>
              </ul>
              
              <div className="flex items-start gap-3 bg-blue-50/50 border border-blue-200 rounded-lg p-4">
                <svg className="w-5 h-5 text-blue-600 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 16v-4M12 8h.01" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <div className="text-sm text-gray-600 leading-relaxed">
                  <strong className="text-gray-900">Tip:</strong> You can also cancel by emailing support@vectorweave.com with your order number. Include "Cancellation Request" in the subject line.
                </div>
              </div>
            </div>
          </div>

          <div className="mb-12">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-full bg-gray-900 text-white text-xl font-bold flex items-center justify-center flex-shrink-0">3</div>
              <h2 className="text-2xl font-semibold text-gray-900">Cancellation Confirmation</h2>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-7">
              <p className="text-gray-600 leading-relaxed mb-4">After submitting your cancellation request:</p>
              <ul className="list-none p-0 m-4">
                <li className="text-gray-600 leading-relaxed pl-6 relative mb-2"><span className="absolute left-0 text-gray-900 font-bold">•</span> You'll receive an immediate email confirmation</li>
                <li className="text-gray-600 leading-relaxed pl-6 relative mb-2"><span className="absolute left-0 text-gray-900 font-bold">•</span> Our team will review your request within 24 hours</li>
                <li className="text-gray-600 leading-relaxed pl-6 relative mb-2"><span className="absolute left-0 text-gray-900 font-bold">•</span> Refund processing begins upon approval</li>
                <li className="text-gray-600 leading-relaxed pl-6 relative mb-2"><span className="absolute left-0 text-gray-900 font-bold">•</span> Refunds are issued to the original payment method</li>
                <li className="text-gray-600 leading-relaxed pl-6 relative"><span className="absolute left-0 text-gray-900 font-bold">•</span> Allow 5-10 business days for refunds to appear on your statement</li>
              </ul>
              
              <div className="flex items-start gap-3 bg-green-50/50 border border-green-200 rounded-lg p-4">
                <svg className="w-5 h-5 text-green-600 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <div className="text-sm text-gray-600 leading-relaxed">
                  <strong className="text-green-600">Note:</strong> For purchase orders, refunds are issued as credits to your institutional account. Contact your finance department for details.
                </div>
              </div>
            </div>
          </div>

          <div className="mb-12">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-full bg-gray-900 text-white text-xl font-bold flex items-center justify-center flex-shrink-0">4</div>
              <h2 className="text-2xl font-semibold text-gray-900">Modifying Instead of Canceling</h2>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-7">
              <p className="text-gray-600 leading-relaxed mb-4">If you need to change your order rather than cancel it:</p>
              <ul className="list-none p-0 m-4">
                <li className="text-gray-600 leading-relaxed pl-6 relative mb-2"><span className="absolute left-0 text-gray-900 font-bold">•</span> Contact support before samples are received for easy modifications</li>
                <li className="text-gray-600 leading-relaxed pl-6 relative mb-2"><span className="absolute left-0 text-gray-900 font-bold">•</span> Changes to fragment sequences may require additional fees</li>
                <li className="text-gray-600 leading-relaxed pl-6 relative mb-2"><span className="absolute left-0 text-gray-900 font-bold">•</span> Adding fragments to an existing order is possible if processing hasn't started</li>
                <li className="text-gray-600 leading-relaxed pl-6 relative"><span className="absolute left-0 text-gray-900 font-bold">•</span> Changes to backbone plasmids may require order cancellation and resubmission</li>
              </ul>
              <p className="text-gray-600 leading-relaxed">Email <a href="mailto:support@vectorweave.com" className="text-gray-900 hover:underline">support@vectorweave.com</a> with your order number and requested changes.</p>
            </div>
          </div>

          <div className="mb-12">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-full bg-gray-900 text-white text-xl font-bold flex items-center justify-center flex-shrink-0">5</div>
              <h2 className="text-2xl font-semibold text-gray-900">Special Circumstances</h2>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-7">
              <p className="text-gray-600 leading-relaxed mb-4">We understand that research priorities change. For special cases:</p>
              <ul className="list-none p-0 m-4">
                <li className="text-gray-600 leading-relaxed pl-6 relative mb-2"><span className="absolute left-0 text-gray-900 font-bold">•</span> <strong className="text-gray-900">Grant funding issues:</strong> Provide documentation for potential fee waivers</li>
                <li className="text-gray-600 leading-relaxed pl-6 relative mb-2"><span className="absolute left-0 text-gray-900 font-bold">•</span> <strong className="text-gray-900">Lab emergencies:</strong> Contact us immediately for expedited cancellation processing</li>
                <li className="text-gray-600 leading-relaxed pl-6 relative mb-2"><span className="absolute left-0 text-gray-900 font-bold">•</span> <strong className="text-gray-900">Multiple orders:</strong> We can pause future orders while resolving current issues</li>
                <li className="text-gray-600 leading-relaxed pl-6 relative"><span className="absolute left-0 text-gray-900 font-bold">•</span> <strong className="text-gray-900">Institutional policies:</strong> We work with university purchasing departments as needed</li>
              </ul>
              <p className="text-gray-600 leading-relaxed">Our goal is to support your research. Contact us to discuss your situation.</p>
            </div>
          </div>

          <div className="mb-12">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-full bg-gray-900 text-white text-xl font-bold flex items-center justify-center flex-shrink-0">6</div>
              <h2 className="text-2xl font-semibold text-gray-900">Reordering After Cancellation</h2>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-7">
              <p className="text-gray-600 leading-relaxed mb-4">If you cancel and later decide to reorder:</p>
              <ul className="list-none p-0 m-4">
                <li className="text-gray-600 leading-relaxed pl-6 relative mb-2"><span className="absolute left-0 text-gray-900 font-bold">•</span> Your previous design is saved in your account</li>
                <li className="text-gray-600 leading-relaxed pl-6 relative mb-2"><span className="absolute left-0 text-gray-900 font-bold">•</span> You can resubmit the same design with one click</li>
                <li className="text-gray-600 leading-relaxed pl-6 relative mb-2"><span className="absolute left-0 text-gray-900 font-bold">•</span> No need to re-enter sequences or configurations</li>
                <li className="text-gray-600 leading-relaxed pl-6 relative"><span className="absolute left-0 text-gray-900 font-bold">•</span> Pricing remains the same (subject to any policy updates)</li>
              </ul>
              
              <div className="flex items-start gap-3 bg-blue-50/50 border border-blue-200 rounded-lg p-4">
                <svg className="w-5 h-5 text-blue-600 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 16v-4M12 8h.01" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <div className="text-sm text-gray-600 leading-relaxed">
                  <strong className="text-gray-900">Tip:</strong> Consider pausing your order instead of canceling if you're unsure. Paused orders can be resumed within 30 days without penalty.
                </div>
              </div>
            </div>
          </div>

          <div className="mb-12">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-full bg-gray-900 text-white text-xl font-bold flex items-center justify-center flex-shrink-0">7</div>
              <h2 className="text-2xl font-semibold text-gray-900">Contact Support</h2>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-7">
              <p className="text-gray-600 leading-relaxed mb-4">Need help with cancellation? Our support team is available:</p>
              <ul className="list-none p-0 m-4">
                <li className="text-gray-600 leading-relaxed pl-6 relative mb-2"><span className="absolute left-0 text-gray-900 font-bold">•</span> Email: <a href="mailto:support@vectorweave.com" className="text-gray-900 hover:underline">support@vectorweave.com</a></li>
                <li className="text-gray-600 leading-relaxed pl-6 relative mb-2"><span className="absolute left-0 text-gray-900 font-bold">•</span> Phone: +1 (555) 123-4567</li>
                <li className="text-gray-600 leading-relaxed pl-6 relative mb-2"><span className="absolute left-0 text-gray-900 font-bold">•</span> Hours: Monday - Friday, 9:00 AM - 6:00 PM EST</li>
                <li className="text-gray-600 leading-relaxed pl-6 relative"><span className="absolute left-0 text-gray-900 font-bold">•</span> Response time: Within 24 hours</li>
              </ul>
              
              <div className="flex items-start gap-3 bg-orange-50/50 border border-orange-200 rounded-lg p-4">
                <svg className="w-5 h-5 text-orange-600 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <div className="text-sm text-gray-600 leading-relaxed">
                  <strong className="text-orange-600">Important:</strong> Do not send new samples for an order you intend to cancel. Contact us first to avoid unnecessary costs.
                </div>
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
}
