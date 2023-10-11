FROM node:18-alpine3.16


#Create app directory
WORKDIR /coop/src/app


# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port that the server will listen on
EXPOSE 3000

# Start the Nest.js application
CMD ["npm", "run", "start:dev"]
# CMD ["sh", "-c", "dotenv -e .env && npm run start:dev"]