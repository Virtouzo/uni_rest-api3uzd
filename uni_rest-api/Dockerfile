FROM node:8

WORKDIR /app

COPY . /app

RUN npm install -g yarn
RUN yarn

CMD node ./src/server.js

EXPOSE 3000