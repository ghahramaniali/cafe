# Cafe Application

A modern cafe management application with a Next.js frontend and Express.js backend.

## Project Structure

- `src/` - Next.js frontend application
- `backend/` - Express.js backend API

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- PostgreSQL database
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:

   ```bash
   cd backend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables:

   - Copy `env.example` to `.env`
   - Update the database configuration and other settings

4. Set up the database:

   ```bash
   npm run setup
   ```

5. Start the backend server:
   ```bash
   npm run dev
   ```

The backend will run on `http://localhost:5000`

### Frontend Setup

1. In a new terminal, navigate to the project root:

   ```bash
   cd cafe
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env.local` file in the root directory with:

   ```
   NEXT_PUBLIC_API_URL=https://leoncafe.ir/backend/api
   ```

4. Start the frontend development server:
   ```bash
   npm run dev
   ```

The frontend will run on `http://localhost:3000`

## API Integration

The frontend now fetches categories from the backend API instead of using hardcoded data. The `CategoriesSection` component:

- Fetches categories from `/api/categories` endpoint
- Displays loading states while fetching data
- Shows error messages if the API call fails
- Supports category images from the backend
- Falls back to a coffee emoji if no image is provided

## Available Scripts

### Backend

- `npm run dev` - Start development server with nodemon
- `npm start` - Start production server
- `npm run setup` - Set up database tables

### Frontend

- `npm run dev` - Start development server with turbopack
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## API Endpoints

- `GET /api/categories` - Get all categories
- `GET /api/categories/:id` - Get category by ID
- `POST /api/categories` - Create new category (Admin only)
- `PUT /api/categories/:id` - Update category (Admin only)
- `DELETE /api/categories/:id` - Delete category (Admin only)
