<h1 align="center">Teddy Frontend Test</h1>

<p align="center">
  Projeto desenvolvido como parte de um teste técnico para a empresa <strong>Teddy</strong>, com foco em arquitetura de microfrontends utilizando <code>vite-plugin-federation</code>.
</p>

---

### 🚀 Deploy

Acesse a aplicação em produção:

👉 [https://teddy-frontend-root.vercel.app/](https://teddy-frontend-root.vercel.app/)

---

### 🧩 Tecnologias & Ferramentas

O projeto está estruturado com foco em boas práticas e tecnologias modernas:

- 🐳 **Docker Compose** — Para orquestração local
- ⚙️ **TypeScript** — Tipagem estática
- 🧪 **Jest** — Testes unitários
- 🔐 **Husky (pré-commit)** — Garantia de qualidade de código
- 📋 **react-hook-form + zod** — Validação e manipulação de formulários
- 📦 **Zustand** — Gerenciamento de estado global
- 🔁 **@tanstack/react-query** — Gerenciamento de dados assíncronos

---

### ✨ Funcionalidades Implementadas

- ✅ **Componente de carregamento global**
- ✅ **Notificações via Toast**

---

### 🛠️ Requisitos

- **Node.js** + **Yarn** ou **NPM**
- **Docker + Docker Compose**
- **Ambiente Linux, Mac ou WSL recomendado**

---

### 🧪 Executando Localmente com Docker

1. **Clone o repositório**

```bash
git clone https://github.com/pguilheerme/teddy-frontend-test
cd teddy-frontend-test
```

2. **Configure as variáveis de ambiente**

Renomeie o arquivo \`.env.example\` para \`.env\` e configure a URL da API:

```env
# .env

VITE_CUSTOMERS_MFE_URL=http://localhost:3001
VITE_DESIGN_SYSTEM_MFE_URL=http://localhost:3002
VITE_WELCOME_MFE_URL=http://localhost:3003
VITE_API_URL=http://sua-api.local
```

3. **Suba os containers**

```bash
docker compose up -d
```

4. **Acesse a aplicação**

[http://localhost:3000](http://localhost:3000)

---

### 🧪 Rodando os Testes

Utilize o gerenciador de pacotes de sua preferência:

- **NPM**

```bash
npm install
npm run test
```

- **Yarn**

```bash
yarn
yarn test
```

---

### 🧱 Estrutura de Microfrontends

O projeto utiliza arquitetura de microfrontends com o plugin \`@originjs/vite-plugin-federation\`, separando contextos como:

- `root` — Aplicação principal com roteamento central
- `customers` — Microfrontend de listagem e seleção de clientes
- `designSystem` — Microfrontend com componentes reutilizáveis (Header, Sidebar, etc)
- `welcome` — Página inicial da aplicação

---

### 📂 Organização do Repositório

```
📦 teddy-frontend-test
├── root/             # Shell principal (host)
├── customers/        # Microfrontend 1
├── designSystem/     # Microfrontend 2
├── welcome/          # Microfrontend 3
├── docker-compose.yml
└── README.md
```

---

### 🧑‍💻 Autor

Desenvolvido por [Pedro Guilherme](https://github.com/pguilheerme) ✨
