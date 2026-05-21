import { describe, it, expect } from 'vitest'
import { renderHook } from '@testing-library/react'
import { useVerseFilter } from './useVerseFilter'

const mockVerses = [
  {
    id: 'test-1',
    book: 'Johannes',
    chapter: 3,
    verse: 16,
    translations: { luther2017: 'Gott liebt die Welt', gute_nachricht: 'Gott hat geliebt', elberfelder: 'Also liebte Gott' },
    categories: ['von-guten-maechten-geborgen'],
    traits: ['froehlich-dankbar'],
    keywords: ['Liebe', 'Gott'],
  },
  {
    id: 'test-2',
    book: 'Matthäus',
    chapter: 5,
    verse: 14,
    translations: { luther2017: 'Ihr seid das Licht der Welt', gute_nachricht: 'Ihr seid Licht', elberfelder: 'Licht der Welt' },
    categories: ['einen-unterschied-machen'],
    traits: ['mutig'],
    keywords: ['Licht', 'Welt'],
  },
]

describe('useVerseFilter', () => {
  it('returns all verses with empty filters', () => {
    const { result } = renderHook(() =>
      useVerseFilter(mockVerses, { categories: [], traits: [] }, '')
    )
    expect(result.current).toHaveLength(2)
  })

  it('filters by category', () => {
    const { result } = renderHook(() =>
      useVerseFilter(mockVerses, { categories: ['von-guten-maechten-geborgen'], traits: [] }, '')
    )
    expect(result.current).toHaveLength(1)
    expect(result.current[0].id).toBe('test-1')
  })

  it('filters by keyword', () => {
    const { result } = renderHook(() =>
      useVerseFilter(mockVerses, { categories: [], traits: [] }, 'Licht')
    )
    expect(result.current).toHaveLength(1)
    expect(result.current[0].id).toBe('test-2')
  })

  it('returns empty array when no match', () => {
    const { result } = renderHook(() =>
      useVerseFilter(mockVerses, { categories: [], traits: [] }, 'xyz_nicht_vorhanden')
    )
    expect(result.current).toHaveLength(0)
  })
})
