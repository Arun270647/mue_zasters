from fastapi import APIRouter, Depends
from bson import ObjectId

from auth import verify_token, TokenData
from db import users_collection

router = APIRouter(prefix="/user", tags=["user"])

@router.get("/profile", response_model=dict)
async def get_user_profile(token_data: TokenData = Depends(verify_token)):
    """Get current user's profile"""
    user = users_collection.find_one({"_id": ObjectId(token_data.user_id)})
    
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )
    
    # Remove sensitive information
    user.pop("password_hash", None)
    user["_id"] = str(user["_id"])
    
    return user

@router.put("/profile", response_model=dict)
async def update_user_profile(
    profile_data: dict,
    token_data: TokenData = Depends(verify_token)
):
    """Update current user's profile"""
    # Remove sensitive fields that shouldn't be updated
    profile_data.pop("password_hash", None)
    profile_data.pop("role", None)
    profile_data.pop("_id", None)
    
    if not profile_data:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="No valid fields to update"
        )
    
    # Update user profile
    result = users_collection.update_one(
        {"_id": ObjectId(token_data.user_id)},
        {"$set": profile_data}
    )
    
    if result.matched_count == 0:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )
    
    return {"message": "Profile updated successfully"}