FROM node as build-step

COPY . /app

WORKDIR /app

RUN npm install

EXPOSE 4200

FROM nginx:latest

COPY --from=build-step /app/dist/tecno-gestion /usr/share/nginx/html