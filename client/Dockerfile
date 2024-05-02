# Build client app
FROM node AS builder

# Set working directory for the app
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY ./package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

ENV VITE_BACKEND_URL=https://ilker.tinkerbytes.com/

# Build the client app and remove unnecessery
RUN npm run build && npm prune --production

# Serve with NGINX
FROM nginx:alpine

# Remove default NGINX website
RUN rm -rf /usr/share/nginx/html/*

# Copy NGINX configuration file
COPY ./nginx/nginx.conf /etc/nginx/nginx.conf

# Copy built app from the previous stage
COPY --from=builder /usr/src/app/dist /usr/share/nginx/html

# Create required file and give permissions
 RUN  touch /var/run/nginx.pid && \
 chown -R nginx:nginx /var/cache/nginx /var/run/nginx.pid

# Set NGINX to run as the non-root user
USER nginx

# Expose port 4000
EXPOSE 4000

# Run NGINX
CMD ["nginx", "-g", "daemon off;"]
