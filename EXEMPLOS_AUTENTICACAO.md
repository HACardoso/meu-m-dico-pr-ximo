# 💻 Exemplos de Código - Sistema de Autenticação

## 1. Usando o Hook `useAuth()`

### Exemplo Básico

```typescript
import { useAuth } from '@/contexts/AuthContext';

export default function MeuComponente() {
  const { isAuthenticated, user, login, logout } = useAuth();

  if (!isAuthenticated) {
    return <p>Você não está autenticado</p>;
  }

  return (
    <div>
      <p>Bem-vindo, {user?.name}!</p>
      <button onClick={logout}>Sair</button>
    </div>
  );
}
```

### Verificar Dados do Usuário

```typescript
import { useAuth } from '@/contexts/AuthContext';

export default function Perfil() {
  const { user } = useAuth();

  return (
    <div>
      <p>Nome: {user?.name}</p>
      <p>Email: {user?.email}</p>
      <p>Telefone: {user?.phone}</p>
      <p>CPF: {user?.cpf}</p>
    </div>
  );
}
```

## 2. Fazer Login Programaticamente

```typescript
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      await login(email, password);
      // Login bem-sucedido - redirecionamento automático
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro no login');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Senha"
      />
      {error && <p className="text-red-500">{error}</p>}
      <button type="submit">Entrar</button>
    </form>
  );
}
```

## 3. Registrar Novo Usuário

```typescript
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';

export default function RegisterForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    cpf: '',
    birthDate: '',
    password: '',
  });
  const { register } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await register({
        ...formData,
        password: formData.password,
      });
      // Registro bem-sucedido - usuário logado automaticamente
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={formData.name}
        onChange={(e) =>
          setFormData({ ...formData, name: e.target.value })
        }
        placeholder="Nome completo"
      />
      <input
        type="email"
        value={formData.email}
        onChange={(e) =>
          setFormData({ ...formData, email: e.target.value })
        }
        placeholder="Email"
      />
      <input
        type="tel"
        value={formData.phone}
        onChange={(e) =>
          setFormData({ ...formData, phone: e.target.value })
        }
        placeholder="Telefone"
      />
      <input
        type="text"
        value={formData.cpf}
        onChange={(e) => setFormData({ ...formData, cpf: e.target.value })}
        placeholder="CPF"
      />
      <input
        type="date"
        value={formData.birthDate}
        onChange={(e) =>
          setFormData({ ...formData, birthDate: e.target.value })
        }
      />
      <input
        type="password"
        value={formData.password}
        onChange={(e) =>
          setFormData({ ...formData, password: e.target.value })
        }
        placeholder="Senha"
      />
      <button type="submit">Registrar</button>
    </form>
  );
}
```

## 4. Proteger Rotas Privadas

### Com ProtectedRoute

```typescript
import { ProtectedRoute } from '@/components/ProtectedRoute';
import Appointments from '@/pages/Appointments';

function App() {
  return (
    <Routes>
      {/* Rota pública */}
      <Route path="/login" element={<Login />} />

      {/* Rota protegida */}
      <Route
        path="/appointments"
        element={
          <ProtectedRoute>
            <Appointments />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}
```

### Verificação Manual

```typescript
import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';

export default function MeuComponenteProtegido() {
  const { isAuthenticated, loading } = useAuth();

  if (loading) return <div>Carregando...</div>;
  if (!isAuthenticated) return <Navigate to="/login" />;

  return <div>Conteúdo protegido</div>;
}
```

## 5. Logout em Qualquer Lugar

```typescript
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

export default function LogoutButton() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return <button onClick={handleLogout}>Sair</button>;
}
```

## 6. Atualizar Dados do Usuário

```typescript
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';

export default function EditarPerfil() {
  const { user } = useAuth();
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');

  const handleSave = async () => {
    // Aqui você poderia fazer uma chamada à API
    // para atualizar os dados no backend
    // Depois atualizar o estado da autenticação

    // Exemplo:
    // const response = await fetch('/api/user', {
    //   method: 'PUT',
    //   body: JSON.stringify({ name, email }),
    //   headers: { 'Authorization': `Bearer ${token}` }
    // });
    // const updatedUser = await response.json();
    // updateUser(updatedUser); // função que você criaria
  };

  return (
    <div>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Nome"
      />
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <button onClick={handleSave}>Salvar</button>
    </div>
  );
}
```

