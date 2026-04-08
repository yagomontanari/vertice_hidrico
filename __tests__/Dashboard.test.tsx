import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Dashboard from '@/components/Dashboard'

// Necessário mockar o ResizeObserver que é usado pelo Recharts sob o capô (e não existe nativamente no jsdom)
class ResizeObserverMock {
  observe() {}
  unobserve() {}
  disconnect() {}
}
global.ResizeObserver = ResizeObserverMock

describe('Dashboard Component', () => {
  it('renders the initial sensor limits accurately', () => {
    render(<Dashboard />)
    
    // Verifica se o título principal carregou
    expect(screen.getByText('Visão Geral da Estufa Alfa')).toBeInTheDocument()
    
    // Verifica o card de IA de imagem
    expect(screen.getByText('Diagnóstico por Imagem (IA)')).toBeInTheDocument()
    
    // Verifica se os ranges da cultura carregaram
    expect(screen.getByText('Ideal (5.8 - 6.5)')).toBeInTheDocument()
  })
})
