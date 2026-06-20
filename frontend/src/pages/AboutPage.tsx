import Header from "../components/Header";
import Footer from "../components/Footer";

export default function AboutPage() {
  return (
    <>
      <div className="pt-20 min-h-screen">
        <Header />
        
        <div className="text-center py-20 px-8 bg-gradient-to-br from-blue-50/50 to-blue-100/50 border-b border-gray-200 mb-12">
          <h1 className="text-5xl font-light text-gray-900 mb-4">About VectorWeave</h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed">Empowering researchers to build better plasmids, faster. We're transforming molecular cloning from a bottleneck into a streamlined process.</p>
        </div>

        <div className="max-w-6xl mx-auto px-8 pb-16">
          <div className="bg-white border border-gray-200 rounded-lg p-10 mb-12">
            <h2 className="text-3xl font-semibold text-gray-900 mb-4">Our Mission</h2>
            <p className="text-gray-600 leading-relaxed mb-4">VectorWeave was founded with a simple belief: researchers should spend their time on discovery, not on repetitive cloning work. We've built a platform that combines intelligent design tools with expert laboratory services to deliver sequence-verified plasmids in days, not weeks.</p>
            <p className="text-gray-600 leading-relaxed mb-8">By automating the cloning workflow and providing real-time visualization, we help scientists design with confidence. Our team of molecular biologists and software engineers work together to make plasmid construction accessible, reliable, and fast.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Speed</h3>
                <p className="text-gray-600 text-sm leading-relaxed">Typical turnaround in 1 week from sample receipt</p>
              </div>
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Quality</h3>
                <p className="text-gray-600 text-sm leading-relaxed">Every plasmid is sequence-verified before delivery</p>
              </div>
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Transparency</h3>
                <p className="text-gray-600 text-sm leading-relaxed">Real-time pricing and status updates throughout</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12 items-center">
            <div>
              <h2 className="text-3xl font-semibold text-gray-900 mb-4">Our Story</h2>
              <p className="text-gray-600 leading-relaxed mb-4">VectorWeave was born in a Cambridge laboratory where founders experienced firsthand the frustration of failed cloning experiments. Weekends spent on agarose gels, months of troubleshooting, and the constant uncertainty of whether a construct would work.</p>
              <p className="text-gray-600 leading-relaxed mb-4">We asked: why can't plasmid construction be as reliable as ordering reagents? Why should researchers spend valuable time on routine molecular biology when they could be focused on their actual experiments?</p>
              <p className="text-gray-600 leading-relaxed">The answer became VectorWeave—a service that combines intelligent design software with expert laboratory execution. We've processed thousands of plasmids for researchers across academia and industry, helping accelerate discoveries in synthetic biology, gene therapy, and basic research.</p>
            </div>
            <div className="bg-gradient-to-br from-blue-50/50 to-blue-100/50 border border-gray-200 rounded-lg p-8 flex items-center justify-center min-h-[300px]">
              <svg viewBox="0 0 200 200" fill="none" className="w-48 h-48">
                <circle cx="100" cy="100" r="80" stroke="#d4dae8" strokeWidth="8"/>
                <path d="M100 20 A80 80 0 0 1 180 100" stroke="#1d3461" strokeWidth="8" strokeLinecap="round"/>
                <path d="M180 100 A80 80 0 0 1 120 175" stroke="#1a7a4a" strokeWidth="8" strokeLinecap="round"/>
                <path d="M120 175 A80 80 0 0 1 40 140" stroke="#d94f2b" strokeWidth="8" strokeLinecap="round"/>
                <circle cx="100" cy="20" r="6" fill="#1d3461"/>
                <circle cx="180" cy="100" r="6" fill="#1a7a4a"/>
                <circle cx="120" cy="175" r="6" fill="#d94f2b"/>
              </svg>
            </div>
          </div>

          <div className="mb-12">
            <h2 className="text-3xl font-semibold text-gray-900 mb-6 text-center">Our Team</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white border border-gray-200 rounded-lg p-6 text-center">
                <div className="w-20 h-20 rounded-full bg-gray-50 border-2 border-gray-200 mx-auto mb-4 flex items-center justify-center text-4xl">👨‍🔬</div>
                <h3 className="text-base font-semibold text-gray-900 mb-1">Dr. Sarah Chen</h3>
                <p className="text-sm text-gray-600 mb-1">Co-Founder & CEO</p>
                <p className="text-xs text-gray-500 uppercase tracking-wider">Molecular Biology</p>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-6 text-center">
                <div className="w-20 h-20 rounded-full bg-gray-50 border-2 border-gray-200 mx-auto mb-4 flex items-center justify-center text-4xl">👨‍💻</div>
                <h3 className="text-base font-semibold text-gray-900 mb-1">James Miller</h3>
                <p className="text-sm text-gray-600 mb-1">Co-Founder & CTO</p>
                <p className="text-xs text-gray-500 uppercase tracking-wider">Software Engineering</p>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-6 text-center">
                <div className="w-20 h-20 rounded-full bg-gray-50 border-2 border-gray-200 mx-auto mb-4 flex items-center justify-center text-4xl">👩‍🔬</div>
                <h3 className="text-base font-semibold text-gray-900 mb-1">Dr. Emily Rodriguez</h3>
                <p className="text-sm text-gray-600 mb-1">Head of Lab Operations</p>
                <p className="text-xs text-gray-500 uppercase tracking-wider">Cloning Specialist</p>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-6 text-center">
                <div className="w-20 h-20 rounded-full bg-gray-50 border-2 border-gray-200 mx-auto mb-4 flex items-center justify-center text-4xl">👨‍🔧</div>
                <h3 className="text-base font-semibold text-gray-900 mb-1">Michael Park</h3>
                <p className="text-sm text-gray-600 mb-1">Lead Engineer</p>
                <p className="text-xs text-gray-500 uppercase tracking-wider">Full-Stack Development</p>
              </div>
            </div>
          </div>

          <div className="bg-gray-900 rounded-lg p-10 mb-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <h3 className="text-5xl font-light text-white mb-1">5,000+</h3>
                <p className="text-white/80 text-sm">Plasmids Delivered</p>
              </div>
              <div>
                <h3 className="text-5xl font-light text-white mb-1">99.2%</h3>
                <p className="text-white/80 text-sm">Success Rate</p>
              </div>
              <div>
                <h3 className="text-5xl font-light text-white mb-1">7 days</h3>
                <p className="text-white/80 text-sm">Average Turnaround</p>
              </div>
              <div>
                <h3 className="text-5xl font-light text-white mb-1">200+</h3>
                <p className="text-white/80 text-sm">Research Institutions</p>
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-10">
            <h2 className="text-3xl font-semibold text-gray-900 mb-4">Looking Forward</h2>
            <p className="text-gray-600 leading-relaxed mb-4">We're continuously expanding our capabilities to serve the evolving needs of the research community. Our roadmap includes automated high-throughput cloning, integration with popular design tools, and expanded service offerings for complex constructs.</p>
            <p className="text-gray-600 leading-relaxed">We believe that democratizing access to high-quality plasmid construction accelerates scientific progress. Every plasmid we build is one less obstacle between a researcher and their next discovery.</p>
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
}