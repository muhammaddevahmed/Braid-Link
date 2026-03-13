import { FC } from "react";
import { motion } from "framer-motion";
import { MatchResult } from "@/lib/matchingEngine";
import StylistMatchCard from "./StylistMatchCard";
import { Separator } from "../ui/separator";

interface DisplayMatchProps {
  exactMatches: MatchResult[];
  closestMatches: MatchResult[];
}

const DisplayMatch: FC<DisplayMatchProps> = ({ exactMatches, closestMatches }) => {
  const hasExactMatches = exactMatches.length > 0;
  const hasClosestMatches = closestMatches.length > 0;

  return (
    <div>
      {hasExactMatches && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h3 className="text-lg font-semibold mb-2">Matching Stylists Found</h3>
          <div className="grid grid-cols-1 gap-4">
            {exactMatches.map((match) => (
              <StylistMatchCard key={match.stylist.id} stylist={match.stylist} />
            ))}
          </div>
        </motion.div>
      )}

      {hasClosestMatches && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: hasExactMatches ? 0.4 : 0.2 }}
        >
          {!hasExactMatches && (
            <p className="text-center mb-4">
              No exact stylist available at this time. Here are the closest
              matches.
            </p>
          )}
          {hasExactMatches && <Separator className="my-4" />}
          <h3 className="text-lg font-semibold mb-2">
            {hasExactMatches ? "Closest Matches" : ""}
          </h3>
          <div className="grid grid-cols-1 gap-4">
            {closestMatches.map((match) => (
              <StylistMatchCard key={match.stylist.id} stylist={match.stylist} />
            ))}
          </div>
        </motion.div>
      )}

      {!hasExactMatches && !hasClosestMatches && (
        <p className="text-center">No stylists found for the selected criteria.</p>
      )}
    </div>
  );
};

export default DisplayMatch;