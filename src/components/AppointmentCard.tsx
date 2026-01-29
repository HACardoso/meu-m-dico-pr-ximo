import { Calendar, Clock, MapPin, X } from 'lucide-react';
import { Appointment } from '@/types';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { motion } from 'framer-motion';
import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface AppointmentCardProps {
  appointment: Appointment;
  onCancel: (id: string) => void;
  index?: number;
}

export function AppointmentCard({ appointment, onCancel, index = 0 }: AppointmentCardProps) {
  const formattedDate = format(parseISO(appointment.date), "EEEE, dd 'de' MMMM", {
    locale: ptBR,
  });

  const statusColors = {
    confirmed: 'bg-healthcare-success/10 text-healthcare-success border-healthcare-success/20',
    pending: 'bg-healthcare-warning/10 text-healthcare-warning border-healthcare-warning/20',
    cancelled: 'bg-destructive/10 text-destructive border-destructive/20',
  };

  const statusLabels = {
    confirmed: 'Confirmada',
    pending: 'Pendente',
    cancelled: 'Cancelada',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      className="bg-card rounded-2xl p-4 shadow-card border border-border/50"
    >
      <div className="flex items-start justify-between mb-3">
        <Badge className={statusColors[appointment.status]} variant="outline">
          {statusLabels[appointment.status]}
        </Badge>
        <Badge variant="secondary">
          {appointment.paymentType === 'private' 
            ? 'Particular' 
            : appointment.insuranceName}
        </Badge>
      </div>

      <div className="flex gap-4">
        <img
          src={appointment.doctor.photo}
          alt={appointment.doctor.name}
          className="w-16 h-16 rounded-xl object-cover"
        />
        <div className="flex-1">
          <h3 className="font-semibold text-foreground">
            {appointment.doctor.name}
          </h3>
          <p className="text-sm text-muted-foreground">
            {appointment.doctor.specialty}
          </p>
        </div>
      </div>

      <div className="mt-4 space-y-2">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Calendar className="w-4 h-4 text-primary" />
          <span className="capitalize">{formattedDate}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Clock className="w-4 h-4 text-primary" />
          <span>{appointment.time}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <MapPin className="w-4 h-4 text-primary" />
          <span className="line-clamp-1">{appointment.doctor.address}</span>
        </div>
      </div>

      {appointment.status !== 'cancelled' && (
        <div className="mt-4 pt-4 border-t border-border/50">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="outline" size="sm" className="w-full rounded-xl text-destructive hover:text-destructive hover:bg-destructive/10">
                <X className="w-4 h-4 mr-2" />
                Desmarcar Consulta
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="rounded-2xl">
              <AlertDialogHeader>
                <AlertDialogTitle>Desmarcar consulta?</AlertDialogTitle>
                <AlertDialogDescription>
                  Tem certeza que deseja desmarcar sua consulta com{' '}
                  <strong>{appointment.doctor.name}</strong> no dia{' '}
                  <strong>{formattedDate}</strong> às <strong>{appointment.time}</strong>?
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel className="rounded-xl">Não, manter</AlertDialogCancel>
                <AlertDialogAction
                  className="rounded-xl bg-destructive hover:bg-destructive/90"
                  onClick={() => onCancel(appointment.id)}
                >
                  Sim, desmarcar
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      )}
    </motion.div>
  );
}
