from fastapi import APIRouter, HTTPException, status, Depends
from bson import ObjectId
from datetime import datetime

from models import ArtistApplicationCreate, ArtistApplication
from auth import verify_token, TokenData
from db import artist_applications_collection, users_collection

router = APIRouter(prefix="/artist", tags=["artist"])

@router.post("/apply", response_model=dict)
async def submit_application(
    application_data: ArtistApplicationCreate,
    token_data: TokenData = Depends(verify_token)
):
    """Submit artist application"""
    # Check if user already has a pending or approved application
    existing_application = artist_applications_collection.find_one({
        "user_id": ObjectId(token_data.user_id),
        "status": {"$in": ["pending", "approved"]}
    })
    
    if existing_application:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="You already have a pending or approved application"
        )
    
    # Parse portfolio links (split by newlines and filter empty strings)
    portfolio_links = [
        link.strip() for link in application_data.portfolio_links.split('\n') 
        if link.strip()
    ]
    
    # Parse genres (split by comma if multiple, otherwise single genre)
    genres = [genre.strip() for genre in application_data.genre.split(',') if genre.strip()]
    if not genres:
        genres = [application_data.genre.strip()]
    
    # Create application
    application = ArtistApplication(
        user_id=ObjectId(token_data.user_id),
        stage_name=application_data.stage_name,
        genres=genres,
        bio=application_data.bio,
        portfolio_links=portfolio_links,
        status="pending"
    )
    
    # Insert application into database
    result = artist_applications_collection.insert_one(application.dict(by_alias=True))
    
    return {
        "message": "Application submitted successfully",
        "application_id": str(result.inserted_id)
    }

@router.get("/my-applications", response_model=list)
async def get_my_applications(token_data: TokenData = Depends(verify_token)):
    """Get current user's applications"""
    applications = list(artist_applications_collection.find({
        "user_id": ObjectId(token_data.user_id)
    }))
    
    # Convert ObjectId to string for JSON serialization
    for app in applications:
        app["_id"] = str(app["_id"])
        app["user_id"] = str(app["user_id"])
        if app.get("reviewed_by"):
            app["reviewed_by"] = str(app["reviewed_by"])
    
    return applications