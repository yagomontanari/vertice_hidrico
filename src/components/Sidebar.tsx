import { Leaf, AppWindow, FileText, Beaker, Sprout } from 'lucide-react'

export default function Sidebar() {
  return (
    <aside className="w-64 h-full bg-vertice-green text-white flex flex-col shadow-xl z-10 transition-all duration-300 rounded-r-2xl">
      <div className="p-6 flex items-center gap-3">
        <div className="bg-white/20 p-2 rounded-lg backdrop-blur-sm">
          <Leaf className="w-6 h-6 text-green-300" />
        </div>
        <div>
          <h1 className="font-bold text-xl tracking-tight leading-none">Vértice</h1>
          <p className="text-[10px] text-green-200 uppercase tracking-widest font-semibold mt-1 opacity-80">Hídrico IA</p>
        </div>
      </div>

      <nav className="flex-1 px-4 py-8 space-y-2">
        <a href="#" className="flex items-center gap-3 bg-white/10 text-white px-4 py-3 rounded-xl transition-all font-medium border border-white/5">
          <AppWindow className="w-5 h-5 opacity-90" />
          Painel da IA
        </a>
        <a href="#" className="flex items-center gap-3 text-green-100/70 hover:text-white hover:bg-white/5 px-4 py-3 rounded-xl transition-all font-medium">
          <FileText className="w-5 h-5 opacity-80" />
          Diagnóstico Visão
        </a>
        <a href="#" className="flex items-center gap-3 text-green-100/70 hover:text-white hover:bg-white/5 px-4 py-3 rounded-xl transition-all font-medium">
          <Beaker className="w-5 h-5 opacity-80" />
          Nutrição Automática
        </a>
        <a href="#" className="flex items-center gap-3 text-green-100/70 hover:text-white hover:bg-white/5 px-4 py-3 rounded-xl transition-all font-medium">
          <Sprout className="w-5 h-5 opacity-80" />
          Lotes e Safras
        </a>
      </nav>

      <div className="p-6">
        <div className="bg-black/20 rounded-xl p-4 text-xs font-mono text-green-200/50 flex flex-col items-center">
          <span>v0.1.0-MVP</span>
          <span>Status: Online</span>
        </div>
      </div>
    </aside>
  )
}
