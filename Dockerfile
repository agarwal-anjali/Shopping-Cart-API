# Use an official Node.js runtime as a parent image
FROM node:14

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json to the working directory
COPY package*.json ./

RUN npm cache clean -f

# Install Node.js dependencies
RUN npm install

# Copy the rest of the application source code to the container
COPY . .

# Expose the port that your API will listen on
EXPOSE 3000
