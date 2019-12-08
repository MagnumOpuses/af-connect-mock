FROM node:10-alpine

# Create app directory
WORKDIR /app
RUN apk update
#Not needed. Convenient for debuging
RUN apk add bash

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production
EXPOSE 8100:8100

# Bundle app source
COPY . .

CMD [ "npm", "run-script", "start" ]
