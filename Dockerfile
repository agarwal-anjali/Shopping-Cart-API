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

# Install Sequelize globally
RUN npm install -g sequelize

# Run your custom npm scripts before starting the API
RUN npm run seqproduct
RUN npm run seqcart
RUN npm run seqmigdev
RUN npm run seqmigtest
RUN npm run compile

# Expose the port that your API will listen on
EXPOSE 3000

# Define the command to start your API
CMD ["npm", "start"]