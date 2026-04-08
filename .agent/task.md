# Vértice Hídrico - MVP Tasks

## Fase 1: Setup Foundation (Infraestrutura e Design System)
- [x] Inicializar repositório Next.js com Tailwind CSS.
- [x] Configurar tokens de design (Cores Vértice: Verde Principal, Verde Fundo, Variantes UI).
- [x] Instalar Lucide React para ícones padrão.
- [x] Opcional Inicial: Stub dos schemas do Supabase Local/Remoto

## Fase 2: Dashboard Frontend (UI Mockada Fidelizada)
- [x] Criar Sidebar estática (Painel da IA, Diagnóstico Visão, Nutrição Automática, Lotes e Safras).
- [x] Criar Dashboard Grid Base.
- [x] Criar Cards Superiores (pH, EC, Temperatura, Previsão Colheita).
- [x] Componentizar Diagnóstico por Imagem (Upload card).
- [x] Construir layout visual do gráfico de Crescimento simulado (Biomassa).

## Fase 3: Dados Mockados & Lógica do Algoritmo Inicial
- [x] Criar gerador de dados estáticos para o gráfico principal.
- [x] Criar lógica de hook local (`useTelemetry`) que simula a atualização em tempo real dos sensores.
- [x] Se desvio detectado -> Cria alerta simples na UI (pH ou EC fora do ideal).

## Fase 4: Integrações / Polimento
- [x] Ajustar cores para `100%` da identidade visual providenciada na foto.
- [x] Verificar responsividade base da UI.

## Fase 5: Entrega (Docker)
- [x] Configurar `output: 'standalone'` no Next.js.
- [x] Criar `Dockerfile` multi-stage (deps, builder, runner).
- [x] Criar `.dockerignore`.
- [x] Bugfix: Adicionado `autoprefixer` para que a compilação do Next.js suporte Tailwind e PostCSS.
- [x] Bugfix: Pasta `public` vazia criada para satisfazer a cópia estática do Docker multi-stage.

## Fase 6: Testes & QA
- [x] Configurar Jest + React Testing Library integrados ao SWC.
- [x] Implementar teste unitário da Sidebar (verifica branding e layout lateral).
- [x] Implementar teste unitário do Dashboard (verifica mock de ResizeObserver do recharts, renders condicionais e cartões superiores).
