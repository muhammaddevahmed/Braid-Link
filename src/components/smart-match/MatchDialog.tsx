import { FC, useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { matchStylists, MatchCriteria, MatchResult } from "@/lib/matchingEngine";
import { stylists } from "@/data/demo-data";
import DisplayMatch from "./DisplayMatch";
import { MatchingLoader } from "./MatchingLoader";

interface MatchDialogProps {
  isOpen: boolean;
  onClose: () => void;
  criteria: MatchCriteria;
}

const MatchDialog: FC<MatchDialogProps> = ({ isOpen, onClose, criteria }) => {
  const [exactMatches, setExactMatches] = useState<MatchResult[]>([]);
  const [closestMatches, setClosestMatches] = useState<MatchResult[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isOpen) {
      setIsLoading(true);
      const { exactMatches, closestMatches } = matchStylists(criteria, stylists);
      setExactMatches(exactMatches);
      setClosestMatches(closestMatches);
      setIsLoading(false);
    }
  }, [isOpen, criteria]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Stylist Matches</DialogTitle>
        </DialogHeader>
        {isLoading ? (
          <MatchingLoader />
        ) : (
          <DisplayMatch exactMatches={exactMatches} closestMatches={closestMatches} />
        )}
        <DialogFooter>
          <Button onClick={onClose}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default MatchDialog;