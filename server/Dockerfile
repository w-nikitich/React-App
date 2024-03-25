# Stage 1: Building the application
FROM node:20-alpine as builder
WORKDIR /usr/src/server

# Copying package files and installing dependencies
COPY package*.json ./
COPY tsconfig.json ./
RUN npm install

# Copying the rest of the application
COPY . .

# Generating Prisma client specifically for the target platform
# Ensuring that Prisma knows we're targeting linux-musl-arm64
# RUN npx prisma generate --schema=./libs/common/src/database/prisma/schema.prisma


# Building the application
RUN npm run build server

# Stage 2: Setting up the production environment
FROM node:20-alpine
WORKDIR /usr/src/server

# Copying necessary files from the builder stage
COPY --from=builder /usr/src/server/dist ./dist
COPY --from=builder /usr/src/server/node_modules ./node_modules
COPY --from=builder /usr/src/server/package*.json ./

RUN mkdir -p /usr/src/server/src/database

# Installing only production dependencies (if any additional ones are needed)
# This step might be redundant if all dependencies are already included in the node_modules copied from the builder
RUN npm install --production

# Exposing the port your app runs on
EXPOSE 8001

# Starting the application
CMD ["node", "dist/main"]