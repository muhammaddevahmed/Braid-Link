import React from 'react';
import { motion } from 'framer-motion';
import { Stylist } from '@/data/demo-data';
import { Star, MapPin, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface AssignedStylistCardProps {
  stylist: Stylist;
  onViewProfile: () => void;
}

const AssignedStylistCard: React.FC<AssignedStylistCardProps> = ({
  stylist,
  onViewProfile,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="overflow-hidden border-2 border-accent/20 hover:border-accent/50 transition-colors">
        <div className="p-6 bg-gradient-to-br from-background to-muted/50">
          <h3 className="text-lg font-semibold text-primary mb-4 flex items-center gap-2">
            👤 Your Assigned Stylist
          </h3>

          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
            {/* Stylist Image */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex-shrink-0"
            >
              <img
                src={stylist.photo}
                alt={stylist.name}
                className="w-24 h-24 rounded-xl object-cover ring-2 ring-accent/30 shadow-md"
              />
            </motion.div>

            {/* Stylist Info */}
            <div className="flex-1">
              <h4 className="text-xl font-bold text-primary mb-2">
                {stylist.name}
              </h4>

              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                  <span className="text-sm font-medium">
                    {stylist.rating}{' '}
                    <span className="text-muted-foreground">
                      ({stylist.reviewCount} reviews)
                    </span>
                  </span>
                </div>

                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="w-4 h-4 flex-shrink-0" />
                  <span>{stylist.location}</span>
                </div>
              </div>

              <Button
                onClick={onViewProfile}
                variant="default"
                className="bg-accent text-primary hover:bg-accent/90 w-full sm:w-auto"
              >
                <Eye className="w-4 h-4 mr-2" />
                View Profile
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default AssignedStylistCard;
