import { useState, useCallback, useRef } from 'react'

const API_BASE = import.meta.env.VITE_API_URL ?? '/api'

export function useSemanticSearch() {
  const [results, setResults] = useState(null)
  const [loading, setLoading] = useState(false)
  const [available, setAvailable] = useState(true)
  const abortRef = useRef(null)

  const searchSemantic = useCallback(async (query, topK = 15) => {
    if (!query.trim() || !available) return null

    abortRef.current?.abort()
    abortRef.current = new AbortController()

    setLoading(true)
    try {
      const res = await fetch(`${API_BASE}/search`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query, top_k: topK }),
        signal: abortRef.current.signal,
      })
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const data = await res.json()
      setResults(data.map((r) => r.id))
      return data.map((r) => r.id)
    } catch (err) {
      if (err.name === 'AbortError') return null
      setAvailable(false)
      setResults(null)
      return null
    } finally {
      setLoading(false)
    }
  }, [available])

  const clearResults = useCallback(() => setResults(null), [])

  return { results, loading, available, searchSemantic, clearResults }
}
