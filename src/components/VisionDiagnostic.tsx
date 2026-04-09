import React from 'react';
import { Camera, Bot } from 'lucide-react';

export default function VisionDiagnostic({ history }: { history: any[] }) {
  return (
    <div className="flex flex-col h-full animate-in fade-in duration-500">
      <div className="flex justify-between items-start mb-8">
        <div>
          <h2 className="text-3xl font-bold text-vertice-green tracking-tight">Diagnóstico Visão (Histórico)</h2>
          <p className="text-vertice-textLight mt-1 flex items-center gap-2 text-sm">
            Todos os relatórios e varreduras foliares realizados pela IA.
          </p>
        </div>
      </div>

      {history.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center bg-white rounded-2xl border border-gray-100 shadow-sm p-12">
          <div className="bg-slate-50 p-6 rounded-full mb-4">
            <Camera className="w-12 h-12 text-slate-300" />
          </div>
          <h3 className="text-lg font-bold text-slate-700 mb-2">Nenhum diagnóstico realizado ainda</h3>
          <p className="text-slate-500 text-center max-w-md">
            Envie fotos no Painel da IA para que elas sejam analisadas e seu histórico apareça aqui.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {history.map((item, idx) => (
            <div key={idx} className={`${item.colors.bg} border ${item.colors.border} rounded-2xl p-5 shadow-sm flex flex-col`}>
              <div className="flex justify-between items-center mb-4">
                <span className={`${item.colors.badgeBg} ${item.colors.badgeText} text-xs font-bold px-2 py-1 rounded`}>{item.status}</span>
                <span className="text-xs text-slate-500 font-medium">
                  {new Date(item.date).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
              
              <div className="flex gap-4 mb-4">
                <div className="w-20 h-20 rounded-lg overflow-hidden shrink-0 border border-slate-200 shadow-sm bg-slate-100 flex items-center justify-center">
                  <img src={item.image} alt="Thumbnail" className="max-w-full max-h-full object-contain" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 text-sm mb-1">{item.anomaly}</h4>
                  <p className="text-xs text-slate-500 mb-1">Confiança da IA: <span className="font-bold text-slate-700">{item.confidence}</span></p>
                </div>
              </div>

              <p className="text-xs text-slate-600 mb-4 flex-1">{item.desc}</p>
              
              <div className={`pt-3 border-t ${item.colors.divider}`}>
                <div className={`flex items-center gap-1.5 mb-1.5 ${item.colors.actionTitle} font-semibold text-xs`}>
                  <Bot className="w-4 h-4" />
                  <span>Ação Executada:</span>
                </div>
                <p className="text-xs text-slate-600">{item.action}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
