import { motion } from "framer-motion";
import { 
  Shield, Lock, Cookie, Eye, Mail, Phone, MapPin, 
  FileText, CheckCircle, AlertCircle, RefreshCw, 
  Users, CreditCard, Calendar, Sparkles, ChevronRight,
  BookOpen, Award, Clock
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
              <Shield className="w-4 h-4 text-accent" />
              <span>Your Privacy Matters</span>
              <span className="w-1.5 h-1.5 rounded-full bg-accent/50" />
              <span>Last Updated: March 8, 2026</span>
            </motion.div>

            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-background mb-6 leading-tight">
              Privacy <br />
              <span className="text-accent relative">
                Policy
                <svg className="absolute -bottom-3 left-0 w-full" viewBox="0 0 200 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0 4L200 4" stroke="currentColor" strokeWidth="6" strokeLinecap="round" className="text-accent/30"/>
                </svg>
              </span>
            </h1>

            <p className="text-lg md:text-xl text-background/80 max-w-2xl mx-auto leading-relaxed font-brand">
              We are committed to protecting your personal information and your right to privacy. Learn how we handle your data.
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
          
          {/* Quick Navigation */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-card rounded-2xl p-6 border border-border/50 shadow-lg mb-10"
          >
            <h2 className="font-serif text-lg font-semibold text-primary mb-4 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-accent" />
              Quick Navigation
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
              {sections.map((section, i) => (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  className="text-xs text-detail hover:text-accent transition-colors p-2 hover:bg-accent/5 rounded-lg flex items-center gap-1"
                >
                  <ChevronRight className="w-3 h-3" />
                  {section.title.split(' ')[1]}
                </a>
              ))}
            </div>
          </motion.div>

          {/* Trust Badges */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10"
          >
            {[
              { icon: Shield, label: "SSL Encrypted", value: "256-bit" },
              { icon: Lock, label: "Data Protection", value: "GDPR Ready" },
              { icon: Eye, label: "Privacy First", value: "Your Control" },
              { icon: CheckCircle, label: "Compliant", value: "CCPA, GDPR" },
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

          {/* Policy Sections */}
          <div className="space-y-6">
            {sections.map((section, index) => (
              <motion.section
                key={section.id}
                id={section.id}
                custom={index}
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                className="bg-card rounded-2xl p-6 md:p-8 border border-border/50 shadow-lg hover:shadow-xl transition-shadow scroll-mt-20"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0 mt-1">
                    <section.icon className="w-5 h-5 text-accent" />
                  </div>
                  <div className="flex-1">
                    <h2 className="font-serif text-xl font-semibold text-primary mb-4">
                      {section.title}
                    </h2>
                    
                    {/* Regular content */}
                    {section.content && (
                      <p className="text-sm text-detail leading-relaxed mb-4 font-brand">
                        {section.content}
                      </p>
                    )}

                    {/* List items */}
                    {section.list && (
                      <ul className="space-y-2 mb-4">
                        {section.list.map((item, i) => (
                          <li key={i} className="text-sm text-detail leading-relaxed flex items-start gap-2 font-brand">
                            <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
                            {typeof item === 'string' ? (
                              <span>{item}</span>
                            ) : (
                              <span><strong className="text-primary">{item.strong}</strong>{item.text}</span>
                            )}
                          </li>
                        ))}
                      </ul>
                    )}

                    {/* Sub content with labels */}
                    {section.subContent && (
                      <div className="space-y-3 mt-4">
                        {section.subContent.map((item, i) => (
                          <div key={i} className="bg-accent/5 rounded-xl p-4 border border-accent/20">
                            <p className="text-sm text-primary font-semibold mb-1">{item.label}</p>
                            <p className="text-sm text-detail leading-relaxed font-brand">{item.text}</p>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Notes */}
                    {section.note && (
                      <div className="mt-4 bg-accent/10 rounded-xl p-4 border border-accent/20 flex items-start gap-3">
                        <AlertCircle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                        <p className="text-sm text-detail font-brand">{section.note}</p>
                      </div>
                    )}
                  </div>
                </div>
              </motion.section>
            ))}
          </div>

          {/* Contact Section */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-10 bg-gradient-to-br from-accent/10 to-accent/5 rounded-3xl p-8 border border-accent/20"
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center flex-shrink-0">
                <Mail className="w-6 h-6 text-primary" />
              </div>
              <div className="flex-1">
                <h2 className="font-serif text-2xl font-bold text-primary mb-4">Contact Us</h2>
                <p className="text-sm text-detail mb-6 font-brand max-w-2xl">
                  If you have questions about this Privacy Policy, please contact us at:
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center">
                        <MapPin className="w-4 h-4 text-accent" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-primary">BraidLink Inc.</p>
                        <p className="text-xs text-detail">123 Beauty Lane, Suite 200</p>
                        <p className="text-xs text-detail">New York, NY 10001</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center">
                        <Mail className="w-4 h-4 text-accent" />
                      </div>
                      <div>
                        <p className="text-xs text-detail">Email</p>
                        <p className="text-sm font-semibold text-primary">privacy@braidlink.com</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center">
                        <Phone className="w-4 h-4 text-accent" />
                      </div>
                      <div>
                        <p className="text-xs text-detail">Phone</p>
                        <p className="text-sm font-semibold text-primary">(555) 987-6543</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-accent/20">
                  <p className="text-xs text-detail flex items-center gap-2">
                    <Clock className="w-3 h-3 text-accent" />
                    Response time: Within 24-48 hours
                  </p>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Footer Note */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-10 text-center"
          >
            <div className="inline-flex items-center gap-2 text-xs text-detail bg-card/50 backdrop-blur-sm px-4 py-2 rounded-full border border-border/50">
              <Sparkles className="w-3 h-3 text-accent" />
              <span>Your privacy is our priority • Updated regularly</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <div className="border-t border-border py-6 bg-secondary/10">
        <div className="container mx-auto px-4">
          <p className="text-center text-xs text-detail">
            © 2026 BraidLink. All rights reserved. | 
            <Link to="/terms" className="text-accent hover:underline ml-1">Terms of Service</Link> | 
            <Link to="/privacy" className="text-accent hover:underline ml-1">Privacy Policy</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;