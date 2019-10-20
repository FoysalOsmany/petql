FROM node:12-alpine

RUN mkdir -p /app-server/node_modules && chown -R node:node /app-server

WORKDIR /app-server

COPY package*.json ./

USER node

RUN npm install

COPY --chown=node:node . .

EXPOSE 3000:3000

CMD [ "npm", "start", "--host", "0.0.0.0" ]
