import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '@/types';

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (user: Omit<User, 'id'> & { password: string }) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Simular carregamento do usuário do localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const token = localStorage.getItem('authToken');

    if (storedUser && token) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }

    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    // Simular chamada à API
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Validação simples (em produção, seria feito no backend)
    if (!email || !password) {
      throw new Error('Email e senha são obrigatórios');
    }

    if (!email.includes('@')) {
      throw new Error('Email inválido');
    }

    // Simular usuário registrado
    const mockUser: User = {
      id: '1',
      name: 'João Silva',
      email: email,
      phone: '(11) 98765-4321',
      cpf: '123.456.789-10',
      birthDate: '1990-01-15',
    };

    // Armazenar token e usuário
    const token = `token_${Date.now()}`;
    localStorage.setItem('authToken', token);
    localStorage.setItem('user', JSON.stringify(mockUser));

    setUser(mockUser);
    setIsAuthenticated(true);
  };

  const register = async (userData: Omit<User, 'id'> & { password: string }) => {
    // Simular chamada à API
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Validações
    if (!userData.name || !userData.email || !userData.password) {
      throw new Error('Nome, email e senha são obrigatórios');
    }

    if (!userData.email.includes('@')) {
      throw new Error('Email inválido');
    }

    if (userData.password.length < 6) {
      throw new Error('A senha deve ter no mínimo 6 caracteres');
    }

    if (userData.cpf.length < 11) {
      throw new Error('CPF inválido');
    }

    // Criar novo usuário
    const newUser: User = {
      id: `user_${Date.now()}`,
      name: userData.name,
      email: userData.email,
      phone: userData.phone,
      cpf: userData.cpf,
      birthDate: userData.birthDate,
    };

    // Armazenar token e usuário
    const token = `token_${Date.now()}`;
    localStorage.setItem('authToken', token);
    localStorage.setItem('user', JSON.stringify(newUser));

    setUser(newUser);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, loading, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de AuthProvider');
  }
  return context;
}
