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

## Docker Commands

### Basic Docker Commands
```bash
# Build Docker image
docker build -t nest-api .
docker build -t nest-api:latest .
docker build --no-cache -t nest-api .  # Build without cache

# Run Docker container
docker run -d -p 3001:3001 --name nest-api nest-api
docker run -d -p 3001:3001 --name nest-api --restart always nest-api  # With auto-restart
docker run -d -p 3001:3001 -v $(pwd):/app nest-api  # With volume mounting

# Docker Compose commands
docker-compose up -d                  # Start all services
docker-compose up -d postgres         # Start only PostgreSQL
docker-compose down                   # Stop all services
docker-compose down -v               # Stop and remove volumes
docker-compose ps                    # List running services
docker-compose logs -f              # Follow logs
docker-compose logs -f api          # Follow specific service logs
docker-compose restart              # Restart all services
docker-compose restart api          # Restart specific service

# Container management
docker ps                           # List running containers
docker ps -a                        # List all containers
docker stop nest-api               # Stop container
docker start nest-api              # Start container
docker restart nest-api            # Restart container
docker rm nest-api                 # Remove container
docker rm -f nest-api              # Force remove running container

# Image management
docker images                      # List images
docker rmi nest-api               # Remove image
docker rmi -f nest-api            # Force remove image
docker system prune               # Clean up unused resources
docker system prune -a            # Clean up all unused resources

# Container inspection
docker logs nest-api              # View container logs
docker logs -f nest-api           # Follow container logs
docker exec -it nest-api bash     # Enter container shell
docker inspect nest-api           # View container details
```

### Database Docker Commands
```bash
# PostgreSQL specific commands
docker exec -it postgres_db psql -U postgres                    # Access PostgreSQL CLI
docker exec postgres_db pg_dump -U postgres nest_db > backup.sql # Backup database
docker exec -i postgres_db psql -U postgres nest_db < backup.sql # Restore database
docker exec postgres_db psql -U postgres -c "CREATE DATABASE nest_db;"
docker exec postgres_db psql -U postgres -c "DROP DATABASE nest_db;"
```

## Server Commands

### Development Commands
```bash
# NestJS commands
npm run start                     # Start in production mode
npm run start:dev                # Start in development mode
npm run start:debug              # Start in debug mode
npm run start:prod               # Start in production mode with optimization

# Build commands
npm run build                    # Build the application
npm run build:prod              # Build for production
npm run clean                   # Clean build files

# Testing commands
npm run test                    # Run unit tests
npm run test:watch             # Run tests in watch mode
npm run test:cov               # Run tests with coverage
npm run test:debug             # Run tests in debug mode
npm run test:e2e               # Run end-to-end tests

# Database commands
npm run migration:generate      # Generate new migration
npm run migration:create       # Create empty migration
npm run migration:run          # Run pending migrations
npm run migration:revert       # Revert last migration
npm run migration:show         # Show migration status
npm run schema:sync           # Sync database schema
npm run schema:drop           # Drop database schema
npm run seed                  # Run database seeds

# Code quality commands
npm run lint                   # Run ESLint
npm run lint:fix              # Fix linting issues
npm run format                # Run Prettier
npm run format:fix            # Fix formatting issues

# Nx commands
nx serve api                  # Serve API application
nx build api                 # Build API application
nx test api                  # Test API application
nx lint api                  # Lint API application
nx affected:apps            # Show affected apps
nx affected:build           # Build affected apps
nx affected:test            # Test affected apps
nx graph                    # View dependency graph
```

### Production Commands
```bash
# Process management with PM2
pm2 start dist/main.js --name nest-api    # Start application
pm2 stop nest-api                         # Stop application
pm2 restart nest-api                      # Restart application
pm2 delete nest-api                       # Delete application
pm2 logs nest-api                         # View logs
pm2 monit                                 # Monitor applications
pm2 status                                # View status
pm2 save                                  # Save process list
pm2 startup                               # Generate startup script

# System monitoring
top                                       # View system processes
htop                                      # Interactive process viewer
df -h                                     # Check disk space
free -m                                   # Check memory usage
netstat -tulpn                            # Check port usage
```

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

## Features

- **RESTful API Design**: Following REST principles for predictable and scalable API endpoints
- **OpenAPI Documentation**: Auto-generated API documentation with Swagger UI
- **Authentication & Authorization**: 
  - JWT-based authentication
  - Role-based access control (RBAC)
  - Session management
- **Database**:
  - PostgreSQL with TypeORM
  - Automated migrations
  - Data validation
  - Relationship management
- **Security**:
  - Password hashing
  - Rate limiting
  - CORS protection
  - Helmet security headers
- **Testing**:
  - Unit tests with Jest
  - E2E tests with Supertest
  - Test coverage reports
- **Development Tools**:
  - Hot reload
  - ESLint + Prettier
  - Git hooks with Husky
  - Conventional commits

## Code Style Guide

- Use meaningful variable and function names
- Follow NestJS best practices and patterns
- Maintain consistent file and folder structure
- Document complex logic with comments
- Use TypeScript features effectively:
  - Strong typing
  - Interfaces and types
  - Decorators
  - Generics when appropriate

## Performance Optimization

1. Database Optimization:
   - Proper indexing
   - Query optimization
   - Connection pooling
   - Caching strategies

2. API Response Optimization:
   - Data pagination
   - Response compression
   - Proper error handling
   - Request validation

## Deployment

### Docker Deployment

1. Build the Docker image:
```bash
docker build -t nest-api .
```

2. Run the container:
```bash
docker run -p 3001:3001 nest-api
```

### Production Considerations

- Set appropriate environment variables
- Configure proper logging
- Set up monitoring and alerting
- Implement backup strategies
- Configure CI/CD pipelines

## Security Best Practices

1. API Security:
   - Input validation
   - Request sanitization
   - XSS protection
   - SQL injection prevention

2. Authentication Security:
   - Password complexity requirements
   - Token expiration
   - Refresh token rotation
   - Rate limiting on auth endpoints

3. Data Security:
   - Encryption at rest
   - Secure communication (HTTPS)
   - Regular security audits
   - Data backup and recovery

## Monitoring and Logging

- Application logs using Winston
- Performance metrics
- Error tracking
- API usage statistics
- Database monitoring

## Common Issues and Solutions

1. TypeORM Connection Issues:
   ```bash
   # Reset TypeORM connection
   npm run typeorm:drop-schema
   npm run migration:run
   ```

2. JWT Authentication Problems:
   - Verify token expiration
   - Check token signing algorithm
   - Validate secret key configuration

3. Development Environment Setup:
   - Clear node_modules and reinstall
   - Reset database and run migrations
   - Check environment variables

## API Response Format

Standard API response format:
```typescript
{
  success: boolean;
  data?: any;
  error?: {
    code: string;
    message: string;
    details?: any;
  };
  meta?: {
    pagination?: {
      page: number;
      limit: number;
      total: number;
    };
  };
}
```

## Additional Resources

- [NestJS Official Documentation](https://docs.nestjs.com/)
- [TypeORM Documentation](https://typeorm.io/)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [JWT.io](https://jwt.io/)
- [OpenAPI Specification](https://swagger.io/specification/)
