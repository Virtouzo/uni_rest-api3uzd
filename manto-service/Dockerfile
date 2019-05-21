FROM node:8

WORKDIR /server

COPY . /server
RUN npm install -g yarn
RUN yarn

EXPOSE 3001
CMD [ "yarn", "start" ]