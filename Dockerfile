# Start with a base image containing Node.js runtime
FROM node:lts AS development

# Set the working directory in the Docker container to /app
WORKDIR /app

# Copy package.json and package-lock.json to Docker environment
COPY package*.json ./

# Install all dependencies
RUN npm install

# Copy everything else to /app
COPY . .

# Build the app
RUN npm run build

# Expose port 3000 to the outside
EXPOSE 3000

# Run the app when the container is started
CMD ["npm", "start"]
