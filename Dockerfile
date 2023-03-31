FROM node:latest as base
#consider adding a tag such as --platform=linux/amd64 depending on your OS
ENV PORT 3000

WORKDIR /app

COPY package*.json /app

RUN npm install

COPY . /app

FROM base as production
ENV NODE_ENV=production
RUN npm run install-client
RUN npm run build-client

CMD [ "node", "api/app.js"]

EXPOSE 3000