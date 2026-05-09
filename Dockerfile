FROM node:20-alpine

WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy project files
COPY . .

# Expose Vite's default port
EXPOSE 5173

# Start Vite in development mode with host exposure
CMD ["npm", "run", "dev", "--", "--host"]
