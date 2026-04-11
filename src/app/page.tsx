"use client"
import { useState } from 'react'
import Sidebar from '@/components/Sidebar'
import Dashboard from '@/components/Dashboard'
import VisionDiagnostic from '@/components/VisionDiagnostic'
import LotesESafras from '@/components/LotesESafras'
import NutricaoAutomatica from '@/components/NutricaoAutomatica'

export default function Home() {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [diagnosesHistory, setDiagnosesHistory] = useState<any[]>([])
  const [lotes, setLotes] = useState<any[]>([
    { id: '1', nome: 'Lote de Alface Crespa', dataPlantio: '2026-03-25', safra: 'Outono', status: 'Ativo' },
    { id: '2', nome: 'Lote de Rúcula Silvestre', dataPlantio: '2026-04-01', safra: 'Outono', status: 'Ativo' }
  ])

  const handleDiagnosisComplete = (result: any, image: string) => {
    setDiagnosesHistory(prev => [{ ...result, image, date: new Date().toISOString() }, ...prev])
  }

  return (
    <div className="flex h-screen w-full bg-vertice-bg text-vertice-text overflow-hidden font-sans">
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
      <main className="flex-1 overflow-y-auto p-6 md:p-8 relative">
        <div style={{ display: activeTab === 'dashboard' ? 'block' : 'none' }}>
           <Dashboard onDiagnosisComplete={handleDiagnosisComplete} lotes={lotes} />
        </div>
        <div style={{ display: activeTab === 'diagnostico' ? 'block' : 'none' }}>
           <VisionDiagnostic history={diagnosesHistory} />
        </div>
        <div style={{ display: activeTab === 'lotes' ? 'block' : 'none' }} className="h-full">
           <LotesESafras lotes={lotes} setLotes={setLotes} />
        </div>
        <div style={{ display: activeTab === 'nutricao' ? 'block' : 'none' }}>
           <NutricaoAutomatica />
        </div>
      </main>
    </div>
  )
}
