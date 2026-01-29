import { Star, MapPin, Shield, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Doctor } from '@/types';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';

interface DoctorCardProps {
  doctor: Doctor;
  index?: number;
}

export function DoctorCard({ doctor, index = 0 }: DoctorCardProps) {
  const nextSlot = doctor.availableSlots.find(slot => slot.available);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
    >
      <Link to={`/doctor/${doctor.id}`}>
        <div className="bg-card rounded-2xl p-4 shadow-card hover:shadow-elevated transition-all duration-300 border border-border/50">
          <div className="flex gap-4">
            <div className="relative">
              <img
                src={doctor.photo}
                alt={doctor.name}
                className="w-20 h-20 rounded-xl object-cover"
              />
              <div className="absolute -bottom-1 -right-1 bg-healthcare-success text-white rounded-full p-1">
                <Shield className="w-3 h-3" />
              </div>
            </div>

            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-foreground truncate">
                {doctor.name}
              </h3>
              <p className="text-sm text-muted-foreground">{doctor.specialty}</p>

              <div className="flex items-center gap-1 mt-1">
                <Star className="w-4 h-4 fill-healthcare-warning text-healthcare-warning" />
                <span className="text-sm font-medium">{doctor.rating}</span>
                <span className="text-xs text-muted-foreground">
                  ({doctor.reviewCount} avaliações)
                </span>
              </div>

              <div className="flex items-center gap-1 mt-1 text-muted-foreground">
                <MapPin className="w-3 h-3" />
                <span className="text-xs">{doctor.distance} km</span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-1.5 mt-3">
            {doctor.insurances.slice(0, 3).map((insurance) => (
              <Badge
                key={insurance}
                variant="secondary"
                className="text-xs font-normal"
              >
                {insurance}
              </Badge>
            ))}
            {doctor.insurances.length > 3 && (
              <Badge variant="secondary" className="text-xs font-normal">
                +{doctor.insurances.length - 3}
              </Badge>
            )}
          </div>

          <div className="flex items-center justify-between mt-3 pt-3 border-t border-border/50">
            <div className="flex items-center gap-1 text-healthcare-success">
              <Clock className="w-4 h-4" />
              <span className="text-sm font-medium">
                {nextSlot ? `Próximo: ${nextSlot.time}` : 'Sem horários'}
              </span>
            </div>
            <span className="text-sm font-semibold text-primary">
              R$ {doctor.privatePrice}
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
