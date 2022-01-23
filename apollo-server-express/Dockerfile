FROM node:16.13.2-alpine3.15

ARG PORT=4000

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

RUN npm install
RUN npm install -g serve pm2

# Bundle app source
COPY . .

EXPOSE ${PORT}

RUN npm run build

USER root

CMD ["npm", "start"]
