import Sidebar from '@/components/Sidebar'
import Dashboard from '@/components/Dashboard'

export default function Home() {
  return (
    <div className="flex h-screen w-full bg-vertice-bg text-vertice-text overflow-hidden font-sans">
      <Sidebar />
      <main className="flex-1 overflow-y-auto p-6 md:p-8">
        <Dashboard />
      </main>
    </div>
  )
}
