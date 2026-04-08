import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Sidebar from '@/components/Sidebar'

describe('Sidebar Component', () => {
  it('renders the brand name successfully', () => {
    render(<Sidebar />)
    
    // Verifica se "Vértice" está no documento
    const brandName = screen.getByText('Vértice')
    expect(brandName).toBeInTheDocument()
    
    // Verifica a presença dos links principais
    expect(screen.getByText('Painel da IA')).toBeInTheDocument()
    expect(screen.getByText('Lotes e Safras')).toBeInTheDocument()
  })
})
