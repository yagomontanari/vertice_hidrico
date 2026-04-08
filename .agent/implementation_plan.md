# Vértice Hídrico - Planejamento do MVP SaaS

> 🤖 **Aplicando conhecimentos de `@[product-owner]`...**

Este documento detalha o planejamento estratégico, Product Requirements Document (PRD) e o plano de implementação do MVP da plataforma web (SaaS) da Vértice Hídrico, conforme os princípios de desenvolvimento ágil e requisitos de negócio apresentados.

## 🎯 1. Product Brief (Visão Geral)

### Objetivo
Construir o "cérebro" do sistema de agricultura de precisão: uma plataforma SaaS que coleta dados de sensores (pH, Condutividade Elétrica, Temperatura) de estufas hidropônicas em tempo real, exibe-os em um dashboard limpo e intuitivo (baseado na identidade visual fornecida) e gera recomendações acionáveis para otimizar custos e reduzir o impacto ambiental.

### Personas de Usuário
1. **Produtor Hidropônico (Administrador)**: Focado em rentabilidade, redução de custos com insumos e previsibilidade de safra. Precisa visualizar dados essenciais rapidamente e agir com base em alertas.
2. **Operador de Estufa (Funcionário)**: Responsável pela manutenção diária. Precisa de instruções claras de "Receitas" e alertas sobre ações imediatas (ex: "Adicionar 150ml da Solução A").

### Casos de Uso Core do MVP
- Visualizar parâmetros vitais (pH, EC, Temp, Biomassa) em tempo real.
- Receber alertas de desvios dos parâmetros ideais da cultura.
- Receber recomendações de ações corretivas.
- Visualizar histórico e previsão de crescimento.

## ⚙️ Decisões de Arquitetura (Gate Aprovado)

**1. Ingestão de Dados (Hardware)**
Para o MVP, a integração com hardware real será postergada. Utilizaremos **scripts geradores de dados fictícios (Mocks)** que simularão as oscilações de pH, EC e Temperatura para validar o comportamento da UI e os alertas em tempo real.

**2. Multi-tenancy (Arquitetura de Contas)**
A interface do usuário (Dashboard) será focada na gestão de **1 estufa ativa por vez**, porém o banco de dados será projetado com a entidade `greenhouses` em relacionamento 1:N com as contas. Isso garante que a UI mostre a possibilidade de escalabilidade futura sem retrabalho no banco de dados.

**3. Stack Tecnológico (Web vs Data Analysis)**
A plataforma web (SaaS), UI, alertas em tempo real e regras de recomendação baseadas em limites ideais (ex: "Se pH > 6.5, faça x") serão construídas usando **Next.js e TypeScript**, devido à agilidade de criar um front-end premium e performático. 
O **Python** é definitivamente a linguagem dominante e oficial para Análise de Dados e IA Preditiva. Por isso, a arquitetura preverá que as futuras funcionalidades da "Visão Computacional" e "IA Preditiva" (mencionadas na evolução do produto) rodem como um **microserviço Python**, consumindo os dados do Supabase. Para o MVP inicial focado em regras e painel, focaremos 100% no Next.js backend-for-frontend.

---

## 📋 2. User Stories & Acceptance Criteria (MVP)

### Épico: Monitoramento em Tempo Real
- **Como** produtor, **eu quero** ver os níveis atuais de pH, EC e Temperatura da minha água em um dashboard **para que** eu possa garantir a saúde das plantas e a estabilidade da estufa.
  - *AC 1:* O dashboard deve exibir os valores numéricos com indicadores visuais (verde = ideal, vermelho = perigo).
  - *AC 2:* Os dados devem atualizar automaticamente usando WebSockets/Realtime sem necessidade de "refresh" (F5) na página.

### Épico: Alertas e Previsões
- **Como** operador, **eu quero** ser notificado imediatamente se o pH ou EC saírem da zona ideal **para que** eu possa corrigir a água antes de danificar a colheita.
  - *AC 1:* O sistema deve registrar um alerta no painel assim que os dados ultrapassarem a margem estipulada para a cultura.
