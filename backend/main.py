from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager

from routes import auth, admin, artist, user
from db import close_database

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup
    print("🚀 Musical Event Management API starting up...")
    yield
    # Shutdown
    print("🔄 Shutting down...")
    close_database()

app = FastAPI(
    title="Musical Event Management API",
    description="Backend API for managing musical events, artists, and applications",
    version="1.0.0",
    lifespan=lifespan
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000", "http://localhost:8001"],  # Frontend URLs
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers with /api prefix
app.include_router(auth.router, prefix="/api")
app.include_router(admin.router, prefix="/api")
app.include_router(artist.router, prefix="/api")
app.include_router(user.router, prefix="/api")

@app.get("/")
async def root():
    """Root endpoint"""
    return {
        "message": "Musical Event Management API",
        "version": "1.0.0",
        "status": "running"
    }

@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {"status": "healthy"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8000,
        reload=True
    )