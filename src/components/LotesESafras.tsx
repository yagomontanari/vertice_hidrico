import React, { useState } from 'react';
import { Sprout, Plus, Search, Calendar, Leaf, CheckCircle2 } from 'lucide-react';

export default function LotesESafras({ lotes, setLotes }: { lotes: any[], setLotes: (val: any) => void }) {
  const [showModal, setShowModal] = useState(false);
  const [novoLote, setNovoLote] = useState({ nome: '', dataPlantio: '', safra: 'Verão', status: 'Ativo' });

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!novoLote.nome) return;
    
    setLotes((prev: any) => [
      { id: Date.now().toString(), ...novoLote },
      ...prev
    ]);
    
    setNovoLote({ nome: '', dataPlantio: '', safra: 'Verão', status: 'Ativo' });
    setShowModal(false);
  };

  return (
    <div className="flex flex-col h-full animate-in fade-in duration-500 relative">
      <div className="flex justify-between items-start mb-8">
        <div>
          <h2 className="text-3xl font-bold text-vertice-green tracking-tight">Lotes e Safras</h2>
          <p className="text-vertice-textLight mt-1 flex items-center gap-2 text-sm">
            Gerencie o plantel ativo para refletir predições precisas da IA.
          </p>
        </div>
        <button 
          onClick={() => setShowModal(true)}
          className="bg-emerald-600 text-white px-5 py-2.5 rounded-xl text-sm font-semibold flex items-center gap-2 hover:bg-emerald-700 transition-colors shadow-sm"
        >
          <Plus className="w-4 h-4" />
          Novo Lote
        </button>
      </div>

      <div className="flex gap-4 mb-6">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input 
            type="text" 
            placeholder="Buscar lote..." 
            className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 shadow-sm"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {lotes.map((lote) => (
          <div key={lote.id} className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm flex flex-col hover:border-emerald-100 transition-colors group">
            <div className="flex justify-between items-start mb-4">
              <div className="p-2.5 bg-emerald-50 text-emerald-600 rounded-xl group-hover:scale-105 transition-transform">
                <Sprout className="w-6 h-6" />
              </div>
              <span className="bg-emerald-100 text-emerald-700 text-xs font-bold px-2.5 py-1 rounded-full uppercase tracking-wide">
                {lote.status}
              </span>
            </div>
            
            <h3 className="font-bold text-lg text-slate-800 mb-1">{lote.nome}</h3>
            
            <div className="space-y-2 mt-4 flex-1">
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-500 flex items-center gap-1.5"><Calendar className="w-4 h-4" /> Plantio</span>
                <span className="font-semibold text-slate-700">
                  {lote.dataPlantio ? new Date(lote.dataPlantio).toLocaleDateString('pt-BR') : 'Sem data'}
                </span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-500 flex items-center gap-1.5"><Leaf className="w-4 h-4" /> Safra</span>
                <span className="font-semibold text-slate-700">{lote.safra}</span>
              </div>
            </div>

            <div className="mt-5 pt-4 border-t border-slate-100">
               <button className="text-sm font-semibold text-emerald-600 hover:text-emerald-700 w-full text-left flex items-center justify-between">
                 Ver estatísticas da IA <CheckCircle2 className="w-4 h-4" />
               </button>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in relative">
          <div className="bg-white rounded-3xl shadow-xl w-full max-w-md p-6 animate-in slide-in-from-bottom-4 relative">
            <h3 className="text-xl font-bold text-slate-800 mb-6">Criar Novo Lote</h3>
            
            <form onSubmit={handleCreate} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Nome da Cultura/Lote</label>
                <input 
                  type="text" 
                  value={novoLote.nome}
                  onChange={(e) => setNovoLote({...novoLote, nome: e.target.value})}
                  placeholder="Ex: Lote Alfa de Rúcula"
                  className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Data de Plantio</label>
                <input 
                  type="date"
                  value={novoLote.dataPlantio}
                  onChange={(e) => setNovoLote({...novoLote, dataPlantio: e.target.value})}
                  className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 text-slate-600"
                />
              </div>

              <div className="flex justify-end gap-3 mt-8">
                <button 
                  type="button" 
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
                >
                  Cancelar
                </button>
                <button 
                  type="submit"
                  className="px-5 py-2 text-sm font-semibold bg-emerald-600 text-white hover:bg-emerald-700 rounded-xl transition-colors shadow-sm"
                >
                  Confirmar Cadastro
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
