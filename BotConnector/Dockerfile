FROM node:alpine
RUN apk update && apk upgrade && \
  apk add --no-cache git && \
  npm install -g npm
  
WORKDIR /app
COPY package.json /app
COPY package-lock.json /app
RUN npm ci || npm install
ADD . /app
CMD ["node", "src/server.js"]