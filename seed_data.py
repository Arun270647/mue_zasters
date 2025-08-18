"""
Script to seed the MongoDB database with initial test data
Run this script after setting up the database to populate it with sample data
"""

from pymongo import MongoClient
from bson import ObjectId
from datetime import datetime
from passlib.context import CryptContext
import os
from dotenv import load_dotenv

load_dotenv()

# Password hashing
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# MongoDB connection
MONGODB_URL = os.getenv("MONGODB_URL", "mongodb://localhost:27017")
DATABASE_NAME = os.getenv("DATABASE_NAME", "musical_events")

client = MongoClient(MONGODB_URL)
db = client[DATABASE_NAME]

def seed_database():
    """Seed the database with initial test data"""
    
    # Clear existing data (optional - comment out if you want to keep existing data)
    print("🗑️  Clearing existing data...")
    db.users.delete_many({})
    db.artist_applications.delete_many({})
    db.artists.delete_many({})
    
    # Hash passwords
    admin_password_hash = pwd_context.hash("AdminPass123")
    artist_password_hash = pwd_context.hash("ArtistPass123")
    user_password_hash = pwd_context.hash("UserPass123")
    
    print("👥 Seeding users...")
    
    # Users data
    users_data = [
        {
            "_id": ObjectId("66a01a111111111111111111"),
            "email": "admin@eventco.com",
            "password_hash": admin_password_hash,
            "role": 0,  # Admin
            "created_at": datetime(2025, 8, 18, 10, 0, 0)
        },
        {
            "_id": ObjectId("66a01a222222222222222222"),
            "email": "artist1@mail.com",
            "password_hash": artist_password_hash,
            "role": 1,  # Artist
            "created_at": datetime(2025, 8, 18, 11, 0, 0)
        },
        {
            "_id": ObjectId("66a01a333333333333333333"),
            "email": "user1@mail.com",
            "password_hash": user_password_hash,
            "role": 2,  # User
            "created_at": datetime(2025, 8, 18, 12, 0, 0)
        },
        {
            "_id": ObjectId("66a01a444444444444444444"),
            "email": "user2@mail.com",
            "password_hash": user_password_hash,
            "role": 2,  # User
            "created_at": datetime(2025, 8, 18, 12, 30, 0)
        }
    ]
    
    # Insert users
    db.users.insert_many(users_data)
    print(f"✅ Inserted {len(users_data)} users")
    
    print("📝 Seeding artist applications...")
    
    # Artist applications data
    applications_data = [
        {
            "_id": ObjectId("66a02b111111111111111111"),
            "user_id": ObjectId("66a01a333333333333333333"),
            "stage_name": "DJ Nova",
            "genres": ["Electronic", "House"],
            "bio": "Upcoming DJ specializing in deep house music with 3 years of experience performing at local clubs and events.",
            "portfolio_links": ["https://soundcloud.com/djnova", "https://instagram.com/djnova_official"],
            "status": "pending",
            "reviewed_by": None,
            "created_at": datetime(2025, 8, 18, 13, 0, 0),
            "updated_at": datetime(2025, 8, 18, 13, 0, 0)
        },
        {
            "_id": ObjectId("66a02b222222222222222222"),
            "user_id": ObjectId("66a01a444444444444444444"),
            "stage_name": "Luna Rivers",
            "genres": ["Folk", "Acoustic"],
            "bio": "Singer-songwriter with a passion for storytelling through music. I've been performing for 5 years and have released 2 independent albums.",
            "portfolio_links": ["https://spotify.com/artist/lunarivers", "https://youtube.com/@lunarivers"],
            "status": "pending",
            "reviewed_by": None,
            "created_at": datetime(2025, 8, 18, 14, 0, 0),
            "updated_at": datetime(2025, 8, 18, 14, 0, 0)
        }
    ]
    
    # Insert applications
    db.artist_applications.insert_many(applications_data)
    print(f"✅ Inserted {len(applications_data)} artist applications")
    
    print("🎭 Seeding artists...")
    
    # Artists data (approved artists)
    artists_data = [
        {
            "_id": ObjectId("66a02c111111111111111111"),
            "user_id": ObjectId("66a01a222222222222222222"),
            "stage_name": "The Harmony Band",
            "genres": ["Rock", "Pop"],
            "bio": "A band blending rock and pop with soulful lyrics. We've been performing together for 7 years and have released 3 albums.",
            "portfolio_links": ["https://youtube.com/harmonyband", "https://spotify.com/artist/harmonyband"],
            "created_at": datetime(2025, 8, 18, 14, 0, 0)
        }
    ]
    
    # Insert artists
    db.artists.insert_many(artists_data)
    print(f"✅ Inserted {len(artists_data)} artists")
    
    print("🎉 Database seeding completed successfully!")
    print("\n📋 Test Accounts:")
    print("Admin: admin@eventco.com / AdminPass123")
    print("Artist: artist1@mail.com / ArtistPass123")
    print("User: user1@mail.com / UserPass123")
    print("User: user2@mail.com / UserPass123")

if __name__ == "__main__":
    try:
        seed_database()
    except Exception as e:
        print(f"❌ Error seeding database: {e}")
    finally:
        client.close()