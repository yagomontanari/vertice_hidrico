# Vértice Hídrico - Plataforma SaaS MVP 🌿

Bem-vindo ao repositório do MVP da Vértice Hídrico, o cérebro inteligente focado em otimizar recursos e maximizar a produtividade da agricultura hidropônica. 

Este MVP valida o fluxo principal do nosso SaaS: ingestão de telemetria, diagnóstico e interface premium, com arquitetura preparada para suportar Centenas de Estufas (Multi-tenancy).

---

## 🚀 Arquitetura & Stack Tecnológico

- **Frontend & Core Engine:** Next.js 14, React 18, TypeScript
- **Estilização Visual:** Tailwind CSS v3
- **Gráficos e Analítica:** Recharts, Lucide Icons
- **Deployment & Infra:** Docker (Multi-stage e Standalone Output) + Node 18 Alpine
- **Fluxo de Integração (Hardware IoT):** 
  - *Atualmente:* Simulado (Mock de hooks locais) para validação real-time de tela.
  - *Futuro (Fase de Escada):* Microserviço dedicado Python (FastAPI) ou Supabase Edge Functions consumidas pelas placas via MQTT / HTTPS POST.

---

## 🛠️ Como Executar Localmente

### Opção 1: Via Docker Compose (Mais Fácil e Recomendado)
Execute toda a stack da plataforma com um único comando elegante.

1. **Inicie o projeto** (Construção e execução automáticas):
   ```bash
   docker compose up --build -d
   ```
2. Abra `http://localhost:3000` no seu navegador.

*Para parar os containers, basta rodar `docker compose down`.*

### Opção 2: Via NPM Local (Modo de Desenvolvimento)
Caso queira editar os arquivos em tempo real (Hot Reloading). Você precisa ter o Node.js v18 ou superior instalado.

1. **Instale as dependências via NPM:**
   ```bash
   npm install
   ```
2. **Execute o servidor de desenvolvimento:**
   ```bash
   npm run dev
   ```
3. Abra `http://localhost:3000` no seu navegador.

---

## 📘 Resumo do Escopo MVP Entregue

1. **Dashboard Premium em Tempo Real**
   Foi implementado um dashboard limpo, claro e baseado no "Verde Vértice" (#0A4A35), apresentando os 4 KPIs core: Nível de pH, Condutividade (EC), Temperatura e Previsão de Colheita.
   
2. **Gráfico de Crescimento (Biomassa vs Projeção Ideal)**
   Visão detalhada sobre o tempo de vida do Lote, mostrando a linha de projeção teórica e a linha real da folhagem baseada nos últimos outputs de IA/Sensor.

3. **Área de Imagem (IA de Visão Computacional)**
   Componente para drag-n-drop (ou upload) das fotos de folhagens doentes. 
   *(O módulo futuro de Inteligência Artificial usando Python plugará os diagnósticos reais aqui).*

4. **Telemetria de Motor Contínuo (Mock engine)**
   Os Cards de pH, Temperatura e EC estão conectados a um gerador assíncrono interno para piscarem e exibirem anomalias reais que causam troca de estado da tela.

---

*Produto projetado e gerenciado pelos Agentes Estratégicos Inteligentes da kit.dev para o futuro da Hidroponia.*
