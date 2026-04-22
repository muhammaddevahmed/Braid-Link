import { motion } from "framer-motion";
import { 
  Shield, Lock, FileText, AlertCircle, CheckCircle, 
  Mail, Phone, MapPin, Scale, BookOpen, Users, 
  Calendar, CreditCard, Crown, Star, MessageSquare,
  Ban, AlertTriangle, Gavel, RefreshCw, Sparkles,
  ChevronRight, Clock, Award, BadgeCheck, Fingerprint,
  Globe, FileCheck, Heart, Zap, Briefcase, FileSpreadsheet
} from "lucide-react";
import { Link } from "react-router-dom";

const TermsOfServicePage = () => {
  // Animation variants
  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5 } }),
  };

  const sections = [
    {
      id: "acceptance",
      title: "1. Terms and Conditions of Service",
      icon: Scale,
      content: `This document establishes the tripartite legal relationship between the platform, the independent stylist, and the customer.`,
      subsections: [
        {
          title: "Platform Role & Intermediary Status",
          content: `BraidLink Ltd acts strictly as a technology intermediary. It is explicitly stated that BraidLink Ltd does not provide hairdressing services and is not the employer of any stylist.`
        },
        {
          title: "Booking and Financial Architecture",
          content: `All transactions are processed through Stripe. A non-refundable 10% booking fee is applied to every transaction to cover platform administrative costs.`
        },
        {
          title: "Cancellation and Performance Standards",
          list: [
            "Customer-Led: Cancellations with more than 48 hours' notice trigger a 90% refund. Cancellations within 48 hours result in a credit voucher only.",
            "Stylist-Led: If a stylist cancels with at least 48 hours' notice, the customer receives a 100% refund.",
            "No-Show Protection: If a customer fails to arrive within 30 minutes of the appointment, they are issued a 90% voucher, and the remainder is retained as a convenience fee."
          ]
        },
        {
          title: "Dispute Resolution",
          content: `BraidLink Ltd retains the absolute and final right to arbitrate and decide on all booking disputes between stylists and customers.`
        },
        {
          title: "Liability Limitations",
          content: `Liability is strictly limited to the total value of the transaction in question.`
        },
        {
          title: "Jurisdiction",
          content: `These terms are governed by the laws of England and Wales.`
        }
      ]
    },
    {
      id: "stylist",
      title: "2. Professional Stylist Agreement",
      icon: Crown,
      content: `This creates the "Seller" framework required for HMRC reporting and professional standards.`,
      subsections: [
        {
          title: "Status of Engagement",
          content: `Stylists are engaged as independent contractors and are solely responsible for their own tax, National Insurance, and professional equipment.`
        },
        {
          title: "Commercial Terms",
          content: `BraidLink Ltd deducts a 15% commission from the total service fee. Payouts are scheduled 2–3 days following the successful completion of a service.`
        },
        {
          title: "Quality & Safety Obligations",
          content: `Stylists must provide accurate service descriptions and always maintain professional behaviour.`
        },
        {
          title: "Insurance Governance",
          content: `While BraidLink Ltd recommends that all stylists maintain Public and Treatment Liability Insurance, it is currently listed as a recommendation rather than a mandatory prerequisite for platform entry.`
        }
      ]
    },
    {
      id: "aup",
      title: "3. Acceptable Use Policy (AUP)",
      icon: Shield,
      content: `This policy protects the integrity of the platform's digital environment.`,
      subsections: [
        {
          title: "Prohibited Activities",
          content: `Users are strictly forbidden from using the platform for unlawful purposes, harassing other community members, or uploading harmful or defamatory content.`
        },
        {
          title: "Commercial Integrity",
          content: `Any attempt to bypass BraidLink Ltd payment systems to avoid commission fees is a breach of this policy and grounds for immediate account termination.`
        }
      ]
    }
  ];

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
              <Scale className="w-4 h-4 text-accent" />
              <span>Legal Agreement</span>
              
            </motion.div>

            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Terms of <br />
              <span className="text-accent relative inline-block">
                Service
                <svg className="absolute -bottom-3 left-0 w-full" viewBox="0 0 200 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0 4L200 4" stroke="currentColor" strokeWidth="6" strokeLinecap="round" className="text-accent/40"/>
                </svg>
              </span>
            </h1>

            <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto leading-relaxed font-light">
              Please read these terms carefully before using the BraidLink platform. By using our services, you agree to be bound by these terms.
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
          
          {/* Quick Navigation - Premium redesign */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-card rounded-2xl p-6 md:p-8 border border-border/50 shadow-lg hover:shadow-xl transition-all mb-12"
          >
            <h2 className="font-serif text-lg md:text-xl font-semibold text-primary mb-5 flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center">
                <BookOpen className="w-4 h-4 text-accent" />
              </div>
              Quick Navigation
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {sections.map((section, i) => (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  className="text-xs text-muted-foreground hover:text-accent transition-all p-3 hover:bg-accent/5 rounded-lg flex items-center gap-1.5 group border border-transparent hover:border-accent/20"
                >
                  <ChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  {section.title.split(' ')[1]}
                </a>
              ))}
            </div>
          </motion.div>

          {/* Key Points Summary - Premium redesign */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5 mb-12"
          >
            {[
              { icon: Scale, label: "Jurisdiction", value: "England & Wales", color: "from-blue-500/20 to-blue-500/5" },
              { icon: Briefcase, label: "Stylist Commission", value: "15%", color: "from-purple-500/20 to-purple-500/5" },
              { icon: Clock, label: "Payouts", value: "2-3 Days", color: "from-amber-500/20 to-amber-500/5" },
              
            ].map((stat, i) => (
              <motion.div 
                key={i}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                className="bg-card rounded-xl p-5 border border-border/50 hover:border-accent/30 transition-all duration-300 hover:shadow-xl group"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br from-accent/10 to-accent/5 flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    <stat.icon className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground font-medium">{stat.label}</p>
                    <p className="font-serif font-bold text-xl text-primary">{stat.value}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Terms Sections - Premium redesign */}
          <div className="space-y-8">
            {sections.map((section, index) => (
              <motion.section
                key={section.id}
                id={section.id}
                custom={index}
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                className="bg-card rounded-2xl p-6 md:p-8 border border-border/50 shadow-lg hover:shadow-xl transition-all scroll-mt-20"
              >
                <div className="flex items-start gap-5">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent/10 to-accent/5 flex items-center justify-center flex-shrink-0 mt-1">
                    <section.icon className="w-6 h-6 text-accent" />
                  </div>
                  <div className="flex-1">
                    <h2 className="font-serif text-xl md:text-2xl font-semibold text-primary mb-5">
                      {section.title}
                    </h2>
                    
                    {/* Main content */}
                    {section.content && (
                      <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                        {section.content}
                      </p>
                    )}

                    {/* Subsections */}
                    {section.subsections && (
                      <div className="space-y-6">
                        {section.subsections.map((subsection, i) => (
                          <div key={i} className="border-l-2 border-accent/20 pl-4">
                            <h3 className="font-serif text-base font-semibold text-primary mb-3 flex items-center gap-2">
                              <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                              {subsection.title}
                            </h3>
                            
                            {subsection.content && (
                              <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                                {subsection.content}
                              </p>
                            )}

                            {subsection.list && (
                              <ul className="space-y-2">
                                {subsection.list.map((item, j) => (
                                  <li key={j} className="text-sm text-muted-foreground leading-relaxed flex items-start gap-2">
                                    <div className="w-4 h-4 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                                      <span className="w-1 h-1 rounded-full bg-accent" />
                                    </div>
                                    <span>{item}</span>
                                  </li>
                                ))}
                              </ul>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </motion.section>
            ))}
          </div>

          {/* Important Notice - Premium redesign */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-12 bg-gradient-to-br from-accent/5 to-accent/0 rounded-3xl p-8 md:p-10 border border-accent/20 shadow-xl"
          >
            <div className="flex items-start gap-6">
              <div className="w-16 h-16 rounded-2xl bg-accent flex items-center justify-center flex-shrink-0 shadow-xl">
                <AlertTriangle className="w-8 h-8 text-primary" />
              </div>
              <div className="flex-1">
                <h2 className="font-serif text-2xl md:text-3xl font-bold text-primary mb-4">Important Legal Notice</h2>
                <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
                  These Terms of Service constitute a legally binding agreement between you and BraidLink Ltd. 
                  By using our platform, you acknowledge that you have read, understood, and agree to be bound by these terms.
                </p>
                <div className="bg-background/50 rounded-xl p-5 border border-accent/10">
                  <div className="flex items-start gap-3">
                    <BadgeCheck className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-muted-foreground">
                      If you have any questions about these terms, please contact our legal department at <span className="text-accent font-semibold">legal@braidlink.com</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Section - Premium redesign */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-12 bg-card rounded-3xl p-8 md:p-10 border border-border/50 shadow-lg hover:shadow-xl transition-all"
          >
            <div className="flex items-start gap-6">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-accent/10 to-accent/5 flex items-center justify-center flex-shrink-0">
                <Mail className="w-8 h-8 text-accent" />
              </div>
              <div className="flex-1">
                <h2 className="font-serif text-2xl md:text-3xl font-bold text-primary mb-4">Contact Us</h2>
                <p className="text-sm text-muted-foreground mb-6 max-w-2xl">
                  If you have questions about these Terms of Service, please contact us at:
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-4 group hover:bg-accent/5 p-3 rounded-xl transition-all">
                      <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <MapPin className="w-4 h-4 text-accent" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-primary">BraidLink Ltd</p>
                        <p className="text-xs text-muted-foreground">123 Beauty Lane, Suite 200</p>
                        <p className="text-xs text-muted-foreground">London, United Kingdom</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center gap-4 group hover:bg-accent/5 p-3 rounded-xl transition-all">
                      <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Mail className="w-4 h-4 text-accent" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Email</p>
                        <p className="text-sm font-semibold text-primary">legal@braidlink.com</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4 group hover:bg-accent/5 p-3 rounded-xl transition-all">
                      <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Phone className="w-4 h-4 text-accent" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Phone</p>
                        <p className="text-sm font-semibold text-primary">(555) 987-6543</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-border/50">
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <div className="flex items-center gap-2 bg-accent/10 px-3 py-2 rounded-full">
                      <Clock className="w-3 h-3 text-accent" />
                      <span>Legal department response: Within 24-48 hours</span>
                    </div>
                    <Fingerprint className="w-4 h-4 text-accent" />
                  </div>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Footer Note - Premium */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="mt-12 text-center"
          >
            <div className="inline-flex items-center gap-2 text-xs text-muted-foreground bg-card/50 backdrop-blur-sm px-4 py-2 rounded-full border border-border/50 shadow-sm">
              <Heart className="w-3 h-3 text-accent" />
              <span>By using BraidLink, you agree to these Terms of Service</span>
              <Zap className="w-3 h-3 text-accent" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer - Premium redesign */}
      <div className="border-t border-border/40 py-8 bg-gradient-to-b from-secondary/5 to-secondary/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-xs text-muted-foreground/60 tracking-wide flex items-center justify-center gap-3">
            <span>© 2026 BraidLink Ltd. All rights reserved.</span>
            <span className="w-1 h-1 rounded-full bg-accent/30" />
            <Link to="/terms-of-service" className="text-accent hover:text-accent/80 transition-colors flex items-center gap-1 group">
              <Gavel className="w-3 h-3 group-hover:scale-110 transition-transform" />
              Terms of Service
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default TermsOfServicePage;