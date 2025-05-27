# Use official Node.js LTS image
FROM node:18

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package.json package-lock.json ./
RUN npm install --production

# Copy the rest of the code
COPY . .

# Expose backend port (adjust if needed)
EXPOSE 5000

# Command to run the app
CMD ["npm", "start"]