## 7. Verificar Estado de Loading

```typescript
import { useAuth } from '@/contexts/AuthContext';

export default function App() {
  const { loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4" />
          <p>Carregando...</p>
        </div>
      </div>
    );
  }

  return <YourApp />;
}
```

## 8. Integração com Componentes UI

```typescript
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Avatar } from '@/components/ui/avatar';

export default function Header() {
  const { user, isAuthenticated, logout } = useAuth();

  if (!isAuthenticated) {
    return <div>Não autenticado</div>;
  }

  return (
    <header className="flex items-center justify-between">
      <h1>Meu Médico Próximo</h1>
      <div className="flex items-center gap-4">
        <Avatar className="w-10 h-10">
          {user?.name.charAt(0)}
        </Avatar>
        <span>{user?.name}</span>
        <Button onClick={logout} variant="destructive">
          Sair
        </Button>
      </div>
    </header>
  );
}
```

## 9. Condicionais Baseado em Autenticação

```typescript
import { useAuth } from '@/contexts/AuthContext';
import { Link } from 'react-router-dom';

export default function Navigation() {
  const { isAuthenticated } = useAuth();

  return (
    <nav>
      <Link to="/">Home</Link>

      {isAuthenticated ? (
        <>
          <Link to="/appointments">Minhas Consultas</Link>
          <Link to="/profile">Perfil</Link>
        </>
      ) : (
        <>
          <Link to="/login">Login</Link>
          <Link to="/register">Registrar</Link>
        </>
      )}
    </nav>
  );
}
```

## 10. Salvar Token para API Chamadas

```typescript
// Para usar em chamadas à API futuramente:

export async function fetchWithAuth(
  url: string,
  options: RequestInit = {}
) {
  const token = localStorage.getItem('authToken');

  const headers = {
    ...options.headers,
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` }),
  };

  const response = await fetch(url, { ...options, headers });

  if (response.status === 401) {
    // Token expirou - fazer logout
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    window.location.href = '/login';
  }

  return response;
}

// Uso:
// const data = await fetchWithAuth('/api/appointments');
```

## 11. Validação de Email

```typescript
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Uso:
if (!isValidEmail(email)) {
  setError('Email inválido');
}
```

## 12. Validação de CPF (Básica)

```typescript
export function isValidCPF(cpf: string): boolean {
  // Remove caracteres especiais
  const cleanCPF = cpf.replace(/\D/g, '');

  // Verifica se tem 11 dígitos
  return cleanCPF.length === 11;
}

// Uso:
if (!isValidCPF(cpf)) {
  setError('CPF inválido');
}
```

## 13. Teste de Autenticação

```typescript
// Simular login com dados de teste
async function loginTest() {
  const { login } = useAuth();

  try {
    await login('demo@email.com', '123456');
    console.log('Login bem-sucedido!');
  } catch (error) {
    console.error('Erro no login:', error);
  }
}

// Verificar localStorage
function checkStorage() {
  const user = localStorage.getItem('user');
  const token = localStorage.getItem('authToken');

  console.log('User:', user ? JSON.parse(user) : null);
  console.log('Token:', token);
}
```

## 14. Toast de Feedback

```typescript
import { useToast } from '@/hooks/use-toast';

export default function MeuComponente() {
  const { toast } = useToast();
  const { login } = useAuth();

  const handleLogin = async (email: string, password: string) => {
    try {
      await login(email, password);
      toast({
        title: 'Sucesso!',
        description: 'Você foi autenticado com sucesso.',
      });
    } catch (err) {
      toast({
        title: 'Erro',
        description: err instanceof Error ? err.message : 'Erro ao fazer login',
        variant: 'destructive',
      });
    }
  };

  return <button onClick={() => handleLogin('email@', 'senha')}>Login</button>;
}
```

## 15. Usar Estado de Loading em Componente

```typescript
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Loader } from 'lucide-react';

export default function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await login(email, password);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button disabled={isLoading} onClick={handleSubmit}>
      {isLoading ? (
        <>
          <Loader className="mr-2 animate-spin" />
          Autenticando...
        </>
      ) : (
        'Entrar'
      )}
    </button>
  );
}
```

---

**Dica:** Combine esses exemplos com o seu código para criar uma aplicação robusta e segura! 🚀

Para mais detalhes, veja os arquivos `AUTHENTICATION.md` e `AUTHENTICATION_FLOW.md`.
