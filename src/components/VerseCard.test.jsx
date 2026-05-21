import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import VerseCard from './VerseCard'
import { TranslationProvider } from '../context/TranslationContext'

const verse = {
  id: 'test-1',
  book: 'Johannes',
  chapter: 3,
  verse: 16,
  translations: {
    luther2017: 'Denn so hat Gott die Welt geliebt',
    gute_nachricht: 'Gott hat geliebt',
    elberfelder: 'Also liebte Gott',
  },
  categories: ['von-guten-maechten-geborgen'],
  traits: [],
  keywords: [],
}

const wrapper = ({ children }) => <TranslationProvider>{children}</TranslationProvider>

describe('VerseCard', () => {
  it('renders verse text', () => {
    render(<VerseCard verse={verse} isFavorite={() => false} onToggleFavorite={vi.fn()} />, { wrapper })
    expect(screen.getByText(/Denn so hat Gott die Welt geliebt/)).toBeInTheDocument()
  })

  it('renders verse reference', () => {
    render(<VerseCard verse={verse} isFavorite={() => false} onToggleFavorite={vi.fn()} />, { wrapper })
    expect(screen.getByText('Johannes 3,16')).toBeInTheDocument()
  })

  it('calls onToggleFavorite when favorite button clicked', () => {
    const onToggle = vi.fn()
    render(<VerseCard verse={verse} isFavorite={() => false} onToggleFavorite={onToggle} />, { wrapper })
    fireEvent.click(screen.getByLabelText('Zu Favoriten hinzufügen'))
    expect(onToggle).toHaveBeenCalledWith('test-1')
  })
})
