FROM node:20-alpine

WORKDIR /app

# Install only workspace dependencies required for backend runtime
COPY package*.json ./
COPY apps/backend/package.json ./apps/backend/package.json
RUN npm ci --workspace apps/backend --include-workspace-root=false

# Copy backend source
COPY apps/backend ./apps/backend

WORKDIR /app/apps/backend
EXPOSE 3000

CMD ["npm", "run", "dev"]
