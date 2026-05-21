import json
import numpy as np
from pathlib import Path

_model = None
_index = None
_verse_ids = []

def _get_model():
    global _model
    if _model is None:
        from sentence_transformers import SentenceTransformer
        _model = SentenceTransformer('paraphrase-multilingual-MiniLM-L12-v2')
    return _model

def _load_verses():
    data_path = Path(__file__).parent.parent.parent / 'data' / 'verses.json'
    with open(data_path, encoding='utf-8') as f:
        return json.load(f)

def _build_index():
    global _index, _verse_ids
    import faiss

    verses = _load_verses()
    model = _get_model()

    texts = []
    for v in verses:
        text = v['translations']['luther2017'] + ' ' + ' '.join(v['keywords'])
        texts.append(text)
        _verse_ids.append(v['id'])

    embeddings = model.encode(texts, show_progress_bar=False)
    embeddings = np.array(embeddings).astype('float32')
    faiss.normalize_L2(embeddings)

    _index = faiss.IndexFlatIP(embeddings.shape[1])
    _index.add(embeddings)

def search(query: str, top_k: int = 10) -> list[dict]:
    global _index
    if _index is None:
        _build_index()

    import faiss
    model = _get_model()

    q_emb = model.encode([query])
    q_emb = np.array(q_emb).astype('float32')
    faiss.normalize_L2(q_emb)

    scores, indices = _index.search(q_emb, min(top_k, len(_verse_ids)))

    return [
        {'id': _verse_ids[int(idx)], 'score': float(score)}
        for score, idx in zip(scores[0], indices[0])
        if score > 0.1
    ]
