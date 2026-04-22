import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { hairstyleCategories, HairstyleItem } from "@/data/demo-data";

interface AddPortfolioModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddPortfolio: (newPortfolio: { image: string; name: string; category: string }) => void;
}

export const AddPortfolioModal = ({ isOpen, onClose, onAddPortfolio }: AddPortfolioModalProps) => {
  const [image, setImage] = useState<string | null>(null);
  const [category, setCategory] = useState("");
  const [name, setName] = useState("");
  const [hairstyles, setHairstyles] = useState<HairstyleItem[]>([]);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  useEffect(() => {
    if (category) {
      const selectedCategory = hairstyleCategories.find(cat => cat.name === category);
      setHairstyles(selectedCategory ? selectedCategory.hairstyles : []);
      setName(""); // Reset hairstyle selection when category changes
    } else {
      setHairstyles([]);
    }
  }, [category]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    if (image && name && category) {
      onAddPortfolio({ image, name, category });
      onClose();
      // Reset form
      setImage(null);
      setCategory("");
      setName("");
      setImagePreview(null);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add to Portfolio</DialogTitle>
          <DialogDescription>
            Showcase a new piece of your work.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="picture">Picture</Label>
            <div className="flex items-center gap-4">
                <Input id="picture" type="file" accept="image/*" onChange={handleFileChange} className="w-full" />
                {imagePreview && <img src={imagePreview} alt="preview" className="w-16 h-16 object-cover rounded-md" />}
            </div>
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="category">Category</Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {hairstyleCategories.map((cat) => (
                  <SelectItem key={cat.id} value={cat.name}>
                    {cat.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="hairstyle">Hairstyle</Label>
            <Select value={name} onValueChange={setName} disabled={!category}>
              <SelectTrigger>
                <SelectValue placeholder="Select a hairstyle" />
              </SelectTrigger>
              <SelectContent>
                {hairstyles.map((style) => (
                  <SelectItem key={style.id} value={style.name}>
                    {style.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Add</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};