import { useState, useEffect } from "react";
import { Plus, Edit2, Trash2, Save, X } from "lucide-react";
import { faqData as initialFaqs } from "@/data/demo-data";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";

interface FAQ {
  id: string;
  question: string;
  answer: string;
}

const AdminFAQs = () => {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [editForm, setEditForm] = useState({ question: "", answer: "" });
  const [isAdding, setIsAdding] = useState(false);
  const [addForm, setAddForm] = useState({ question: "", answer: "" });

  useEffect(() => {
    const storedFaqs = localStorage.getItem("braidbook_faqs");
    if (storedFaqs) {
      setFaqs(JSON.parse(storedFaqs));
    } else {
      // Initialize with demo data if empty, adding IDs
      const formattedFaqs = initialFaqs.map((f, i) => ({ ...f, id: `faq_${i}` }));
      setFaqs(formattedFaqs);
      localStorage.setItem("braidbook_faqs", JSON.stringify(formattedFaqs));
    }
  }, []);

  const saveFaqs = (newFaqs: FAQ[]) => {
    setFaqs(newFaqs);
    localStorage.setItem("braidbook_faqs", JSON.stringify(newFaqs));
  };

  const handleAdd = () => {
    if (!addForm.question || !addForm.answer) {
      toast.error("Please fill in all fields");
      return;
    }
    const newFaq = {
      id: `faq_${Date.now()}`,
      ...addForm
    };
    saveFaqs([newFaq, ...faqs]);
    setAddForm({ question: "", answer: "" });
    setIsAdding(false);
    toast.success("FAQ added successfully");
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this FAQ?")) {
      saveFaqs(faqs.filter(f => f.id !== id));
      toast.success("FAQ deleted");
    }
  };

  const startEdit = (faq: FAQ) => {
    setIsEditing(faq.id);
    setEditForm({ question: faq.question, answer: faq.answer });
  };

  const saveEdit = () => {
    if (!isEditing) return;
    saveFaqs(faqs.map(f => f.id === isEditing ? { ...f, ...editForm } : f));
    setIsEditing(null);
    toast.success("FAQ updated");
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="font-serif text-2xl font-bold">FAQ Management</h2>
        <button onClick={() => setIsAdding(true)} className="btn-cta text-sm flex items-center gap-1">
          <Plus className="w-4 h-4" /> Add FAQ
        </button>
      </div>

      <AnimatePresence>
        {isAdding && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-card rounded-xl p-6 border-2 border-primary/20 mb-6 overflow-hidden"
          >
            <h3 className="font-semibold mb-4 text-lg">Add New FAQ</h3>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-1 block">Question</label>
                <input
                  className="w-full px-3 py-2 rounded-lg border border-input bg-background focus:ring-2 focus:ring-primary/20 outline-none"
                  value={addForm.question}
                  onChange={e => setAddForm({ ...addForm, question: e.target.value })}
                  placeholder="e.g. How do I book?"
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Answer</label>
                <textarea
                  className="w-full px-3 py-2 rounded-lg border border-input bg-background h-24 resize-none focus:ring-2 focus:ring-primary/20 outline-none"
                  value={addForm.answer}
                  onChange={e => setAddForm({ ...addForm, answer: e.target.value })}
                  placeholder="Enter the answer here..."
                />
              </div>
              <div className="flex gap-2">
                <button onClick={handleAdd} className="btn-primary text-sm">Save FAQ</button>
                <button onClick={() => setIsAdding(false)} className="btn-outline text-sm">Cancel</button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="space-y-4">
        {faqs.length === 0 && (
          <div className="text-center py-12 text-muted-foreground bg-card rounded-xl border border-border">
            No FAQs found. Add one to get started.
          </div>
        )}
        {faqs.map(faq => (
          <div key={faq.id} className="bg-card rounded-xl p-5 border border-border hover:shadow-sm transition-all">
            {isEditing === faq.id ? (
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-medium mb-1 block text-muted-foreground">Question</label>
                  <input
                    className="w-full px-3 py-2 rounded-lg border border-input bg-background font-medium focus:ring-2 focus:ring-primary/20 outline-none"
                    value={editForm.question}
                    onChange={e => setEditForm({ ...editForm, question: e.target.value })}
                  />
                </div>
                <div>
                  <label className="text-xs font-medium mb-1 block text-muted-foreground">Answer</label>
                  <textarea
                    className="w-full px-3 py-2 rounded-lg border border-input bg-background h-24 resize-none focus:ring-2 focus:ring-primary/20 outline-none"
                    value={editForm.answer}
                    onChange={e => setEditForm({ ...editForm, answer: e.target.value })}
                  />
                </div>
                <div className="flex gap-2">
                  <button onClick={saveEdit} className="btn-primary text-xs px-3 py-1.5 flex items-center gap-1"><Save className="w-3 h-3" /> Save Changes</button>
                  <button onClick={() => setIsEditing(null)} className="btn-outline text-xs px-3 py-1.5 flex items-center gap-1"><X className="w-3 h-3" /> Cancel</button>
                </div>
              </div>
            ) : (
              <div className="flex justify-between items-start gap-4">
                <div className="flex-1">
                  <h3 className="font-medium text-primary mb-2 text-lg">{faq.question}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{faq.answer}</p>
                </div>
                <div className="flex gap-2 flex-shrink-0">
                  <button onClick={() => startEdit(faq)} className="p-2 hover:bg-muted rounded-lg text-primary transition-colors" title="Edit"><Edit2 className="w-4 h-4" /></button>
                  <button onClick={() => handleDelete(faq.id)} className="p-2 hover:bg-destructive/10 rounded-lg text-destructive transition-colors" title="Delete"><Trash2 className="w-4 h-4" /></button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminFAQs;