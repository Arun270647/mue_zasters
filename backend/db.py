from pymongo import MongoClient
from pymongo.database import Database
from pymongo.collection import Collection
import os
from dotenv import load_dotenv

load_dotenv()

# MongoDB connection
MONGODB_URL = os.getenv("MONGODB_URL", "mongodb://localhost:27017")
DATABASE_NAME = os.getenv("DATABASE_NAME", "musical_events")

client = MongoClient(MONGODB_URL)
database: Database = client[DATABASE_NAME]

# Collections
users_collection: Collection = database["users"]
artist_applications_collection: Collection = database["artist_applications"]
artists_collection: Collection = database["artists"]

def get_database():
    return database

def close_database():
    client.close()