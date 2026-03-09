import { reviews } from "@/data/demo-data";
import { Star } from "lucide-react";

const CustomerReviews = () => {
  const myReviews = reviews.filter((r) => r.customerId === "c1");

  return (
    <div className="space-y-6">
      <h2 className="font-serif text-2xl font-bold">My Reviews</h2>
      <div className="space-y-4">
        {myReviews.map((r) => (
          <div key={r.id} className="bg-card rounded-xl p-5 border border-border">
            <div className="flex items-center justify-between mb-2">
              <div>
                <p className="font-semibold text-sm">{r.service} with {r.stylistName}</p>
                <p className="text-xs text-muted-foreground">{r.date}</p>
              </div>
              <div className="flex gap-0.5">{Array.from({ length: r.rating }).map((_, j) => <Star key={j} className="w-4 h-4 fill-secondary text-secondary" />)}</div>
            </div>
            <p className="text-sm text-muted-foreground">{r.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomerReviews;
