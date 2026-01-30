# Fluxo de Autenticação - Seu Médico Próximo

## 🔄 Diagrama de Fluxo Principal

```
┌─────────────────────────────────────────────────────────────────────┐
│                         APLICAÇÃO INICIADA                           │
└────────────────────────────┬────────────────────────────────────────┘
                             │
                             ▼
                    ┌─────────────────┐
                    │ Verificar Token │
                    │   localStorage  │
                    └────────┬────────┘
                             │
                 ┌───────────┴───────────┐
                 │                       │
         ┌──────▼──────┐         ┌──────▼──────┐
         │ Token Existe?│        │ Token Nulo  │
         └──────┬───────┘        └──────┬──────┘
                │ SIM                   │ NÃO
                │                       │
         ┌──────▼──────┐         ┌──────▼──────┐
         │  Autenticado│         │   Não Auth  │
         │  (logged in)│         │ (logged out)│
         └──────┬──────┘         └──────┬──────┘
                │                       │
                │                       ▼
                │              ┌────────────────┐
                │              │ Redirecionar   │
                │              │   para /login  │
                │              └────────┬───────┘
                │                       │
         ┌──────▼────────────────────────▼──────┐
         │      TELA DE LOGIN/REGISTER           │
         └──────┬────────────────────────┬──────┘
                │                        │
         ┌──────▼──────┐        ┌────────▼─────┐
         │ Login (1)   │        │ Register (2) │
         └──────┬──────┘        └────────┬─────┘
                │                        │
         ┌──────▼──────────────────────────────┐
         │   Validar Dados no Frontend         │
         │  - Email válido                     │
         │  - Senha obrigatória                │
         │  - CPF válido (registro)            │
         └──────┬───────────────────────┬──────┘
                │ OK                    │ Erro
                │                       │
                │                  ┌────▼─────┐
                │                  │ Exibir   │
                │                  │ Erro     │
                │                  └──────────┘
                │
         ┌──────▼────────────────────────────┐
         │   Simular Chamada à API (delay)   │
         │         (1 segundo)                │
         └──────┬───────────────────────────┘
                │
         ┌──────▼────────────────────────────┐
         │  Criar Usuário/Validar Credenciais│
         │  Gerar Token (timestamp)           │
         │  Salvar no localStorage:           │
         │  - user (JSON)                     │
         │  - authToken (string)              │
         └──────┬───────────────────────────┘
                │
         ┌──────▼────────────────────────────┐
         │  Atualizar Estado Global (Auth)   │
         │  - isAuthenticated = true         │
         │  - user = dados do usuário        │
         └──────┬───────────────────────────┘
                │
         ┌──────▼────────────────────────────┐
         │   Redirecionar para Home (/)      │
         │   Componente <ProtectedRoute>     │
         │   permite acesso a rotas          │
         └────────────────────────────────────┘
                │
         ┌──────▼────────────────────────────┐
         │   APP DISPONÍVEL PARA O USUÁRIO   │
         │  - /                              │
         │  - /search                        │
         │  - /doctor/:id                    │
         │  - /appointments                  │
         │  - /profile                       │
         └──────┬────────────────────────────┘
                │
         ┌──────▼────────────────────────────┐
         │   Usuário Clica em "Sair"        │
         │   em /profile                     │
         └──────┬───────────────────────────┘
                │
         ┌──────▼────────────────────────────┐
         │   Dialog de Confirmação           │
         │   "Tem certeza?"                  │
         └──────┬──────────┬─────────────────┘
                │ SIM      │ NÃO
                │          └─────────────────┐
         ┌──────▼──────────────────┐         │
         │   Limpar localStorage    │         │
         │   - Remover authToken   │         │
         │   - Remover user        │         │
         └──────┬──────────────────┘         │
                │                            │
         ┌──────▼──────────────────┐         │
         │ Atualizar Estado Auth   │         │
         │ - isAuthenticated=false │         │
         │ - user = null           │         │
         └──────┬──────────────────┘         │
                │                            │
         ┌──────▼──────────────────┐         │
         │ Redirecionar /login     │ ◄──────┘
         │ Toast: "Desconectado"   │
         └──────────────────────────┘
```

## 🔐 Componentes de Autenticação

### 1. AuthContext
```
AuthProvider (Wrapper)
    ├── isAuthenticated: boolean
    ├── user: User | null
    ├── loading: boolean
    └── Methods:
        ├── login(email, password)
        ├── register(userData)
        └── logout()
```

