import { useState, useEffect } from "react";
import { Check, X, Clock, MapPin, User } from "lucide-react";
import { toast } from "sonner";

interface Application {
  key: string;
  userId: string;
  name: string;
  email: string;
  location: string;
  experience: string;
  bio: string;
  status: string;
  submittedAt: string;
  profileImage?: string;
  portfolio?: string[];
}

const AdminStylistApprovals = () => {
  const [applications, setApplications] = useState<Application[]>([]);

  useEffect(() => {
    const apps: Application[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith("stylist_application_")) {
        try {
          const appData = JSON.parse(localStorage.getItem(key) || "{}");
          if (appData.status === 'pending') {
             apps.push({ ...appData, key, userId: key.replace("stylist_application_", "") });
          }
        } catch (e) {
          console.error("Error parsing app", e);
        }
      }
    }
    setApplications(apps);
  }, []);

  const handleApprove = (app: Application) => {
    const updated = { ...app, status: 'approved', approvedAt: new Date().toISOString() };
    localStorage.setItem(app.key, JSON.stringify(updated));
    setApplications(prev => prev.filter(a => a.key !== app.key));
    toast.success(`Approved ${app.name}`);
  };

  const handleReject = (app: Application) => {
    const updated = { ...app, status: 'rejected', rejectedAt: new Date().toISOString() };
    localStorage.setItem(app.key, JSON.stringify(updated));
    setApplications(prev => prev.filter(a => a.key !== app.key));
    toast.error(`Rejected ${app.name}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-serif text-3xl font-bold text-primary">Stylist Approvals</h1>
        <span className="bg-accent/10 text-accent px-3 py-1 rounded-full text-sm font-medium">
          {applications.length} Pending
        </span>
      </div>

      {applications.length === 0 ? (
        <div className="text-center py-12 bg-card rounded-xl border border-detail/20">
          <p className="text-muted-foreground">No pending applications.</p>
        </div>
      ) : (
        <div className="grid gap-6">
          {applications.map((app) => (
            <div key={app.key} className="bg-card rounded-xl border border-detail/20 overflow-hidden">
              <div className="p-6">
                <div className="flex flex-col md:flex-row gap-6">
                  {/* Profile Image */}
                  <div className="flex-shrink-0">
                    {app.profileImage ? (
                      <img src={app.profileImage} alt={app.name} className="w-24 h-24 rounded-xl object-cover border border-detail/10" />
                    ) : (
                      <div className="w-24 h-24 rounded-xl bg-muted flex items-center justify-center">
                        <User className="w-8 h-8 text-muted-foreground" />
                      </div>
                    )}
                  </div>

                  {/* Details */}
                  <div className="flex-1 space-y-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-serif text-xl font-bold text-primary">{app.name}</h3>
                        <p className="text-sm text-muted-foreground">{app.email}</p>
                      </div>
                      <div className="flex gap-2">
                        <button onClick={() => handleReject(app)} className="p-2 text-destructive hover:bg-destructive/10 rounded-lg transition-colors" title="Reject">
                          <X className="w-5 h-5" />
                        </button>
                        <button onClick={() => handleApprove(app)} className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors" title="Approve">
                          <Check className="w-5 h-5" />
                        </button>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-4 text-sm text-detail mt-2">
                      <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> {app.location}</span>
                      <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {app.experience} Years Exp.</span>
                    </div>

                    <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{app.bio}</p>
                    
                    {/* Portfolio Preview */}
                    {app.portfolio && app.portfolio.length > 0 && (
                      <div className="mt-4">
                        <p className="text-xs font-semibold mb-2 uppercase tracking-wider text-muted-foreground">Portfolio</p>
                        <div className="flex gap-2 overflow-x-auto pb-2">
                          {app.portfolio.map((img, idx) => (
                            <img key={idx} src={img} alt="Portfolio" className="w-16 h-16 rounded-lg object-cover border border-detail/10" />
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="bg-muted/30 px-6 py-3 border-t border-detail/10 flex justify-between items-center text-xs text-muted-foreground">
                <span>Submitted: {new Date(app.submittedAt).toLocaleDateString()}</span>
                <span>ID: {app.userId}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminStylistApprovals;