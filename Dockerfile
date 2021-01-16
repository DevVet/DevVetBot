FROM node:lts-alpine3.12

WORKDIR /use/src/app

COPY package*.json ./

RUN npm ci

COPY . .

CMD [ "node", "src/app.js" ]