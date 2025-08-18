# Musical Event Management Backend

A FastAPI-based backend for managing musical events, artists, and applications with JWT authentication and role-based access control.

## Features

- **JWT Authentication**: Secure token-based authentication
- **Role-Based Access Control**: Admin (0), Artist (1), User (2) roles
- **Artist Application System**: Submit, review, approve/reject applications
- **MongoDB Integration**: Document-based data storage
- **Password Security**: Bcrypt hashing for passwords
- **CORS Support**: Cross-origin requests enabled for frontend

## Tech Stack

- **FastAPI**: Modern Python web framework
- **MongoDB**: Document database with PyMongo
- **JWT**: JSON Web Tokens for authentication
- **Bcrypt**: Password hashing
- **Pydantic**: Data validation and serialization

## Installation

1. **Install Dependencies**
   ```bash
   pip install -r requirements.txt
   ```

2. **Set up Environment Variables**
   ```bash
   cp .env.example .env
   # Edit .env with your MongoDB connection string
   ```

3. **Start MongoDB**
   ```bash
   # Using Docker
   docker run -d -p 27017:27017 --name mongodb mongo:latest
   
   # Or install MongoDB locally
   ```

4. **Seed Database (Optional)**
   ```bash
   python seed_data.py
   ```

5. **Run the Server**
   ```bash
   uvicorn main:app --reload
   ```

## API Endpoints

### Authentication
- `POST /auth/register` - Register new user
- `POST /auth/login` - Login and get JWT token

### Artist
- `POST /artist/apply` - Submit artist application
- `GET /artist/my-applications` - Get user's applications

### Admin
- `GET /admin/applications` - List all applications
- `POST /admin/applications/{id}/approve` - Approve application
- `POST /admin/applications/{id}/reject` - Reject application
- `GET /admin/stats` - Get dashboard statistics

### User
- `GET /user/profile` - Get user profile
- `PUT /user/profile` - Update user profile

## Database Schema

### Users Collection
```json
{
  "_id": "ObjectId",
  "email": "string",
  "password_hash": "string",
  "role": "number", // 0=Admin, 1=Artist, 2=User
  "created_at": "datetime"
}
```

### Artist Applications Collection
```json
{
  "_id": "ObjectId",
  "user_id": "ObjectId",
  "stage_name": "string",
  "genres": ["string"],
  "bio": "string",
  "portfolio_links": ["string"],
  "status": "string", // pending/approved/rejected
  "reviewed_by": "ObjectId",
  "created_at": "datetime",
  "updated_at": "datetime"
}
```

### Artists Collection
```json
{
  "_id": "ObjectId",
  "user_id": "ObjectId",
  "stage_name": "string",
  "genres": ["string"],
  "bio": "string",
  "portfolio_links": ["string"],
  "created_at": "datetime"
}
```

## Test Accounts

After running the seed script, you can use these test accounts:

- **Admin**: admin@eventco.com / AdminPass123
- **Artist**: artist1@mail.com / ArtistPass123
- **User**: user1@mail.com / UserPass123
- **User**: user2@mail.com / UserPass123

## Development

1. **API Documentation**: Visit `http://localhost:8000/docs` for interactive API docs
2. **Health Check**: `GET /health` to verify server status
3. **CORS**: Configured for `localhost:5173` and `localhost:3000`

## Security Features

- Password hashing with bcrypt
- JWT token expiration (30 minutes default)
- Role-based route protection
- Input validation with Pydantic
- CORS protection

## Project Structure

```
├── main.py              # FastAPI application entry point
├── auth.py              # Authentication utilities
├── models.py            # Pydantic models
├── db.py                # Database connection
├── seed_data.py         # Database seeding script
├── requirements.txt     # Python dependencies
├── .env                 # Environment variables
└── routes/
    ├── auth.py          # Authentication routes
    ├── admin.py         # Admin routes
    ├── artist.py        # Artist routes
    └── user.py          # User routes
```