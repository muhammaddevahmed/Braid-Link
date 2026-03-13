import { motion } from "framer-motion";
import { 
  Shield, Lock, FileText, AlertCircle, CheckCircle, 
  Mail, Phone, MapPin, Scale, BookOpen, Users, 
  Calendar, CreditCard, Crown, Star, MessageSquare,
  Ban, AlertTriangle, Gavel, RefreshCw, Sparkles,
  ChevronRight, Clock, Award, BadgeCheck, Fingerprint,
  Globe, FileCheck, Heart, Zap
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
      title: "1. Acceptance of Terms",
      icon: CheckCircle,
      content: `By accessing or using the BraidLink platform ("Platform"), you agree to be bound by these Terms of Service ("Terms"). If you do not agree to these Terms, please do not use our Platform. These Terms apply to all users, including customers, hair stylists, and administrators.`
    },
    {
      id: "description",
      title: "2. Description of Service",
      icon: FileText,
      content: `BraidLink is an online marketplace that connects customers seeking hair braiding services with professional hair stylists. We provide the technology platform to facilitate bookings, payments, reviews, and communication between parties. BraidLink is not a hair salon or styling service provider — we act as an intermediary marketplace.`
    },
    {
      id: "accounts",
      title: "3. User Accounts",
      icon: Users,
      content: "To use certain features, you must create an account. You agree to:",
      list: [
        "Provide accurate, current, and complete registration information",
        "Maintain the security of your password and account",
        "Accept responsibility for all activities under your account",
        "Notify us immediately of any unauthorized use of your account",
        "Not create more than one account per person without our consent"
      ],
      note: "We reserve the right to suspend or terminate accounts that violate these Terms."
    },
    {
      id: "customer",
      title: "4. Customer Terms",
      icon: Star,
      content: "As a customer, you agree to:",
      list: [
        "Provide accurate booking information including preferred services and timing",
        "Arrive on time for appointments or cancel/reschedule at least 24 hours in advance",
        "Pay for services rendered through the Platform's payment system",
        "Treat stylists with respect and professionalism",
        "Leave honest and fair reviews based on your actual experience",
        "Not engage in fraudulent or abusive behavior"
      ]
    },
    {
      id: "stylist",
      title: "5. Stylist Terms",
      icon: Crown,
      content: "As a hair stylist on BraidLink, you agree to:",
      list: [
        "Provide accurate information about your skills, experience, and services",
        "Maintain a clean, safe, and professional working environment",
        "Honor all accepted bookings and communicate promptly about any changes",
        "Deliver services as described in your profile and service listings",
        "Comply with all applicable local, state, and federal licensing requirements",
        "Maintain appropriate liability insurance where required by law",
        "Not solicit customers to transact outside the Platform"
      ]
    },
    {
      id: "bookings",
      title: "6. Bookings & Cancellations",
      icon: Calendar,
      list: [
        "Bookings are confirmed once both the customer and stylist have agreed to the appointment",
        "Cancellations made 24+ hours before the appointment are free of charge",
        "Late cancellations (within 24 hours) may incur a cancellation fee of up to 50% of the service price, as set by the stylist",
        "No-shows may be charged the full service price",
        "Stylists who repeatedly cancel or fail to honor bookings may face account suspension"
      ]
    },
    {
      id: "payments",
      title: "7. Payments & Fees",
      icon: CreditCard,
      list: [
        "All payments are processed securely through our approved payment partners",
        "BraidLink charges a platform service fee on each transaction (currently 10% for stylists)",
        "Customers are charged at the time of booking confirmation",
        "Stylists receive payment within 3-5 business days after service completion",
        "Withdrawal requests are processed within 3-4 business days via PayPal, debit card, or bank transfer",
        "All prices displayed on the Platform are in US Dollars unless stated otherwise",
        "BraidLink is not responsible for additional costs agreed upon between customer and stylist outside the Platform"
      ]
    },
    {
      id: "subscriptions",
      title: "8. Subscription Plans",
      icon: Crown,
      content: `Stylists may subscribe to monthly plans (Basic, Professional, or Premium) for enhanced features and visibility. Subscriptions auto-renew monthly. You may cancel at any time; cancellation takes effect at the end of the current billing period. No refunds are provided for partial billing periods.`
    },
    {
      id: "reviews",
      title: "9. Reviews & Content",
      icon: MessageSquare,
      list: [
        "Reviews must be based on genuine service experiences",
        "Reviews must not contain hate speech, profanity, personal attacks, or discriminatory language",
        "We reserve the right to remove reviews that violate these guidelines",
        "You retain ownership of content you post but grant BraidLink a license to display it on the Platform",
        "Portfolio images uploaded by stylists must be their own work or used with permission"
      ]
    },
    {
      id: "dispute",
      title: "10. Dispute Resolution",
      icon: Scale,
      content: `If a dispute arises between a customer and a stylist, both parties are encouraged to attempt resolution directly. If the dispute cannot be resolved, either party may file a complaint through our Contact page by selecting the "Dispute / Complaint" category. Our dispute resolution team will review the case and contact both parties within 24-48 hours. BraidLink's decision in dispute matters is final.`
    },
    {
      id: "prohibited",
      title: "11. Prohibited Activities",
      icon: Ban,
      content: "You may not use the Platform to:",
      list: [
        "Violate any applicable law, regulation, or third-party rights",
        "Post false, misleading, or deceptive content",
        "Harass, abuse, or discriminate against any user",
        "Attempt to bypass or manipulate Platform security measures",
        "Scrape, crawl, or collect data from the Platform without consent",
        "Use the Platform for any purpose other than its intended use"
      ]
    },
    {
      id: "liability",
      title: "12. Limitation of Liability",
      icon: AlertTriangle,
      content: `BraidLink provides the Platform on an "as is" and "as available" basis. We do not guarantee the quality, safety, or legality of services provided by stylists. To the fullest extent permitted by law, BraidLink shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of the Platform, including but not limited to personal injury, property damage, or dissatisfaction with services.`
    },
    {
      id: "indemnification",
      title: "13. Indemnification",
      icon: Shield,
      content: `You agree to indemnify, defend, and hold harmless BraidLink, its officers, directors, employees, and agents from any claims, damages, losses, or expenses arising from your use of the Platform, violation of these Terms, or infringement of any third-party rights.`
    },
    {
      id: "modifications",
      title: "14. Modifications to Terms",
      icon: RefreshCw,
      content: `We reserve the right to modify these Terms at any time. Material changes will be communicated via email or prominent notice on the Platform. Continued use of the Platform after changes constitutes acceptance of the revised Terms.`
    },
    {
      id: "governing",
      title: "15. Governing Law",
      icon: Gavel,
      content: `These Terms shall be governed by and construed in accordance with the laws of the State of New York, United States, without regard to conflict of law principles. Any disputes arising under these Terms shall be resolved in the courts located in New York County, New York.`
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
              <span className="w-1 h-1 rounded-full bg-white/30" />
              <span>Last Updated: March 8, 2026</span>
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
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
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
              { icon: Shield, label: "Your Rights", value: "Protected", color: "from-blue-500/20 to-blue-500/5" },
              { icon: Scale, label: "Fair Use", value: "Guaranteed", color: "from-purple-500/20 to-purple-500/5" },
              { icon: Clock, label: "Dispute Resolution", value: "24-48h", color: "from-amber-500/20 to-amber-500/5" },
              { icon: Award, label: "Compliance", value: "Legal", color: "from-green-500/20 to-green-500/5" },
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
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent/10 to-accent/5 flex items-center justify-center flex-shrink-0 mt-1 group-hover:scale-110 transition-transform">
                    <section.icon className="w-6 h-6 text-accent" />
                  </div>
                  <div className="flex-1">
                    <h2 className="font-serif text-xl md:text-2xl font-semibold text-primary mb-5">
                      {section.title}
                    </h2>
                    
                    {/* Regular content */}
                    {section.content && (
                      <p className="text-sm text-muted-foreground leading-relaxed mb-5">
                        {section.content}
                      </p>
                    )}

                    {/* List items - Premium */}
                    {section.list && (
                      <ul className="space-y-3 mb-5">
                        {section.list.map((item, i) => (
                          <li key={i} className="text-sm text-muted-foreground leading-relaxed flex items-start gap-3">
                            <div className="w-5 h-5 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                              <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                            </div>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    )}

                    {/* Notes - Premium */}
                    {section.note && (
                      <div className="mt-5 bg-accent/10 rounded-xl p-5 border border-accent/20 flex items-start gap-3">
                        <div className="w-8 h-8 rounded-lg bg-accent/20 flex items-center justify-center flex-shrink-0">
                          <AlertCircle className="w-4 h-4 text-accent" />
                        </div>
                        <p className="text-sm text-muted-foreground">{section.note}</p>
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
                  These Terms of Service constitute a legally binding agreement between you and BraidLink. 
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
                        <p className="text-sm font-semibold text-primary">BraidLink Inc.</p>
                        <p className="text-xs text-muted-foreground">123 Beauty Lane, Suite 200</p>
                        <p className="text-xs text-muted-foreground">New York, NY 10001</p>
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
            <span>© 2026 BraidLink. All rights reserved.</span>
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