import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { faqData } from "@/data/demo-data";
import { 
  ChevronDown, HelpCircle, Search, MessageCircle, 
  Sparkles, BookOpen, Mail, ChevronRight, Star,
  Shield, Clock, Users, Award, Zap, CheckCircle
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
      {/* Hero Section - Refined premium design */}
      <section className="relative overflow-hidden py-20 md:py-24 bg-gradient-to-br from-primary via-primary to-primary/95">
        {/* Sophisticated background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 right-20 w-96 h-96 bg-accent/10 rounded-full blur-[120px] animate-pulse" />
          <div className="absolute bottom-0 left-20 w-[500px] h-[500px] bg-accent/8 rounded-full blur-[140px] animate-pulse delay-1000" />
          
          {/* Refined pattern overlay */}
          <div className="absolute inset-0 opacity-[0.03]" 
               style={{ backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`, backgroundSize: '32px 32px' }} />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto text-center"
          >
            {/* Premium badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md text-white text-xs font-medium px-5 py-2.5 rounded-full mb-6 border border-white/20 shadow-xl"
            >
              <HelpCircle className="w-4 h-4 text-accent" />
              <span>Got Questions?</span>
              <span className="w-1 h-1 rounded-full bg-white/30" />
              <span>We've Got Answers</span>
            </motion.div>

            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Frequently Asked <br />
              <span className="text-accent relative inline-block">
                Questions
                <svg className="absolute -bottom-3 left-0 w-full" viewBox="0 0 200 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0 4L200 4" stroke="currentColor" strokeWidth="6" strokeLinecap="round" className="text-accent/40"/>
                </svg>
              </span>
            </h1>

            <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto leading-relaxed font-light">
              Find answers to common questions about BraidLink, booking, payments, and more.
            </p>
          </motion.div>
        </div>

        {/* Elegant curved divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
            <path d="M0 60L60 52C120 44 240 28 360 24C480 20 600 28 720 32C840 36 960 36 1080 32C1200 28 1320 20 1380 16L1440 12V60H0Z" fill="hsl(var(--background))" />
          </svg>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        

         

          {/* FAQ Categories indicator - using existing elements */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex items-center justify-center gap-2 mb-8"
          >
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-accent/30" />
            <span className="text-xs font-medium text-accent uppercase tracking-wider">Popular Topics</span>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-accent/30" />
          </motion.div>

          {/* FAQ Accordion - Premium redesign */}
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
                    className="w-full flex items-center justify-between px-6 md:px-8 py-5 text-left hover:bg-accent/5 transition-colors group"
                  >
                    <div className="flex items-start gap-4 flex-1">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent/10 to-accent/5 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform duration-300">
                        <HelpCircle className="w-5 h-5 text-accent" />
                      </div>
                      <span className="font-serif font-semibold text-base md:text-lg text-primary pr-4 group-hover:text-accent transition-colors">
                        {faq.question}
                      </span>
                    </div>
                    <div className={`w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center transition-all duration-300 ${
                      openIndex === i ? 'bg-accent rotate-180' : 'group-hover:bg-accent/20'
                    }`}>
                      <ChevronDown 
                        className={`w-5 h-5 transition-all duration-300 ${
                          openIndex === i ? "text-primary" : "text-accent"
                        }`} 
                      />
                    </div>
                  </button>
                  
                  <AnimatePresence>
                    {openIndex === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                      >
                        <div className="px-6 md:px-8 pb-6 pl-14 md:pl-20">
                          <div className="border-t border-border/50 pt-5">
                            <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                              {faq.answer}
                            </p>
                            
                          
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
                className="text-center py-20 bg-gradient-to-br from-card to-secondary/5 rounded-3xl border border-border/50 shadow-xl"
              >
                <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-accent/10 to-accent/5 flex items-center justify-center mx-auto mb-6">
                  <Search className="w-10 h-10 text-accent" />
                </div>
                <h3 className="font-serif text-2xl font-bold text-primary mb-3">No questions found</h3>
                <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                  No results match your search. Try different keywords or browse all FAQs.
                </p>
                <button
                  onClick={() => setSearchTerm("")}
                  className="bg-accent text-primary font-semibold px-6 py-3 rounded-xl hover:bg-accent/90 transition-all duration-300 shadow-lg hover:shadow-accent/25 inline-flex items-center gap-2 group"
                >
                  Clear search
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </motion.div>
            )}
          </motion.div>

          {/* Still Have Questions? - Premium redesign */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-20 text-center bg-gradient-to-br from-primary to-primary/95 rounded-3xl p-10 md:p-12 border border-accent/20 shadow-2xl relative overflow-hidden group"
          >
            {/* Animated background */}
            <div className="absolute inset-0">
              <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 rounded-full blur-[80px] group-hover:scale-150 transition-transform duration-1000" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/8 rounded-full blur-[80px] group-hover:scale-150 transition-transform duration-1000 delay-300" />
            </div>
            
            <div className="relative z-10">
              <div className="w-20 h-20 rounded-2xl bg-accent flex items-center justify-center mx-auto mb-6 shadow-xl">
                <MessageCircle className="w-10 h-10 text-primary" />
              </div>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-white mb-4">
                Still Have Questions?
              </h2>
              <p className="text-white/80 mb-8 max-w-md mx-auto text-lg">
                Can't find what you're looking for? Our support team is here to help.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/contact"
                  className="bg-accent text-primary font-semibold inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl hover:bg-accent/90 transition-all duration-300 shadow-xl hover:shadow-accent/25 group"
                >
                  <Mail className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  Contact Support
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                
               \
              </div>
            </div>
          </motion.div>

          {/* Trust Badges - Premium redesign */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-16 flex flex-wrap justify-center gap-8"
          >
            {[
              { icon: Shield, text: "Secure Support", color: "from-blue-500/20 to-blue-500/5" },
              { icon: Clock, text: "24/7 Available", color: "from-green-500/20 to-green-500/5" },
              { icon: Award, text: "Expert Answers", color: "from-yellow-500/20 to-yellow-500/5" },
              { icon: Star, text: "98% Satisfaction", color: "from-purple-500/20 to-purple-500/5" },
            ].map((badge, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 + i * 0.05 }}
                className="flex items-center gap-3 text-sm bg-card px-4 py-2 rounded-full border border-border/50 shadow-md hover:shadow-lg transition-all hover:border-accent/30"
              >
                <div className={`w-8 h-8 rounded-full bg-gradient-to-br from-accent/10 to-accent/5 flex items-center justify-center`}>
                  <badge.icon className="w-4 h-4 text-accent" />
                </div>
                <span className="text-muted-foreground font-medium">{badge.text}</span>
                <CheckCircle className="w-4 h-4 text-accent/60" />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Footer Note - Premium redesign */}
      <div className="border-t border-border/40 py-8 bg-gradient-to-b from-secondary/5 to-secondary/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-xs text-muted-foreground/60 tracking-wide flex items-center justify-center gap-2">
            <Sparkles className="w-3 h-3 text-accent" />
            Updated regularly with the latest information
            <span className="w-1 h-1 rounded-full bg-accent/30" />
            © 2026 BraidLink
          </p>
        </div>
      </div>
    </div>
  );
};

export default FAQPage;

// Add missing ThumbsUp icon import
import { ThumbsUp } from "lucide-react";