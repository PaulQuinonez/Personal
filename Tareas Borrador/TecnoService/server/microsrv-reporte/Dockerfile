FROM node:12

COPY . /app

WORKDIR /app

COPY package*.json ./

RUN npm install

EXPOSE 3200

CMD ["npm", "run", "dev"]