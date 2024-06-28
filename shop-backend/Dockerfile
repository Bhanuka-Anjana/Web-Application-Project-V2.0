FROM node:latest

# Create app directory
WORKDIR /app

# Install app dependencies
COPY package*.json ./
RUN npm install

# Bundle app source
COPY . .

EXPOSE 8085

CMD [ "npm", "start" ]
