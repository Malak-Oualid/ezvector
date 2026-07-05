import Header from "../components/Header";
import Footer from "../components/Footer";

export default function HowToStartDropboxPage() {
  return (
    <>
      <div className="pt-20 min-h-screen">
        <Header />
        
        <div className="text-center py-16 px-8 bg-gradient-to-br from-blue-50/50 to-blue-100/50 border-b border-gray-200 mb-12">
          <h1 className="text-4xl font-light text-gray-900 mb-3">How to Use Dropbox</h1>
          <p className="text-gray-600 max-w-xl mx-auto">Conveniently drop off your DNA samples at our secure dropbox locations.</p>
        </div>

        <div className="max-w-4xl mx-auto px-8 pb-16">
          <div className="mb-12">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-full bg-gray-900 text-white text-xl font-bold flex items-center justify-center flex-shrink-0">1</div>
              <h2 className="text-2xl font-semibold text-gray-900">Prepare Your Samples</h2>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-7">
              <p className="text-gray-600 leading-relaxed mb-4">Before visiting a dropbox, ensure your samples are ready:</p>
              <ul className="list-none p-0 m-4">
                <li className="text-gray-600 leading-relaxed pl-6 relative mb-2"><span className="absolute left-0 text-gray-900 font-bold">•</span> Samples are properly labeled with your order number and fragment names</li>
                <li className="text-gray-600 leading-relaxed pl-6 relative mb-2"><span className="absolute left-0 text-gray-900 font-bold">•</span> Samples meet concentration and purity requirements (see Submit Samples guide)</li>
                <li className="text-gray-600 leading-relaxed pl-6 relative mb-2"><span className="absolute left-0 text-gray-900 font-bold">•</span> Tubes are sealed tightly to prevent leakage</li>
                <li className="text-gray-600 leading-relaxed pl-6 relative"><span className="absolute left-0 text-gray-900 font-bold">•</span> You have your sample submission sheet printed and filled out</li>
              </ul>
              
              <div className="flex items-start gap-3 bg-blue-50/50 border border-blue-200 rounded-lg p-4">
                <svg className="w-5 h-5 text-blue-600 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 16v-4M12 8h.01" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <div className="text-sm text-gray-600 leading-relaxed">
                  <strong className="text-gray-900">Tip:</strong> Download and print the sample submission sheet from your order confirmation email before heading to the dropbox.
                </div>
              </div>
            </div>
          </div>

          <div className="mb-12">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-full bg-gray-900 text-white text-xl font-bold flex items-center justify-center flex-shrink-0">2</div>
              <h2 className="text-2xl font-semibold text-gray-900">Find a Dropbox Location</h2>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-7">
              <p className="text-gray-600 leading-relaxed mb-4">We have dropbox locations at several convenient sites:</p>
              
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-4">
                <h4 className="text-lg font-semibold text-gray-900 mb-2">Cambridge Research Campus</h4>
                <p className="text-gray-600 text-sm mb-2">123 Science Drive, Cambridge, MA 02139</p>
                <p className="text-gray-500 text-xs mb-1"><strong className="text-gray-600">Hours:</strong> Monday - Friday, 8:00 AM - 8:00 PM</p>
                <p className="text-gray-500 text-xs"><strong className="text-gray-600">Access:</strong> Building lobby, security desk</p>
              </div>
              
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-4">
                <h4 className="text-lg font-semibold text-gray-900 mb-2">Boston Biotech Hub</h4>
                <p className="text-gray-600 text-sm mb-2">456 Innovation Way, Boston, MA 02110</p>
                <p className="text-gray-500 text-xs mb-1"><strong className="text-gray-600">Hours:</strong> Monday - Friday, 7:00 AM - 9:00 PM</p>
                <p className="text-gray-500 text-xs"><strong className="text-gray-600">Access:</strong> Main entrance, mailroom</p>
              </div>
              
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-4">
                <h4 className="text-lg font-semibold text-gray-900 mb-2">MIT Campus</h4>
                <p className="text-gray-600 text-sm mb-2">77 Massachusetts Ave, Cambridge, MA 02139</p>
                <p className="text-gray-500 text-xs mb-1"><strong className="text-gray-600">Hours:</strong> Monday - Friday, 9:00 AM - 6:00 PM</p>
                <p className="text-gray-500 text-xs"><strong className="text-gray-600">Access:</strong> Building E18, reception</p>
              </div>
              
              <p className="text-gray-600 leading-relaxed">More locations coming soon. Contact us if you need a dropbox in your area.</p>
            </div>
          </div>

          <div className="mb-12">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-full bg-gray-900 text-white text-xl font-bold flex items-center justify-center flex-shrink-0">3</div>
              <h2 className="text-2xl font-semibold text-gray-900">Drop Off Your Samples</h2>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-7">
              <p className="text-gray-600 leading-relaxed mb-4">When you arrive at the dropbox:</p>
              <ul className="list-none p-0 m-4">
                <li className="text-gray-600 leading-relaxed pl-6 relative mb-2"><span className="absolute left-0 text-gray-900 font-bold">•</span> Locate the VectorWeave dropbox (clearly labeled with our logo)</li>
                <li className="text-gray-600 leading-relaxed pl-6 relative mb-2"><span className="absolute left-0 text-gray-900 font-bold">•</span> Place your samples in the provided secure container</li>
                <li className="text-gray-600 leading-relaxed pl-6 relative mb-2"><span className="absolute left-0 text-gray-900 font-bold">•</span> Fill out the dropbox log with your order number and contact info</li>
                <li className="text-gray-600 leading-relaxed pl-6 relative mb-2"><span className="absolute left-0 text-gray-900 font-bold">•</span> Seal the container and place it in the dropbox</li>
                <li className="text-gray-600 leading-relaxed pl-6 relative"><span className="absolute left-0 text-gray-900 font-bold">•</span> Take the confirmation receipt for your records</li>
              </ul>
              
              <div className="flex items-start gap-3 bg-blue-50/50 border border-blue-200 rounded-lg p-4">
                <svg className="w-5 h-5 text-blue-600 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 16v-4M12 8h.01" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <div className="text-sm text-gray-600 leading-relaxed">
                  <strong className="text-gray-900">Tip:</strong> Dropbox locations are monitored by security cameras and checked daily. Your samples are safe and will be processed within 24 hours of drop-off.
                </div>
              </div>
            </div>
          </div>

          <div className="mb-12">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-full bg-gray-900 text-white text-xl font-bold flex items-center justify-center flex-shrink-0">4</div>
              <h2 className="text-2xl font-semibold text-gray-900">Confirmation and Tracking</h2>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-7">
              <p className="text-gray-600 leading-relaxed mb-4">After dropping off your samples:</p>
              <ul className="list-none p-0 m-4">
                <li className="text-gray-600 leading-relaxed pl-6 relative mb-2"><span className="absolute left-0 text-gray-900 font-bold">•</span> You'll receive an email confirmation when samples are collected</li>
                <li className="text-gray-600 leading-relaxed pl-6 relative mb-2"><span className="absolute left-0 text-gray-900 font-bold">•</span> Track your order status through your account dashboard</li>
                <li className="text-gray-600 leading-relaxed pl-6 relative mb-2"><span className="absolute left-0 text-gray-900 font-bold">•</span> Processing begins within 24 hours of sample receipt</li>
                <li className="text-gray-600 leading-relaxed pl-6 relative"><span className="absolute left-0 text-gray-900 font-bold">•</span> Contact support if you don't receive confirmation within 48 hours</li>
              </ul>
            </div>
          </div>

          <div className="mb-12">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-full bg-gray-900 text-white text-xl font-bold flex items-center justify-center flex-shrink-0">5</div>
              <h2 className="text-2xl font-semibold text-gray-900">Dropbox Guidelines</h2>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-7">
              <p className="text-gray-600 leading-relaxed mb-4">Please follow these guidelines when using our dropboxes:</p>
              <ul className="list-none p-0 m-4">
                <li className="text-gray-600 leading-relaxed pl-6 relative mb-2"><span className="absolute left-0 text-gray-900 font-bold">•</span> Only drop off samples for confirmed orders</li>
                <li className="text-gray-600 leading-relaxed pl-6 relative mb-2"><span className="absolute left-0 text-gray-900 font-bold">•</span> Do not leave samples outside of business hours</li>
                <li className="text-gray-600 leading-relaxed pl-6 relative mb-2"><span className="absolute left-0 text-gray-900 font-bold">•</span> Ensure samples are properly packaged and labeled</li>
                <li className="text-gray-600 leading-relaxed pl-6 relative mb-2"><span className="absolute left-0 text-gray-900 font-bold">•</span> Do not deposit hazardous materials or biohazardous samples</li>
                <li className="text-gray-600 leading-relaxed pl-6 relative"><span className="absolute left-0 text-gray-900 font-bold">•</span> Report any issues with the dropbox to security or our support team</li>
              </ul>
            </div>
          </div>

          <div className="mb-12">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-full bg-gray-900 text-white text-xl font-bold flex items-center justify-center flex-shrink-0">6</div>
              <h2 className="text-2xl font-semibold text-gray-900">Requesting a New Dropbox</h2>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-7">
              <p className="text-gray-600 leading-relaxed mb-4">Don't see a dropbox near you? We're always expanding:</p>
              <ul className="list-none p-0 m-4">
                <li className="text-gray-600 leading-relaxed pl-6 relative mb-2"><span className="absolute left-0 text-gray-900 font-bold">•</span> Contact us to request a dropbox in your area</li>
                <li className="text-gray-600 leading-relaxed pl-6 relative mb-2"><span className="absolute left-0 text-gray-900 font-bold">•</span> We prioritize locations with multiple active customers</li>
                <li className="text-gray-600 leading-relaxed pl-6 relative mb-2"><span className="absolute left-0 text-gray-900 font-bold">•</span> Institutional partnerships available for high-volume labs</li>
                <li className="text-gray-600 leading-relaxed pl-6 relative"><span className="absolute left-0 text-gray-900 font-bold">•</span> Temporary dropboxes can be arranged for special projects</li>
              </ul>
              <p className="text-gray-600 leading-relaxed">Email <a href="mailto:dropbox@vectorweave.com" className="text-gray-900 hover:underline">dropbox@vectorweave.com</a> to discuss dropbox options.</p>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
}
