from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from mangum import Mangum
from embeddings import search

app = FastAPI(title='Taufspruch Finder – Semantic Search API', version='1.0.0')

app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],
    allow_methods=['POST', 'GET'],
    allow_headers=['*'],
)

class SearchRequest(BaseModel):
    query: str = Field(..., min_length=1, max_length=200)
    top_k: int = Field(10, ge=1, le=30)

class SearchResult(BaseModel):
    id: str
    score: float

@app.get('/api/health')
def health():
    return {'status': 'ok'}

@app.post('/api/search', response_model=list[SearchResult])
def semantic_search(req: SearchRequest):
    try:
        results = search(req.query, req.top_k)
        return results
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

handler = Mangum(app, lifespan='off')
