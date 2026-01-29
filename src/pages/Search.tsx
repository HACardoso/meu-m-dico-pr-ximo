import { useState, useMemo } from 'react';
import { ArrowLeft, Map, List } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { BottomNavigation } from '@/components/ui/BottomNavigation';
import { DoctorCard } from '@/components/DoctorCard';
import { SearchFilters } from '@/components/SearchFilters';
import { mockDoctors } from '@/data/mockData';
import { SearchFilters as SearchFiltersType } from '@/types';
import { motion, AnimatePresence } from 'framer-motion';

export default function Search() {
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');
  const [filters, setFilters] = useState<SearchFiltersType>({
    specialty: '',
    location: '',
    radius: 10,
    paymentType: 'private',
    insurance: undefined,
  });

  const filteredDoctors = useMemo(() => {
    return mockDoctors.filter((doctor) => {
      // Filter by specialty
      if (filters.specialty && !doctor.specialty.toLowerCase().includes(filters.specialty.toLowerCase())) {
        return false;
      }

      // Filter by insurance
      if (filters.paymentType === 'insurance' && filters.insurance) {
        if (!doctor.insurances.includes(filters.insurance)) {
          return false;
        }
      }

      // Filter by radius
      if (doctor.distance > filters.radius) {
        return false;
      }

      return true;
    });
  }, [filters]);

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-card border-b border-border/50 px-4 py-4">
        <div className="max-w-lg mx-auto">
          <div className="flex items-center gap-4 mb-4">
            <Link to="/">
              <Button variant="ghost" size="icon" className="rounded-xl">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <h1 className="font-semibold text-lg text-foreground">Buscar Médicos</h1>
            <div className="ml-auto flex gap-1 bg-muted rounded-lg p-1">
              <Button
                variant={viewMode === 'list' ? 'default' : 'ghost'}
                size="sm"
                className="rounded-md px-3"
                onClick={() => setViewMode('list')}
              >
                <List className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === 'map' ? 'default' : 'ghost'}
                size="sm"
                className="rounded-md px-3"
                onClick={() => setViewMode('map')}
              >
                <Map className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <SearchFilters filters={filters} onFiltersChange={setFilters} />
        </div>
      </header>

      <main className="px-4 py-4 max-w-lg mx-auto">
        <AnimatePresence mode="wait">
          {viewMode === 'list' ? (
            <motion.div
              key="list"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-3"
            >
              <p className="text-sm text-muted-foreground mb-4">
                {filteredDoctors.length} médico{filteredDoctors.length !== 1 ? 's' : ''} encontrado{filteredDoctors.length !== 1 ? 's' : ''}
              </p>

              {filteredDoctors.length > 0 ? (
                filteredDoctors.map((doctor, index) => (
                  <DoctorCard key={doctor.id} doctor={doctor} index={index} />
                ))
              ) : (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">
                    Nenhum médico encontrado com os filtros selecionados.
                  </p>
                  <Button
                    variant="outline"
                    className="mt-4 rounded-xl"
                    onClick={() => setFilters({
                      specialty: '',
                      location: '',
                      radius: 10,
                      paymentType: 'private',
                      insurance: undefined,
                    })}
                  >
                    Limpar Filtros
                  </Button>
                </div>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="map"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="relative"
            >
              {/* Map Placeholder */}
              <div className="bg-muted rounded-2xl h-[60vh] flex items-center justify-center border border-border/50">
                <div className="text-center">
                  <Map className="w-16 h-16 text-muted-foreground/50 mx-auto mb-4" />
                  <p className="text-muted-foreground">
                    Mapa de especialistas
                  </p>
                  <p className="text-sm text-muted-foreground/70 mt-1">
                    Integração com Google Maps em breve
                  </p>
                </div>
              </div>

              {/* Doctor Cards Overlay */}
              <div className="absolute bottom-4 left-0 right-0 px-4">
                <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                  {filteredDoctors.slice(0, 3).map((doctor) => (
                    <div key={doctor.id} className="min-w-[280px]">
                      <DoctorCard doctor={doctor} />
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <BottomNavigation />
    </div>
  );
}
