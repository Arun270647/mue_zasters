from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager

# Only import auth for now to test
from routes import auth
from db import close_database

@asynccontextmanager  
async def lifespan(app: FastAPI):
    print("🚀 Musical Event Management API starting up...")
    yield
    print("🔄 Shutting down...")
    close_database()

app = FastAPI(
    title="Musical Event Management API",
    description="Backend API for managing musical events, artists, and applications", 
    version="1.0.0",
    lifespan=lifespan
)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include only auth router for testing
app.include_router(auth.router, prefix="/api")

@app.get("/")
async def root():
    return {"message": "Musical Event Management API", "status": "running"}

@app.get("/health")
async def health_check():
    return {"status": "healthy"}