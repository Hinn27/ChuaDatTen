FROM node:20-alpine

WORKDIR /app

# Install only workspace dependencies required for web runtime
COPY package*.json ./
COPY apps/web/package.json ./apps/web/package.json
RUN npm ci --workspace apps/web --include-workspace-root=false

# Copy web source
COPY apps/web ./apps/web

WORKDIR /app/apps/web
EXPOSE 5173

CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0", "--port", "5173"]
