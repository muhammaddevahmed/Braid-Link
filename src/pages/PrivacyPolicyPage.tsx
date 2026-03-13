import { motion } from "framer-motion";
import { 
  Shield, Lock, Cookie, Eye, Mail, Phone, MapPin, 
  FileText, CheckCircle, AlertCircle, RefreshCw, 
  Users, CreditCard, Calendar, Sparkles, ChevronRight,
  BookOpen, Award, Clock, BadgeCheck, Fingerprint,
  Globe, FileCheck, Scale, Gavel
} from "lucide-react";
import { Link } from "react-router-dom";

const PrivacyPolicyPage = () => {
  // Animation variants
  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5 } }),
  };

  const sections = [
    {
      id: "introduction",
      title: "1. Introduction",
      icon: Shield,
      content: `Welcome to BraidLink ("we," "our," or "us"). We are committed to protecting your personal information and your right to privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our hair braiding marketplace platform, including any related mobile application (collectively, the "Platform").`
    },
    {
      id: "collection",
      title: "2. Information We Collect",
      icon: FileText,
      content: "We collect information that you voluntarily provide to us when you:",
      list: [
        "Register for an account as a customer or hair stylist",
        "Book an appointment or manage your stylist profile",
        "Make a payment or request a withdrawal",
        "Communicate with us through contact forms, email, or dispute submissions",
        "Leave reviews or ratings for stylists",
        "Subscribe to our newsletter or marketing communications"
      ],
      subContent: [
        { label: "Personal Data:", text: "Name, email address, phone number, postal code, profile photos, payment information (processed securely via third-party providers), and service preferences." },
        { label: "Automatically Collected Data:", text: "IP address, browser type, device information, operating system, referring URLs, pages viewed, access times, and cookies." }
      ]
    },
    {
      id: "usage",
      title: "3. How We Use Your Information",
      icon: Eye,
      list: [
        "To create and manage your account",
        "To facilitate bookings between customers and stylists",
        "To process payments and withdrawals securely",
        "To send booking confirmations, reminders, and updates",
        "To display stylist profiles, reviews, and portfolios to customers",
        "To resolve disputes between customers and stylists",
        "To improve our Platform, features, and user experience",
        "To comply with legal obligations and enforce our Terms of Service",
        "To send marketing and promotional communications (with your consent)"
      ]
    },
    {
      id: "sharing",
      title: "4. Information Sharing & Disclosure",
      icon: Users,
      content: "We may share your information in the following situations:",
      list: [
        { strong: "Between Users:", text: " Customer names and booking details are shared with stylists (and vice versa) to facilitate appointments." },
        { strong: "Payment Processors:", text: " We share payment data with Stripe, PayPal, and other providers to process transactions securely." },
        { strong: "Service Providers:", text: " We may share data with vendors who assist with email delivery, analytics, hosting, and customer support." },
        { strong: "Legal Requirements:", text: " We may disclose information when required by law, court order, or government regulation." },
        { strong: "Business Transfers:", text: " In the event of a merger, acquisition, or sale, user data may be transferred to the new entity." }
      ],
      note: "We do not sell your personal information to third-party advertisers."
    },
    {
      id: "security",
      title: "5. Data Security",
      icon: Lock,
      content: "We implement industry-standard security measures including SSL/TLS encryption, secure payment processing, regular security audits, and access controls. However, no method of transmission over the internet is 100% secure. We strive to protect your data but cannot guarantee absolute security."
    },
    {
      id: "cookies",
      title: "6. Cookies & Tracking Technologies",
      icon: Cookie,
      content: "We use cookies and similar tracking technologies to enhance your experience, analyze usage patterns, and deliver personalized content. You can control cookie preferences through your browser settings. Essential cookies are required for the Platform to function properly."
    },
    {
      id: "rights",
      title: "7. Your Rights & Choices",
      icon: CheckCircle,
      content: "Depending on your jurisdiction, you may have the right to:",
      list: [
        "Access, correct, or delete your personal data",
        "Opt out of marketing communications at any time",
        "Request a copy of data we hold about you",
        "Withdraw consent where processing is based on consent",
        "Lodge a complaint with your local data protection authority"
      ],
      note: "To exercise any of these rights, contact us at privacy@braidlink.com"
    },
    {
      id: "retention",
      title: "8. Data Retention",
      icon: Clock,
      content: "We retain your personal data for as long as your account is active or as needed to provide services. We may retain certain data for longer periods as required by law, to resolve disputes, or to enforce our agreements. When data is no longer needed, it is securely deleted or anonymized."
    },
    {
      id: "children",
      title: "9. Children's Privacy",
      icon: Users,
      content: "Our Platform is not intended for individuals under the age of 16. We do not knowingly collect personal information from children. If you believe we have inadvertently collected data from a child, please contact us immediately."
    },
    {
      id: "changes",
      title: "10. Changes to This Policy",
      icon: RefreshCw,
      content: "We may update this Privacy Policy from time to time. We will notify you of significant changes by posting the new policy on this page and updating the 'Last updated' date. Your continued use of the Platform after changes constitutes acceptance of the revised policy."
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
              <Shield className="w-4 h-4 text-accent" />
              <span>Your Privacy Matters</span>
              <span className="w-1 h-1 rounded-full bg-white/30" />
              <span>Last Updated: March 8, 2026</span>
            </motion.div>

            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Privacy <br />
              <span className="text-accent relative inline-block">
                Policy
                <svg className="absolute -bottom-3 left-0 w-full" viewBox="0 0 200 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0 4L200 4" stroke="currentColor" strokeWidth="6" strokeLinecap="round" className="text-accent/40"/>
                </svg>
              </span>
            </h1>

            <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto leading-relaxed font-light">
              We are committed to protecting your personal information and your right to privacy. Learn how we handle your data.
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

          {/* Trust Badges - Premium redesign */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5 mb-12"
          >
            {[
              { icon: Shield, label: "SSL Encrypted", value: "256-bit", color: "from-blue-500/20 to-blue-500/5" },
              { icon: Lock, label: "Data Protection", value: "GDPR Ready", color: "from-purple-500/20 to-purple-500/5" },
              { icon: Eye, label: "Privacy First", value: "Your Control", color: "from-green-500/20 to-green-500/5" },
              { icon: CheckCircle, label: "Compliant", value: "CCPA, GDPR", color: "from-amber-500/20 to-amber-500/5" },
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

          {/* Policy Sections - Premium redesign */}
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
                            {typeof item === 'string' ? (
                              <span>{item}</span>
                            ) : (
                              <span><strong className="text-primary font-semibold">{item.strong}</strong>{item.text}</span>
                            )}
                          </li>
                        ))}
                      </ul>
                    )}

                    {/* Sub content with labels - Premium */}
                    {section.subContent && (
                      <div className="space-y-4 mt-5">
                        {section.subContent.map((item, i) => (
                          <div key={i} className="bg-gradient-to-br from-accent/5 to-accent/0 rounded-xl p-5 border border-accent/20">
                            <p className="text-sm text-primary font-semibold mb-2 flex items-center gap-2">
                              <BadgeCheck className="w-4 h-4 text-accent" />
                              {item.label}
                            </p>
                            <p className="text-sm text-muted-foreground leading-relaxed">{item.text}</p>
                          </div>
                        ))}
                      </div>
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

          {/* Contact Section - Premium redesign */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-12 bg-gradient-to-br from-accent/5 to-accent/0 rounded-3xl p-8 md:p-10 border border-accent/20 shadow-xl"
          >
            <div className="flex items-start gap-6">
              <div className="w-16 h-16 rounded-2xl bg-accent flex items-center justify-center flex-shrink-0 shadow-xl">
                <Mail className="w-8 h-8 text-primary" />
              </div>
              <div className="flex-1">
                <h2 className="font-serif text-2xl md:text-3xl font-bold text-primary mb-4">Contact Us</h2>
                <p className="text-sm text-muted-foreground mb-6 max-w-2xl">
                  If you have questions about this Privacy Policy, please contact us at:
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
                        <p className="text-sm font-semibold text-primary">privacy@braidlink.com</p>
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

                <div className="mt-6 pt-6 border-t border-accent/20">
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <div className="flex items-center gap-2 bg-accent/10 px-3 py-2 rounded-full">
                      <Clock className="w-3 h-3 text-accent" />
                      <span>Response time: Within 24-48 hours</span>
                    </div>
                    <BadgeCheck className="w-4 h-4 text-accent" />
                  </div>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Footer Note - Premium */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-12 text-center"
          >
            <div className="inline-flex items-center gap-2 text-xs text-muted-foreground bg-card/50 backdrop-blur-sm px-4 py-2 rounded-full border border-border/50 shadow-sm">
              <Sparkles className="w-3 h-3 text-accent" />
              <span>Your privacy is our priority • Updated regularly</span>
              <Fingerprint className="w-3 h-3 text-accent" />
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
              <Scale className="w-3 h-3 group-hover:scale-110 transition-transform" />
              Terms of Service
            </Link>
            <span className="w-1 h-1 rounded-full bg-accent/30" />
            <Link to="/privacy-policy" className="text-accent hover:text-accent/80 transition-colors flex items-center gap-1 group">
              <Gavel className="w-3 h-3 group-hover:scale-110 transition-transform" />
              Privacy Policy
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;