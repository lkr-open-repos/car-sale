# Builder image of multi-stage image
FROM node:alpine AS builder

WORKDIR /usr/src/app

COPY package*.json ./

# Install dependencies and typescript
RUN npm install && \
    npm install -g typescript

# Copy the project
COPY . .

# Build and remove unnecessery deps
RUN npm run build && \
    npm prune --production

# Runtime image
FROM node:alpine

WORKDIR /usr/src/app

# Copy built project files from the builder stage
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/dist ./dist

# Permit non-root user to project dir
RUN chown -R node:node /usr/src/app

# Expose the port
EXPOSE 5000

# Run the app with a non-root user
USER node

# Start the application
CMD ["node", "dist/app.js"]
