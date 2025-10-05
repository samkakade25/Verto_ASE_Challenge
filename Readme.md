# Employee Data Management Application

### Frontend: [Frontend APP Link](https://verto-ase-challenge-lcs7.vercel.app/)

### Backend: [Backend Server Link](https://verto-ase-challenge-kappa.vercel.app/)

### Postman Collection: [Postman API Collection Link](https://www.postman.com/spaceflight-geologist-44542914/public-workplace/collection/uibt63b/verto-ase-challenge?action=share&source=copy-link&creator=32467370)

### Overview
This is a full-stack CRUD (Create, Read, Update, Delete) application for managing employee data. It allows users to add, view, edit, and delete employee records, with features like search filtering and form validation. The backend is built with Node.js and Express, using Prisma for database interactions, while the frontend uses React with Ant Design for a responsive UI.

The project follows an MVC architecture on the backend and component-based structure on the frontend. It includes TypeScript for type safety, Zod for validation, and supports dark mode toggling.


### Tech Stack
**Backend**
- Node.js & Express.js
- TypeScript
- Prisma ORM (with PostgreSQL)
- Zod (for validation)
- Jest (for testing)

**Frontend**
- React.js
- TypeScript
- Tailwind CSS (for styling)
- Ant Design (Antd) UI library
- Zod (for form validation)
- Axios (for API requests)
- Vite (build tool)

### Prerequisites
- Node.js (v18 or higher)
- PostgreSQL (v12 or higher)
- npm or yarn for package management

### Setup and Installation
1. Clone the Repository
   ```
   git clone https://github.com/samkakade25/Verto_ASE_Challenge.git
   cd Verto_ASE_Challenge
   ```
2. Backend Setup
   Navigate to employee-backend/:
   ```
   cd backend
   ```

- Install dependencies:
  ```
  npm install
  ```
- Set up environment variables: Create a .env file in the root:
  ```
  DATABASE_URL="postgresql://username:password@localhost:5432/employee_db?schema=public"
  PORT=3000 
  ```
- Set up the database:
     - Create a PostgreSQL database named employee_db.
     - Run Prisma migrations:
      ```
      npx prisma migrate dev --name init
      ```
    - Generate Prisma client:
      ```
      npx prisma generate
      ```

  - Start the backend server:
  ```
  npm run dev  # For development with ts-node

  npm run build && npm start  # For production
  ```

- Run tests:
   ```
   npm test
   ```
   The backend API will be available at http://localhost:3000/api/employees.

### 3. Frontend Setup
  Navigate to employee-frontend/:
  ```
  cd ../frontend
  ```
  - Install dependencies:
  ```
  npm install
  ```
  - Set up environment variables: Create a .env file (for Vite):
  ```
  VITE_API_URL=http://localhost:3000/api/employee
  ```
  - Start the frontend development server:
  ```
  npm run dev
  ```
  The app will be available at http://localhost:5173.


### 4. Running the Full Application
- Start the backend first.
- Then start the frontend.
- Access the app in your browser and interact with the employee management interface.


### API Endpoints
   All endpoints are under /api/employees:

- GET /: Retrieve all employees.
- GET /:id: Retrieve a single employee by ID.
- POST /: Create a new employee (body: { name, email, position }).
- PUT /:id: Update an employee (body: partial updates allowed).
- DELETE /:id: Delete an employee.






