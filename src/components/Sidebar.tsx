import { Leaf, AppWindow, FileText, Beaker, Sprout, ChevronLeft, ChevronRight } from 'lucide-react'
import { useState } from 'react'

interface SidebarProps {
  activeTab?: string;
  onTabChange?: (tab: string) => void;
}

export default function Sidebar({ activeTab = 'dashboard', onTabChange = () => {} }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false)

  const tabs = [
    { id: 'dashboard', label: 'Painel da IA', icon: AppWindow },
    { id: 'diagnostico', label: 'Diagnóstico Visão', icon: FileText },
    { id: 'lotes', label: 'Lotes e Safras', icon: Sprout },
  ]

  const disabledTabs = [
    { id: 'nutricao', label: 'Nutrição Automática', icon: Beaker },
  ]

  return (
    <aside className={`${isCollapsed ? 'w-20' : 'w-64'} h-full bg-vertice-green text-white flex flex-col shadow-xl z-20 transition-all duration-300 ease-in-out sm:relative absolute rounded-r-2xl`}>
      
      {/* Botão para encolher/expandir */}
      <button 
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3 top-8 bg-vertice-green border border-white/20 text-white rounded-full p-1 shadow-md hover:bg-green-700 transition-colors z-30"
      >
        {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
      </button>

      <div className={`p-6 flex items-center gap-3 overflow-hidden ${isCollapsed ? 'justify-center px-0' : ''}`}>
        <div className="bg-white/20 p-2 rounded-lg backdrop-blur-sm shrink-0 flex items-center justify-center">
          <Leaf className="w-6 h-6 text-green-300" />
        </div>
        <div className={`transition-opacity duration-300 whitespace-nowrap ${isCollapsed ? 'opacity-0 w-0 hidden' : 'opacity-100'}`}>
          <h1 className="font-bold text-xl tracking-tight leading-none">Vértice</h1>
          <p className="text-[10px] text-green-200 uppercase tracking-widest font-semibold mt-1 opacity-80">Hídrico IA</p>
        </div>
      </div>

      <nav className="flex-1 px-4 py-8 space-y-2 overflow-visible">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          const Icon = tab.icon;
          return (
            <button 
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`w-full flex items-center ${isCollapsed ? 'justify-center p-3' : 'justify-start px-4 py-3'} gap-3 rounded-xl transition-all font-medium border relative group ${isActive ? 'bg-white/10 text-white border-white/5' : 'border-transparent text-green-100/70 hover:text-white hover:bg-white/5'}`}
            >
              <Icon className={`w-5 h-5 shrink-0 ${isActive ? 'opacity-90' : 'opacity-80'}`} />
              {!isCollapsed && <span className="whitespace-nowrap">{tab.label}</span>}
              
              {/* Tooltip Flutuante */}
              {isCollapsed && (
                <div className="absolute left-[70px] bg-gray-900 border border-gray-700 text-white text-xs font-semibold px-3 py-1.5 rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all whitespace-nowrap z-50 shadow-lg">
                  {tab.label}
                </div>
              )}
            </button>
          )
        })}

        <div className="pt-4 mt-4 border-t border-white/10 space-y-2">
          {disabledTabs.map((tab) => {
             const Icon = tab.icon;
             return (
               <div key={tab.id} className={`w-full flex items-center ${isCollapsed ? 'justify-center p-3' : 'justify-start px-4 py-3'} gap-3 rounded-xl font-medium border border-transparent text-green-100/30 cursor-not-allowed group relative`}>
                 <Icon className="w-5 h-5 opacity-40 shrink-0" />
                 {!isCollapsed && <span className="whitespace-nowrap">{tab.label}</span>}

                 {/* Tooltip Flutuante */}
                 {isCollapsed && (
                   <div className="absolute left-[70px] bg-gray-900 border border-gray-700 text-white text-xs font-semibold px-3 py-1.5 rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all whitespace-nowrap z-50 shadow-lg">
                     {tab.label}
                   </div>
                 )}
               </div>
             )
          })}
        </div>
      </nav>

      <div className={`p-4 transition-opacity duration-300 ${isCollapsed ? 'px-2' : ''}`}>
        {!isCollapsed ? (
          <div className="bg-black/20 rounded-xl p-4 text-xs font-mono text-green-200/50 flex flex-col items-center">
            <span>v0.1.0</span>
            <span>Online</span>
          </div>
        ) : (
          <div className="bg-black/20 rounded-xl p-2 text-[10px] font-mono text-green-200/50 flex flex-col items-center">
            <span>v0.1</span>
          </div>
        )}
      </div>
    </aside>
  )
}
