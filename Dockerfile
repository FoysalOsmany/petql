from node:10-alpine

# Create app directory
WORKDIR /opt/petql

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8080
CMD [ "npm", "start" ]