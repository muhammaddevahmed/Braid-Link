import { Link } from "react-router-dom";
import { stylists } from "@/data/demo-data";
import { Star, MapPin, Heart } from "lucide-react";

const CustomerFavorites = () => {
  const favorites = stylists.slice(0, 3);

  return (
    <div className="space-y-6">
      <h2 className="font-serif text-2xl font-bold">Favourite Stylists</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {favorites.map((s) => (
          <div key={s.id} className="bg-card rounded-xl p-5 border border-border card-hover relative">
            <button className="absolute top-4 right-4"><Heart className="w-5 h-5 fill-cta text-cta" /></button>
            <div className="flex items-center gap-3 mb-3">
              <img src={s.photo} alt={s.name} className="w-12 h-12 rounded-full object-cover" />
              <div>
                <h3 className="font-semibold text-sm">{s.name}</h3>
                <p className="text-xs text-muted-foreground flex items-center gap-1"><Star className="w-3 h-3 fill-secondary text-secondary" /> {s.rating} ({s.reviewCount})</p>
                <p className="text-xs text-muted-foreground flex items-center gap-1"><MapPin className="w-3 h-3" /> {s.location}</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-1 mb-3">
              {s.specialties.map((sp) => <span key={sp} className="text-xs bg-muted px-2 py-0.5 rounded-full">{sp}</span>)}
            </div>
            <div className="flex gap-2">
              <Link to={`/stylist/${s.id}`} className="btn-primary text-xs px-3 py-1.5 flex-1 text-center">View Profile</Link>
              <Link to={`/booking?stylist=${s.id}`} className="btn-cta text-xs px-3 py-1.5 flex-1 text-center">Book Now</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomerFavorites;
