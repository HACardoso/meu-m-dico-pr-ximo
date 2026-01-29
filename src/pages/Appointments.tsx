import { useState } from 'react';
import { Calendar, Clock } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BottomNavigation } from '@/components/ui/BottomNavigation';
import { AppointmentCard } from '@/components/AppointmentCard';
import { mockAppointments } from '@/data/mockData';
import { Appointment } from '@/types';
import { motion } from 'framer-motion';
import { toast } from '@/hooks/use-toast';

export default function Appointments() {
  const [appointments, setAppointments] = useState<Appointment[]>(mockAppointments);

  const upcomingAppointments = appointments.filter(
    (apt) => apt.status === 'confirmed' || apt.status === 'pending'
  );
  const pastAppointments = appointments.filter((apt) => apt.status === 'cancelled');

  const handleCancelAppointment = (id: string) => {
    setAppointments((prev) =>
      prev.map((apt) =>
        apt.id === id ? { ...apt, status: 'cancelled' as const } : apt
      )
    );
    toast({
      title: 'Consulta desmarcada',
      description: 'Sua consulta foi cancelada com sucesso.',
    });
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="bg-card border-b border-border/50 px-4 pt-12 pb-4">
        <div className="max-w-lg mx-auto">
          <h1 className="text-2xl font-bold text-foreground">Minhas Consultas</h1>
          <p className="text-muted-foreground mt-1">
            Gerencie seus agendamentos
          </p>
        </div>
      </header>

      <main className="px-4 py-4 max-w-lg mx-auto">
        <Tabs defaultValue="upcoming" className="w-full">
          <TabsList className="grid w-full grid-cols-2 rounded-xl bg-muted p-1 mb-4">
            <TabsTrigger value="upcoming" className="rounded-lg">
              <Calendar className="w-4 h-4 mr-2" />
              Próximas
            </TabsTrigger>
            <TabsTrigger value="past" className="rounded-lg">
              <Clock className="w-4 h-4 mr-2" />
              Histórico
            </TabsTrigger>
          </TabsList>

          <TabsContent value="upcoming">
            {upcomingAppointments.length > 0 ? (
              <div className="space-y-3">
                {upcomingAppointments.map((appointment, index) => (
                  <AppointmentCard
                    key={appointment.id}
                    appointment={appointment}
                    onCancel={handleCancelAppointment}
                    index={index}
                  />
                ))}
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-12"
              >
                <Calendar className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
                <h3 className="font-semibold text-foreground mb-2">
                  Nenhuma consulta agendada
                </h3>
                <p className="text-sm text-muted-foreground">
                  Busque um médico e agende sua próxima consulta.
                </p>
              </motion.div>
            )}
          </TabsContent>

          <TabsContent value="past">
            {pastAppointments.length > 0 ? (
              <div className="space-y-3">
                {pastAppointments.map((appointment, index) => (
                  <AppointmentCard
                    key={appointment.id}
                    appointment={appointment}
                    onCancel={handleCancelAppointment}
                    index={index}
                  />
                ))}
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-12"
              >
                <Clock className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
                <h3 className="font-semibold text-foreground mb-2">
                  Sem histórico
                </h3>
                <p className="text-sm text-muted-foreground">
                  Consultas canceladas aparecerão aqui.
                </p>
              </motion.div>
            )}
          </TabsContent>
        </Tabs>
      </main>

      <BottomNavigation />
    </div>
  );
}
