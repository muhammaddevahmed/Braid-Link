import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle, Clock, DollarSign } from "lucide-react";

export interface ConfirmationData {
  styleImage: string;
  styleName: string;
  hairstyleDescription: string;
  price: number;
  duration: number;
  hairSafetyLevel: string;
  frontImage: string;
  backImage: string;
}

interface AIConfirmationCardProps {
  data: ConfirmationData;
  onFindStylist: () => void;
}

export const AIConfirmationCard = ({
  data,
  onFindStylist,
}: AIConfirmationCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="space-y-8"
    >
      <div className="text-center mb-8">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="flex justify-center mb-4"
        >
          <div className="bg-green-50 border-2 border-green-200 rounded-full p-4">
            <CheckCircle className="w-12 h-12 text-green-500" />
          </div>
        </motion.div>
        <h2 className="font-serif text-4xl md:text-5xl font-bold text-primary mb-3">
          Perfect! Style Selected
        </h2>
        <p className="text-muted-foreground text-lg">
          Ready to find your perfect stylist?
        </p>
      </div>

      <div className="max-w-3xl mx-auto">
        {/* Summary Cards Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8"
        >
          {/* Style Preview */}
          <motion.div
            whileHover={{ y: -5 }}
            className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100"
          >
            <div className="relative h-64 bg-gradient-to-br from-accent/10 to-accent/5">
              <img
                src={data.styleImage}
                alt={data.styleName}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-5">
              <h3 className="font-semibold text-lg text-primary mb-2">
                Your Style
              </h3>
              <p className="text-sm text-muted-foreground line-clamp-3">
                {data.hairstyleDescription}
              </p>
            </div>
          </motion.div>

          {/* Your Photos */}
          <motion.div
            whileHover={{ y: -5 }}
            className="bg-white rounded-2xl p-5 shadow-lg border border-gray-100"
          >
            <h3 className="font-semibold text-lg text-primary mb-4">
              Your Photos
            </h3>
            <div className="space-y-3">
              <div className="flex gap-3">
                <div className="w-1/2">
                  <p className="text-xs font-semibold text-muted-foreground mb-2 uppercase">
                    Front Face
                  </p>
                  <div className="relative h-24 bg-muted rounded-lg overflow-hidden border border-gray-200">
                    <img
                      src={data.frontImage}
                      alt="Front"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div className="w-1/2">
                  <p className="text-xs font-semibold text-muted-foreground mb-2 uppercase">
                    Back Hair
                  </p>
                  <div className="relative h-24 bg-muted rounded-lg overflow-hidden border border-gray-200">
                    <img
                      src={data.backImage}
                      alt="Back"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Details Section */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="bg-gradient-to-r from-accent/5 to-accent/10 rounded-2xl p-6 md:p-8 mb-8 border border-accent/20"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <p className="text-xs font-semibold text-muted-foreground mb-2 uppercase">
                Style Name
              </p>
              <p className="font-bold text-primary">{data.styleName}</p>
            </div>
            <div>
              <p className="text-xs font-semibold text-muted-foreground mb-2 uppercase flex items-center gap-1">
                <DollarSign className="w-3 h-3" />
                Price
              </p>
              <p className="font-bold text-primary">£{data.price}</p>
            </div>
            <div>
              <p className="text-xs font-semibold text-muted-foreground mb-2 uppercase flex items-center gap-1">
                <Clock className="w-3 h-3" />
                Duration
              </p>
              <p className="font-bold text-primary">{data.duration}h</p>
            </div>
            <div>
              <p className="text-xs font-semibold text-muted-foreground mb-2 uppercase">
                Hair Safety
              </p>
              <Badge
                variant="outline"
                className="bg-green-50 text-green-700 border-green-200"
              >
                {data.hairSafetyLevel}
              </Badge>
            </div>
          </div>
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <Button
            onClick={onFindStylist}
            className="w-full bg-accent text-primary font-semibold py-6 rounded-xl text-lg hover:bg-accent/90 transition-all duration-300"
          >
            Find Your Perfect Stylist
          </Button>
        </motion.div>
      </div>
    </motion.div>
  );
};
