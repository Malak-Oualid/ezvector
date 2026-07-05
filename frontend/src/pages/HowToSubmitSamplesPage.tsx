import Header from "../components/Header";
import Footer from "../components/Footer";

export default function HowToSubmitSamplesPage() {
  return (
    <>
      <div className="pt-20 min-h-screen">
        <Header />
        
        <div className="text-center py-16 px-8 bg-gradient-to-br from-blue-50/50 to-blue-100/50 border-b border-gray-200 mb-12">
          <h1 className="text-4xl font-light text-gray-900 mb-3">How to Submit Samples</h1>
          <p className="text-gray-600 max-w-xl mx-auto">Follow these guidelines to prepare and send your DNA samples for processing.</p>
        </div>

        <div className="max-w-4xl mx-auto px-8 pb-16">
          <div className="mb-12">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-full bg-gray-900 text-white text-xl font-bold flex items-center justify-center flex-shrink-0">1</div>
              <h2 className="text-2xl font-semibold text-gray-900">Sample Format Requirements</h2>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-7">
              <p className="text-gray-600 leading-relaxed mb-4">We accept DNA samples in the following formats:</p>
              <ul className="list-none p-0 m-4">
                <li className="text-gray-600 leading-relaxed pl-6 relative mb-2"><span className="absolute left-0 text-gray-900 font-bold">•</span> <strong className="text-gray-900">Synthetic DNA fragments</strong> - From any vendor (IDT, Twist, etc.) in tube or plate format</li>
                <li className="text-gray-600 leading-relaxed pl-6 relative mb-2"><span className="absolute left-0 text-gray-900 font-bold">•</span> <strong className="text-gray-900">PCR products</strong> - Purified PCR amplicons with appropriate primers</li>
                <li className="text-gray-600 leading-relaxed pl-6 relative mb-2"><span className="absolute left-0 text-gray-900 font-bold">•</span> <strong className="text-gray-900">Plasmid DNA</strong> - Miniprep or maxiprep quality for backbone templates</li>
                <li className="text-gray-600 leading-relaxed pl-6 relative"><span className="absolute left-0 text-gray-900 font-bold">•</span> <strong className="text-gray-900">Glycerol stocks</strong> - For backbone plasmids (E. coli strains)</li>
              </ul>
              
              <div className="flex items-start gap-3 bg-orange-50/50 border border-orange-200 rounded-lg p-4">
                <svg className="w-5 h-5 text-orange-600 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <div className="text-sm text-gray-600 leading-relaxed">
                  <strong className="text-orange-600">Important:</strong> All samples must be free of contaminants and meet minimum concentration requirements. See the table below for specifications.
                </div>
              </div>
            </div>
          </div>

          <div className="mb-12">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-full bg-gray-900 text-white text-xl font-bold flex items-center justify-center flex-shrink-0">2</div>
              <h2 className="text-2xl font-semibold text-gray-900">Concentration and Purity</h2>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-7">
              <p className="text-gray-600 leading-relaxed mb-4">Ensure your samples meet the following quality standards:</p>
              
              <div className="overflow-x-auto my-6">
                <table className="w-full border-collapse text-sm">
                  <thead>
                    <tr>
                      <th className="bg-gray-50 text-gray-500 font-semibold uppercase tracking-wider text-xs py-3 px-4 text-left border-b-2 border-gray-200">Sample Type</th>
                      <th className="bg-gray-50 text-gray-500 font-semibold uppercase tracking-wider text-xs py-3 px-4 text-left border-b-2 border-gray-200">Min Concentration</th>
                      <th className="bg-gray-50 text-gray-500 font-semibold uppercase tracking-wider text-xs py-3 px-4 text-left border-b-2 border-gray-200">Min Volume</th>
                      <th className="bg-gray-50 text-gray-500 font-semibold uppercase tracking-wider text-xs py-3 px-4 text-left border-b-2 border-gray-200">Purity (A260/280)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="py-3 px-4 border-b border-gray-200 text-gray-600">Synthetic DNA</td>
                      <td className="py-3 px-4 border-b border-gray-200 text-gray-600">10 ng/µL</td>
                      <td className="py-3 px-4 border-b border-gray-200 text-gray-600">10 µL</td>
                      <td className="py-3 px-4 border-b border-gray-200 text-gray-600">1.8 - 2.0</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 border-b border-gray-200 text-gray-600">PCR Product</td>
                      <td className="py-3 px-4 border-b border-gray-200 text-gray-600">20 ng/µL</td>
                      <td className="py-3 px-4 border-b border-gray-200 text-gray-600">20 µL</td>
                      <td className="py-3 px-4 border-b border-gray-200 text-gray-600">1.8 - 2.0</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 border-b border-gray-200 text-gray-600">Plasmid DNA</td>
                      <td className="py-3 px-4 border-b border-gray-200 text-gray-600">50 ng/µL</td>
                      <td className="py-3 px-4 border-b border-gray-200 text-gray-600">20 µL</td>
                      <td className="py-3 px-4 border-b border-gray-200 text-gray-600">1.8 - 2.0</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 text-gray-600">Glycerol Stock</td>
                      <td className="py-3 px-4 text-gray-600">N/A</td>
                      <td className="py-3 px-4 text-gray-600">500 µL</td>
                      <td className="py-3 px-4 text-gray-600">N/A</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              
              <p className="text-gray-600 leading-relaxed">Measure concentration using a spectrophotometer (NanoDrop) or fluorometer (Qubit). Ensure samples are in nuclease-free water or TE buffer.</p>
            </div>
          </div>

          <div className="mb-12">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-full bg-gray-900 text-white text-xl font-bold flex items-center justify-center flex-shrink-0">3</div>
              <h2 className="text-2xl font-semibold text-gray-900">Labeling Requirements</h2>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-7">
              <p className="text-gray-600 leading-relaxed mb-4">Proper labeling ensures your samples are processed correctly:</p>
              <ul className="list-none p-0 m-4">
                <li className="text-gray-600 leading-relaxed pl-6 relative mb-2"><span className="absolute left-0 text-gray-900 font-bold">•</span> Label each tube with your <strong className="text-gray-900">order number</strong> (e.g., VW-12345)</li>
                <li className="text-gray-600 leading-relaxed pl-6 relative mb-2"><span className="absolute left-0 text-gray-900 font-bold">•</span> Include the <strong className="text-gray-900">fragment name</strong> as specified in your design</li>
                <li className="text-gray-600 leading-relaxed pl-6 relative mb-2"><span className="absolute left-0 text-gray-900 font-bold">•</span> Use waterproof, permanent labels</li>
                <li className="text-gray-600 leading-relaxed pl-6 relative"><span className="absolute left-0 text-gray-900 font-bold">•</span> For plates, include a plate map with well assignments</li>
              </ul>
              
              <div className="flex items-start gap-3 bg-blue-50/50 border border-blue-200 rounded-lg p-4">
                <svg className="w-5 h-5 text-blue-600 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 16v-4M12 8h.01" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <div className="text-sm text-gray-600 leading-relaxed">
                  <strong className="text-gray-900">Tip:</strong> Print and include a sample submission sheet with your shipment. This sheet is provided in your order confirmation email.
                </div>
              </div>
            </div>
          </div>

          <div className="mb-12">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-full bg-gray-900 text-white text-xl font-bold flex items-center justify-center flex-shrink-0">4</div>
              <h2 className="text-2xl font-semibold text-gray-900">Packaging Guidelines</h2>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-7">
              <p className="text-gray-600 leading-relaxed mb-4">Package your samples securely to prevent damage during shipping:</p>
              <ul className="list-none p-0 m-4">
                <li className="text-gray-600 leading-relaxed pl-6 relative mb-2"><span className="absolute left-0 text-gray-900 font-bold">•</span> Use <strong className="text-gray-900">1.5 mL microcentrifuge tubes</strong> for individual samples</li>
                <li className="text-gray-600 leading-relaxed pl-6 relative mb-2"><span className="absolute left-0 text-gray-900 font-bold">•</span> Seal tubes tightly with caps or parafilm</li>
                <li className="text-gray-600 leading-relaxed pl-6 relative mb-2"><span className="absolute left-0 text-gray-900 font-bold">•</span> Wrap tubes in bubble wrap or foam</li>
                <li className="text-gray-600 leading-relaxed pl-6 relative mb-2"><span className="absolute left-0 text-gray-900 font-bold">•</span> Place samples in a sealed bag with absorbent material</li>
                <li className="text-gray-600 leading-relaxed pl-6 relative mb-2"><span className="absolute left-0 text-gray-900 font-bold">•</span> For temperature-sensitive samples, include ice packs or dry ice</li>
                <li className="text-gray-600 leading-relaxed pl-6 relative"><span className="absolute left-0 text-gray-900 font-bold">•</span> Use a sturdy cardboard box with sufficient padding</li>
              </ul>
              
              <div className="flex items-start gap-3 bg-orange-50/50 border border-orange-200 rounded-lg p-4">
                <svg className="w-5 h-5 text-orange-600 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <div className="text-sm text-gray-600 leading-relaxed">
                  <strong className="text-orange-600">Warning:</strong> Do not ship samples on Fridays or before holidays to avoid weekend delays. Ship early in the week for best results.
                </div>
              </div>
            </div>
          </div>

          <div className="mb-12">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-full bg-gray-900 text-white text-xl font-bold flex items-center justify-center flex-shrink-0">5</div>
              <h2 className="text-2xl font-semibold text-gray-900">Shipping Options</h2>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-7">
              <p className="text-gray-600 leading-relaxed mb-4">Choose the shipping method that works best for you:</p>
              <ul className="list-none p-0 m-4">
                <li className="text-gray-600 leading-relaxed pl-6 relative mb-2"><span className="absolute left-0 text-gray-900 font-bold">•</span> <strong className="text-gray-900">Dropbox</strong> - Use our convenient dropbox locations (see <strong className="text-gray-900">Start Dropbox</strong> guide)</li>
                <li className="text-gray-600 leading-relaxed pl-6 relative mb-2"><span className="absolute left-0 text-gray-900 font-bold">•</span> <strong className="text-gray-900">Prepaid Label</strong> - Use the shipping label provided in your confirmation email</li>
                <li className="text-gray-600 leading-relaxed pl-6 relative"><span className="absolute left-0 text-gray-900 font-bold">•</span> <strong className="text-gray-900">Your Own Carrier</strong> - Ship via your preferred courier (FedEx, UPS, etc.)</li>
              </ul>
              <p className="text-gray-600 leading-relaxed">Include your order number on the outside of the package for easy identification.</p>
            </div>
          </div>

          <div className="mb-12">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-full bg-gray-900 text-white text-xl font-bold flex items-center justify-center flex-shrink-0">6</div>
              <h2 className="text-2xl font-semibold text-gray-900">Tracking and Confirmation</h2>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-7">
              <p className="text-gray-600 leading-relaxed mb-4">After shipping:</p>
              <ul className="list-none p-0 m-4">
                <li className="text-gray-600 leading-relaxed pl-6 relative mb-2"><span className="absolute left-0 text-gray-900 font-bold">•</span> Keep your tracking number for reference</li>
                <li className="text-gray-600 leading-relaxed pl-6 relative mb-2"><span className="absolute left-0 text-gray-900 font-bold">•</span> You'll receive an email when we receive your samples</li>
                <li className="text-gray-600 leading-relaxed pl-6 relative mb-2"><span className="absolute left-0 text-gray-900 font-bold">•</span> Track progress through your account dashboard</li>
                <li className="text-gray-600 leading-relaxed pl-6 relative"><span className="absolute left-0 text-gray-900 font-bold">•</span> Contact support if samples don't arrive within 3 business days</li>
              </ul>
            </div>
          </div>

          <div className="mb-12">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-full bg-gray-900 text-white text-xl font-bold flex items-center justify-center flex-shrink-0">7</div>
              <h2 className="text-2xl font-semibold text-gray-900">Troubleshooting</h2>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-7">
              <p className="text-gray-600 leading-relaxed mb-4">Common issues and solutions:</p>
              <ul className="list-none p-0 m-4">
                <li className="text-gray-600 leading-relaxed pl-6 relative mb-2"><span className="absolute left-0 text-gray-900 font-bold">•</span> <strong className="text-gray-900">Low concentration:</strong> Re-purify or concentrate your sample before resubmitting</li>
                <li className="text-gray-600 leading-relaxed pl-6 relative mb-2"><span className="absolute left-0 text-gray-900 font-bold">•</span> <strong className="text-gray-900">Contamination:</strong> Run a gel to check purity; re-amplify if necessary</li>
                <li className="text-gray-600 leading-relaxed pl-6 relative mb-2"><span className="absolute left-0 text-gray-900 font-bold">•</span> <strong className="text-gray-900">Wrong sequence:</strong> Verify sequence before shipping; we can only build what you provide</li>
                <li className="text-gray-600 leading-relaxed pl-6 relative"><span className="absolute left-0 text-gray-900 font-bold">•</span> <strong className="text-gray-900">Damaged shipment:</strong> Contact us immediately for replacement instructions</li>
              </ul>
              <p className="text-gray-600 leading-relaxed">If you encounter any issues, contact our support team at <a href="mailto:support@vectorweave.com" className="text-gray-900 hover:underline">support@vectorweave.com</a>.</p>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
}
