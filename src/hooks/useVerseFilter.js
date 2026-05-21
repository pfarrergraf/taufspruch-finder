import { useMemo } from 'react'

export function useVerseFilter(verses, filters, query) {
  return useMemo(() => {
    let result = verses

    if (filters.categories.length > 0) {
      result = result.filter((v) =>
        filters.categories.some((c) => v.categories.includes(c))
      )
    }
    if (filters.traits.length > 0) {
      result = result.filter((v) =>
        filters.traits.some((t) => v.traits.includes(t))
      )
    }
    if (query.trim()) {
      const q = query.toLowerCase()
      result = result.filter(
        (v) =>
          Object.values(v.translations).some((t) => t.toLowerCase().includes(q)) ||
          v.keywords.some((k) => k.toLowerCase().includes(q)) ||
          v.book.toLowerCase().includes(q)
      )
    }
    return result
  }, [verses, filters, query])
}
