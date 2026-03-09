const AdminPayments = () => {
  const transactions = [
    { id: "t1", customer: "Sarah Mitchell", stylist: "Angela Johnson", service: "Box Braids", amount: 120, fee: 12, date: "2026-02-28", status: "completed" },
    { id: "t2", customer: "Lisa Thompson", stylist: "Tiffany Moore", service: "Crochet Braids", amount: 100, fee: 10, date: "2026-02-22", status: "completed" },
    { id: "t3", customer: "Kim Brown", stylist: "Destiny Williams", service: "Goddess Locs", amount: 200, fee: 20, date: "2026-02-10", status: "completed" },
    { id: "t4", customer: "Aisha Patel", stylist: "Jasmine Carter", service: "Fulani Braids", amount: 140, fee: 14, date: "2026-02-20", status: "completed" },
    { id: "t5", customer: "Sarah Mitchell", stylist: "Jasmine Carter", service: "Lemonade Braids", amount: 130, fee: 13, date: "2026-02-15", status: "refunded" },
  ];

  return (
    <div className="space-y-6">
      <h2 className="font-serif text-2xl font-bold">Payment Management</h2>
      <div className="bg-card rounded-xl border border-border overflow-x-auto">
        <table className="w-full text-sm">
          <thead><tr className="border-b border-border bg-muted/50"><th className="text-left px-4 py-3 font-medium">Date</th><th className="text-left px-4 py-3 font-medium">Customer</th><th className="text-left px-4 py-3 font-medium">Stylist</th><th className="text-left px-4 py-3 font-medium">Service</th><th className="text-left px-4 py-3 font-medium">Amount</th><th className="text-left px-4 py-3 font-medium">Fee</th><th className="text-left px-4 py-3 font-medium">Status</th></tr></thead>
          <tbody>{transactions.map((t) => (
            <tr key={t.id} className="border-b border-border last:border-0">
              <td className="px-4 py-3 text-muted-foreground">{t.date}</td>
              <td className="px-4 py-3">{t.customer}</td>
              <td className="px-4 py-3 text-muted-foreground">{t.stylist}</td>
              <td className="px-4 py-3 text-muted-foreground">{t.service}</td>
              <td className="px-4 py-3 font-semibold">${t.amount}</td>
              <td className="px-4 py-3 text-muted-foreground">${t.fee}</td>
              <td className="px-4 py-3"><span className={`text-xs px-2 py-0.5 rounded-full ${t.status === "completed" ? "bg-green-100 text-green-700" : "bg-destructive/10 text-destructive"}`}>{t.status}</span></td>
            </tr>
          ))}</tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminPayments;
