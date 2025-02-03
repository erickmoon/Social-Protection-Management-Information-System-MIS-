Here's a detailed README.md for your project:

# Social Protection MIS API

A Management Information System (MIS) API for tracking social protection program beneficiaries. This API manages program information, locations, household heads, and household members with secure data handling.

## Table of Contents

- [Features](#a-features)
- [Prerequisites](#b-prerequisites)
- [Tech Stack](#c-tech-stack)
- [Project Structure](#d-project-structure)
- [Installation & Setup](#e-installation--setup)
- [API Documentation](#f-api-documentation)
  - [Available Endpoints](#available-endpoints)
  - [Example Requests](#example-requests)
- [Data Models](#g-data-models)
  - [Program](#1-program)
  - [Location](#2-location)
  - [HouseholdHead](#3-householdhead)
  - [HouseholdMember](#4-householdmember)
- [Error Handling](#h-error-handling)
- [Rate Limiting](#i-rate-limiting)
- [Security](#j-security)
- [Development](#k-development)

## A. Features

- Full CRUD operations for all resources
- Phone number encryption for household heads
- API key authentication
- Rate limiting
- PostgreSQL database with Knex.js migrations
- Swagger documentation
- Error handling middleware
- Input validation

## B. Prerequisites

- Node.js (v14 or higher)
- PostgreSQL (v12 or higher)
- npm or yarn

## C. Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: PostgreSQL
- **ORM**: Knex.js
- **Authentication**: API Key
- **Documentation**: Swagger/OpenAPI 3.0
- **Security**: CryptoJS for encryption

## D. Project Structure

```
mis-api/
├── src/
│   ├── config/
│   │   └── database.js
│   ├── controllers/
│   │   ├── householdController.js
│   │   ├── locationController.js
│   │   ├── memberController.js
│   │   └── programController.js
│   ├── middleware/
│   │   ├── apiKey.js
│   │   ├── errorHandler.js
│   │   └── rateLimiter.js
│   ├── migrations/
│   │   ├── create_programs_table.js
│   │   ├── create_locations_table.js
│   │   ├── create_household_heads_table.js
│   │   └── create_household_members_table.js
│   ├── models/
│   │   ├── Program.js
│   │   ├── Location.js
│   │   ├── HouseholdHead.js
│   │   └── HouseholdMember.js
│   ├── routes/
│   │   ├── index.js
│   │   ├── programs.js
│   │   ├── locations.js
│   │   ├── households.js
│   │   └── members.js
│   ├── seeds/
│   │   └── initial_data.js
│   ├── utils/
│   │   └── encryption.js
│   └── server.js
├── .env
├── .gitignore
├── .eslintrc.js
├── .prettierrc
├── jest.config.js
├── knexfile.js
├── package.json
├── README.md
└── swagger.yaml
```

## E. Installation & Setup

1. Clone the repository:

```bash
git clone <repository-url>
cd mis-api
```

2. Install dependencies:

```bash
npm install
```

3. Create PostgreSQL database and user:

```sql
CREATE DATABASE mis_db;
CREATE USER mis_user WITH ENCRYPTED PASSWORD 'WcKKMrA2G1pwtaZ';
GRANT ALL PRIVILEGES ON DATABASE mis_db TO mis_user;
```

4. Create `.env` file:

```env
DATABASE_URL=postgresql://mis_user:WcKKMrA2G1pwtaZ@localhost:5432/mis_db
API_KEY=your-secure-api-key-here
PORT=3000
ENCRYPTION_KEY=your-secure-encryption-key-here
NODE_ENV=development
```

5. Run migrations and seeds:

```bash
npm run migrate
npm run seed
```

6. Start the server:

```bash
# Development mode
npm run dev

# Production mode
npm start
```

## F. API Documentation

### Base URL

```
http://localhost:3000/api
```

### Authentication

All endpoints require an API key passed in the `x-api-key` header.

### Available Endpoints

#### 1. Programs

- `GET /programs` - List all programs
- `GET /programs/:id` - Get program by ID
- `POST /programs` - Create new program
- `PUT /programs/:id` - Update program
- `DELETE /programs/:id` - Delete program

#### 2. Locations

- `GET /locations` - List all locations
- `GET /locations/:id` - Get location by ID
- `POST /locations` - Create new location
- `PUT /locations/:id` - Update location
- `DELETE /locations/:id` - Delete location

#### 3. Households

- `GET /households` - List all households
- `GET /households/:id` - Get household by ID
- `POST /households` - Create new household
- `PUT /households/:id` - Update household
- `DELETE /households/:id` - Delete household

#### 4. Members

- `GET /members` - List all household members
- `GET /members/:id` - Get member by ID
- `POST /members` - Create new member
- `PUT /members/:id` - Update member
- `DELETE /members/:id` - Delete member

### Example Requests

#### 1. Create Program

```bash
curl -X POST http://localhost:3000/api/programs \
  -H "Content-Type: application/json" \
  -H "x-api-key: your-api-key" \
  -d '{
    "name": "Cash Transfer Program",
    "description": "Monthly support for vulnerable households",
    "budget": 1000000,
    "start_date": "2025-01-01"
  }'
```

#### 2. Create Household

```bash
curl -X POST http://localhost:3000/api/households \
  -H "Content-Type: application/json" \
  -H "x-api-key: your-api-key" \
  -d '{
    "full_name": "John Doe",
    "id_number": "ID001",
    "phone_number": "+254700000001",
    "location_id": 1,
    "program_id": 1
  }'
```

## G. Data Models

### 1. Program

```bash
{
  id: number;
  name: string;
  description: string;
  budget: number;
  start_date: Date;
  end_date: Date;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
}
```

### 2. Location

```bash
{
  id: number;
  county: string;
  sub_county: string;
  location: string;
  sub_location: string;
  ward: string;
  latitude: number;
  longitude: number;
  created_at: Date;
  updated_at: Date;
}
```

### 3. HouseholdHead

```bash
{
  id: number;
  full_name: string;
  id_number: string;
  phone_number: string; // Encrypted in storage
  gender: string;
  date_of_birth: Date;
  location_id: number;
  program_id: number;
  marital_status: string;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
}
```

### 4. HouseholdMember

```bash
{
  id: number;
  full_name: string;
  age: number;
  gender: string;
  relationship: string;
  date_of_birth: Date;
  education_level: string;
  is_student: boolean;
  household_head_id: number;
  created_at: Date;
  updated_at: Date;
}
```

## H. Error Handling

The API uses standard HTTP status codes:

- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `404` - Not Found
- `429` - Too Many Requests
- `500` - Internal Server Error

Error Response Format:

```json
{
  "error": "Error type",
  "message": "Detailed error message"
}
```

## I. Rate Limiting

- Window: 15 minutes
- Max Requests: 100 per IP
- Headers: Uses standard `RateLimit-*` headers

## J. Security

- API Key Authentication
- Phone number encryption using AES
- Input validation
- SQL injection prevention through Knex.js
- Rate limiting
- Secure headers

## K. Development

```bash
# Run tests
npm test

# Run linter
npm run lint

# Create new migration
npm run make:migration create_new_table

# Create new seed
npm run make:seeder new_seed
```
