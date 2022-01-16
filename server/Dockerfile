FROM node:17.3.0-alpine3.15

ARG PORT=4000

RUN apk add --no-cache curl

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
RUN npm install -g serve
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .

EXPOSE ${PORT}

CMD ["npm", "start"]
