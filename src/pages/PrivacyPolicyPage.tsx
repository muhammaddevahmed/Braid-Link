import { motion } from "framer-motion";
import { 
  Shield, Lock, Cookie, Eye, Mail, Phone, MapPin, 
  FileText, CheckCircle, AlertCircle, RefreshCw, 
  Users, CreditCard, Calendar, Sparkles, ChevronRight,
  BookOpen, Award, Clock, BadgeCheck, Fingerprint,
  Globe, FileCheck, Scale, Gavel, Briefcase, FileSpreadsheet,
  Key, Database, FileCog, UserCheck, LockKeyhole
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
      title: "Privacy and Data Protection Policy",
      icon: Shield,
      content: `This policy ensures compliance with the UK GDPR and the Data Protection Act 2018.`,
      subsections: [
        {
          title: "Corporate Identity",
          content: `The data controller is BraidLink Ltd (Company No. 17094808)`
        }
      ]
    },
    {
      id: "inventory",
      title: "Data Inventory",
      icon: Database,
      content: `We collect personal identifiers (name, address, contact details), account credentials, and transactional data. Stylist-specific data includes professional portfolios and service histories.`
    },
    {
      id: "lawful-basis",
      title: "Lawful Basis for Processing",
      icon: FileCog,
      content: `Processing is conducted under the legal bases of Contractual Necessity (to fulfil bookings), Legitimate Interest (platform improvement), and Legal Obligation.`
    },
    {
      id: "rights",
      title: "Data Subject Rights",
      icon: UserCheck,
      content: `In accordance with UK law, users have the right to access, rectify, erase, or port their data, and to object to specific processing activities.`
    },
    {
      id: "security",
      title: "Security & Retention",
      icon: LockKeyhole,
      content: `We implement rigorous technical safeguards and retain data only for as long as necessary to fulfil operational or legal requirements.`
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
                  {section.title.split(' ')[0]}
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
              { icon: Shield, label: "GDPR Compliant", value: "UK GDPR", color: "from-blue-500/20 to-blue-500/5" },
              { icon: Lock, label: "Data Controller", value: "BraidLink Ltd", color: "from-purple-500/20 to-purple-500/5" },
              { icon: UserCheck, label: "Company No.", value: "17094808", color: "from-green-500/20 to-green-500/5" },
              { icon: CheckCircle, label: "Data Protection", value: "Act 2018", color: "from-amber-500/20 to-amber-500/5" },
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
                              <p className="text-sm text-muted-foreground leading-relaxed">
                                {subsection.content}
                              </p>
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
                        <p className="text-sm font-semibold text-primary">BraidLink Ltd</p>
                        <p className="text-xs text-muted-foreground">Company No. 17094808</p>
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
              <span>Your privacy is our priority • UK GDPR Compliant</span>
              <Fingerprint className="w-3 h-3 text-accent" />
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