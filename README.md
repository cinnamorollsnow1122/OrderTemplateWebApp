# Order Management System

This project is a **full-stack application** consisting of a **React frontend** (built with **Vite**) and an **ASP.NET Core Web API backend**. It demonstrates a simple order management system where users can **view, create, edit, and delete orders**.

---

## Features

### Frontend (React + Vite)
- **Order Management**:
  - View a list of orders in a table.
  - CUD operations for order object.
  
- **Filtering**:
  - Filter orders by 2024.
  - Show all orders.
  
- **Styling**:
  - Responsive design using CSS.

- **Testing**:
  - Unit and integration tests using **Vitest**.

### Backend (ASP.NET Core Web API)
- **Order Management**:
  - CRUD operations for orders.
  
- **Database Integration**:
  - Uses **Entity Framework Core** for database interactions.
  
- **CORS**:
  - Configured to allow requests from the frontend.

- **Environment Configuration**:
  - Separate settings for development and production environments.

---

## Technologies Used

### Frontend
- **React**: JavaScript library for building user interfaces.
- **Vite**: Fast build tool for modern web development.
- **Vitest**: Testing framework for React.
- **CSS**: Styling for components and layout.

### Backend
- **ASP.NET Core**: Framework for building RESTful APIs.
- **Entity Framework Core**: ORM for database interactions.
- **SQLite**: Database for storing orders.
- **CORS**: Cross-Origin Resource Sharing for frontend-backend communication.

---
### Backend Setup
1. Navigate to the `ReactApp_RIBATest.Server` folder:
   ```bash
   cd ReactApp_RIBATest.Server
   ```
2. 2. Restore dependencies:
   ```bash
   dotnet restore
   ```
3. Run the application:
   ```bash
   dotnet run
   ```
4. The API will be available at [https://localhost:5132](https://localhost:5132).


### Frontend Setup

1. Navigate to the `reactapp_ribatest.client` folder:
   ```bash
   cd reactapp_ribatest.client
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to [https://localhost:5173](https://localhost:5173).

## Testing

### Frontend Tests

1. Run unit and integration tests using **Vitest**:
   ```bash
   npm run test
   ```

### Backend Tests

1. Run backend tests using the **.NET CLI**:
   ```bash
   dotnet test
   ```
---
## Environment Variables
### Frontend
- `VITE_API_BASE_URL`: Base URL for the backend API (default: `https://localhost:7178/api`).
- 
### Backend
- `FrontendUrl`: Base URL for the frontend API (default : `https://localhost:5173`).

  ---

