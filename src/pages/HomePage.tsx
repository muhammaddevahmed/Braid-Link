import { Link } from "react-router-dom";
import { motion } from "framer-motion";
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
} from "lucide-react";
import { stylists } from "@/data/demo-data";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import homepic from "../assets/homepic.png";

const HomePage = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();

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
      transition: { delay: i * 0.1, duration: 0.6 },
    }),
  };

  return (
    <div className="relative bg-background">
      {/* Hero Section - Professional beauty banner */}
      <section className="relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          {/* Two column layout - Image + Text */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left side - Professional image display */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="order-1 lg:order-1"
            >
              <div className="relative">
                {/* Main image */}
                <div>
                  <img
                    src={homepic}
                    alt="Professional afro braiding"
                    className="w-full h-auto transition-transform duration-700"
                  />
                </div>

                {/* Minimal decorative elements */}
                <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-accent/5 rounded-full blur-2xl -z-10" />
                <div className="absolute -top-6 -left-6 w-32 h-32 bg-accent/5 rounded-full blur-2xl -z-10" />
              </div>
            </motion.div>

            {/* Right side - Professional text content */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="order-2 lg:order-2 text-center lg:text-left"
            >
              {/* Brand indicator */}
              <div className="flex items-center justify-center lg:justify-start gap-3 mb-6">
                <span className="text-sm font-medium text-accent/80 tracking-[0.3em] uppercase">
                  BraidLink
                </span>
                <div className="w-12 h-px bg-accent/30" />
              </div>

              {/* Main headline */}
              <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-primary mb-8 leading-[1.1] tracking-tight">
                Connection
                <br />
                <span className="text-accent relative inline-block">
                  is beauty.
                  <svg
                    className="absolute -bottom-3 left-0 w-full"
                    viewBox="0 0 200 8"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M0 4L200 4"
                      stroke="currentColor"
                      strokeWidth="4"
                      strokeLinecap="round"
                      className="text-accent/40"
                    />
                  </svg>
                </span>
              </h1>

              {/* Description */}
              <p className="text-lg md:text-xl text-muted-foreground/90 mb-10 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                Premium Afro Hair Braiding, expertly linked to your style.
                Connect with master stylists who understand your hair.
              </p>

              {/* CTA button - Professional styling */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="flex justify-center lg:justify-start"
              >
                <button
                  onClick={() => navigate("/hairstyles")}
                  className="group bg-accent text-primary font-semibold inline-flex items-center gap-3 px-10 py-4 rounded-full hover:bg-accent/90 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  <span>Explore Styles</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </motion.div>
            </motion.div>
          </div>

          {/* Search Section - Clean and professional */}
          <div className="mt-20 max-w-3xl mx-auto">
            {/* Coming Soon: AI Braid Style Recommendation */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100 text-center">
                <p className="text-sm font-semibold text-accent uppercase tracking-[0.2em] mb-4 block">
                  NEW
                </p>
                <h3 className="text-2xl md:text-3xl font-bold text-primary mb-2">
                  AI Smart Braid Recommendation
                </h3>
                <p className="text-muted-foreground mb-6">
                  Upload your photo and let AI find your perfect braid style
                </p>
                <Link to="/ai-recommendation">
                  <button className="bg-accent text-primary font-semibold inline-flex items-center gap-3 px-8 py-3 rounded-full hover:bg-accent/90 transition-all duration-300">
                    Get AI Recommendation
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Signature Styles - Enhanced with premium cards */}
      <section className="pt-10 pb-36 md:pb-44 bg-white relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-sm font-semibold text-accent uppercase tracking-[0.2em] mb-4 block">
              Our Signature
            </span>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-primary mb-4">
              Signature Braid Styles
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Discover our curated collection of premium braiding techniques
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 max-w-5xl mx-auto">
            {[
              {
                name: "Knotless",
                img: "https://placehold.co/100x100/EEDD82/333?text=Knotless",
              },
              {
                name: "StitchBraids",
                img: "https://placehold.co/100x100/EEDD82/333?text=Stitch",
              },
              {
                name: "Cornrows",
                img: "https://placehold.co/100x100/EEDD82/333?text=Cornrows",
              },
              {
                name: "BoxBraids",
                img: "https://placehold.co/100x100/EEDD82/333?text=Box",
              },
              {
                name: "Twists",
                img: "https://placehold.co/100x100/EEDD82/333?text=Twists",
              },
              {
                name: "Goddess",
                img: "https://placehold.co/100x100/EEDD82/333?text=Goddess",
              },
            ].map((style, i) => (
              <motion.div
                key={i}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="group cursor-pointer"
              >
                <div className="bg-card rounded-2xl p-8 text-center border border-border/50 hover:border-accent/30 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 min-h-[280px] w-48 flex flex-col items-center justify-center">
                  <img
                    src={style.img}
                    alt={style.name}
                    className="w-32 h-32 rounded-2xl bg-gradient-to-br from-accent/10 to-accent/5 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300"
                  />
                  <h3 className="font-serif font-semibold text-primary mb-1">
                    {style.name}
                  </h3>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Top Stylists - Cards redesigned to match FindStylistPage */}
      <section className="py-28 relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="w-8 h-0.5 bg-accent rounded-full" />
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
              to="/hairstyles"
              className="group inline-flex items-center gap-2 text-accent font-semibold bg-accent/10 px-5 py-2.5 rounded-full hover:bg-accent/20 transition-all duration-300"
            >
              View All Styles
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
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
                  animate="visible"
                  variants={fadeUp}
                  whileHover={{ y: -8 }}
                  className="h-full"
                >
                  <div className="bg-gradient-to-br from-card to-card/95 rounded-2xl border border-border/50 overflow-hidden hover:border-accent/50 transition-all duration-300 hover:shadow-2xl hover:shadow-accent/20 flex flex-col h-full">
                    {/* Image */}
                    <div className="aspect-[3/4] relative overflow-hidden group">
                      {stylist.photo ? (
                        <img
                          src={stylist.photo.replace("w=200&h=200", "w=600&h=800")}
                          alt={stylist.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-accent to-accent/80 flex items-center justify-center">
                          <div className="text-center">
                            <Award className="w-20 h-20 text-primary/40 mx-auto mb-2" />
                            <span className="text-4xl font-bold text-primary/30">
                              {stylist.name.charAt(0)}
                            </span>
                          </div>
                        </div>
                      )}

                      {/* Favorite Button */}
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={(e) => toggleFavorite(e, stylist.id)}
                        className="absolute top-4 right-4 p-3 bg-background/80 backdrop-blur-sm rounded-full hover:bg-accent hover:text-primary transition-all shadow-lg"
                      >
                        <Heart
                          className={`w-5 h-5 ${
                            favoriteIds.has(stylist.id)
                              ? "fill-current text-red-500"
                              : "text-muted-foreground"
                          }`}
                        />
                      </motion.button>

                      {/* Rating Badge */}
                      <div className="absolute bottom-4 left-4 bg-background/90 backdrop-blur-sm px-4 py-2 rounded-full flex items-center gap-2 shadow-lg">
                        <Star className="w-4 h-4 text-accent fill-accent" />
                        <span className="font-semibold text-sm">
                          {stylist.rating} ({stylist.reviewCount} reviews)
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 p-6 flex flex-col">
                      {/* Name & Title */}
                      <div className="mb-4">
                        <h3 className="text-2xl font-bold text-primary mb-1">
                          {stylist.name}
                        </h3>
                        <p className="text-accent font-medium text-sm">
                          {stylist.specialties[0] || "Professional Stylist"}
                        </p>
                      </div>

                      {/* Info Grid */}
                      <div className="grid grid-cols-2 gap-4 mb-6">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <MapPin className="w-4 h-4 text-accent flex-shrink-0" />
                          <span className="line-clamp-1">
                            {stylist.location || "City"}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Clock className="w-4 h-4 text-accent flex-shrink-0" />
                          <span>{stylist.experience}+ years</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Zap className="w-4 h-4 text-accent flex-shrink-0" />
                          <span className="capitalize font-medium text-accent">
                            {stylist.status}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Star className="w-4 h-4 text-accent flex-shrink-0" />
                          <span>{stylist.rating} rating</span>
                        </div>
                      </div>

                      {/* Specialties */}
                      <div className="mb-6">
                        <p className="text-xs font-medium text-muted-foreground mb-2">
                          SPECIALTIES
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {stylist.specialties.slice(0, 3).map((specialty) => (
                            <span
                              key={specialty}
                              className="text-xs bg-accent/10 text-accent px-3 py-1 rounded-full font-medium"
                            >
                              {specialty}
                            </span>
                          ))}
                          {stylist.specialties.length > 3 && (
                            <span className="text-xs bg-muted text-muted-foreground px-3 py-1 rounded-full font-medium">
                              +{stylist.specialties.length - 3} more
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Buttons */}
                      <div className="flex gap-3 mt-auto">
                        <Button
                          variant="outline"
                          size="lg"
                          className="flex-1 gap-2"
                          onClick={() => navigate(`/stylist/${stylist.id}`)}
                        >
                          <Eye className="w-4 h-4" />
                          View Profile
                        </Button>
                        <Button
                          size="lg"
                          className="flex-1 gap-2 bg-gradient-to-r from-accent to-accent/90"
                          onClick={() => handleSelectStylist(stylist.id)}
                        >
                          <ArrowRight className="w-4 h-4" />
                          Book Now
                        </Button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
          </div>
        </div>
      </section>

      {/* How It Works - Refined with premium visuals */}
      <section className="py-28 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-2 mb-3">
              <span className="w-8 h-0.5 bg-accent rounded-full" />
              <span className="text-sm font-semibold text-accent uppercase tracking-[0.2em]">
                Simple Process
              </span>
              <span className="w-8 h-0.5 bg-accent rounded-full" />
            </div>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-primary mb-4">
              How It Works
            </h2>
            <p className="text-muted-foreground text-lg">
              Book your perfect style in 3 simple steps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto relative">
            {/* Elegant connection line */}
            <div className="hidden md:block absolute top-24 left-[15%] right-[15%] h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent" />

            {[
              {
                icon: Sparkles,
                title: "Get AI Recommendation",
                desc: "Upload your photo and let our AI recommend the perfect, healthy braid style for you.",
                color: "from-accent/20 to-accent/5",
              },
              {
                icon: Clock,
                title: "Book Your Stylist",
                desc: "Our AI matches you with the best stylist for your chosen look.",
                color: "from-accent/20 to-accent/5",
              },
              {
                icon: Star,
                title: "Get Styled",
                desc: "Enjoy your appointment and share your 5-star experience",
                color: "from-accent/20 to-accent/5",
              },
            ].map((stepItem, i) => (
              <motion.div
                key={i}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="text-center relative group"
              >
                <div className="relative mb-6 inline-block">
                  <div
                    className={`w-28 h-28 rounded-3xl flex items-center justify-center mx-auto relative bg-gradient-to-br ${stepItem.color} group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                  >
                    <div className="absolute inset-0 bg-accent rounded-3xl opacity-0 group-hover:opacity-10 transition-opacity" />
                    <stepItem.icon className="w-12 h-12 text-accent relative z-10" />
                  </div>
                  <span className="absolute -top-2 -right-2 w-10 h-10 rounded-full bg-accent border-4 border-background flex items-center justify-center text-lg font-bold text-primary shadow-xl">
                    {i + 1}
                  </span>
                </div>
                <h3 className="font-serif font-bold text-2xl mb-3 text-primary">
                  {stepItem.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed max-w-xs mx-auto">
                  {stepItem.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials - Refined premium design */}
      <section className="py-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-transparent" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12">
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
              <div className="absolute -top-6 left-0 text-6xl text-accent/20 font-serif">
                &ldquo;
              </div>
              <p className="text-xl md:text-2xl text-muted-foreground italic font-light relative z-10 px-8">
                I love what I saw! The attention to detail and quality of work
                is exceptional. Truly premium Afro Hair Braiding experience.
              </p>
              <div className="absolute -bottom-6 right-0 text-6xl text-accent/20 font-serif">
                &rdquo;
              </div>
            </div>
            <div className="flex items-center justify-center gap-3 mt-8">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-accent/20 to-accent/5 flex items-center justify-center border-2 border-accent/20">
                <Users className="w-6 h-6 text-accent" />
              </div>
              <div className="text-left">
                <p className="font-semibold text-primary">Sarah Johnson</p>
                <p className="text-xs text-muted-foreground">
                  Verified Customer
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Become a Stylist CTA - Premium redesign */}
      <section className="py-28">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="rounded-3xl p-12 md:p-20 text-center relative overflow-hidden bg-primary group"
          >
            {/* Sophisticated animated background */}
            <div className="absolute inset-0">
              <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/10 rounded-full blur-[120px] group-hover:scale-150 transition-transform duration-1000" />
              <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent/8 rounded-full blur-[100px] group-hover:scale-150 transition-transform duration-1000 delay-300" />
            </div>

            <div className="relative z-10">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-accent px-5 py-2.5 rounded-full mb-6 border border-white/20">
                  <Scissors className="w-4 h-4" />
                  <span className="text-sm font-semibold">Join Our Network</span>
                </div>

                <h2 className="font-serif text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
                  Are You a Hair Braiding
                  <br />
                  Professional?
                </h2>

                <p className="text-white/80 mb-10 max-w-2xl mx-auto text-lg leading-relaxed">
                  Join BraidLink and connect with hundreds of clients looking
                  for your skills. Grow your business with our platform.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <Link
                    to="/become-stylist"
                    className="bg-accent text-primary font-semibold inline-flex items-center gap-2.5 text-base px-10 py-4 rounded-xl hover:bg-accent/90 transition-all duration-300 shadow-2xl hover:shadow-accent/30 group"
                  >
                    <Shield className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                    Become a Stylist
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer Note - Refined */}
      <div className="border-t border-border/40 py-8 bg-secondary/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-xs text-muted-foreground/60 tracking-wide">
            &copy; 2026 BraidLink. All rights reserved. Premium Afro Hair
            Braiding, expertly linked to your style.
          </p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;

