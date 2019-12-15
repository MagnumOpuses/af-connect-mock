FROM node:10-alpine

# Create app directory
WORKDIR /dist
RUN apk update
#Not needed. Convenient for debuging
RUN apk add bash
VOLUME /cert_and_key:/dist/cert_and_key
# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
#COPY package*.json ./
COPY . .
RUN npm install
# If you are building your code for production
# RUN npm ci --only=production
# API https
EXPOSE 9999:9999
#API http
EXPOSE 9998:9998

CMD [ "npm", "run-script", "start" ]
