import { useState, useEffect } from "react";
import { Plus, Edit2, Trash2, Save, X, HelpCircle, Search, ChevronDown, ChevronUp, Sparkles, BadgeCheck, Zap, AlertCircle } from "lucide-react";
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
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedFaq, setExpandedFaq] = useState<string | null>(null);

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
    toast.success("FAQ added successfully", {
      icon: "🎉",
      description: "Your new FAQ is now live."
    });
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this FAQ?")) {
      saveFaqs(faqs.filter(f => f.id !== id));
      toast.success("FAQ deleted successfully");
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
    toast.success("FAQ updated successfully");
  };

  const cancelEdit = () => {
    setIsEditing(null);
    setEditForm({ question: "", answer: "" });
  };

  const filteredFaqs = faqs.filter(faq => 
    faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Animation variants
  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.05, duration: 0.5 } }),
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-4"
      >
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="bg-accent/10 text-accent text-xs font-medium px-3 py-1 rounded-full flex items-center gap-1">
              <HelpCircle className="w-3.5 h-3.5" />
              FAQ Management
            </span>
            <span className="bg-emerald-100 text-emerald-700 text-xs font-medium px-3 py-1 rounded-full flex items-center gap-1">
              <Zap className="w-3.5 h-3.5" />
              {faqs.length} FAQs
            </span>
          </div>
          <h2 className="font-serif text-3xl font-bold text-primary">Frequently Asked Questions</h2>
          <p className="text-muted-foreground mt-1 text-sm">Manage questions and answers for customers and stylists</p>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setIsAdding(true)}
          className="bg-accent text-primary text-sm px-6 py-3 rounded-lg font-medium flex items-center gap-2 hover:bg-accent/90 transition-all shadow-md"
        >
          <Plus className="w-4 h-4" /> Add New FAQ
        </motion.button>
      </motion.div>

     

      {/* Add FAQ Form */}
      <AnimatePresence>
        {isAdding && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="bg-gradient-to-br from-accent/5 to-accent/0 rounded-xl p-6 border-2 border-accent/30 shadow-lg mb-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center shadow-md">
                  <Plus className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-serif text-lg font-semibold text-primary">Add New FAQ</h3>
                  <p className="text-xs text-muted-foreground">Create a new question and answer pair</p>
                </div>
                <Sparkles className="w-5 h-5 text-accent ml-auto" />
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-primary flex items-center gap-1.5">
                    <HelpCircle className="w-4 h-4 text-accent" /> Question
                  </label>
                  <input
                    className="w-full px-4 py-3.5 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all"
                    value={addForm.question}
                    onChange={e => setAddForm({ ...addForm, question: e.target.value })}
                    placeholder="e.g. How do I book an appointment?"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-primary flex items-center gap-1.5">
                    <Edit2 className="w-4 h-4 text-accent" /> Answer
                  </label>
                  <textarea
                    className="w-full px-4 py-3.5 rounded-lg border border-border bg-background text-sm h-32 resize-none focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all"
                    value={addForm.answer}
                    onChange={e => setAddForm({ ...addForm, answer: e.target.value })}
                    placeholder="Enter a detailed answer here..."
                  />
                </div>

                <div className="flex gap-3 pt-2">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleAdd}
                    className="bg-accent text-primary px-6 py-3 rounded-lg text-sm font-medium flex items-center gap-2 hover:bg-accent/90 transition-all shadow-md"
                  >
                    <Save className="w-4 h-4" /> Save FAQ
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setIsAdding(false)}
                    className="border border-border text-muted-foreground px-6 py-3 rounded-lg text-sm font-medium hover:bg-accent/5 hover:text-accent transition-all flex items-center gap-2"
                  >
                    <X className="w-4 h-4" /> Cancel
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FAQs List */}
      {filteredFaqs.length === 0 ? (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-20 bg-card rounded-xl border border-border shadow-lg"
        >
          <div className="w-24 h-24 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
            <HelpCircle className="w-10 h-10 text-accent" />
          </div>
          <h3 className="font-serif text-2xl font-bold text-primary mb-2">No FAQs found</h3>
          <p className="text-muted-foreground mb-8 max-w-sm mx-auto">
            {searchTerm 
              ? "No FAQs match your search criteria. Try different keywords."
              : "You haven't added any FAQs yet. Click the 'Add New FAQ' button to get started."}
          </p>
          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              className="text-accent font-semibold hover:underline"
            >
              Clear search
            </button>
          )}
        </motion.div>
      ) : (
        <div className="space-y-3">
          <AnimatePresence>
            {filteredFaqs.map((faq, idx) => (
              <motion.div
                key={faq.id}
                custom={idx}
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                exit={{ opacity: 0, y: -20 }}
                layout
                className="group"
              >
                <div className={`bg-card rounded-xl border-2 transition-all duration-300 overflow-hidden ${
                  isEditing === faq.id 
                    ? "border-accent shadow-xl" 
                    : "border-border hover:border-accent/30 hover:shadow-md"
                }`}>
                  {isEditing === faq.id ? (
                    <div className="p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                          <Edit2 className="w-5 h-5 text-accent" />
                        </div>
                        <h3 className="font-serif text-lg font-semibold text-primary">Edit FAQ</h3>
                      </div>

                      <div className="space-y-4">
                        <div className="space-y-2">
                          <label className="text-xs font-medium text-primary flex items-center gap-1">
                            <HelpCircle className="w-3 h-3 text-accent" /> Question
                          </label>
                          <input
                            className="w-full px-4 py-3 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all"
                            value={editForm.question}
                            onChange={e => setEditForm({ ...editForm, question: e.target.value })}
                          />
                        </div>

                        <div className="space-y-2">
                          <label className="text-xs font-medium text-primary flex items-center gap-1">
                            <Edit2 className="w-3 h-3 text-accent" /> Answer
                          </label>
                          <textarea
                            className="w-full px-4 py-3 rounded-lg border border-border bg-background text-sm h-32 resize-none focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all"
                            value={editForm.answer}
                            onChange={e => setEditForm({ ...editForm, answer: e.target.value })}
                          />
                        </div>

                        <div className="flex gap-3 pt-2">
                          <button
                            onClick={saveEdit}
                            className="bg-emerald-600 text-white text-sm px-6 py-2.5 rounded-lg font-medium flex items-center gap-2 hover:bg-emerald-700 transition-all shadow-md"
                          >
                            <Save className="w-4 h-4" /> Save Changes
                          </button>
                          <button
                            onClick={cancelEdit}
                            className="border border-rose-200 text-rose-600 text-sm px-6 py-2.5 rounded-lg font-medium hover:bg-rose-50 transition-all flex items-center gap-2"
                          >
                            <X className="w-4 h-4" /> Cancel
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <>
                      {/* FAQ Header - Clickable */}
                      <div 
                        className="p-6 cursor-pointer"
                        onClick={() => setExpandedFaq(expandedFaq === faq.id ? null : faq.id)}
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center">
                                <HelpCircle className="w-4 h-4 text-accent" />
                              </div>
                              <h3 className="font-serif font-semibold text-lg text-primary">{faq.question}</h3>
                            </div>
                            
                            {/* Preview */}
                            {expandedFaq !== faq.id && (
                              <p className="text-sm text-muted-foreground ml-11 line-clamp-2">{faq.answer}</p>
                            )}
                          </div>

                          <div className="flex items-center gap-2">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                startEdit(faq);
                              }}
                              className="p-2 rounded-lg hover:bg-accent/10 text-accent transition-colors"
                              title="Edit FAQ"
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDelete(faq.id);
                              }}
                              className="p-2 rounded-lg hover:bg-rose-100 text-rose-600 transition-colors"
                              title="Delete FAQ"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                            <motion.div
                              animate={{ rotate: expandedFaq === faq.id ? 180 : 0 }}
                              transition={{ duration: 0.3 }}
                              className={`w-6 h-6 rounded-lg flex items-center justify-center ${
                                expandedFaq === faq.id ? 'bg-accent/10' : ''
                              }`}
                            >
                              <ChevronDown className="w-4 h-4 text-accent" />
                            </motion.div>
                          </div>
                        </div>
                      </div>

                      {/* Expanded Answer */}
                      <AnimatePresence>
                        {expandedFaq === faq.id && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                          >
                            <div className="px-6 pb-6">
                              <div className="border-t border-border pt-4">
                                <div className="bg-accent/5 rounded-lg p-4 ml-11 border border-accent/10">
                                  <p className="text-sm text-muted-foreground leading-relaxed">{faq.answer}</p>
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      
    </div>
  );
};

export default AdminFAQs;