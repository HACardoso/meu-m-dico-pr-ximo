import { useState } from 'react';
import { 
  User, Mail, Phone, Calendar, CreditCard, Bell, Shield, 
  ChevronRight, LogOut, Settings, HelpCircle, FileText 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { BottomNavigation } from '@/components/ui/BottomNavigation';
import { mockUser } from '@/data/mockData';
import { motion } from 'framer-motion';
import { toast } from '@/hooks/use-toast';

const menuItems = [
  { icon: Bell, label: 'Notificações', action: 'notifications' },
  { icon: Shield, label: 'Privacidade', action: 'privacy' },
  { icon: CreditCard, label: 'Pagamentos', action: 'payments' },
  { icon: FileText, label: 'Termos de Uso', action: 'terms' },
  { icon: HelpCircle, label: 'Ajuda', action: 'help' },
  { icon: Settings, label: 'Configurações', action: 'settings' },
];

export default function Profile() {
  const [user, setUser] = useState(mockUser);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editForm, setEditForm] = useState(user);
  const [notifications, setNotifications] = useState(true);

  const handleSaveProfile = () => {
    setUser(editForm);
    setIsEditOpen(false);
    toast({
      title: 'Perfil atualizado',
      description: 'Suas informações foram salvas com sucesso.',
    });
  };

  const handleMenuClick = (action: string) => {
    toast({
      title: 'Em breve',
      description: `A funcionalidade "${action}" estará disponível em breve.`,
    });
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="healthcare-gradient px-4 pt-12 pb-20 rounded-b-3xl">
        <div className="max-w-lg mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-24 h-24 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-4"
          >
            <span className="text-white text-3xl font-bold">
              {user.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
            </span>
          </motion.div>
          <h1 className="text-white text-xl font-bold">{user.name}</h1>
          <p className="text-white/80">{user.email}</p>
        </div>
      </header>

      <main className="px-4 -mt-8 max-w-lg mx-auto">
        {/* Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card rounded-2xl p-4 shadow-elevated border border-border/50 mb-4"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-foreground">Informações Pessoais</h2>
            <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
              <DialogTrigger asChild>
                <Button variant="ghost" size="sm" className="text-primary">
                  Editar
                </Button>
              </DialogTrigger>
              <DialogContent className="rounded-2xl">
                <DialogHeader>
                  <DialogTitle>Editar Perfil</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label>Nome Completo</Label>
                    <Input
                      value={editForm.name}
                      onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                      className="rounded-xl"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>E-mail</Label>
                    <Input
                      type="email"
                      value={editForm.email}
                      onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                      className="rounded-xl"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Telefone</Label>
                    <Input
                      value={editForm.phone}
                      onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                      className="rounded-xl"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>CPF</Label>
                    <Input
                      value={editForm.cpf}
                      onChange={(e) => setEditForm({ ...editForm, cpf: e.target.value })}
                      className="rounded-xl"
                    />
                  </div>
                  <Button className="w-full rounded-xl" onClick={handleSaveProfile}>
                    Salvar Alterações
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 bg-muted rounded-xl">
              <User className="w-5 h-5 text-primary" />
              <div className="flex-1">
                <p className="text-xs text-muted-foreground">Nome</p>
                <p className="text-sm font-medium">{user.name}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-muted rounded-xl">
              <Mail className="w-5 h-5 text-primary" />
              <div className="flex-1">
                <p className="text-xs text-muted-foreground">E-mail</p>
                <p className="text-sm font-medium">{user.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-muted rounded-xl">
              <Phone className="w-5 h-5 text-primary" />
              <div className="flex-1">
                <p className="text-xs text-muted-foreground">Telefone</p>
                <p className="text-sm font-medium">{user.phone}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-muted rounded-xl">
              <Calendar className="w-5 h-5 text-primary" />
              <div className="flex-1">
                <p className="text-xs text-muted-foreground">CPF</p>
                <p className="text-sm font-medium">{user.cpf}</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Quick Settings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-card rounded-2xl p-4 shadow-card border border-border/50 mb-4"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Bell className="w-5 h-5 text-primary" />
              <div>
                <p className="font-medium text-sm">Notificações Push</p>
                <p className="text-xs text-muted-foreground">Receba lembretes de consultas</p>
              </div>
            </div>
            <Switch
              checked={notifications}
              onCheckedChange={setNotifications}
            />
          </div>
        </motion.div>

        {/* Menu */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-card rounded-2xl shadow-card border border-border/50 overflow-hidden"
        >
          {menuItems.map((item, index) => (
            <button
              key={item.action}
              onClick={() => handleMenuClick(item.label)}
              className="w-full flex items-center gap-3 p-4 hover:bg-muted transition-colors border-b border-border/50 last:border-0"
            >
              <item.icon className="w-5 h-5 text-muted-foreground" />
              <span className="flex-1 text-left font-medium text-sm">{item.label}</span>
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
            </button>
          ))}
        </motion.div>

        {/* Logout */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-4"
        >
          <Button
            variant="outline"
            className="w-full rounded-xl text-destructive hover:text-destructive hover:bg-destructive/10"
            onClick={() => toast({
              title: 'Em breve',
              description: 'Sistema de autenticação em desenvolvimento.',
            })}
          >
            <LogOut className="w-4 h-4 mr-2" />
            Sair da Conta
          </Button>
        </motion.div>

        {/* Version */}
        <p className="text-center text-xs text-muted-foreground mt-6 mb-4">
          Meu Médico v1.0.0
        </p>
      </main>

      <BottomNavigation />
    </div>
  );
}