### 2. useAuth Hook
```typescript
const { isAuthenticated, user, loading, login, logout, register } = useAuth();
```

### 3. ProtectedRoute
```
<ProtectedRoute>
  ├── Se loading → <LoadingSpinner />
  ├── Se não autenticado → <Navigate to="/login" />
  └── Se autenticado → {children}
</ProtectedRoute>
```

## 📱 Fluxo de Páginas

### Não Autenticado
```
Qualquer URL
    ↓
ProtectedRoute verifica
    ↓
isAuthenticated = false?
    ↓
Redireciona para /login
    ↓
┌─────────────────────┐
│  PÁGINA DE LOGIN    │
│ ├─ Email input      │
│ ├─ Senha input      │
│ ├─ Botão Login      │
│ └─ Link Register    │
└──────────┬──────────┘
           │
    ┌──────▼───────┐
    │ LOGIN OK?    │
    └──┬───────┬──┘
      SIM     NÃO
       │       │
       │    ┌──▼─────┐
       │    │ Erro   │
       │    │ Toast  │
       │    └────────┘
       │
    ┌──▼──────────────────────┐
    │ PÁGINA DE REGISTRO       │
    │ ├─ Nome input           │
    │ ├─ Email input          │
    │ ├─ Telefone input       │
    │ ├─ CPF input            │
    │ ├─ Data Nasc. input     │
    │ ├─ Senha input          │
    │ ├─ Confirmar input      │
    │ └─ Botão Registrar      │
    └──────┬──────────────────┘
           │
        REGISTRADO?
           │ SIM
    ┌──────▼──────────┐
    │ Login automático│
    │ Redireciona para│
    │ / (Home)        │
    └─────────────────┘
```

### Autenticado
```
Login/Register bem-sucedido
    ↓
Redireciona para /
    ↓
┌──────────────────────────────┐
│   APLICAÇÃO PRINCIPAL        │
├──────────────────────────────┤
│ /                 → Home     │
│ /search           → Buscar   │
│ /doctor/:id       → Detalhes │
│ /appointments     → Consultas│
│ /profile          → Perfil   │
└────────┬───────────────────┘
         │
    BottomNavigation (sempre visível)
    ├─ Home
    ├─ Buscar
    ├─ Consultas
    └─ Perfil
         │
    Clica em Perfil
         ↓
    ┌─────────────────────┐
    │   PERFIL USUÁRIO    │
    │ ├─ Avatar           │
    │ ├─ Informações      │
    │ ├─ Menu Opções      │
    │ └─ Sair da Conta    │
    └────────┬────────────┘
             │
        Clica Sair
             ↓
    ┌─────────────────────┐
    │ Confirmação Dialog  │
    │ "Tem certeza?"      │
    └────┬────────┬───────┘
       Sim        Não
         │         │
         │    (volta ao perfil)
         │
    Logout
         │
    Limpa localStorage
    Redireciona /login
```

## 💾 localStorage Structure

```javascript
// Após login bem-sucedido:

localStorage = {
  authToken: "token_1706628900000",
  user: JSON.stringify({
    id: "user_1706628900000",
    name: "João Silva",
    email: "joao@email.com",
    phone: "(11) 98765-4321",
    cpf: "123.456.789-10",
    birthDate: "1990-01-15"
  })
}

// Após logout:

localStorage = {} // Limpo completamente
```

## 🧪 Casos de Teste

### Caso 1: Novo usuário
1. Acessa `/` sem token
2. Redireciona para `/login`
3. Clica em "Crie uma agora"
4. Preenche formulário de registro
5. Clica "Criar Conta"
6. ✅ Login automático + Redireciona para `/`

### Caso 2: Usuário existente
1. Acessa `/login`
2. Preenche email e senha
3. Clica "Entrar"
4. ✅ Autentica + Redireciona para `/`
5. Volta a navegar normalmente

### Caso 3: Logout
1. Em `/profile`
2. Clica "Sair da Conta"
3. Confirma no dialog
4. ✅ Logout + Redireciona para `/login`
5. localStorage limpo

### Caso 4: Refresh de página
1. Usuário logado em `/`
2. Atualiza página (F5)
3. Verifica localStorage
4. ✅ Mantém autenticação
5. Não redireciona para login

### Caso 5: Acesso a rota protegida sem auth
1. Usuário logado, limpa localStorage manualmente
2. Tenta acessar `/appointments`
3. ✅ ProtectedRoute detecta falta de auth
4. Redireciona para `/login`

---

**Última atualização:** Janeiro 2026
