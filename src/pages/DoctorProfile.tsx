import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, Star, MapPin, Shield, GraduationCap, Briefcase, 
  Check, ChevronRight, CreditCard, Building2 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { mockDoctors, insurances } from '@/data/mockData';
import { PaymentType, TimeSlot } from '@/types';
import { motion } from 'framer-motion';
import { format, parseISO, isToday, isTomorrow, addDays } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { toast } from '@/hooks/use-toast';

export default function DoctorProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const doctor = mockDoctors.find((d) => d.id === id);

  const [paymentType, setPaymentType] = useState<PaymentType>('private');
  const [selectedInsurance, setSelectedInsurance] = useState<string>('');
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  if (!doctor) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground">Médico não encontrado</p>
          <Link to="/search">
            <Button className="mt-4 rounded-xl">Voltar à Busca</Button>
          </Link>
        </div>
      </div>
    );
  }

  // Group slots by date
  const slotsByDate = doctor.availableSlots.reduce((acc, slot) => {
    if (!acc[slot.date]) {
      acc[slot.date] = [];
    }
    acc[slot.date].push(slot);
    return acc;
  }, {} as Record<string, TimeSlot[]>);

  const formatDateLabel = (dateStr: string) => {
    const date = parseISO(dateStr);
    if (isToday(date)) return 'Hoje';
    if (isTomorrow(date)) return 'Amanhã';
    return format(date, "EEEE, dd/MM", { locale: ptBR });
  };

  const handleConfirmAppointment = () => {
    setShowConfirmDialog(false);
    toast({
      title: 'Consulta agendada!',
      description: `Sua consulta com ${doctor.name} foi confirmada.`,
    });
    navigate('/appointments');
  };

  return (
    <div className="min-h-screen bg-background pb-8">
      {/* Header Image */}
      <div className="relative">
        <div className="h-48 healthcare-gradient" />
        <Link to="/search" className="absolute top-12 left-4">
          <Button variant="secondary" size="icon" className="rounded-xl shadow-lg">
            <ArrowLeft className="w-5 h-5" />
          </Button>
        </Link>

        {/* Doctor Info Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative -mt-16 mx-4"
        >
          <div className="bg-card rounded-2xl p-4 shadow-elevated border border-border/50">
            <div className="flex gap-4">
              <div className="relative">
                <img
                  src={doctor.photo}
                  alt={doctor.name}
                  className="w-24 h-24 rounded-xl object-cover"
                />
                <div className="absolute -bottom-1 -right-1 bg-healthcare-success text-white rounded-full p-1.5">
                  <Shield className="w-4 h-4" />
                </div>
              </div>

              <div className="flex-1">
                <h1 className="font-bold text-lg text-foreground">{doctor.name}</h1>
                <p className="text-muted-foreground">{doctor.specialty}</p>

                <div className="flex items-center gap-1 mt-2">
                  <Star className="w-4 h-4 fill-healthcare-warning text-healthcare-warning" />
                  <span className="font-semibold">{doctor.rating}</span>
                  <span className="text-sm text-muted-foreground">
                    ({doctor.reviewCount} avaliações)
                  </span>
                </div>

                <div className="flex items-center gap-1 mt-1 text-muted-foreground">
                  <MapPin className="w-4 h-4" />
                  <span className="text-sm">{doctor.distance} km de você</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <main className="px-4 mt-6 max-w-lg mx-auto">
        {/* Tabs */}
        <Tabs defaultValue="about" className="w-full">
          <TabsList className="grid w-full grid-cols-3 rounded-xl bg-muted p-1">
            <TabsTrigger value="about" className="rounded-lg">Sobre</TabsTrigger>
            <TabsTrigger value="schedule" className="rounded-lg">Agendar</TabsTrigger>
            <TabsTrigger value="reviews" className="rounded-lg">Avaliações</TabsTrigger>
          </TabsList>

          <TabsContent value="about" className="mt-4 space-y-4">
            {/* Bio */}
            <div className="bg-card rounded-xl p-4 border border-border/50">
              <p className="text-foreground leading-relaxed">{doctor.bio}</p>
            </div>

            {/* Education */}
            <div className="bg-card rounded-xl p-4 border border-border/50">
              <div className="flex items-center gap-2 mb-3">
                <GraduationCap className="w-5 h-5 text-primary" />
                <h3 className="font-semibold">Formação</h3>
              </div>
              <ul className="space-y-2">
                {doctor.education.map((edu, index) => (
                  <li key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Check className="w-4 h-4 text-healthcare-success" />
                    {edu}
                  </li>
                ))}
              </ul>
            </div>

            {/* Experience */}
            <div className="bg-card rounded-xl p-4 border border-border/50">
              <div className="flex items-center gap-2 mb-3">
                <Briefcase className="w-5 h-5 text-primary" />
                <h3 className="font-semibold">Experiência</h3>
              </div>
              <p className="text-sm text-muted-foreground">{doctor.experience}</p>
            </div>

            {/* Insurances */}
            <div className="bg-card rounded-xl p-4 border border-border/50">
              <div className="flex items-center gap-2 mb-3">
                <Shield className="w-5 h-5 text-primary" />
                <h3 className="font-semibold">Convênios Aceitos</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {doctor.insurances.map((insurance) => (
                  <Badge key={insurance} variant="secondary">
                    {insurance}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Location */}
            <div className="bg-card rounded-xl p-4 border border-border/50">
              <div className="flex items-center gap-2 mb-3">
                <MapPin className="w-5 h-5 text-primary" />
                <h3 className="font-semibold">Localização</h3>
              </div>
              <p className="text-sm text-muted-foreground">{doctor.address}</p>
              <div className="mt-3 h-32 bg-muted rounded-lg flex items-center justify-center">
                <span className="text-xs text-muted-foreground">Mapa</span>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="schedule" className="mt-4 space-y-4">
            {/* Payment Type Selection */}
            <div className="bg-card rounded-xl p-4 border border-border/50">
              <h3 className="font-semibold mb-3">Tipo de Atendimento</h3>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setPaymentType('private')}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    paymentType === 'private'
                      ? 'border-primary bg-primary/5'
                      : 'border-border/50 bg-card'
                  }`}
                >
                  <CreditCard className={`w-6 h-6 mx-auto mb-2 ${
                    paymentType === 'private' ? 'text-primary' : 'text-muted-foreground'
                  }`} />
                  <p className="font-medium text-sm">Particular</p>
                  <p className="text-primary font-bold mt-1">R$ {doctor.privatePrice}</p>
                </button>

                <button
                  onClick={() => setPaymentType('insurance')}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    paymentType === 'insurance'
                      ? 'border-primary bg-primary/5'
                      : 'border-border/50 bg-card'
                  }`}
                >
                  <Building2 className={`w-6 h-6 mx-auto mb-2 ${
                    paymentType === 'insurance' ? 'text-primary' : 'text-muted-foreground'
                  }`} />
                  <p className="font-medium text-sm">Convênio</p>
                  <p className="text-muted-foreground text-xs mt-1">Selecione abaixo</p>
                </button>
              </div>

              {paymentType === 'insurance' && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="mt-4 space-y-2"
                >
                  {doctor.insurances.map((insurance) => (
                    <button
                      key={insurance}
                      onClick={() => setSelectedInsurance(insurance)}
                      className={`w-full p-3 rounded-lg flex items-center justify-between transition-all ${
                        selectedInsurance === insurance
                          ? 'bg-primary/10 border border-primary'
                          : 'bg-muted border border-transparent'
                      }`}
                    >
                      <span className="font-medium text-sm">{insurance}</span>
                      {selectedInsurance === insurance && (
                        <Check className="w-4 h-4 text-primary" />
                      )}
                    </button>
                  ))}
                </motion.div>
              )}
            </div>

            {/* Available Slots */}
            <div className="bg-card rounded-xl p-4 border border-border/50">
              <h3 className="font-semibold mb-3">Horários Disponíveis</h3>
              <div className="space-y-4">
                {Object.entries(slotsByDate).map(([date, slots]) => (
                  <div key={date}>
                    <p className="text-sm font-medium text-muted-foreground mb-2 capitalize">
                      {formatDateLabel(date)}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {slots.map((slot) => (
                        <button
                          key={slot.id}
                          onClick={() => setSelectedSlot(slot)}
                          disabled={!slot.available}
                          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                            selectedSlot?.id === slot.id
                              ? 'bg-primary text-primary-foreground'
                              : slot.available
                              ? 'bg-muted hover:bg-primary/10 text-foreground'
                              : 'bg-muted/50 text-muted-foreground cursor-not-allowed'
                          }`}
                        >
                          {slot.time}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Confirm Button */}
            <Button
              className="w-full h-14 rounded-xl text-lg font-semibold"
              disabled={!selectedSlot || (paymentType === 'insurance' && !selectedInsurance)}
              onClick={() => setShowConfirmDialog(true)}
            >
              Confirmar Agendamento
              <ChevronRight className="w-5 h-5 ml-2" />
            </Button>
          </TabsContent>

          <TabsContent value="reviews" className="mt-4">
            <div className="text-center py-12">
              <Star className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
              <p className="text-muted-foreground">Avaliações em breve</p>
            </div>
          </TabsContent>
        </Tabs>
      </main>

      {/* Confirmation Dialog */}
      <Dialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <DialogContent className="rounded-2xl">
          <DialogHeader>
            <DialogTitle>Confirmar Agendamento</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="flex items-center gap-4">
              <img
                src={doctor.photo}
                alt={doctor.name}
                className="w-16 h-16 rounded-xl object-cover"
              />
              <div>
                <p className="font-semibold">{doctor.name}</p>
                <p className="text-sm text-muted-foreground">{doctor.specialty}</p>
              </div>
            </div>

            <div className="bg-muted rounded-xl p-4 space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Data</span>
                <span className="font-medium capitalize">
                  {selectedSlot && formatDateLabel(selectedSlot.date)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Horário</span>
                <span className="font-medium">{selectedSlot?.time}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Pagamento</span>
                <span className="font-medium">
                  {paymentType === 'private' ? 'Particular' : selectedInsurance}
                </span>
              </div>
              {paymentType === 'private' && (
                <div className="flex justify-between pt-2 border-t border-border">
                  <span className="text-muted-foreground">Valor</span>
                  <span className="font-bold text-primary">R$ {doctor.privatePrice}</span>
                </div>
              )}
            </div>

            <div className="flex gap-3">
              <Button
                variant="outline"
                className="flex-1 rounded-xl"
                onClick={() => setShowConfirmDialog(false)}
              >
                Cancelar
              </Button>
              <Button
                className="flex-1 rounded-xl"
                onClick={handleConfirmAppointment}
              >
                Confirmar
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
