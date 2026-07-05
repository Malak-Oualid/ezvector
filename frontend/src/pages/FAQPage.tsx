import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

const FAQS: FAQItem[] = [
  {
    id: "1",
    category: "General",
    question: "What is VectorWeave?",
    answer: "VectorWeave is a plasmid construction service that allows researchers to design and order custom plasmids through an intuitive web interface. We offer multi-insert cloning, site-directed mutagenesis, custom backbone construction, and more—all with live visualization and automated pricing."
  },
  {
    id: "2",
    category: "General",
    question: "How does VectorWeave differ from traditional cloning?",
    answer: "Unlike traditional cloning that requires hands-on bench work, VectorWeave handles the entire process for you. Simply design your plasmid online, send us your DNA fragments, and receive sequence-verified plasmids in days. No more weekends spent on agarose gels or failed reactions."
  },
  {
    id: "3",
    category: "Services",
    question: "What types of services do you offer?",
    answer: "We offer Multi-Insert Cloning (up to 5 fragments), Site-Directed Mutagenesis (up to 7 mutations), Custom Backbone Construction, Domain Mutagenesis, and Synthetic DNA Cloning. Each service includes validation, visualization, and sequence verification."
  },
  {
    id: "4",
    category: "Services",
    question: "What is the maximum number of fragments I can clone?",
    answer: "For Multi-Insert Cloning, we support up to 5 fragments in a single build. For mutagenesis, you can introduce up to 7 substitutions, deletions, or insertions. If you need more complex assemblies, contact us for custom solutions."
  },
  {
    id: "5",
    category: "Pricing",
    question: "How is pricing calculated?",
    answer: "Pricing is calculated in real-time based on your design. Factors include the number of fragments, fragment length, GC content, and mutation count. Our pricing is transparent—you'll see the exact cost before you submit your order."
  },
  {
    id: "6",
    category: "Pricing",
    question: "Are there any hidden fees?",
    answer: "No. Our pricing is completely transparent. The price you see at checkout is the final price. There are no onboarding fees, setup costs, or hidden charges."
  },
  {
    id: "7",
    category: "Process",
    question: "How do I submit an order?",
    answer: "Simply design your plasmid using our interactive builder, add it to your cart, and checkout. You'll receive submission instructions for sending your DNA fragments. We accept samples via dropbox or direct mail."
  },
  {
    id: "8",
    category: "Process",
    question: "What DNA formats do you accept?",
    answer: "We accept synthetic DNA fragments from any vendor, as well as your own PCR products or plasmid DNA. For mutagenesis, you can provide the backbone plasmid. Detailed sample preparation guidelines are provided after order placement."
  },
  {
    id: "9",
    category: "Timeline",
    question: "What is the turnaround time?",
    answer: "Typical turnaround time is approximately 1 week from sample receipt. Complex builds or high-volume orders may take slightly longer. You'll receive a timeline estimate with your order confirmation."
  },
  {
    id: "10",
    category: "Timeline",
    question: "Can I expedite my order?",
    answer: "Yes, we offer expedited service for urgent projects. Contact us before placing your order to discuss rush options and additional fees."
  },
  {
    id: "11",
    category: "Quality",
    question: "How do you ensure quality?",
    answer: "Every plasmid we deliver is sequence-verified. We use Sanger sequencing to confirm the entire construct, ensuring your plasmid matches your design exactly. We also provide sequence files and chromatograms."
  },
  {
    id: "12",
    category: "Quality",
    question: "What if my plasmid has errors?",
    answer: "In the rare event of a sequencing error, we'll rebuild your plasmid at no additional cost. Your satisfaction is guaranteed."
  },
  {
    id: "13",
    category: "Payment",
    question: "What payment methods do you accept?",
    answer: "We accept credit cards (Visa, MasterCard, American Express) and purchase orders (PO) for institutional customers. All transactions are secure and encrypted."
  },
  {
    id: "14",
    category: "Payment",
    question: "Do you offer institutional pricing?",
    answer: "Yes, we offer volume discounts and institutional pricing for labs with ongoing needs. Contact us to discuss custom pricing arrangements."
  },
  {
    id: "15",
    category: "Shipping",
    question: "How are plasmids shipped?",
    answer: "Plasmids are shipped as glycerol stocks or purified DNA, depending on your preference. We use overnight shipping on ice to ensure viability. International shipping is available."
  },
  {
    id: "16",
    category: "Account",
    question: "Do I need an account to place an order?",
    answer: "Yes, creating an account allows you to track orders, view order history, save plasmid designs, and manage your profile. It's free and only takes a minute."
  }
];

