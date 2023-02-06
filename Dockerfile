FROM node:18-alpine as angular

LABEL maintainer="luissena <sena.luisgf@gmail.com>"

WORKDIR /app

COPY . .

RUN npm install && npm run ng build

FROM nginx:alpine
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY --from=angular /app/dist/frontend .

EXPOSE 80

ENTRYPOINT ["nginx", "-g", "daemon off;"]
