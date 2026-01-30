# 🔐 Guia Rápido - Sistema de Autenticação

## ✨ O que foi adicionado?

Um **sistema completo de autenticação** foi implementado no seu aplicativo "Seu Médico Próximo"!

## 🚀 Como usar

### 1️⃣ Fazer Login

**URL:** `http://localhost:8081/login`

Você pode:

- Usar as credenciais de teste:
  - Email: `demo@email.com`
  - Senha: `123456`
- Ou qualquer email com senha válida

### 2️⃣ Criar Uma Conta

- Na página de login, clique em **"Crie uma agora"**
- Preencha o formulário com seus dados:
  - Nome completo
  - Email
  - Telefone
  - CPF
  - Data de nascimento
  - Senha (mínimo 6 caracteres)
- Clique em **"Criar Conta"**
- ✅ Você será logado automaticamente!

### 3️⃣ Navegar no App

Depois de autenticado, você pode:

- 🏠 **Home** - Ver médicos próximos
- 🔍 **Buscar** - Procurar por especialidade
- 📅 **Consultas** - Ver suas consultas marcadas
- 👤 **Perfil** - Ver suas informações e editar dados

### 4️⃣ Fazer Logout

1. Vá para **Perfil** (último ícone da barra inferior)
2. Clique em **"Sair da Conta"** (botão vermelho)
3. Confirme no aviso que aparecer
4. ✅ Você será desconectado e retornará ao login

## 📋 Funcionalidades Implementadas

| Funcionalidade    | Status | Descrição                                |
| ----------------- | ------ | ---------------------------------------- |
| Login             | ✅     | Autenticação de usuário                  |
| Registro          | ✅     | Criar nova conta                         |
| Logout            | ✅     | Desconectar usuário                      |
| Proteção de Rotas | ✅     | Apenas usuários logados acessam          |
| Persistência      | ✅     | Usuário mantém login ao atualizar página |
| Validações        | ✅     | Email, senha, CPF, etc.                  |
| Mensagens de Erro | ✅     | Feedback visual ao usuário               |
| Loading States    | ✅     | Animações durante login/registro         |
| Perfil do Usuário | ✅     | Informações salvas e exibidas            |

## 🔒 Segurança

- ✅ Validação de dados no frontend
- ✅ Dados armazenados no localStorage
- ✅ Token de autenticação gerado
- ✅ Logout limpa dados do navegador

## 📱 Estrutura de Arquivos

Novos arquivos criados:

```
src/
├── contexts/
│   └── AuthContext.tsx          ← Context de autenticação
├── components/
│   └── ProtectedRoute.tsx        ← Componente para rotas protegidas
├── pages/
│   ├── Login.tsx                 ← Página de login
│   └── Register.tsx              ← Página de registro
└── App.tsx                        ← Modificado (adicionado AuthProvider)
```

## 🧪 Teste os Casos

### Teste 1: Login com credenciais de teste

```
1. Acesse http://localhost:8081/login
2. Email: demo@email.com
3. Senha: 123456
4. Clique em "Entrar"
✅ Deverá ir para a Home
```

### Teste 2: Criar nova conta

```
1. Clique em "Crie uma agora"
2. Preencha com dados válidos
3. Clique em "Criar Conta"
✅ Será logado automaticamente
```

### Teste 3: Refresh de página

```
1. Faça login
2. Pressione F5 para atualizar
✅ Deverá manter o login
```

### Teste 4: Logout

```
1. Vá para Perfil (ícone de usuário)
2. Clique em "Sair da Conta"
3. Confirme
✅ Retornará para login
```

### Teste 5: Acesso sem autenticação

```
1. Acesse http://localhost:8081/appointments
2. Sem estar logado
✅ Será redirecionado para /login
```

## 🎨 Experiência do Usuário

- ✨ Design moderno com gradientes healthcare
- 🎬 Animações suaves com Framer Motion
- 📱 Responsivo para mobile e desktop
- 🎯 Feedback visual em todas as ações
- ⚡ Rápido e otimizado

## 🔄 Fluxo de Autenticação

```
Sem Login
   ↓
Tenta acessar uma rota
   ↓
ProtectedRoute detecta
   ↓
Redireciona para /login
   ↓
Faz login ou registra
   ↓
Sucesso
   ↓
Redireciona para /
   ↓
Acessa todas as rotas normalmente
   ↓
Clica logout em /profile
   ↓
Volta para /login
```

## 💡 Próximas Melhorias (Opcional)

Se quiser melhorar no futuro:

- [ ] Integrar com backend real
- [ ] Implementar login com Google/Apple
- [ ] Adicionar recuperação de senha
- [ ] Autenticação biométrica
- [ ] Two-Factor Authentication (2FA)
- [ ] Dark mode na tela de login

## 🐛 Troubleshooting

**Problema:** "Não consigo fazer login"

- **Solução:** Verifique se o email tem "@" e a senha tem mais de 6 caracteres

**Problema:** "Fui deslogado ao atualizar"

- **Solução:** Verifique se cookies/storage estão habilitados

**Problema:** "Não consigo acessar as rotas"

- **Solução:** Faça login primeiro. Rotas estão protegidas.

## 📞 Suporte

Para mais informações:

- Veja o arquivo `AUTHENTICATION.md` para detalhes técnicos
- Veja o arquivo `AUTHENTICATION_FLOW.md` para diagramas de fluxo

---

**🎉 Sistema de autenticação pronto para usar!**

Divirta-se com o seu app! 💊

Dúvidas? Precisando de ajustes? Deixe-me saber!
