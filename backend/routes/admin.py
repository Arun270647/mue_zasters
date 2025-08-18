from fastapi import APIRouter, HTTPException, status, Depends
from bson import ObjectId
from datetime import datetime
from typing import List

from models import Artist
from auth import require_admin, TokenData
from db import artist_applications_collection, artists_collection, users_collection

router = APIRouter(prefix="/admin", tags=["admin"])

@router.get("/applications", response_model=List[dict])
async def get_all_applications(token_data: TokenData = Depends(require_admin)):
    """Get all artist applications (admin only)"""
    # Aggregate applications with user email
    pipeline = [
        {
            "$lookup": {
                "from": "users",
                "localField": "user_id",
                "foreignField": "_id",
                "as": "user"
            }
        },
        {
            "$unwind": "$user"
        },
        {
            "$project": {
                "_id": 1,
                "user_id": 1,
                "stage_name": 1,
                "genres": 1,
                "bio": 1,
                "portfolio_links": 1,
                "status": 1,
                "reviewed_by": 1,
                "created_at": 1,
                "updated_at": 1,
                "email": "$user.email"
            }
        },
        {
            "$sort": {"created_at": -1}
        }
    ]
    
    applications = list(artist_applications_collection.aggregate(pipeline))
    
    # Convert ObjectId to string for JSON serialization
    for app in applications:
        app["_id"] = str(app["_id"])
        app["user_id"] = str(app["user_id"])
        if app.get("reviewed_by"):
            app["reviewed_by"] = str(app["reviewed_by"])
    
    return applications

@router.post("/applications/{application_id}/approve", response_model=dict)
async def approve_application(
    application_id: str,
    token_data: TokenData = Depends(require_admin)
):
    """Approve artist application (admin only)"""
    # Validate ObjectId
    if not ObjectId.is_valid(application_id):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid application ID"
        )
    
    # Find application
    application = artist_applications_collection.find_one({
        "_id": ObjectId(application_id)
    })
    
    if not application:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Application not found"
        )
    
    if application["status"] != "pending":
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Application is not pending"
        )
    
    # Update application status
    artist_applications_collection.update_one(
        {"_id": ObjectId(application_id)},
        {
            "$set": {
                "status": "approved",
                "reviewed_by": ObjectId(token_data.user_id),
                "updated_at": datetime.utcnow()
            }
        }
    )
    
    # Promote user to artist role (role = 1)
    users_collection.update_one(
        {"_id": application["user_id"]},
        {"$set": {"role": 1}}
    )
    
    # Create artist record
    artist = Artist(
        user_id=application["user_id"],
        stage_name=application["stage_name"],
        genres=application["genres"],
        bio=application["bio"],
        portfolio_links=application["portfolio_links"]
    )
    
    artists_collection.insert_one(artist.dict(by_alias=True))
    
    return {
        "message": "Application approved successfully",
        "application_id": application_id
    }

@router.post("/applications/{application_id}/reject", response_model=dict)
async def reject_application(
    application_id: str,
    token_data: TokenData = Depends(require_admin)
):
    """Reject artist application (admin only)"""
    # Validate ObjectId
    if not ObjectId.is_valid(application_id):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid application ID"
        )
    
    # Find application
    application = artist_applications_collection.find_one({
        "_id": ObjectId(application_id)
    })
    
    if not application:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Application not found"
        )
    
    if application["status"] != "pending":
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Application is not pending"
        )
    
    # Update application status
    artist_applications_collection.update_one(
        {"_id": ObjectId(application_id)},
        {
            "$set": {
                "status": "rejected",
                "reviewed_by": ObjectId(token_data.user_id),
                "updated_at": datetime.utcnow()
            }
        }
    )
    
    return {
        "message": "Application rejected successfully",
        "application_id": application_id
    }

@router.get("/stats", response_model=dict)
async def get_admin_stats(token_data: TokenData = Depends(require_admin)):
    """Get admin dashboard statistics"""
    total_users = users_collection.count_documents({})
    total_artists = users_collection.count_documents({"role": 1})
    pending_applications = artist_applications_collection.count_documents({"status": "pending"})
    approved_applications = artist_applications_collection.count_documents({"status": "approved"})
    rejected_applications = artist_applications_collection.count_documents({"status": "rejected"})
    
    return {
        "total_users": total_users,
        "total_artists": total_artists,
        "pending_applications": pending_applications,
        "approved_applications": approved_applications,
        "rejected_applications": rejected_applications
    }