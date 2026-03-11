import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { faqData } from "@/data/demo-data";
import { 
  ChevronDown, HelpCircle, Search, MessageCircle, 
  Sparkles, BookOpen, Mail, ChevronRight, Star,
  Shield, Clock, Users, Award
} from "lucide-react";
import { Link } from "react-router-dom";

interface FAQ {
  id: string;
  question: string;
  answer: string;
}

const FAQPage = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredFaqs, setFilteredFaqs] = useState<FAQ[]>([]);

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

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredFaqs(faqs);
    } else {
      const filtered = faqs.filter(
        (faq) =>
          faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
          faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredFaqs(filtered);
    }
  }, [searchTerm, faqs]);

  // Animation variants
  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.05, duration: 0.5 } }),
  };

  return (
    <div className="relative bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-16 md:py-20 bg-gradient-to-b from-primary to-primary/95">
        {/* Animated background */}
        <div className="absolute inset-0">
          <div className="absolute top-10 right-10 w-80 h-80 bg-accent/10 rounded-full blur-[100px] animate-pulse" />
          <div className="absolute bottom-0 left-10 w-[400px] h-[400px] bg-accent/8 rounded-full blur-[120px] animate-pulse delay-1000" />
          <div className="absolute inset-0 opacity-5" 
               style={{ backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`, backgroundSize: '40px 40px' }} />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto text-center"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-accent/20 backdrop-blur-sm text-background text-xs font-medium px-5 py-2.5 rounded-full mb-6 border border-accent/30 shadow-lg"
            >
              <HelpCircle className="w-4 h-4 text-accent" />
              <span>Got Questions?</span>
              <span className="w-1.5 h-1.5 rounded-full bg-accent/50" />
              <span>We've Got Answers</span>
            </motion.div>

            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-background mb-6 leading-tight">
              Frequently Asked <br />
              <span className="text-accent relative">
                Questions
                <svg className="absolute -bottom-3 left-0 w-full" viewBox="0 0 200 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0 4L200 4" stroke="currentColor" strokeWidth="6" strokeLinecap="round" className="text-accent/30"/>
                </svg>
              </span>
            </h1>

            <p className="text-lg md:text-xl text-background/80 max-w-2xl mx-auto leading-relaxed font-brand">
            Find answers to common questions about BraidLink, booking, payments, and more.
            </p>
          </motion.div>
        </div>

        {/* Curved divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path d="M0 60L60 52C120 44 240 28 360 24C480 20 600 28 720 32C840 36 960 36 1080 32C1200 28 1320 20 1380 16L1440 12V60H0Z" fill="hsl(var(--background))" />
          </svg>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          
          {/* Quick Stats */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10"
          >
            {[
              { icon: Clock, label: "Avg Response", value: "< 2 min" },
              { icon: Users, label: "Happy Users", value: "10k+" },
              { icon: Star, label: "Helpful Rating", value: "98%" },
              { icon: Shield, label: "Secure", value: "100%" },
            ].map((stat, i) => (
              <motion.div 
                key={i}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                className="bg-card rounded-xl p-4 border border-border/50 flex items-center gap-3 hover:shadow-lg transition-shadow"
              >
                <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                  <stat.icon className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <p className="text-xs text-detail">{stat.label}</p>
                  <p className="font-bold text-primary">{stat.value}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

         
          

          {/* FAQ Accordion */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="space-y-4"
          >
            {filteredFaqs.length > 0 ? (
              filteredFaqs.map((faq, i) => (
                <motion.div
                  key={faq.id}
                  custom={i}
                  variants={fadeUp}
                  initial="hidden"
                  animate="visible"
                  className="bg-card rounded-2xl border border-border/50 overflow-hidden hover:border-accent/30 transition-all duration-300 shadow-md hover:shadow-xl"
                >
                  <button
                    onClick={() => setOpenIndex(openIndex === i ? null : i)}
                    className="w-full flex items-center justify-between px-6 py-5 text-left hover:bg-accent/5 transition-colors group"
                  >
                    <div className="flex items-start gap-3 flex-1">
                      <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform">
                        <HelpCircle className="w-4 h-4 text-accent" />
                      </div>
                      <span className="font-serif font-semibold text-base text-primary pr-4">{faq.question}</span>
                    </div>
                    <ChevronDown 
                      className={`w-5 h-5 flex-shrink-0 text-accent transition-all duration-300 ${
                        openIndex === i ? "rotate-180" : ""
                      }`} 
                    />
                  </button>
                  
                  <AnimatePresence>
                    {openIndex === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                      >
                        <div className="px-6 pb-5 pl-14">
                          <div className="border-t border-border/50 pt-4">
                            <p className="text-sm text-detail leading-relaxed font-brand">{faq.answer}</p>
                            
                           
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))
            ) : (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-16 bg-card rounded-2xl border border-border/50"
              >
                <div className="w-20 h-20 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                  <Search className="w-8 h-8 text-accent" />
                </div>
                <h3 className="font-serif text-xl font-bold text-primary mb-2">No questions found</h3>
                <p className="text-detail mb-6">No results match your search. Try different keywords.</p>
                <button
                  onClick={() => setSearchTerm("")}
                  className="text-accent font-semibold hover:underline"
                >
                  Clear search
                </button>
              </motion.div>
            )}
          </motion.div>

          {/* Still Have Questions? */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-16 text-center bg-gradient-to-br from-accent/10 to-accent/5 rounded-3xl p-8 md:p-10 border border-accent/20"
          >
            <div className="relative">
              <div className="absolute -top-4 -right-4 w-16 h-16 bg-accent/20 rounded-full blur-2xl" />
              <div className="relative z-10">
                <div className="w-16 h-16 rounded-full bg-accent flex items-center justify-center mx-auto mb-4">
                  <MessageCircle className="w-8 h-8 text-primary" />
                </div>
                <h2 className="font-serif text-2xl md:text-3xl font-bold text-primary mb-3">
                  Still Have Questions?
                </h2>
                <p className="text-detail mb-6 max-w-md mx-auto">
                  Can't find what you're looking for? Our support team is here to help.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Link
                    to="/contact"
                    className="btn-cta inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm"
                  >
                    <Mail className="w-4 h-4" />
                    Contact Support
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                 
                </div>
              </div>
            </div>
          </motion.div>

          {/* Trust Badges */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-12 flex flex-wrap justify-center gap-6"
          >
            {[
              { icon: Shield, text: "Secure Support" },
              { icon: Clock, text: "24/7 Available" },
              { icon: Award, text: "Expert Answers" },
              { icon: Star, text: "98% Satisfaction" },
            ].map((badge, i) => (
              <div key={i} className="flex items-center gap-2 text-xs text-detail">
                <badge.icon className="w-4 h-4 text-accent" />
                <span>{badge.text}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Footer Note */}
      <div className="border-t border-border py-6 bg-secondary/10">
        <div className="container mx-auto px-4">
          <p className="text-center text-xs text-detail flex items-center justify-center gap-2">
            <Sparkles className="w-3 h-3 text-accent" />
            Updated regularly with the latest information | © 2026 BraidLink
          </p>
        </div>
      </div>
    </div>
  );
};

export default FAQPage;