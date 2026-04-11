"use client"
import React, { useState, useEffect } from 'react'
import { FlaskConical, Activity, Waves, Sprout, BrainCircuit, TestTube2, CheckCircle2, Zap, List, Check, Droplet, AlertTriangle, Thermometer, Bot } from 'lucide-react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#1e1e1e] border border-white/10 rounded-lg p-3 shadow-2xl backdrop-blur-md">
        <p className="text-white font-bold text-xs mb-2 border-b border-white/10 pb-1">{label}</p>
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 bg-[#10b981] rounded-sm"></div>
            <p className="text-[10px] text-gray-300">
              <span className="text-white font-medium">Vértice IA (Otimizado):</span> {payload[1].value}g/pé
            </p>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 bg-[#94a3b8] rounded-sm opacity-50"></div>
            <p className="text-[10px] text-gray-400">
              <span className="text-gray-300 font-medium">Hidroponia Comum:</span> {payload[0].value}g/pé
            </p>
          </div>
        </div>
      </div>
    );
  }
  return null;
};

const AI_LOGS = [
  {
    id: 1,
    timeOffset: 2, // 2 minutes ago
    icon: <AlertTriangle className="w-4 h-4 text-orange-500" />,
    bg: 'bg-orange-50 border-orange-100',
    title: 'Anomalia Detectada: pH Elevado',
    desc: 'Análise de tendência aponta pH chegando a 6.8. Risco de bloqueio de absorção de Ferro. Sugestão: injetar ácido fosfórico.'
  },
  {
    id: 2,
    timeOffset: 45, // 45 minutes ago
    icon: <BrainCircuit className="w-4 h-4 text-indigo-500" />,
    bg: 'bg-indigo-50 border-indigo-100',
    title: 'Diagnóstico Foliar Concluído',
    desc: 'IA processou a última imagem de copa: Nenhum sintoma de deficiência de Magnésio detectado. Taxa de Vigor: 94%.'
  },
  {
    id: 3,
    timeOffset: 120, // 2 hours ago
    icon: <Droplet className="w-4 h-4 text-blue-500" />,
    bg: 'bg-blue-50 border-blue-100',
    title: 'Ajuste Preditivo da Solução (EC)',
    desc: 'Previsão de pico de radiação às 13h. EC preventivamente reduzido para 1.5 mS/cm para evitar estresse hídrico nas raízes.'
  },
  {
    id: 4,
    timeOffset: 180, // 3 hours ago
    icon: <Check className="w-4 h-4 text-emerald-500" />,
    bg: 'bg-emerald-50 border-emerald-100',
    title: 'Otimização de Luz (DLI)',
    desc: 'Meta de DLI diário atingida antecipadamente devido a alta luminosidade natural. LEDs desligados para economizar R$ 12,00 hoje.'
  }
];

const MOCK_ANALYSES = [
  { 
    status: 'ANOMALIA DETECTADA',
    anomaly: 'Deficiência de Cálcio (Tip Burn)', 
    confidence: '94%', 
    desc: 'A borda da folha apresenta necrose devido à baixa transpiração nas estufas.', 
    action: 'Aumentou microaspersão para melhorar a transpiração e acionou injeção de CalMag na bomba 3.',
    colors: { bg: 'bg-[#FFF4F4]', border: 'border-[#FEE2E2]', badgeBg: 'bg-red-100', badgeText: 'text-red-700', actionTitle: 'text-emerald-600', divider: 'border-red-100' }
  },
  { 
    status: 'SAUDÁVEL',
    anomaly: 'Nenhuma Anomalia', 
    confidence: '98%', 
    desc: 'A coloração e estrutura foliar estão ideais. Vigor vegetativo de 96% detectado na copa.', 
    action: 'Nenhuma ação necessária. Parâmetros nutricionais e clímaticos mantidos.',
    colors: { bg: 'bg-emerald-50', border: 'border-emerald-100', badgeBg: 'bg-emerald-100', badgeText: 'text-emerald-700', actionTitle: 'text-emerald-600', divider: 'border-emerald-200' }
  },
  { 
    status: 'ATENÇÃO (PRAGA)',
    anomaly: 'Ataque Inicial de Tripes', 
    confidence: '82%', 
    desc: 'Pequenas manchas prateadas e pontos escuros observados. Risco de proliferação na estufa.', 
    action: 'Alerta crítico enviado. Sugestão: Aplicar controle biológico (Orius insidiosus) no Lote B.',
    colors: { bg: 'bg-amber-50', border: 'border-amber-100', badgeBg: 'bg-amber-100', badgeText: 'text-amber-700', actionTitle: 'text-amber-600', divider: 'border-amber-200' }
  }
];

