from pydantic import BaseModel, EmailStr, Field, ConfigDict
from pydantic.json_schema import JsonSchemaValue, GetJsonSchemaHandler
from pydantic_core import core_schema
from typing import Optional, List, Any
from datetime import datetime
from bson import ObjectId

class PyObjectId(ObjectId):
    @classmethod
    def __get_pydantic_core_schema__(
        cls,
        source_type: Any,
        handler,
    ):
        def validate_object_id(value: Any) -> ObjectId:
            if isinstance(value, ObjectId):
                return value
            if isinstance(value, str):
                if ObjectId.is_valid(value):
                    return ObjectId(value)
                raise ValueError("Invalid ObjectId")
            raise ValueError("Invalid ObjectId")

        return core_schema.no_info_plain_validator_function(
            validate_object_id,
            serialization=core_schema.to_string_ser_schema(),
        )

    @classmethod
    def __get_pydantic_json_schema__(
        cls, schema: core_schema.CoreSchema, handler: GetJsonSchemaHandler
    ) -> JsonSchemaValue:
        return {"type": "string", "format": "objectid"}

# User Models
class UserCreate(BaseModel):
    email: EmailStr
    password: str
    role: Optional[int] = 2  # 0=Admin, 1=Artist, 2=User (default)

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class User(BaseModel):
    model_config = ConfigDict(
        populate_by_name=True,
        arbitrary_types_allowed=True,
        json_encoders={ObjectId: str}
    )
    
    id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
    email: EmailStr
    password_hash: str
    role: int = 2  # 0=Admin, 1=Artist, 2=User
    created_at: datetime = Field(default_factory=datetime.utcnow)

# Artist Application Models
class ArtistApplicationCreate(BaseModel):
    stage_name: str
    genre: str
    bio: str
    portfolio_links: str

class ArtistApplication(BaseModel):
    id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
    user_id: PyObjectId
    stage_name: str
    genres: List[str]
    bio: str
    portfolio_links: List[str]
    status: str = "pending"  # pending/approved/rejected
    reviewed_by: Optional[PyObjectId] = None
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

    class Config:
        populate_by_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}

# Artist Models
class Artist(BaseModel):
    id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
    user_id: PyObjectId
    stage_name: str
    genres: List[str]
    bio: str
    portfolio_links: List[str]
    created_at: datetime = Field(default_factory=datetime.utcnow)

    class Config:
        populate_by_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}

# Response Models
class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    user_id: Optional[str] = None
    role: Optional[int] = None