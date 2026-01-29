import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, MapPin, ChevronRight, Heart, Stethoscope, Brain, Eye, Bone, Baby } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { BottomNavigation } from '@/components/ui/BottomNavigation';
import { DoctorCard } from '@/components/DoctorCard';
import { mockDoctors, mockUser } from '@/data/mockData';
import { motion } from 'framer-motion';

const quickCategories = [
  { icon: Heart, label: 'Cardiologia', color: 'bg-rose-100 text-rose-600' },
  { icon: Brain, label: 'Neurologia', color: 'bg-purple-100 text-purple-600' },
  { icon: Eye, label: 'Oftalmologia', color: 'bg-blue-100 text-blue-600' },
  { icon: Bone, label: 'Ortopedia', color: 'bg-amber-100 text-amber-600' },
  { icon: Baby, label: 'Pediatria', color: 'bg-pink-100 text-pink-600' },
  { icon: Stethoscope, label: 'Clínico', color: 'bg-teal-100 text-teal-600' },
];

export default function Index() {
  const [searchQuery, setSearchQuery] = useState('');
  const nearbyDoctors = mockDoctors.slice(0, 3);

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="healthcare-gradient px-4 pt-12 pb-8 rounded-b-3xl">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-lg mx-auto"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="text-white/80 text-sm">Olá,</p>
              <h1 className="text-white text-xl font-bold">{mockUser.name.split(' ')[0]} 👋</h1>
            </div>
            <Link to="/profile">
              <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                <span className="text-white font-semibold text-lg">
                  {mockUser.name.charAt(0)}
                </span>
              </div>
            </Link>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Buscar especialidade ou médico..."
              className="pl-12 pr-12 h-14 bg-card border-0 rounded-2xl shadow-elevated text-foreground"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Link to="/search">
              <Button
                size="icon"
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-xl h-10 w-10"
              >
                <Search className="w-4 h-4" />
              </Button>
            </Link>
          </div>

          {/* Location */}
          <div className="flex items-center gap-2 mt-4 text-white/90">
            <MapPin className="w-4 h-4" />
            <span className="text-sm">São Paulo, SP</span>
            <ChevronRight className="w-4 h-4" />
          </div>
        </motion.div>
      </header>

      <main className="px-4 max-w-lg mx-auto">
        {/* Quick Categories */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mt-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-lg text-foreground">Especialidades</h2>
            <Link to="/search" className="text-primary text-sm font-medium">
              Ver todas
            </Link>
          </div>
          
          <div className="grid grid-cols-3 gap-3">
            {quickCategories.map((category, index) => (
              <motion.div
                key={category.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 + index * 0.05 }}
              >
                <Link to={`/search?specialty=${category.label}`}>
                  <div className="bg-card rounded-2xl p-4 text-center shadow-card hover:shadow-elevated transition-all duration-300 border border-border/50">
                    <div className={`w-12 h-12 rounded-xl ${category.color} flex items-center justify-center mx-auto mb-2`}>
                      <category.icon className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-medium text-foreground">{category.label}</span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Nearby Doctors */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-8"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-lg text-foreground">Médicos Próximos</h2>
            <Link to="/search" className="text-primary text-sm font-medium">
              Ver todos
            </Link>
          </div>

          <div className="space-y-3">
            {nearbyDoctors.map((doctor, index) => (
              <DoctorCard key={doctor.id} doctor={doctor} index={index} />
            ))}
          </div>
        </motion.section>

        {/* CTA Banner */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-8 mb-4"
        >
          <div className="healthcare-gradient-soft rounded-2xl p-6 border border-primary/10">
            <h3 className="font-semibold text-foreground mb-2">
              Precisa de atendimento urgente?
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Encontre médicos com horários disponíveis para hoje.
            </p>
            <Link to="/search?urgent=true">
              <Button className="rounded-xl">
                Buscar Agora
              </Button>
            </Link>
          </div>
        </motion.section>
      </main>

      <BottomNavigation />
    </div>
  );
}