// Helper para gerar o timestamp regressivo baseado no current time
function getLogTime(minutesAgo: number) {
  const date = new Date();
  date.setMinutes(date.getMinutes() - minutesAgo);
  return date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
}

export default function Dashboard({ 
  onDiagnosisComplete,
  lotes = [{ id: '1', nome: 'Lote de Alface Crespa' }]
}: { 
  onDiagnosisComplete?: (result: any, image: string) => void;
  lotes?: any[];
}) {
  const [ph, setPh] = useState(6.2)
  const [ec, setEc] = useState(1.8)
  const [temp, setTemp] = useState(22)
  const [isScanning, setIsScanning] = useState(false)
  const [showResult, setShowResult] = useState(false)
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)
  const [analysisResult, setAnalysisResult] = useState<any>(null)
  const [mounted, setMounted] = useState(false)
  const [selectedLoteId, setSelectedLoteId] = useState(lotes && lotes.length > 0 ? lotes[0].id : '')

  useEffect(() => {
    setMounted(true)
    if (!selectedLoteId && lotes && lotes.length > 0) {
      setSelectedLoteId(lotes[0].id)
    }
  }, [lotes, selectedLoteId])

  // Data de simulação de crescimento real x ideal com base no lote
  const growthData = React.useMemo(() => {
    const seed = selectedLoteId ? selectedLoteId.split('').reduce((acc: number, char: string) => acc + char.charCodeAt(0), 0) : 0
    const offset = seed % 30
    const mult = 1 + (seed % 5) * 0.1

    return [
      { week: 'Sem 1', Ideal: 10 + offset, Real: 10 + offset },
      { week: 'Sem 2', Ideal: Math.round(40 * mult) + offset, Real: Math.round(65 * mult) + offset },
      { week: 'Sem 3', Ideal: Math.round(110 * mult) + offset, Real: Math.round(165 * mult) + offset },
      { week: 'Sem 4', Ideal: Math.round(230 * mult) + offset, Real: Math.round(340 * mult) + offset },
      { week: 'Sem 5', Ideal: Math.round(400 * mult) + offset, Real: Math.round(580 * mult) + offset },
    ]
  }, [selectedLoteId])

  // Hook simples para simular telemetria em tempo real
  useEffect(() => {
    const interval = setInterval(() => {
      setPh(prev => Number((prev + (Math.random() * 0.04 - 0.02)).toFixed(2)))
      setEc(prev => Number((prev + (Math.random() * 0.02 - 0.01)).toFixed(2)))
      setTemp(prev => Number((prev + (Math.random() * 0.4 - 0.2)).toFixed(1)))
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex flex-col h-full animate-in fade-in duration-500">
      
      {/* Header */}
      <div className="flex justify-between items-start mb-8">
        <div>
          <h2 className="text-3xl font-bold text-vertice-green tracking-tight">Visão Geral da Estufa Alfa</h2>
          <p className="text-vertice-textLight mt-1 flex items-center gap-2 text-sm">
             IA operando em modo Autônomo.
          </p>
        </div>
        <button className="bg-[#FFF8E6] text-[#B8860B] border border-[#FBE6A0] px-4 py-2 rounded-xl text-sm font-semibold flex items-center gap-2 hover:bg-[#FBE6A0] transition-colors shadow-sm">
          <Zap className="w-4 h-4" />
          Simular Anomalia de pH
        </button>
      </div>

      {/* Cards de Status (Top Row) */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        {/* pH Card */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <span className="text-sm font-semibold text-vertice-textLight">Nível de pH</span>
            <div className="p-2 bg-indigo-50 border border-indigo-100/50 rounded-xl shadow-inner">
              <FlaskConical className="w-5 h-5 text-indigo-500" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-4xl font-bold text-vertice-text">{ph}</div>
            <div className="flex items-center gap-1 text-sm font-medium mt-2 text-emerald-600">
              <CheckCircle2 className="w-4 h-4" />
              <span>Ideal (5.8 - 6.5)</span>
            </div>
          </div>
        </div>

        {/* Card 2: Condutividade */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <h3 className="text-gray-500 font-medium text-sm">Condutividade (EC)</h3>
            <div className="p-2 bg-yellow-50 rounded-xl shadow-inner">
              <Zap className="w-6 h-6 text-yellow-500" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-4xl font-bold text-vertice-text flex items-end gap-1">
              {ec} <span className="text-base text-gray-400 mb-1">mS/cm</span>
            </div>
            <div className="flex items-center gap-1 text-sm font-medium mt-2 text-emerald-600">
              <CheckCircle2 className="w-4 h-4" />
              <span>Estável</span>
            </div>
          </div>
        </div>

        {/* Card 3: Temperatura */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <h3 className="text-gray-500 font-medium text-sm">Temp. da Água</h3>
            <div className="p-2 bg-rose-50 rounded-xl shadow-inner">
              <Thermometer className="w-6 h-6 text-rose-500" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-4xl font-bold text-vertice-text">{temp}°C</div>
            <div className="flex items-center gap-1 text-sm font-medium mt-2 text-gray-400">
              <span>Dentro da margem</span>
            </div>
          </div>
        </div>

        {/* Previsão Colheita Card */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <span className="text-sm font-semibold text-vertice-textLight">Previsão de Colheita</span>
            <div className="p-2 bg-emerald-50 border border-emerald-100/50 rounded-xl shadow-inner">
              <Sprout className="w-5 h-5 text-emerald-500" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-4xl font-bold text-vertice-text flex items-end gap-1">
              12 <span className="text-base text-gray-400 mb-1">dias</span>
            </div>
            <div className="flex items-center gap-1 text-sm font-medium mt-2 text-blue-600">
              <span>↑ IA antecipou em 2 dias</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area (Bottom Row) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1 min-h-[400px] mb-6">
        
        {/* Painel Esquerdo (IA & Logs) */}
        <div className="flex flex-col gap-6 lg:col-span-1">
          {/* Upload AI Area */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col">
            <h3 className="font-bold flex items-center gap-2 text-vertice-text mb-4">
              <CheckCircle2 className="w-5 h-5 text-vertice-green" />
              Diagnóstico por Imagem (IA)
            </h3>
            {showResult && analysisResult ? (
              <div className={`${analysisResult.colors.bg} border ${analysisResult.colors.border} rounded-xl p-4 w-full`}>
                <div className="flex flex-col gap-4 mb-3">
                  <div className="w-full h-[220px] rounded-lg overflow-hidden border border-slate-200 shadow-sm relative bg-slate-100 flex items-center justify-center">
                    <img src={uploadedImage || "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?q=80&w=400&auto=format&fit=crop"} alt="Análise" className="max-w-full max-h-full object-cover" />
                  </div>
                  <div className="w-full">
                    <div className="flex justify-between items-center mb-2">
                      <span className={`${analysisResult.colors.badgeBg} ${analysisResult.colors.badgeText} text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider`}>{analysisResult.status}</span>
                      <span className="text-[10px] text-slate-500 font-medium">Confiança: {analysisResult.confidence}</span>
                    </div>
                    <h4 className="font-bold text-slate-800 text-base mb-1">{analysisResult.anomaly}</h4>
                  </div>
                </div>
                <p className="text-xs text-slate-600 mb-3">{analysisResult.desc}</p>
                <div className={`mt-3 pt-3 border-t ${analysisResult.colors.divider}`}>
                  <div className={`flex items-center gap-1.5 mb-1.5 ${analysisResult.colors.actionTitle} font-semibold text-xs`}>
                    <Bot className="w-4 h-4" />
                    <span>Ação da IA executada:</span>
                  </div>
                  <p className="text-xs text-slate-600">{analysisResult.action}</p>
                </div>
                <div className="flex gap-2 w-full mt-4">
                  <button 
                    onClick={() => {
                      if (onDiagnosisComplete && analysisResult && uploadedImage) {
                        onDiagnosisComplete(analysisResult, uploadedImage);
                      }
                      setShowResult(false)
                      setUploadedImage(null)
                    }}
                    className="flex-1 bg-[#10b981] hover:bg-emerald-600 text-white text-xs font-semibold py-2 rounded-lg transition-colors shadow-sm"
                  >
                    Salvar Registro
                  </button>
                  <button 
                    onClick={() => {
                      setShowResult(false)
                      setUploadedImage(null)
                    }}
                    className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs font-semibold py-2 rounded-lg transition-colors border border-slate-200"
                  >
                    Nova análise
                  </button>
                </div>
              </div>
            ) : isScanning ? (
              <div className="relative w-full h-[300px] bg-slate-100 rounded-xl overflow-hidden shadow-inner border border-slate-200">
                <div 
                  className="absolute inset-0 bg-contain bg-no-repeat bg-center opacity-80 backdrop-grayscale"
                  style={{ backgroundImage: `url(${uploadedImage || "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?q=80&w=400&auto=format&fit=crop"})` }}
                ></div>
                <div className="absolute left-0 right-0 h-[2px] bg-emerald-400 shadow-[0_0_15px_4px_rgba(52,211,153,0.8)] animate-[scanner_2s_ease-in-out_infinite]" />
              </div>
            ) : (
              <>
                <input 
                  type="file" 
                  accept="image/*" 
                  className="hidden" 
                  id="ai-upload"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const imageUrl = URL.createObjectURL(file);
                      setUploadedImage(imageUrl);
                      setIsScanning(true);
                      setTimeout(() => { 
                        setIsScanning(false); 
                        const result = MOCK_ANALYSES[Math.floor(Math.random() * MOCK_ANALYSES.length)];
                        setAnalysisResult(result);
                        setShowResult(true); 
                      }, 3000);
                    }
                  }}
                />
                <label 
                  htmlFor="ai-upload"
                  className="bg-[#F4F7FB] border-2 border-dashed border-[#D1DFFA] rounded-xl flex flex-col items-center justify-center p-6 hover:bg-[#edf2fa] transition-colors cursor-pointer group flex-1 min-h-[300px]"
                >
                  <div className="bg-[#E4ECFA] p-4 rounded-xl group-hover:scale-110 group-hover:bg-indigo-100 transition-all shadow-inner">
                    <BrainCircuit className="w-8 h-8 text-indigo-500" />
                  </div>
                  <p className="text-sm font-medium text-indigo-400 mt-4 text-center">Clique para enviar a foto da anomalia para análise da IA</p>
                </label>
              </>
            )}
          </div>

          {/* Copiloto Hídrico (Log) */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col flex-1">
            <h3 className="font-bold flex items-center gap-2 text-vertice-text mb-6">
              <List className="w-5 h-5 text-gray-400" />
              Copiloto Hídrico (Log)
            </h3>

            <div className="flex flex-col gap-5 overflow-y-auto max-h-[300px] pr-2 custom-scrollbar">
              {AI_LOGS.map((log) => (
                <div key={log.id} className="flex items-start gap-4">
                  <div className={`p-2 rounded-full shrink-0 border ${log.bg}`}>
                    {log.icon}
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-vertice-text">{log.title}</h4>
                    <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                      <span className="font-medium text-gray-400 mr-1">
                        {mounted ? getLogTime(log.timeOffset) : '--:--'} -
                      </span>
                      {log.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Painel Direito (Gráfico) */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 lg:col-span-2 flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold flex items-center gap-2 text-vertice-text">
              <Activity className="w-5 h-5 text-blue-500" />
              Previsão de Crescimento (Biomassa)
            </h3>
            <select 
              value={selectedLoteId}
              onChange={(e) => setSelectedLoteId(e.target.value)}
              className="bg-gray-50 border border-gray-200 text-sm rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-vertice-green/20 text-gray-600"
            >
              {lotes.map(l => (
                <option key={l.id} value={l.id}>{l.nome}</option>
              ))}
            </select>
          </div>
          
          <div className="flex-1 w-full min-h-[300px] mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={growthData} margin={{ top: 20, right: 30, bottom: 20, left: 30 }}>
                <defs>
                  <linearGradient id="colorReal" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis 
                  dataKey="week" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{fill: '#9CA3AF', fontSize: 11}} 
                  dy={10} 
                  label={{ value: 'Semanas para colheita', position: 'insideBottom', offset: -10, fill: '#9CA3AF', fontSize: 11, fontWeight: 600 }}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{fill: '#9CA3AF', fontSize: 11}} 
                  dx={-10}
                  label={{ value: 'Massa por Planta (gramas)', angle: -90, position: 'insideLeft', offset: -20, fill: '#9CA3AF', fontSize: 11, fontWeight: 600 }}
                />
                <Tooltip content={<CustomTooltip />} />
                
                {/* Hidroponia Comum (Dashed Area) */}
                <Area 
                  type="monotone" 
                  dataKey="Ideal" 
                  stroke="#cbd5e1" 
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  fill="transparent"
                  dot={{ fill: '#cbd5e1', strokeWidth: 0, r: 4 }}
                  name="Hidroponia Comum"
                />

                {/* Vértice IA (Solid Area) */}
                <Area 
                  type="monotone" 
                  dataKey="Real" 
                  stroke="#10b981" 
                  strokeWidth={4} 
                  fillOpacity={1} 
                  fill="url(#colorReal)" 
                  dot={{r: 5, fill: '#10b981', strokeWidth: 2, stroke: '#fff'}} 
                  name="Vértice IA (Otimizado)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Legendas Personalizadas */}
          <div className="flex justify-center items-center gap-8 mt-2 pt-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#10b981]"></div>
              <span className="text-xs text-gray-500 font-medium whitespace-nowrap">Vértice IA (Otimizado por IA)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#cbd5e1]"></div>
              <span className="text-xs text-gray-500 font-medium whitespace-nowrap">Hidroponia Comum</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
