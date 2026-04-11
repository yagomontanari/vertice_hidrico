"use client"
import React, { useState } from 'react'
import { X, Save, Plus, Trash2, Check } from 'lucide-react'

interface PlanModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PlanModal({ isOpen, onClose }: PlanModalProps) {
  const [plans, setPlans] = useState([
    { id: 1, name: 'Fase Vegetativa Premium', ph: 6.0, ec: 1.8, active: true },
    { id: 2, name: 'Floração / Frutificação', ph: 5.8, ec: 2.2, active: false },
  ])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl overflow-hidden animate-in zoom-in-95 duration-300">
        
        {/* Header Modal */}
        <div className="bg-gray-50 px-8 py-6 border-b border-gray-100 flex justify-between items-center">
          <div>
            <h3 className="text-xl font-bold text-vertice-text">Gerenciar Planos de Nutrição</h3>
            <p className="text-sm text-gray-500 mt-1">Configure as diretrizes que a IA deve seguir para a solução.</p>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-200 rounded-full transition-colors text-gray-400"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-8">
          {/* List of Plans */}
          <div className="space-y-4 mb-8">
            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Planos Salvos</h4>
            {plans.map((plan) => (
              <div 
                key={plan.id} 
                className={`flex items-center justify-between p-4 rounded-2xl border transition-all ${
                  plan.active ? 'border-vertice-green bg-emerald-50/50 shadow-sm' : 'border-gray-100 bg-white hover:border-gray-200 text-gray-400'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className={`p-2 rounded-xl ${plan.active ? 'bg-vertice-green text-white' : 'bg-gray-100 text-gray-400'}`}>
                    {plan.active ? <Check className="w-5 h-5" /> : <div className="w-5 h-5" />}
                  </div>
                  <div>
                    <span className={`font-bold block ${plan.active ? 'text-vertice-text' : 'text-gray-500'}`}>{plan.name}</span>
                    <div className="flex gap-3 mt-1">
                      <span className="text-xs font-medium">Alvo pH: <span className="font-bold">{plan.ph}</span></span>
                      <span className="text-xs font-medium">Alvo EC: <span className="font-bold">{plan.ec}</span></span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  {!plan.active && (
                    <button className="text-xs font-bold text-vertice-green hover:underline px-2 py-1">Ativar</button>
                  )}
                  <button className="p-2 hover:bg-red-50 text-red-400 rounded-lg transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <hr className="mb-8 border-gray-100" />

          {/* New Plan Form */}
          <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-6">Novo Plano</h4>
          <div className="grid grid-cols-2 gap-6">
            <div className="col-span-2">
              <label className="block text-sm font-semibold text-gray-600 mb-2">Nome do Plano</label>
              <input 
                type="text" 
                placeholder="Ex: Crescimento Rápido Lote C"
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-vertice-green/20 focus:border-vertice-green transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-600 mb-2">Alvo de pH</label>
              <input 
                type="number" 
                step="0.1"
                placeholder="6.0"
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-vertice-green/20 focus:border-vertice-green transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-600 mb-2">Alvo de EC (mS/cm)</label>
              <input 
                type="number" 
                step="0.1"
                placeholder="1.8"
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-vertice-green/20 focus:border-vertice-green transition-all"
              />
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-8 bg-gray-50 border-t border-gray-100 flex gap-3">
          <button 
            onClick={onClose}
            className="flex-1 bg-white hover:bg-gray-100 text-gray-600 font-bold py-4 rounded-2xl transition-all border border-gray-200"
          >
            Cancelar
          </button>
          <button 
            className="flex-1 bg-vertice-green hover:bg-green-700 text-white font-bold py-4 rounded-2xl transition-all shadow-lg shadow-green-200 flex items-center justify-center gap-2"
            onClick={() => {
              alert('Plano salvo com sucesso! (Simulado)')
              onClose()
            }}
          >
            <Save className="w-5 h-5" />
            Salvar Plano
          </button>
        </div>
      </div>
    </div>
  )
}
