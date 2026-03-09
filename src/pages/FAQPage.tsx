import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { faqData } from "@/data/demo-data";
import { ChevronDown } from "lucide-react";

interface FAQ {
  id: string;
  question: string;
  answer: string;
}

const FAQPage = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [faqs, setFaqs] = useState<FAQ[]>([]);

  useEffect(() => {
    const storedFaqs = localStorage.getItem("braidbook_faqs");
    if (storedFaqs) {
      setFaqs(JSON.parse(storedFaqs));
    } else {
      // Initialize with demo data if empty
      const formattedFaqs = faqData.map((f, i) => ({ ...f, id: `faq_${i}` }));
      setFaqs(formattedFaqs);
      localStorage.setItem("braidbook_faqs", JSON.stringify(formattedFaqs));
    }
  }, []);

  return (
    <div className="py-12 md:py-20 bg-background">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="text-center mb-12">
          <h1 className="font-serif text-4xl font-bold text-primary">Frequently Asked Questions</h1>
          <p className="text-detail mt-2 font-brand">Find answers to common questions about BraidLink</p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <motion.div
              key={faq.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.03 }}
              className="bg-card rounded-xl border border-detail/20 overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-accent/5 transition-colors"
              >
                <span className="font-medium text-sm pr-4 text-primary">{faq.question}</span>
                <ChevronDown className={`w-4 h-4 flex-shrink-0 text-accent transition-transform ${openIndex === i ? "rotate-180" : ""}`} />
              </button>
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="px-5 pb-4 text-sm text-detail leading-relaxed font-brand">{faq.answer}</div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQPage;
