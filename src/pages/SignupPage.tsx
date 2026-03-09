import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { motion } from "framer-motion";
import { Mail, Lock, Eye, EyeOff, User, Phone, User as UserIcon } from "lucide-react";
import { toast } from "sonner";

const SignupPage = () => {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    role: "customer" as "customer" | "stylist",
    profileImage: null as File | null,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const fileToBase64 = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });

  const handleProfileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const MAX_SIZE_MB = 2;
    const MAX_SIZE_BYTES = MAX_SIZE_MB * 1024 * 1024;

    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.size > MAX_SIZE_BYTES) {
        toast.error(`Image size cannot exceed ${MAX_SIZE_MB}MB.`);
        e.target.value = ""; // Clear the file input
        return;
      }
      setForm({ ...form, profileImage: file });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(""); // Reset error on new submission

    if (form.password !== form.confirmPassword) {
      setError("Passwords don't match");
      return;
    }
    if (form.password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    let profileImageBase64 = "";
    if (form.profileImage) {
      try {
        profileImageBase64 = await fileToBase64(form.profileImage);
      } catch (error) {
        setError("Failed to process profile image.");
        return;
      }
    }

    const success = signup({
      name: form.name,
      email: form.email,
      phone: form.phone,
      role: form.role,
      profileImage: profileImageBase64,
    });

    if (success) {
      toast.success("Account created successfully!");
      if (form.role === "customer") {
        navigate('/booking');
      } else {
        navigate('/become-stylist');
      }
    } else {
      setError("An account with this email already exists.");
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center py-12 px-4 bg-background">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="font-serif text-3xl font-bold text-primary">Create Account</h1>
          <p className="text-detail mt-2 font-brand">Join BraidLink today</p>
        </div>

        <div className="bg-card rounded-xl p-6 shadow-sm border border-detail/20">
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && <div className="text-sm text-destructive bg-destructive/10 rounded-lg px-3 py-2">{error}</div>}

            <div>
              <label className="text-sm font-medium mb-1.5 block text-primary">Account Type</label>
              <div className="grid grid-cols-2 gap-2">
                {(["customer", "stylist"] as const).map((role) => (
                  <button
                    key={role}
                    type="button"
                    onClick={() => setForm({ ...form, role })}
                    className={`py-2.5 rounded-lg text-sm font-medium border transition-colors ${form.role === role ? "bg-accent text-primary border-accent" : "border-detail/20 text-primary hover:bg-accent/10"}`}
                  >
                    {role === "customer" ? "Customer" : "Hair Stylist"}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-sm font-medium mb-1.5 block text-primary">Full Name</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-accent" />
                <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-detail/20 bg-background text-sm focus:outline-none focus:ring-2 focus:ring-accent" placeholder="Your full name" required />
              </div>
            </div>

            {form.role === "customer" && (
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center overflow-hidden border border-detail/10">
                  {form.profileImage ? (
                    <img src={URL.createObjectURL(form.profileImage)} alt="Profile Preview" className="w-full h-full object-cover" />
                  ) : (
                    <UserIcon className="w-8 h-8 text-muted-foreground" />
                  )}
                </div>
                <div>
                  <label htmlFor="profile-image-upload" className="text-sm font-medium text-primary cursor-pointer bg-accent/10 px-3 py-2 rounded-lg border border-accent/20 hover:bg-accent/20">
                    Upload Profile Image
                  </label>
                  <input id="profile-image-upload" type="file" accept="image/*" className="hidden" onChange={handleProfileImageChange} />
                  <p className="text-xs text-muted-foreground mt-1.5">Optional. PNG or JPG, max 2MB.</p>
                </div>
              </div>
            )}

            <div>
              <label className="text-sm font-medium mb-1.5 block text-primary">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-accent" />
                <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-detail/20 bg-background text-sm focus:outline-none focus:ring-2 focus:ring-accent" placeholder="your@email.com" required />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium mb-1.5 block text-primary">Phone Number</label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-accent" />
                <input type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-detail/20 bg-background text-sm focus:outline-none focus:ring-2 focus:ring-accent" placeholder="(555) 123-4567" required />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium mb-1.5 block text-primary">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-accent" />
                <input type={showPassword ? "text" : "password"} value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} className="w-full pl-10 pr-10 py-2.5 rounded-lg border border-detail/20 bg-background text-sm focus:outline-none focus:ring-2 focus:ring-accent" placeholder="••••••" required />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2">
                  {showPassword ? <EyeOff className="w-4 h-4 text-detail" /> : <Eye className="w-4 h-4 text-detail" />}
                </button>
              </div>
            </div>

            <div>
              <label className="text-sm font-medium mb-1.5 block text-primary">Confirm Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-accent" />
                <input type="password" value={form.confirmPassword} onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })} className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-detail/20 bg-background text-sm focus:outline-none focus:ring-2 focus:ring-accent" placeholder="••••••" required />
              </div>
            </div>

            <button type="submit" className="btn-cta w-full text-sm">Create Account</button>
          </form>

          <div className="mt-4 text-center text-sm text-detail font-brand">
            Already have an account? <Link to="/login" className="text-accent font-semibold hover:underline">Sign In</Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default SignupPage;