const CATEGORIES = ["All", "General", "Services", "Pricing", "Process", "Timeline", "Quality", "Payment", "Shipping", "Account"];

export default function FAQPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());
  const [searchQuery, setSearchQuery] = useState("");

  const toggleExpand = (id: string) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedItems(newExpanded);
  };

  const filteredFAQs = FAQS.filter(faq => {
    const matchesCategory = selectedCategory === "All" || faq.category === selectedCategory;
    const matchesSearch = searchQuery === "" || 
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <>
      <div className="pt-20 min-h-screen">
        <Header />
        
        <div className="text-center py-16 px-8 bg-gradient-to-br from-blue-50/50 to-blue-100/50 border-b border-gray-200 mb-8">
          <h1 className="text-4xl font-light text-gray-900 mb-3">Frequently Asked Questions</h1>
          <p className="text-gray-600 max-w-xl mx-auto">Find answers to common questions about our services, pricing, and process.</p>
          
          <div className="max-w-xl mx-auto mt-8">
            <input
              type="text"
              className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-gray-900 focus:ring-2 focus:ring-gray-900/10 transition-all"
              placeholder="Search FAQs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="flex gap-2 flex-wrap justify-center px-8 mb-8">
          {CATEGORIES.map(category => (
            <button
              key={category}
              className={`px-4 py-2 rounded-full text-sm font-medium border transition-all ${
                selectedCategory === category 
                  ? 'bg-gray-900 border-gray-900 text-white' 
                  : 'bg-white border-gray-200 text-gray-600 hover:border-gray-900 hover:text-gray-900'
              }`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="max-w-4xl mx-auto px-8 pb-16">
          {filteredFAQs.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <p>No FAQs found matching your criteria.</p>
            </div>
          ) : (
            filteredFAQs.map(faq => (
              <div
                key={faq.id}
                className="bg-white border border-gray-200 rounded-lg mb-3 overflow-hidden transition-all hover:border-gray-300"
              >
                <div 
                  className="p-5 cursor-pointer flex items-center justify-between gap-4"
                  onClick={() => toggleExpand(faq.id)}
                >
                  <span className="text-xs font-semibold uppercase tracking-wider text-gray-500 bg-gray-100 px-2.5 py-1 rounded">
                    {faq.category}
                  </span>
                  <span className="text-sm font-medium text-gray-900 flex-1">{faq.question}</span>
                  <svg 
                    className={`w-5 h-5 flex-shrink-0 transition-transform ${expandedItems.has(faq.id) ? 'rotate-180' : ''}`} 
                    viewBox="0 0 20 20" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2"
                  >
                    <path d="M5 8l5 5 5-5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                {expandedItems.has(faq.id) && (
                  <div className="px-5 pb-5 pt-0 text-sm text-gray-600 leading-relaxed border-t border-gray-200">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))
          )}
        </div>

        <div className="text-center py-12 px-8 mt-8 bg-white border border-gray-200 rounded-lg max-w-xl mx-auto mb-16">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Still have questions?</h3>
          <p className="text-gray-600 text-sm mb-4">Can't find what you're looking for? Our team is here to help.</p>
          <Link to="/contact" className="inline-block px-6 py-2 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition-all">
            Contact Us
          </Link>
        </div>

        <Footer />
      </div>
    </>
  );
}
