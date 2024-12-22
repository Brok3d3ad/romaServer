# Build stage
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY nx.json ./
COPY tsconfig*.json ./

# Copy source code
COPY apps ./apps
COPY libs ./libs

# Install dependencies
RUN npm ci

# Build the application
RUN npm run build api

# Production stage
FROM node:18-alpine

WORKDIR /app

# Copy built assets from builder
COPY --from=builder /app/dist/apps/api ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./

# Expose application port
EXPOSE 3000

# Start the application
CMD ["node", "dist/main.js"] 