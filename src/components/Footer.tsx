import { Link } from "react-router-dom";
import logo from "../assets/braidlink-logo.png";

const Footer = () => (
  <footer className="bg-foreground text-background relative overflow-hidden">
    <div className="absolute inset-0">
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-accent/5 rounded-full blur-[100px]" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-muted/5 rounded-full blur-[80px]" />
    </div>
    <div className="container mx-auto px-4 py-14 relative z-10">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
        <div>
          <div className="flex items-center gap-3 mb-5">
            <img src={logo} alt="BraidLink" className="h-10 w-auto brightness-0 invert" />
            <div className="flex flex-col">
              <span className="font-brand text-lg leading-tight">BraidLink</span>
              <span className="font-tagline text-xs opacity-70 leading-tight">Afro Hair Braiding</span>
            </div>
          </div>
          <p className="text-sm opacity-70 leading-relaxed">Connecting you with talented hair braiding professionals in your area. Beautiful styles, trusted stylists.</p>
        </div>
        <div>
          <h4 className="font-brand font-semibold mb-5 text-accent">Explore</h4>
          <div className="space-y-2.5 text-sm opacity-70">
            <Link to="/hairstyles" className="block hover:opacity-100 hover:translate-x-1 transition-all">Hairstyles</Link>
            <Link to="/find-stylist" className="block hover:opacity-100 hover:translate-x-1 transition-all">Find a Stylist</Link>
            <Link to="/pricing" className="block hover:opacity-100 hover:translate-x-1 transition-all">Pricing</Link>
            <Link to="/become-stylist" className="block hover:opacity-100 hover:translate-x-1 transition-all">Become a Stylist</Link>
          </div>
        </div>
        <div>
          <h4 className="font-brand font-semibold mb-5 text-accent">Support</h4>
          <div className="space-y-2.5 text-sm opacity-70">
            <Link to="/faq" className="block hover:opacity-100 hover:translate-x-1 transition-all">FAQ</Link>
            <Link to="/contact" className="block hover:opacity-100 hover:translate-x-1 transition-all">Contact Us</Link>
            <Link to="/privacy-policy" className="block hover:opacity-100 hover:translate-x-1 transition-all">Privacy Policy</Link>
            <Link to="/terms-of-service" className="block hover:opacity-100 hover:translate-x-1 transition-all">Terms of Service</Link>
          </div>
        </div>
        <div>
          <h4 className="font-brand font-semibold mb-5 text-accent">Contact</h4>
          <div className="space-y-2.5 text-sm opacity-70">
            <p>support@braidlink.com</p>
            <p>(555) 987-6543</p>
            <p>123 Beauty Lane, Suite 200<br />New York, NY 10001</p>
          </div>
        </div>
      </div>
      <div className="mt-14 pt-8 border-t border-background/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm opacity-50">
        <p>© 2026 BraidLink. All rights reserved.</p>
        <div className="flex items-center gap-6">
          <Link to="/privacy-policy" className="hover:opacity-100 transition-opacity">Privacy</Link>
          <Link to="/terms-of-service" className="hover:opacity-100 transition-opacity">Terms</Link>
          <Link to="/contact" className="hover:opacity-100 transition-opacity">Contact</Link>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
