# ThinkNote

<div align="center">
  <img src="assets/icon/logo.svg" alt="ThinkNotes Logo" width="140" />
  
  ### Aplicação moderna de anotações construída com Nuxt 3
  
  Uma solução elegante e intuitiva para organizar suas ideias, tarefas e pensamentos em um ambiente seguro e responsivo.
  
  [![Nuxt](https://img.shields.io/badge/Nuxt-3.16.2-00DC82?style=for-the-badge&logo=nuxt.js&logoColor=white)](https://nuxt.com/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5.8.2-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4.15-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
  [![Prisma](https://img.shields.io/badge/Prisma-6.5.0-2D3748?style=for-the-badge&logo=prisma&logoColor=white)](https://www.prisma.io/)
  
  [🔗 Ver Demo ao Vivo](https://think-note-five.vercel.app/) • [✨ Recursos](#-recursos) • [🛠️ Stack Tecnológica](#-stack-tecnológica) • [🚀 Instalação](#-instalação) 
</div>

---

## 📋 Sobre o Projeto

O **ThinkNotes** é uma aplicação web full-stack desenvolvida para proporcionar uma experiência fluida e produtiva na criação e gerenciamento de anotações. Com foco em desempenho, segurança e design minimalista, a aplicação oferece uma interface limpa que prioriza o conteúdo e a usabilidade.

Ideal para profissionais, estudantes e qualquer pessoa que busca uma ferramenta confiável para organizar informações de forma eficiente.

## ✨ Recursos

### Funcionalidades Principais

- 📝 **Gerenciamento Completo de Notas**
  - Criação, edição e exclusão de anotações
  - Interface intuitiva e responsiva
  - Feedback visual em tempo real

- 🔐 **Autenticação Segura**
  - Sistema de login e registro robusto
  - Autenticação baseada em JWT (JSON Web Tokens)
  - Criptografia de senhas com bcrypt
  - Proteção de rotas com middleware

- 🎨 **Interface Moderna**
  - Design minimalista e clean
  - Totalmente responsivo para todos os dispositivos
  - Animações suaves e transições elegantes
  - Alertas customizados com SweetAlert2

- ⚡ **Performance Otimizada**
  - Server-Side Rendering (SSR) com Nuxt 3
  - Carregamento rápido de páginas
  - Otimização automática de recursos

## 🛠️ Stack Tecnológica

### Frontend

| Tecnologia | Versão | Descrição |
|-----------|--------|-----------|
| [Nuxt 3](https://nuxt.com/) | 3.19.3 | Framework Vue.js híbrido com SSR |
| [Vue.js](https://vuejs.org/) | 3.5.22 | Framework JavaScript progressivo |
| [TypeScript](https://www.typescriptlang.org/) | 5.8.2 | Superset JavaScript com tipagem estática |
| [Tailwind CSS](https://tailwindcss.com/) | 3.4.15 | Framework CSS utility-first |
| [VueUse](https://vueuse.org/) | 12.8.2 | Coleção de utilitários Composition API |
| [Nuxt Icon](https://icon.nuxtjs.org/) | 1.11.0 | Biblioteca de ícones para Nuxt |
| [SweetAlert2](https://sweetalert2.github.io/) | 11.26.3 | Biblioteca de alertas customizados |

### Backend

| Tecnologia | Versão | Descrição |
|-----------|--------|-----------|
| [Prisma](https://www.prisma.io/) | 6.17.1 | ORM de última geração |
| [MySQL (Railway)](https://railway.com/) | - | Banco de dados relacional hospedado na nuvem |
| [bcryptjs](https://github.com/dcodeIO/bcrypt.js) | 3.0.2 | Biblioteca para hash de senhas |
| [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken) | 9.0.2 | Implementação de JWT |
| [validator](https://github.com/validatorjs/validator.js) | 13.15.15 | Biblioteca de validação de strings |

## 🚀 Instalação

### Pré-requisitos

Certifique-se de ter instalado em sua máquina:

- **Node.js** 22.17.0 ou superior
- **pnpm** 10.5.0 ou superior (recomendado) ou npm/yarn

### Configuração do Ambiente

1. **Clone o repositório**

```bash
git clone https://github.com/mariana-reis/think-note.git
cd think-note
```

2. **Instale as dependências**

```bash
pnpm install
```

3. **Configure as variáveis de ambiente**

Crie um arquivo `.env` na raiz do projeto baseado no `.env.example`:

```bash
cp .env.example .env
```

Edite o arquivo `.env` com suas configurações:

```env
# Conexão com banco Railway MySQL
DATABASE_URL="mysql://usuario:senha@host:porta/nome_do_banco"

# Chave secreta para JWT (gere uma chave segura)
JWT_SECRET="sua-chave-secreta"

# Ambiente de execução
NODE_ENV="development"
```

4. **Configure o banco de dados**

Execute as migrações do Prisma para criar as tabelas:

```bash
pnpm prisma migrate dev
```

Para visualizar os dados no Prisma Studio:

```bash
pnpm prisma studio
```

5. **Inicie o servidor de desenvolvimento**

```bash
pnpm dev
```

A aplicação estará disponível em `http://localhost:3000`

## 📦 Build e Deploy

### Desenvolvimento

```bash
# Modo de desenvolvimento com hot-reload
pnpm dev
```

### Produção

```bash
# Compilar para produção
pnpm build

# Visualizar build de produção localmente
pnpm preview

# Gerar site estático (se aplicável)
pnpm generate
```

## 🔒 Segurança

O ThinkNotes implementa várias camadas de segurança:

- **Autenticação JWT**: Tokens seguros com expiração configurável
- **Hash de Senhas**: Utilização de bcrypt com salt rounds
- **Validação de Dados**: Validação rigorosa de inputs com validator.js
- **Proteção de Rotas**: Middleware de autenticação em rotas protegidas
- **Variáveis de Ambiente**: Credenciais sensíveis não versionadas

## 📄 Licença

Este projeto está sob a licença MIT. Consulte o arquivo `LICENSE` para mais detalhes.
