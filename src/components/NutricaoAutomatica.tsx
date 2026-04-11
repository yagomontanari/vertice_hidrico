"use client"
import React, { useState, useEffect } from 'react'
import { Beaker, BrainCircuit, History, Info, PlusCircle, Settings, Droplet, FlaskConical, CheckCircle2, Bot, Sliders } from 'lucide-react'
import PlanModal from './PlanModal'

const MOCK_NUTRITION_LOGS = [
  { id: 1, date: '2026-04-10 14:30', amount: 2.5, ph: 6.1, source: 'IA', components: ['NPK (10-10-10)', 'Cálcio'], insight: 'Compensação de Nitrogênio necessária para manter vigor foliar.' },
  { id: 2, date: '2026-04-10 08:15', amount: 1.2, ph: 6.2, source: 'Manual', components: ['Água Desmineralizada'], insight: 'Reabastecimento matinal solicitado pelo operador.' },
  { id: 3, date: '2026-04-09 20:00', amount: 3.0, ph: 5.9, source: 'IA', components: ['Ácido Fosfórico', 'NPK'], insight: 'Ajuste de pH após detecção de leve alcalinidade na solução.' },
  { id: 4, date: '2026-04-09 12:45', amount: 2.1, ph: 6.0, source: 'IA', components: ['Magnésio', 'Vitaminas B12'], insight: 'Injeção de Magnésio vinculada a pico de fotossíntese detectado.' },
]

const SENSOR_INSIGHTS = [
  { id: 1, text: 'Nível de Nitrogênio detectado como baixo no Sensor 02 (-15% do ideal).', type: 'info' },
  { id: 2, text: 'Radiação solar elevada detectada; IA sugere diluição leve da solução para evitar queima.', type: 'alert' },
  { id: 3, text: 'Fluxo de oxigenação nas raízes operando a 98% de eficiência.', type: 'success' },
  { id: 4, text: 'Tendência de pH: Estável nas últimas 6 horas (Margem de erro 0.02).', type: 'success' },
]

export default function NutricaoAutomatica() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="flex flex-col h-full animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Header */}
      <div className="flex justify-between items-start mb-8">
        <div>
          <h2 className="text-3xl font-bold text-vertice-green tracking-tight">Nutrição Automática</h2>
          <p className="text-vertice-textLight mt-1 flex items-center gap-2 text-sm">
             Controle autônomo de solução nutritiva e pH operado pela IA.
          </p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-white text-vertice-green border border-vertice-green/20 px-5 py-2.5 rounded-xl text-sm font-semibold flex items-center gap-2 hover:bg-vertice-green hover:text-white transition-all shadow-sm hover:shadow-md"
        >
          <Settings className="w-4 h-4" />
          Gerenciar Planos
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* IA Insight Card (Destaque) */}
        <div className="lg:col-span-2 bg-gradient-to-br from-vertice-green to-[#0d9488] rounded-2xl p-6 text-white shadow-lg relative overflow-hidden group">
          <div className="absolute right-[-20px] top-[-20px] opacity-10 group-hover:scale-110 transition-transform duration-700">
            <BrainCircuit className="w-48 h-48" />
          </div>
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-4 bg-white/20 w-fit px-3 py-1 rounded-full text-xs font-bold backdrop-blur-md">
              <Bot className="w-3.5 h-3.5" />
              IA INSIGHT ATUAL
            </div>
            <h3 className="text-2xl font-bold mb-2">Compensação Nutritiva Ativa</h3>
            <p className="text-white/80 leading-relaxed text-sm max-w-xl">
              Baseado na análise espectral das folhas e sensores de EC, a IA detectou uma demanda maior por Nitrogênio e Potássio no Lote A. 
              A próxima execução automática está agendada para as 16:00 (em 15 min).
            </p>
            <div className="mt-6 flex gap-4">
              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-3 flex-1">
                <span className="text-[10px] uppercase font-bold text-white/60 block mb-1">Última Execução</span>
                <span className="text-lg font-bold">Hoje, 14:30</span>
              </div>
              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-3 flex-1">
                <span className="text-[10px] uppercase font-bold text-white/60 block mb-1">Volume Total (24h)</span>
                <span className="text-lg font-bold">12.5 Litros</span>
              </div>
            </div>
          </div>
        </div>

        {/* Sensor Stream (Elegant Bullets) */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col">
          <h3 className="font-bold flex items-center gap-2 text-vertice-text mb-5">
            <Droplet className="w-5 h-5 text-blue-500" />
            Insights dos Sensores
          </h3>
          <div className="space-y-4">
            {SENSOR_INSIGHTS.map((insight) => (
              <div key={insight.id} className="flex gap-3 group">
                <div className={`mt-1.5 w-1.5 h-1.5 rounded-full shrink-0 ${
                  insight.type === 'alert' ? 'bg-amber-500 animate-pulse' : 
                  insight.type === 'success' ? 'bg-emerald-500' : 'bg-blue-500'
                }`} />
                <p className="text-sm text-gray-600 leading-relaxed group-hover:text-vertice-text transition-colors cursor-default">
                  {insight.text}
                </p>
              </div>
            ))}
          </div>
          <button className="mt-8 text-xs font-bold text-vertice-green hover:underline flex items-center gap-1">
            VER TELEMETRIA COMPLETA <Info className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Log de Atividades */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex-1">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-bold flex items-center gap-2 text-vertice-text">
            <History className="w-5 h-5 text-gray-400" />
            Histórico de Nutrição e Reabastecimento
          </h3>
          <div className="flex gap-2">
            <button className="text-xs px-3 py-1.5 rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50">Exportar PDF</button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="pb-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Data/Hora</th>
                <th className="pb-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Quantidade (L)</th>
                <th className="pb-4 text-xs font-bold text-gray-400 uppercase tracking-wider">pH Final</th>
                <th className="pb-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Materiais</th>
                <th className="pb-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Origem</th>
                <th className="pb-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Insight da IA / Observação</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {MOCK_NUTRITION_LOGS.map((log) => (
                <tr key={log.id} className="group hover:bg-gray-50/50 transition-colors">
                  <td className="py-4 text-sm font-medium text-vertice-text">{log.date}</td>
                  <td className="py-4 text-sm text-gray-600 font-mono">{log.amount.toFixed(1)}L</td>
                  <td className="py-4">
                    <span className="px-2 py-1 rounded-md bg-indigo-50 text-indigo-600 text-xs font-bold border border-indigo-100">
                      {log.ph} pH
                    </span>
                  </td>
                  <td className="py-4">
                    <div className="flex flex-wrap gap-1">
                      {log.components.map((comp, idx) => (
                        <span key={idx} className="bg-gray-100 text-gray-600 text-[10px] px-1.5 py-0.5 rounded border border-gray-200 uppercase font-bold whitespace-nowrap">
                          {comp}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="py-4">
                    <div className="flex items-center gap-1.5 text-xs font-semibold">
                      {log.source === 'IA' ? (
                        <>
                          <Bot className="w-3.5 h-3.5 text-vertice-green" />
                          <span className="text-vertice-green bg-emerald-50 px-2 py-0.5 rounded-full">🤖 IA</span>
                        </>
                      ) : (
                        <>
                          <Sliders className="w-3.5 h-3.5 text-gray-400" />
                          <span className="text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">👤 MANUAL</span>
                        </>
                      )}
                    </div>
                  </td>
                  <td className="py-4 text-sm text-gray-500 max-w-xs truncate" title={log.insight}>
                    {log.insight}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <PlanModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  )
}
