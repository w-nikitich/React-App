FROM node:20-alpine

# Add a work directory
WORKDIR /app

# Cache and Install dependencies
COPY package*.json ./
COPY tsconfig.json ./
# Ensure all dependencies, including devDependencies, are installed
RUN npm install

# Copy app files
COPY . .

# Build the app
# RUN npm run build

# # Copy built assets from builder
# COPY --from=builder /app/build /usr/share/nginx/html

# # Add your nginx.conf
# COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port
EXPOSE 3000

# Start nginx
CMD ["npm", "run", "start"]