"""
Lokaler Test: python skills/search/test_search.py
Benoetigt: pip install sentence-transformers faiss-cpu
"""
import sys
from pathlib import Path
sys.path.insert(0, str(Path(__file__).parent))

def test_search_returns_results():
    from embeddings import search
    results = search('Kraft und Mut', top_k=5)
    assert len(results) > 0
    assert all('id' in r and 'score' in r for r in results)
    print(f'OK search("Kraft und Mut") -> {len(results)} Ergebnisse')
    for r in results[:3]:
        print(f'  {r["id"]}: {r["score"]:.3f}')

if __name__ == '__main__':
    test_search_returns_results()
    print('OK Alle Tests bestanden')
