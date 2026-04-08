"use client"
import React, { useState, useEffect } from 'react'
import { FlaskConical, Activity, Waves, Sprout, BrainCircuit, TestTube2, CheckCircle2, Zap, List, Check, Droplet, AlertTriangle, Thermometer } from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

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

// Helper para gerar o timestamp regressivo baseado no current time
function getLogTime(minutesAgo: number) {
  const date = new Date();
  date.setMinutes(date.getMinutes() - minutesAgo);
  return date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
}

export default function Dashboard() {
  const [ph, setPh] = useState(6.2)
  const [ec, setEc] = useState(1.8)
  const [temp, setTemp] = useState(22)
  
  // Data de simulação de crescimento real x ideal
  const growthData = [
    { day: '0', Ideal: 10, Real: 10 },
    { day: '5', Ideal: 40, Real: 38 },
    { day: '10', Ideal: 90, Real: 85 },
    { day: '15', Ideal: 160, Real: 140 },
    { day: '20', Ideal: 250, Real: 220 },
    { day: '25', Ideal: 320, Real: 300 },
    { day: '30', Ideal: 400, Real: 380 },
  ]

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
            <div className="bg-[#F4F7FB] border-2 border-dashed border-[#D1DFFA] rounded-xl flex flex-col items-center justify-center p-6 hover:bg-[#edf2fa] transition-colors cursor-pointer group">
              <div className="bg-[#E4ECFA] p-4 rounded-xl group-hover:scale-110 group-hover:bg-indigo-100 transition-all shadow-inner">
                <BrainCircuit className="w-8 h-8 text-indigo-500" />
              </div>
              <p className="text-sm font-medium text-indigo-400 mt-4 text-center">Clique para enviar foto para análise da Rede Neural</p>
            </div>
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
                      <span className="font-medium text-gray-400 mr-1">{getLogTime(log.timeOffset)} -</span>
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
            <select className="bg-gray-50 border border-gray-200 text-sm rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-vertice-green/20 text-gray-600">
              <option>Lote de Alface Crespa</option>
            </select>
          </div>
          
          <div className="flex-1 w-full min-h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={growthData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{fill: '#9CA3AF', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#9CA3AF', fontSize: 12}} dx={-10} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  itemStyle={{ fontSize: '14px', fontWeight: '500' }}
                />
                {/* Linha Tracejada - Atual */}
                <Line type="monotone" dataKey="Real" stroke="#10b981" strokeWidth={3} dot={{r: 5, fill: '#10b981', strokeWidth: 2, stroke: '#fff'}} name="Crescimento Real (g)" />
                {/* Linha Sólida - Ideal */}
                <Line 
                  name="Curva Tradicional Esperada"
                  type="monotone" 
                  dataKey="Ideal" 
                  stroke="#d1d5db" 
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  dot={{ fill: '#d1d5db', strokeWidth: 0, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Legendas Personalizadas */}
          <div className="flex justify-center items-center gap-8 mt-2 pt-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#10b981]"></div>
              <span className="text-sm text-gray-500 font-medium whitespace-nowrap">Crescimento Real (Otimizado por IA)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#d1d5db]"></div>
              <span className="text-sm text-gray-500 font-medium whitespace-nowrap">Curva Tradicional Esperada</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
