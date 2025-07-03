FROM node:20-alpine

WORKDIR /usr/src/app

COPY backend/package*.json ./

RUN npm install && apk add --no-cache postgresql-client

COPY backend/. ./
COPY frontend/. ./frontend/

EXPOSE 3000

CMD [ "npm", "start" ]