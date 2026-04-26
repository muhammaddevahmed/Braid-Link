import { motion } from "framer-motion";
import {
  Brain, Shield, Heart, Eye, Scale, Lock, Users, Stethoscope,
  ClipboardCheck, RefreshCw, Sparkles, ChevronRight, BookOpen,
  Calendar, BadgeCheck, Fingerprint, Mail, Phone, MapPin,
  Clock, Activity, AlertTriangle, Globe, FileCheck, Gavel
} from "lucide-react";
import { Link } from "react-router-dom";

const AIEthicsPolicyPage = () => {
  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5 } }),
  };

  const sections = [
    {
      id: "purpose",
      title: "1. Policy Purpose",
      icon: Brain,
      content: `BraidLink Ltd ("BraidLink", "the Company") is committed to ensuring that all artificial intelligence systems deployed within its platform operate in a manner that is ethical, transparent, fair, safe, accountable, health-conscious and legally compliant.`,
      subsections: [
        {
          title: "Our Commitment",
          list: [
            "Ethical AI design and deployment",
            "Transparent algorithmic decision-making",
            "Fair treatment across all user groups",
            "Safety-first hairstyle recommendations",
            "Accountable AI governance",
            "Health-conscious beauty innovation",
            "Full legal compliance"
          ]
        },
        {
          title: "What We Promote",
          list: [
            "Customer wellbeing and scalp health",
            "Hair integrity and damage prevention",
            "Cultural sensitivity and inclusion",
            "Responsible innovation in beauty tech"
          ]
        },
        {
          title: "Legal Frameworks",
          list: [
            "UK AI governance principles",
            "UK GDPR",
            "Equality Act 2010",
            "Consumer protection law",
            "Public health standards",
            "Emerging international AI ethics frameworks"
          ]
        }
      ]
    },
    {
      id: "objectives",
      title: "2. Policy Objectives",
      icon: ClipboardCheck,
      content: `BraidLink's AI systems operate under three established objectives: protecting customer health, supporting informed choice, and maintaining ethical AI standards.`,
      subsections: [
        {
          title: "Protect Customer Health",
          list: [
            "Hair density assessment",
            "Hair porosity evaluation",
            "Hair fragility detection",
            "Scalp sensitivity analysis",
            "Traction risk calculation",
            "Breakage risk assessment",
            "Alopecia risk awareness",
            "Age suitability checks"
          ]
        },
        {
          title: "Support Informed Choice",
          list: [
            "Clear reasoning for each recommendation",
            "Visible health considerations",
            "Maintenance requirement disclosures",
            "Expected tension level indicators",
            "Estimated wear duration guidance"
          ]
        },
        {
          title: "Maintain Ethical AI Standards",
          list: [
            "Avoid harmful bias",
            "Prevent discriminatory outputs",
            "Preserve user dignity",
            "Respect personal identity",
            "Protect customer privacy",
            "Remain human-reviewable"
          ]
        }
      ]
    },
    {
      id: "principles",
      title: "3. Core AI Ethics Principles",
      icon: Scale,
      content: `Our AI ethics framework is built on five foundational principles that guide every aspect of our technology.`,
      subsections: [
        {
          title: "Safety First Principle",
          list: [
            "Automatic risk flagging for hazardous styles",
            "Recommendation of safer alternatives",
            "Clear explanation of health concerns",
            "Health prioritised over trends"
          ]
        },
        {
          title: "Human Oversight Principle",
          content: `AI shall support professional decisions, not replace them. Final responsibility remains with the customer, the stylist, and the company's professional review processes.`
        },
        {
          title: "Transparency Principle",
          list: [
            "Customers informed when AI is being used",
            "Disclosure when images are AI-generated",
            "Clear indication that predictions are estimates",
            "Transparency when recommendations are algorithmic"
          ]
        },
        {
          title: "Fairness Principle",
          list: [
            "Fair operation across all skin tones",
            "Inclusive facial structure analysis",
            "Respectful handling of all hair textures",
            "Equitable treatment of all hair lengths",
            "Cultural identity sensitivity",
            "Age group inclusivity"
          ]
        },
        {
          title: "Privacy Principle",
          list: [
            "Secure encryption of customer images",
            "Data minimisation practices",
            "Lawful storage protocols",
            "Consent-based processing only",
            "Deletion when no longer required"
          ]
        }
      ]
    },
    {
      id: "health",
      title: "4. Public Health & Hair Wellbeing Framework",
      icon: Stethoscope,
      content: `BraidLink recognises that Afro-Caribbean hair requires specialised health considerations. Our framework addresses mechanical risks, scalp risks, and health-aware recommendations.`,
      subsections: [
        {
          title: "Hair Health Risk Factors",
          list: [
            "Mechanical risks: excessive braid weight, prolonged tension, fragile edges, follicle strain",
            "Scalp risks: inflammation, dermatitis, traction alopecia, sensitivity reactions"
          ]
        },
        {
          title: "Health-Aware Recommendations",
          list: [
            "Style safety evaluation",
            "Braid size appropriateness",
            "Extension weight assessment",
            "Scalp exposure suitability",
            "Long-term wear advisability"
          ]
        },
        {
          title: "Medical Boundary",
          content: `BraidLink does not provide medical diagnosis. Where the system identifies warning signs, customers are advised to seek advice from a dermatologist, trichologist, GP, or qualified specialist.`
        }
      ]
    },
    {
      id: "governance",
      title: "5. Data Governance",
      icon: Lock,
      content: `Robust data governance ensures that all AI training and customer data is handled lawfully, securely, and responsibly.`,
      subsections: [
        {
          title: "Data Sources",
          list: [
            "Lawfully sourced training data",
            "Fully consented data usage",
            "Representative datasets",
            "Diverse data inclusion",
            "Clinically informed where relevant"
          ]
        },
        {
          title: "Data Retention",
          list: [
            "Facial data retained only where necessary",
            "Deletion upon customer request",
            "Anonymisation where possible",
            "Never sold to third parties"
          ]
        },
        {
          title: "Security Measures",
          list: [
            "End-to-end encryption",
            "Strict access controls",
            "Comprehensive audit logs",
            "Secure API management",
            "Regular security reviews"
          ]
        }
      ]
    },
    {
      id: "stylists",
      title: "6. Stylist Responsibilities",
      icon: Users,
      content: `Stylists using BraidLink play a critical role in the responsible use of AI recommendations.`,
      list: [
        "Review AI recommendations responsibly",
        "Consider visible scalp conditions",
        "Refuse unsafe styling requests",
        "Inform customers of risks",
        "Avoid harmful braid tension",
        "Comply with hygiene standards"
      ]
    },
    {
      id: "accountability",
      title: "7. AI Accountability Governance",
      icon: Shield,
      content: `BraidLink maintains rigorous governance structures to ensure ongoing AI accountability.`,
      subsections: [
        {
          title: "AI Oversight Committee",
          list: [
            "Regular review of AI outputs",
            "Investigation of safety incidents",
            "Fairness auditing",
            "Risk control assessment"
          ]
        },
        {
          title: "Incident Reporting",
          list: [
            "Hair damage reports",
            "Allergic reaction incidents",
            "Discriminatory recommendation reports",
            "Misleading AI output investigations"
          ]
        }
      ]
    },
    {
      id: "consent",
      title: "8. Customer Consent",
      icon: FileCheck,
      content: `Before accessing AI features, customers provide explicit consent to image analysis, hairstyle simulation, algorithmic recommendations, and data processing. Consent must be informed, voluntary, and revocable at any time.`,
    },
    {
      id: "improvement",
      title: "9. Continuous Improvement",
      icon: RefreshCw,
      content: `The Company continuously improves the AI system through ongoing review of:`,
      list: [
        "Customer feedback",
        "Stylist feedback",
        "Health outcomes",
        "Booking data patterns",
        "Safety incident analysis",
        "Recommendation accuracy metrics"
      ]
    },
    {
      id: "compliance",
      title: "10. Compliance",
      icon: Gavel,
      content: `This policy operates in alignment with:`,
      list: [
        "UK GDPR",
        "Data Protection Act 2018",
        "Equality Act 2010",
        "Consumer Rights Act 2015",
        "ICO guidance",
        "UK AI governance principles"
      ]
    },
    {
      id: "commitment",
      title: "11. Company Commitment",
      icon: Heart,
      content: `BraidLink is committed to ensuring that innovation in beauty technology does not compromise health, dignity, trust, safety, or fairness.`,
    }
  ];

  return (
    <div className="relative bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 md:py-24 bg-gradient-to-br from-primary via-primary to-primary/95">
        <div className="absolute inset-0">
          <div className="absolute top-20 right-20 w-96 h-96 bg-accent/10 rounded-full blur-[120px] animate-pulse" />
          <div className="absolute bottom-0 left-20 w-[500px] h-[500px] bg-accent/8 rounded-full blur-[140px] animate-pulse delay-1000" />
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
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md text-white text-xs font-medium px-5 py-2.5 rounded-full mb-6 border border-white/20 shadow-xl"
            >
              <Brain className="w-4 h-4 text-accent" />
              <span>Responsible AI Framework</span>
            </motion.div>

            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              AI Ethics, Governance <br />
              <span className="text-accent relative inline-block">
                &amp; Hair Health Policy
                <svg className="absolute -bottom-3 left-0 w-full" viewBox="0 0 420 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0 4L420 4" stroke="currentColor" strokeWidth="6" strokeLinecap="round" className="text-accent/40"/>
                </svg>
              </span>
            </h1>

            <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto leading-relaxed font-light">
              Responsible Artificial Intelligence and Public Health Framework — ensuring ethical, safe, and inclusive AI-powered hairstyle recommendations.
            </p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="mt-6 inline-flex items-center gap-2 bg-white/5 backdrop-blur-sm text-white/70 text-sm px-5 py-2 rounded-full border border-white/10"
            >
              <Calendar className="w-4 h-4 text-accent" />
              <span>Effective Date: ____________________</span>
            </motion.div>
          </motion.div>
        </div>

        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
            <path d="M0 60L60 52C120 44 240 28 360 24C480 20 600 28 720 32C840 36 960 36 1080 32C1200 28 1320 20 1380 16L1440 12V60H0Z" fill="hsl(var(--background))" />
          </svg>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">

          {/* Quick Navigation */}
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
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {sections.map((section) => (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  className="text-xs text-muted-foreground hover:text-accent transition-all p-3 hover:bg-accent/5 rounded-lg flex items-center gap-1.5 group border border-transparent hover:border-accent/20"
                >
                  <ChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  {section.title.split(' ').slice(0, 2).join(' ')}
                </a>
              ))}
            </div>
          </motion.div>

          {/* Trust Badges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5 mb-12"
          >
            {[
              { icon: Shield, label: "Governance", value: "UK Aligned", color: "from-blue-500/20 to-blue-500/5" },
              { icon: Heart, label: "Health First", value: "Safety Focus", color: "from-purple-500/20 to-purple-500/5" },
              { icon: Scale, label: "Fairness", value: "Inclusive", color: "from-amber-500/20 to-amber-500/5" },
              { icon: Lock, label: "Privacy", value: "GDPR Ready", color: "from-green-500/20 to-green-500/5" },
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

          {/* Policy Sections */}
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

                    {section.content && (
                      <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                        {section.content}
                      </p>
                    )}

                    {section.list && (
                      <ul className="space-y-2 mb-6">
                        {section.list.map((item, j) => (
                          <li key={j} className="text-sm text-muted-foreground leading-relaxed flex items-start gap-2">
                            <div className="w-4 h-4 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                              <span className="w-1 h-1 rounded-full bg-accent" />
                            </div>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    )}

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

          {/* Important Notice */}
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
                <h2 className="font-serif text-2xl md:text-3xl font-bold text-primary mb-4">Important Notice</h2>
                <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
                  This AI Ethics, Governance &amp; Hair Health Policy is a living document that reflects BraidLink Ltd's ongoing commitment to responsible innovation. It is intended as a platform policy template and should be reviewed periodically to ensure continued alignment with emerging UK and international AI governance standards.
                </p>
                <div className="bg-background/50 rounded-xl p-5 border border-accent/10">
                  <div className="flex items-start gap-3">
                    <BadgeCheck className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-muted-foreground">
                      For questions about this policy, contact our ethics team at <span className="text-accent font-semibold">ethics@braidlink.com</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Section */}
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
                  If you have questions about our AI Ethics Policy or wish to report an AI-related concern, please contact us at:
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
                        <p className="text-sm font-semibold text-primary">ethics@braidlink.com</p>
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
                      <span>Ethics team response: Within 24-48 hours</span>
                    </div>
                    <Fingerprint className="w-4 h-4 text-accent" />
                  </div>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Footer Note */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="mt-12 text-center"
          >
            <div className="inline-flex items-center gap-2 text-xs text-muted-foreground bg-card/50 backdrop-blur-sm px-4 py-2 rounded-full border border-border/50 shadow-sm">
              <Heart className="w-3 h-3 text-accent" />
              <span>Intelligent. Ethical. Safe. Inclusive.</span>
              <Sparkles className="w-3 h-3 text-accent" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <div className="border-t border-border/40 py-8 bg-gradient-to-b from-secondary/5 to-secondary/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-xs text-muted-foreground/60 tracking-wide flex items-center justify-center gap-3 flex-wrap">
            <span>&copy; 2026 BraidLink Ltd. All rights reserved.</span>
            <span className="w-1 h-1 rounded-full bg-accent/30" />
            <Link to="/terms-of-service" className="text-accent hover:text-accent/80 transition-colors flex items-center gap-1 group">
              <Gavel className="w-3 h-3 group-hover:scale-110 transition-transform" />
              Terms of Service
            </Link>
            <span className="w-1 h-1 rounded-full bg-accent/30" />
            <Link to="/privacy-policy" className="text-accent hover:text-accent/80 transition-colors flex items-center gap-1 group">
              <Shield className="w-3 h-3 group-hover:scale-110 transition-transform" />
              Privacy Policy
            </Link>
            <span className="w-1 h-1 rounded-full bg-accent/30" />
            <Link to="/ai-ethics-policy" className="text-accent hover:text-accent/80 transition-colors flex items-center gap-1 group">
              <Brain className="w-3 h-3 group-hover:scale-110 transition-transform" />
              AI Ethics Policy
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AIEthicsPolicyPage;

