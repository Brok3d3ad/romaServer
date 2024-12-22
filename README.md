# NestJS API Server

A modern NestJS API server built with TypeScript, PostgreSQL, and TypeORM.

## Tech Stack

- **Framework**: NestJS
- **Language**: TypeScript
- **Database**: PostgreSQL
- **ORM**: TypeORM
- **Authentication**: JWT
- **Monorepo Tool**: Nx
- **API Documentation**: OpenAPI/Swagger
- **Validation**: class-validator & class-transformer

## Prerequisites

- Node.js (v18 or later)
- Docker and Docker Compose
- npm or yarn

## Project Structure

```
server/
├── apps/
│   ├── api/                 # Main API application
│   │   ├── src/
│   │   │   ├── app/        # Application modules
│   │   │   ├── common/     # Shared utilities
│   │   │   ├── config/     # Configuration files
│   │   │   └── migrations/ # Database migrations
│   └── api-e2e/            # End-to-end tests
├── docker-compose.yml      # Docker configuration
└── package.json           # Project dependencies
```

## Getting Started

1. Clone the repository:
```bash
git clone <repository-url>
cd server
```

2. Install dependencies:
```bash
npm install
```

3. Start the PostgreSQL database:
```bash
docker-compose up -d postgres
```

4. Run the application:
```bash
npm run start:dev
```

The API will be available at: http://localhost:3001/api/v1

## Database Configuration

The database configuration is managed through two files:
- `apps/api/src/config/database.config.ts`: NestJS database module configuration
- `apps/api/src/config/typeorm.config.ts`: TypeORM CLI configuration

Default database settings:
- Host: localhost
- Port: 5432
- Username: postgres
- Password: postgres
- Database: nest_db

## Available API Endpoints

### Authentication
- `POST /api/v1/auth/signin` - User login

### Users
- `POST /api/v1/users` - Create new user
- `GET /api/v1/users` - Get all users
- `GET /api/v1/users/:id` - Get user by ID
- `DELETE /api/v1/users/:id` - Delete user

### License
- `GET /api/v1/license/check` - Check license status

## Database Schema

### Users Table
```sql
Table "public.users"
  Column   |           Type           | Nullable |          Default
-----------+--------------------------+----------+---------------------------
 id        | uuid                     | not null | uuid_generate_v4()
 createdAt | timestamp with time zone | not null | now()
 updatedAt | timestamp with time zone | not null | now()
 email     | character varying        | not null |
 password  | character varying        | not null |
 firstName | character varying        |          |
 lastName  | character varying        |          |
 isActive  | boolean                  | not null | true
 role      | character varying        | not null | 'user'
```

## Available Scripts

- `npm run start:dev` - Start the application in development mode
- `npm run build` - Build the application
- `npm run test` - Run tests
- `npm run lint` - Run linting
- `npm run migration:run` - Run database migrations
- `npm run migration:revert` - Revert last migration
- `npm run migration:show` - Show migration status

## Environment Variables

Create a `.env` file in the root directory with the following variables:
```env
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_NAME=nest_db
JWT_SECRET=your-jwt-secret
```

## Development Notes

1. Database Migrations:
   - Located in `apps/api/src/migrations`
   - Run automatically when `migrationsRun: true`
   - Can be run manually using migration scripts

2. API Validation:
   - Uses ValidationPipe globally
   - DTOs located in respective module folders

3. Authentication:
   - JWT-based authentication
   - Role-based access control

## Troubleshooting

1. Database Connection Issues:
   - Ensure PostgreSQL is running: `docker-compose ps`
   - Check database credentials in config files
   - Try recreating the database:
     ```bash
     docker exec postgres_db psql -U postgres -c "DROP DATABASE IF EXISTS nest_db;"
     docker exec postgres_db psql -U postgres -c "CREATE DATABASE nest_db;"
     ```

2. Port Conflicts:
   - Default port is 3001
   - Change port in `main.ts` if needed
   - Kill existing processes if port is in use

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

## License

This project is licensed under the MIT License.
