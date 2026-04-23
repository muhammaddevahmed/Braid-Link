import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Star,
  Clock,
  Shield,
  ArrowRight,
  MapPin,
  Scissors,
  Users,
  Heart,
  Zap,
  Award,
  Sparkles,
  Eye,
  ChevronRight,
  Calendar,
  MessageCircle,
  CheckCircle,
  Crown,
  TrendingUp,
  Camera,
  Upload,
} from "lucide-react";
import { stylists } from "@/data/demo-data";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import homepic from "../assets/homepic.png";

const HomePage = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 0.95]);

  const [favoriteIds, setFavoriteIds] = useState<Set<string>>(new Set());

  const toggleFavorite = (e: React.MouseEvent, stylistId: string) => {
    e.preventDefault();
    e.stopPropagation();
    const newFavorites = new Set(favoriteIds);
    if (newFavorites.has(stylistId)) {
      newFavorites.delete(stylistId);
      toast.success("Removed from favorites");
    } else {
      newFavorites.add(stylistId);
      toast.success("Added to favorites");
    }
    setFavoriteIds(newFavorites);

    if (user?.id) {
      localStorage.setItem(
        `favorites_${user.id}`,
        JSON.stringify(Array.from(newFavorites))
      );
    }
  };

  const handleSelectStylist = (stylistId: string) => {
    if (!isAuthenticated) {
      toast.error("Please log in to book a stylist");
      navigate("/login");
      return;
    }

    const selectedStylist = stylists.find((s) => s.id === stylistId);
    if (selectedStylist) {
      sessionStorage.setItem(
        "selectedStylist",
        JSON.stringify({
          id: selectedStylist.id,
          name: selectedStylist.name,
          photo: selectedStylist.photo,
          rating: selectedStylist.rating,
          reviewCount: selectedStylist.reviewCount,
          location: selectedStylist.location,
          isManuallySelected: true,
        })
      );
    }

    navigate("/ai-recommendation", {
      state: { from: "/", label: "Home" },
    });
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.6, ease: "easeOut" },
    }),
  };

  const signatureStyles = [
    { name: "Knotless", img: "https://placehold.co/200x200/EEDD82/333?text=Knotless" },
    { name: "Stitch Braids", img: "https://placehold.co/200x200/EEDD82/333?text=Stitch" },
    { name: "Cornrows", img: "https://placehold.co/200x200/EEDD82/333?text=Cornrows" },
    { name: "Box Braids", img: "https://placehold.co/200x200/EEDD82/333?text=Box" },
    { name: "Twists", img: "https://placehold.co/200x200/EEDD82/333?text=Twists" },
    { name: "Goddess", img: "https://placehold.co/200x200/EEDD82/333?text=Goddess" },
  ];

  return (
    <div className="relative bg-background">
      {/* Hero Section */}
      <section ref={heroRef} className="relative overflow-hidden">
        <motion.div 
          style={{ opacity: heroOpacity, scale: heroScale }}
          className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 lg:py-32"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left side - Image */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="order-1 lg:order-1"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-accent/5 rounded-full blur-3xl -z-10" />
                <img
                  src={homepic}
                  alt="Professional afro braiding"
                  className="w-full h-auto relative z-10 drop-shadow-2xl"
                />
                <div className="absolute -bottom-6 -right-6 w-40 h-40 bg-accent/10 rounded-full blur-3xl -z-10" />
                <div className="absolute -top-6 -left-6 w-40 h-40 bg-accent/10 rounded-full blur-3xl -z-10" />
              </div>
            </motion.div>

            {/* Right side - Text Content */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="order-2 lg:order-2 text-center lg:text-left"
            >
              <div className="flex items-center justify-center lg:justify-start gap-3 mb-6">
                <span className="text-xs font-semibold text-accent tracking-[0.3em] uppercase">
                  BraidLink
                </span>
                <div className="w-12 h-px bg-accent/50" />
              </div>

              <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-primary mb-8 leading-[1.1] tracking-tight">
                Connection
                <br />
                <span className="text-accent relative inline-block">
                  is beauty.
                  <svg
                    className="absolute -bottom-3 left-0 w-full"
                    viewBox="0 0 200 6"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M0 3L200 3"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeDasharray="4 8"
                      className="text-accent/40"
                    />
                  </svg>
                </span>
              </h1>

              <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                Premium Afro Hair Braiding, expertly linked to your style.
                Connect with master stylists who understand your hair.
              </p>

              {/* Primary CTA Buttons - AI Recommendation as Primary */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => navigate("/ai-recommendation")}
                  className="group bg-gradient-to-r from-accent to-accent/90 text-primary font-semibold inline-flex items-center gap-3 px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <Sparkles className="w-5 h-5" />
                  <span>Get AI Style Recommendation</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => navigate("/find-stylist")}
                  className="group border-2 border-accent/40 text-accent font-semibold inline-flex items-center gap-3 px-8 py-4 rounded-full hover:bg-accent/5 transition-all duration-300"
                >
                  <Users className="w-4 h-4" />
                  <span>Browse Stylists</span>
                </motion.button>
              </div>

              {/* AI Feature Highlight Badge */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="mt-6 flex justify-center lg:justify-start"
              >
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/10 border border-accent/20">
                  <Camera className="w-3.5 h-3.5 text-accent" />
                  <span className="text-xs text-muted-foreground">
                    Upload your photo · AI matches your perfect style · Free consultation
                  </span>
                </div>
              </motion.div>

              {/* Trust indicators */}
              <div className="flex flex-wrap justify-center lg:justify-start gap-6 mt-8 pt-4 border-t border-border/30">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className="text-xs text-muted-foreground">Verified Stylists</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-accent" />
                  <span className="text-xs text-muted-foreground">Secure Booking</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-accent" />
                  <span className="text-xs text-muted-foreground">5k+ Happy Clients</span>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Decorative bottom wave */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent pointer-events-none" />
      </section>

      {/* How AI Works - New Section to Guide Users */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 mb-4">
              <Sparkles className="w-3.5 h-3.5 text-accent" />
              <span className="text-xs font-medium text-accent">How It Works</span>
            </div>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-primary mb-3">
              AI-Powered Style Matching in 3 Steps
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Get personalized braid style recommendations powered by our advanced AI
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              {
                icon: Upload,
                title: "Upload Your Photo",
                desc: "Take a clear photo of your hair and upload it securely",
                step: "01",
              },
              {
                icon: Sparkles,
                title: "AI Analysis",
                desc: "Our AI analyzes your hair texture, face shape, and preferences",
                step: "02",
              },
              {
                icon: Calendar,
                title: "Get Matched",
                desc: "Receive style recommendations and book your perfect stylist",
                step: "03",
              },
            ].map((step, i) => (
              <motion.div
                key={i}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="text-center group"
              >
                <div className="relative mb-5">
                  <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-accent/15 to-accent/5 flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300">
                    <step.icon className="w-8 h-8 text-accent" />
                  </div>
                  <span className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-accent text-primary text-xs font-bold flex items-center justify-center shadow-md">
                    {step.step}
                  </span>
                </div>
                <h3 className="font-serif font-bold text-xl mb-2 text-primary">
                  {step.title}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-center mt-10"
          >
            <Button
              onClick={() => navigate("/ai-recommendation")}
              className="bg-gradient-to-r from-accent to-accent/90 text-primary font-semibold px-8 py-3 rounded-full hover:shadow-lg transition-all group"
            >
              Start Your AI Style Journey
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Signature Styles Section */}
      <section className="py-20 bg-secondary/5 relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 mb-4">
              <Star className="w-3.5 h-3.5 text-accent" />
              <span className="text-xs font-medium text-accent">Our Signature</span>
            </div>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-primary mb-4">
              Signature Braid Styles
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Discover our curated collection of premium braiding techniques
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-5 max-w-6xl mx-auto">
            {signatureStyles.map((style, i) => (
              <motion.div
                key={i}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                whileHover={{ y: -5 }}
                className="group cursor-pointer"
              >
                <div className="bg-card rounded-2xl p-6 text-center border border-border/50 hover:border-accent/40 transition-all duration-300 hover:shadow-xl">
                  <div className="w-24 h-24 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-accent/15 to-accent/5 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <span className="text-3xl font-bold text-accent/60">
                      {style.name.charAt(0)}
                    </span>
                  </div>
                  <h3 className="font-serif font-semibold text-primary text-sm md:text-base">
                    {style.name}
                  </h3>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Top Stylists Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <div className="inline-flex items-center gap-2 mb-3">
                <div className="w-8 h-0.5 bg-accent rounded-full" />
                <span className="text-sm font-semibold text-accent uppercase tracking-[0.2em]">
                  Expert Stylists
                </span>
              </div>
              <h2 className="font-serif text-4xl md:text-5xl font-bold text-primary mb-3">
                Top Rated Stylists
              </h2>
              <p className="text-muted-foreground text-lg max-w-xl">
                Highly rated professionals ready to create your perfect look
              </p>
            </div>
            <Link
              to="/find-stylist"
              className="group inline-flex items-center gap-2 text-accent font-semibold bg-accent/10 px-5 py-2.5 rounded-full hover:bg-accent/20 transition-all duration-300"
            >
              View All Stylists
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {stylists
              .filter((s) => s.featured)
              .slice(0, 3)
              .map((stylist, i) => (
                <motion.div
                  key={stylist.id}
                  custom={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeUp}
                  whileHover={{ y: -8 }}
                  className="h-full"
                >
                  <div className="bg-card rounded-2xl border border-border/50 overflow-hidden hover:border-accent/40 transition-all duration-300 hover:shadow-2xl flex flex-col h-full group">
                    <div className="aspect-[4/3] relative overflow-hidden bg-gradient-to-br from-accent/10 to-accent/5">
                      {stylist.photo ? (
                        <img
                          src={stylist.photo}
                          alt={stylist.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <Award className="w-16 h-16 text-accent/30" />
                        </div>
                      )}

                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={(e) => toggleFavorite(e, stylist.id)}
                        className="absolute top-3 right-3 p-2 bg-background/80 backdrop-blur-sm rounded-full hover:bg-accent hover:text-primary transition-all shadow-md"
                      >
                        <Heart
                          className={`w-4 h-4 ${
                            favoriteIds.has(stylist.id)
                              ? "fill-current text-red-500"
                              : "text-muted-foreground"
                          }`}
                        />
                      </motion.button>

                      <div className="absolute bottom-3 left-3 bg-background/90 backdrop-blur-sm px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-md">
                        <Star className="w-3.5 h-3.5 text-accent fill-accent" />
                        <span className="font-semibold text-sm">
                          {stylist.rating}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          ({stylist.reviewCount})
                        </span>
                      </div>
                    </div>

                    <div className="flex-1 p-5 flex flex-col">
                      <div className="mb-3">
                        <h3 className="text-xl font-bold text-primary mb-1">
                          {stylist.name}
                        </h3>
                        <p className="text-accent font-medium text-sm">
                          {stylist.specialties[0] || "Professional Stylist"}
                        </p>
                      </div>

                      <div className="grid grid-cols-2 gap-3 mb-4">
                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                          <MapPin className="w-3.5 h-3.5 text-accent" />
                          <span className="truncate">{stylist.location || "City"}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                          <Clock className="w-3.5 h-3.5 text-accent" />
                          <span>{stylist.experience}+ years</span>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {stylist.specialties.slice(0, 2).map((specialty) => (
                          <span
                            key={specialty}
                            className="text-xs bg-accent/10 text-accent px-2 py-0.5 rounded-full"
                          >
                            {specialty}
                          </span>
                        ))}
                        {stylist.specialties.length > 2 && (
                          <span className="text-xs bg-muted text-muted-foreground px-2 py-0.5 rounded-full">
                            +{stylist.specialties.length - 2}
                          </span>
                        )}
                      </div>

                      <div className="flex gap-2 mt-auto">
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex-1 gap-1 text-sm"
                          onClick={() => navigate(`/stylist/${stylist.id}`)}
                        >
                          <Eye className="w-3.5 h-3.5" />
                          Profile
                        </Button>
                        <Button
                          size="sm"
                          className="flex-1 gap-1 bg-gradient-to-r from-accent to-accent/90 text-sm"
                          onClick={() => handleSelectStylist(stylist.id)}
                        >
                          Book
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-transparent" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-10">
            <div className="flex items-center justify-center gap-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-accent text-accent" />
              ))}
            </div>
            <h2 className="font-serif text-3xl font-bold text-primary">
              Loved by thousands
            </h2>
          </div>

          <div className="max-w-3xl mx-auto text-center">
            <div className="relative">
              <div className="absolute -top-4 left-0 text-5xl text-accent/20 font-serif">
                &ldquo;
              </div>
              <p className="text-xl md:text-2xl text-muted-foreground italic font-light relative z-10 px-8 leading-relaxed">
                I love what I saw! The attention to detail and quality of work
                is exceptional. Truly premium Afro Hair Braiding experience.
              </p>
              <div className="absolute -bottom-4 right-0 text-5xl text-accent/20 font-serif">
                &rdquo;
              </div>
            </div>
            <div className="flex items-center justify-center gap-3 mt-8">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent/20 to-accent/10 flex items-center justify-center">
                <Users className="w-5 h-5 text-accent" />
              </div>
              <div className="text-left">
                <p className="font-semibold text-primary">Sarah Johnson</p>
                <p className="text-xs text-muted-foreground">Verified Customer</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Become a Stylist CTA */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="rounded-2xl p-12 md:p-16 text-center relative overflow-hidden bg-primary"
          >
            <div className="absolute inset-0">
              <div className="absolute top-0 right-0 w-96 h-96 bg-accent/15 rounded-full blur-[120px]" />
              <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/10 rounded-full blur-[120px]" />
            </div>

            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
                <Scissors className="w-4 h-4 text-accent" />
                <span className="text-sm font-semibold text-accent">Join Our Network</span>
              </div>

              <h2 className="font-serif text-3xl md:text-5xl font-bold text-white mb-4">
                Are You a Hair Braiding Professional?
              </h2>

              <p className="text-white/80 mb-8 max-w-2xl mx-auto">
                Join BraidLink and connect with hundreds of clients looking
                for your skills. Grow your business with our platform.
              </p>

              <Link to="/become-stylist">
                <Button className="bg-accent text-primary font-semibold px-8 py-3 rounded-xl hover:bg-accent/90 transition-all shadow-lg hover:shadow-accent/30 group">
                  <Shield className="w-4 h-4 mr-2 group-hover:rotate-12 transition-transform" />
                  Become a Stylist
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <div className="border-t border-border/40 py-8 bg-secondary/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-xs text-muted-foreground/70">
            &copy; 2026 BraidLink. All rights reserved. Premium Afro Hair
            Braiding, expertly linked to your style.
          </p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;