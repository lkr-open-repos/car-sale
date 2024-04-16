# Use a minimal base image like Alpine Linux
FROM node AS builder

# Set working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies as a non-root user
RUN addgroup -g 1001 -S nodejs \
    && adduser -u 1001 -S nodejs -G nodejs \
    && chown -R nodejs:nodejs /usr/src/app
USER nodejs
RUN npm ci --only=production

# Copy application code
COPY --chown=nodejs:nodejs . .

# Build the application (if needed)
# RUN npm run build

# Start a new stage for the runtime image
FROM node

# Set working directory
WORKDIR /usr/src/app

# Copy only necessary files from the builder stage
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder --chown=nodejs:nodejs /usr/src/app ./

# Expose the port your app runs on
EXPOSE 5000

# Run the app with a non-root user
USER nodejs
CMD ["npm", "start"]