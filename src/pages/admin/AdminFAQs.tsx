import { useState, useEffect } from "react";
import { Plus, Edit2, Trash2, Save, X, HelpCircle, Search, ChevronDown, ChevronUp } from "lucide-react";
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
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-4"
      >
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="bg-primary/10 text-primary text-xs font-medium px-3 py-1 rounded-full flex items-center gap-1">
              <HelpCircle className="w-3.5 h-3.5" />
              FAQ Management
            </span>
          </div>
          <h2 className="font-serif text-3xl font-bold text-primary">Frequently Asked Questions</h2>
          <p className="text-detail mt-1 font-brand">Manage questions and answers for customers and stylists</p>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setIsAdding(true)}
          className="btn-cta text-sm px-6 py-3 rounded-xl flex items-center gap-2"
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
            <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-2xl p-6 border-2 border-primary/30 shadow-lg mb-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                  <Plus className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-serif text-lg font-semibold text-primary">Add New FAQ</h3>
                  <p className="text-xs text-detail">Create a new question and answer pair</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-primary flex items-center gap-1.5">
                    <HelpCircle className="w-4 h-4" /> Question
                  </label>
                  <input
                    className="w-full px-4 py-3.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                    value={addForm.question}
                    onChange={e => setAddForm({ ...addForm, question: e.target.value })}
                    placeholder="e.g. How do I book an appointment?"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-primary flex items-center gap-1.5">
                    <Edit2 className="w-4 h-4" /> Answer
                  </label>
                  <textarea
                    className="w-full px-4 py-3.5 rounded-xl border border-border bg-background text-sm h-32 resize-none focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
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
                    className="btn-primary px-6 py-3 rounded-xl text-sm flex items-center gap-2"
                  >
                    <Save className="w-4 h-4" /> Save FAQ
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setIsAdding(false)}
                    className="btn-outline px-6 py-3 rounded-xl text-sm flex items-center gap-2"
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
          className="text-center py-16 bg-card rounded-2xl border border-border/50"
        >
          <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
            <HelpCircle className="w-8 h-8 text-primary" />
          </div>
          <h3 className="font-serif text-xl font-bold text-primary mb-2">No FAQs found</h3>
          <p className="text-detail mb-6 max-w-sm mx-auto">
            {searchTerm 
              ? "No FAQs match your search criteria. Try different keywords."
              : "You haven't added any FAQs yet. Click the 'Add New FAQ' button to get started."}
          </p>
          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              className="text-primary font-semibold hover:underline"
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
                <div className={`bg-card rounded-2xl border-2 transition-all duration-300 overflow-hidden ${
                  isEditing === faq.id 
                    ? "border-primary shadow-xl" 
                    : "border-border/50 hover:border-primary/30 hover:shadow-lg"
                }`}>
                  {isEditing === faq.id ? (
                    <div className="p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <Edit2 className="w-5 h-5 text-primary" />
                        </div>
                        <h3 className="font-serif text-lg font-semibold text-primary">Edit FAQ</h3>
                      </div>

                      <div className="space-y-4">
                        <div className="space-y-2">
                          <label className="text-xs font-medium text-primary">Question</label>
                          <input
                            className="w-full px-4 py-3 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                            value={editForm.question}
                            onChange={e => setEditForm({ ...editForm, question: e.target.value })}
                          />
                        </div>

                        <div className="space-y-2">
                          <label className="text-xs font-medium text-primary">Answer</label>
                          <textarea
                            className="w-full px-4 py-3 rounded-xl border border-border bg-background text-sm h-32 resize-none focus:outline-none focus:ring-2 focus:ring-primary/50"
                            value={editForm.answer}
                            onChange={e => setEditForm({ ...editForm, answer: e.target.value })}
                          />
                        </div>

                        <div className="flex gap-3 pt-2">
                          <button
                            onClick={saveEdit}
                            className="btn-primary text-sm px-6 py-2.5 rounded-xl flex items-center gap-2"
                          >
                            <Save className="w-4 h-4" /> Save Changes
                          </button>
                          <button
                            onClick={cancelEdit}
                            className="btn-outline text-sm px-6 py-2.5 rounded-xl flex items-center gap-2"
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
                              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                                <HelpCircle className="w-4 h-4 text-primary" />
                              </div>
                              <h3 className="font-serif font-semibold text-lg text-primary">{faq.question}</h3>
                            </div>
                            
                            {/* Preview */}
                            {expandedFaq !== faq.id && (
                              <p className="text-sm text-detail ml-11 line-clamp-2">{faq.answer}</p>
                            )}
                          </div>

                          <div className="flex items-center gap-2">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                startEdit(faq);
                              }}
                              className="p-2 rounded-lg hover:bg-primary/10 text-primary transition-colors"
                              title="Edit FAQ"
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDelete(faq.id);
                              }}
                              className="p-2 rounded-lg hover:bg-destructive/10 text-destructive transition-colors"
                              title="Delete FAQ"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                            <motion.div
                              animate={{ rotate: expandedFaq === faq.id ? 180 : 0 }}
                              transition={{ duration: 0.3 }}
                            >
                              <ChevronDown className="w-5 h-5 text-detail" />
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
                                <div className="bg-primary/5 rounded-xl p-4 ml-11">
                                  <p className="text-sm text-detail leading-relaxed">{faq.answer}</p>
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