- **Como** produtor, **eu quero** receber recomendações baseadas no status atual **para que** eu saiba exatamente o quanto de nutriente ou redutor de pH devo adicionar.
  - *AC 1:* Se o pH estiver acima do ideal, cards de recomendação exatos devem aparecer na UI.

### Épico: Identidade Padrão Vértice (Design)
- **Como** usuário corporativo, **eu quero** acessar um painel premium (identidade visual verde escuro #0A4A35, texto claro, modo claro/escuro) **para que** eu sinta confiança e profissionalismo na ferramenta.

---

## 🛠️ 3. Proposed Changes (Arquitetura Técnica Recomendada)

### Setup Tecnológico Consolidado
- **SaaS Web (Frontend & Core API)**: Next.js (App Router), React, TypeScript.
- **UI / Estilo**: Tailwind CSS + biblioteca de componentes radix-ui (fidelidade ao verde #0A4A35), gráficos com Recharts.
- **Banco de Dados & Realtime**: Supabase (PostgreSQL).
- **IA e Diagnósticos (Gatilho Futuro)**: Microserviço em Python (consumindo os logs do Supabase) para análise preditiva e visão computacional (a ser criado após o portal base estar online).
- **Hardware Integrador**: Simulado via scripts para o MVP inicial.

### Estrutura de Entidades / Banco de Dados (Draft MVP)
- `users` (auth nativa)
- `organizations` (Uma fazenda / Cliente)
- `greenhouses` (Estufas / Lotes, ligada a organization)
- `crops` (Tipo de cultura, ex: Alface Crespa, com limites ideais de pH e EC)
- `sensor_readings` (Tabela de alto volume (hypertable/TimeSeries): guarda `greenhouse_id`, `timestamp`, `ph`, `ec`, `temperature_c`)
- `alerts` (Registro de anomalias detectadas)

---

## 📅 4. Verification Plan & Fases de Implementação (Roadmap)

### Fase 1: Setup Foundation (Infraestrutura e Design System)
- [ ] Inicializar repositório Next.js com Tailwind v4.
- [ ] Configurar tokens de design (Cores Vértice: Verde Principal, Verde Fundo, Variantes UI).
- [ ] Criar projeto no Supabase (Autenticação e Schemas iniciais).
- **Verificação**: `npm run dev` rodando e renderizando uma tela de Login base.

### Fase 2: Dashboard Frontend e UI Mockada
- [ ] Criar Sidebar estática (Painel da IA, Diagnóstico Visão, Nutrição Automática, Lotes e Safras).
- [ ] Criar Dashboard Grid (Cards de indicadores, gráfico de Crescimento simulado, cards de diagnóstico).
- **Verificação**: Tela visualmente idêntica à foto de referência fornecida, responsiva.

### Fase 3: Integração Backend & Ingestão de Dados IoT
- [ ] Criar tabela de `sensor_readings`.
- [ ] Desenvolver Endpoint (ex: Route Handler `POST /api/telemetry`) para receber os dados do Gateway Controller (Placa Wi-Fi).
- [ ] Ligar o Frontend ao Realtime Database (Supabase) para atualizar os cards quando um novo dado for inserido.
- **Verificação**: Rodar um script mockado que insere telemetria a cada 5 segundos `->` O browser pisca e atualiza os valores sem F5.

### Fase 4: Lógica do Algoritmo Inicial
- [ ] Desenvolver serviço lógico que roda a cada inserção ou em CRON para comparar a leitura com os targets de cultura.
- [ ] Se desvio detectado -> Cria alerta no `alerts` DB.
- **Verificação**: Tentar enviar dados errados e constatar a renderização do alerta no Dashboard Front.

---

## 🚀 Próximos Passos
O planejamento estratégico e a arquitetura MVP estão **aprovados**.
Podemos iniciar a execução técnica com os Agentes de Engenharia a partir de agora, criando o repositório Next.js e aplicando o Tailwind CSS para chegarmos no design proposto.
