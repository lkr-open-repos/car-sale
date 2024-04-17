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

# Build the client app
RUN npm run build

# Serve with NGINX
FROM nginx:alpine

# Remove default NGINX website
RUN rm -rf /usr/share/nginx/html/*

# Copy NGINX configuration file
COPY ./nginx/nginx.conf /etc/nginx/nginx.conf

# Copy built app from the previous stage
COPY --from=builder /usr/src/app/dist /usr/share/nginx/html

# Expose port 4000
EXPOSE 4000

# Run NGINX
CMD ["nginx", "-g", "daemon off;"]
