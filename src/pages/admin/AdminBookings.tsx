import { bookings, stylists } from "@/data/demo-data";

const AdminBookings = () => (
  <div className="space-y-6">
    <h2 className="font-serif text-2xl font-bold">All Bookings</h2>
    <div className="bg-card rounded-xl border border-border overflow-x-auto">
      <table className="w-full text-sm">
        <thead><tr className="border-b border-border bg-muted/50"><th className="text-left px-4 py-3 font-medium">Service</th><th className="text-left px-4 py-3 font-medium">Customer</th><th className="text-left px-4 py-3 font-medium">Stylist</th><th className="text-left px-4 py-3 font-medium">Date</th><th className="text-left px-4 py-3 font-medium">Price</th><th className="text-left px-4 py-3 font-medium">Status</th></tr></thead>
        <tbody>{bookings.map((b) => (
          <tr key={b.id} className="border-b border-border last:border-0">
            <td className="px-4 py-3 font-medium">{b.service}</td>
            <td className="px-4 py-3 text-muted-foreground">{b.customerName}</td>
            <td className="px-4 py-3 text-muted-foreground">{b.stylistName}</td>
            <td className="px-4 py-3 text-muted-foreground">{b.date}</td>
            <td className="px-4 py-3 font-semibold">${b.price}</td>
            <td className="px-4 py-3"><span className={`text-xs px-2 py-0.5 rounded-full capitalize ${b.status === "upcoming" ? "bg-primary/10 text-primary" : b.status === "completed" ? "bg-green-100 text-green-700" : b.status === "pending" ? "bg-secondary/30 text-accent" : "bg-destructive/10 text-destructive"}`}>{b.status}</span></td>
          </tr>
        ))}</tbody>
      </table>
    </div>
  </div>
);

export default AdminBookings;
