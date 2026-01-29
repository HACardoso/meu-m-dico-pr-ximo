import { useState } from 'react';
import { Search, MapPin, SlidersHorizontal, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { specialties, insurances } from '@/data/mockData';
import { SearchFilters as SearchFiltersType, PaymentType } from '@/types';
import { motion } from 'framer-motion';

interface SearchFiltersProps {
  filters: SearchFiltersType;
  onFiltersChange: (filters: SearchFiltersType) => void;
}

export function SearchFilters({ filters, onFiltersChange }: SearchFiltersProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleSpecialtyChange = (value: string) => {
    onFiltersChange({ ...filters, specialty: value });
  };

  const handlePaymentTypeChange = (type: PaymentType) => {
    onFiltersChange({ 
      ...filters, 
      paymentType: type,
      insurance: type === 'private' ? undefined : filters.insurance
    });
  };

  const handleInsuranceChange = (value: string) => {
    onFiltersChange({ ...filters, insurance: value });
  };

  const handleRadiusChange = (value: number[]) => {
    onFiltersChange({ ...filters, radius: value[0] });
  };

  const clearFilters = () => {
    onFiltersChange({
      specialty: '',
      location: '',
      radius: 10,
      paymentType: 'private',
      insurance: undefined,
    });
  };

  const activeFiltersCount = [
    filters.specialty,
    filters.paymentType === 'insurance' && filters.insurance,
    filters.radius !== 10,
  ].filter(Boolean).length;

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <Input
          placeholder="Buscar especialidade..."
          className="pl-12 pr-4 h-12 bg-card border-border/50 rounded-xl"
          value={filters.specialty}
          onChange={(e) => handleSpecialtyChange(e.target.value)}
        />
      </div>

      {/* Quick Filters */}
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1 px-3 py-2 bg-card rounded-lg border border-border/50">
          <MapPin className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium">{filters.radius} km</span>
        </div>

        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="relative rounded-lg"
            >
              <SlidersHorizontal className="w-4 h-4 mr-2" />
              Filtros
              {activeFiltersCount > 0 && (
                <Badge className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center text-xs">
                  {activeFiltersCount}
                </Badge>
              )}
            </Button>
          </SheetTrigger>
          <SheetContent side="bottom" className="h-[80vh] rounded-t-3xl">
            <SheetHeader>
              <SheetTitle className="text-left">Filtros de Busca</SheetTitle>
            </SheetHeader>
            
            <div className="mt-6 space-y-6">
              {/* Specialty */}
              <div className="space-y-2">
                <Label>Especialidade</Label>
                <Select
                  value={filters.specialty}
                  onValueChange={handleSpecialtyChange}
                >
                  <SelectTrigger className="h-12 rounded-xl">
                    <SelectValue placeholder="Todas as especialidades" />
                  </SelectTrigger>
                  <SelectContent className="bg-card">
                    {specialties.map((specialty) => (
                      <SelectItem key={specialty} value={specialty}>
                        {specialty}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Payment Type */}
              <div className="space-y-2">
                <Label>Tipo de Atendimento</Label>
                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant={filters.paymentType === 'private' ? 'default' : 'outline'}
                    className="flex-1 rounded-xl"
                    onClick={() => handlePaymentTypeChange('private')}
                  >
                    Particular
                  </Button>
                  <Button
                    type="button"
                    variant={filters.paymentType === 'insurance' ? 'default' : 'outline'}
                    className="flex-1 rounded-xl"
                    onClick={() => handlePaymentTypeChange('insurance')}
                  >
                    Convênio
                  </Button>
                </div>
              </div>

              {/* Insurance Select (conditional) */}
              {filters.paymentType === 'insurance' && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-2"
                >
                  <Label>Selecione o Convênio</Label>
                  <Select
                    value={filters.insurance}
                    onValueChange={handleInsuranceChange}
                  >
                    <SelectTrigger className="h-12 rounded-xl">
                      <SelectValue placeholder="Escolha seu convênio" />
                    </SelectTrigger>
                    <SelectContent className="bg-card">
                      {insurances.map((insurance) => (
                        <SelectItem key={insurance} value={insurance}>
                          {insurance}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </motion.div>
              )}

              {/* Radius */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label>Raio de Busca</Label>
                  <span className="text-sm font-medium text-primary">
                    {filters.radius} km
                  </span>
                </div>
                <Slider
                  value={[filters.radius]}
                  onValueChange={handleRadiusChange}
                  min={1}
                  max={50}
                  step={1}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>1 km</span>
                  <span>50 km</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-4">
                <Button
                  variant="outline"
                  className="flex-1 rounded-xl"
                  onClick={clearFilters}
                >
                  <X className="w-4 h-4 mr-2" />
                  Limpar
                </Button>
                <Button
                  className="flex-1 rounded-xl"
                  onClick={() => setIsOpen(false)}
                >
                  Aplicar Filtros
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
}
