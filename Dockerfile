FROM node:lts-alpine3.12

ADD ./src .

ENTRYPOINT [ "node", "src/app.js" ]