FROM node:12-alpine as builder

RUN apk update && apk add --no-cache make git autoconf libc6-compat libjpeg-turbo-dev libpng-dev nasm

WORKDIR /usr/src/app
COPY . .

RUN yarn install
RUN yarn build
RUN rm -rf ./src ./node_modules /usr/local/lib/node_modules /usr/local/share/.cache/yarn/
RUN mkdir -p /run/nginx

FROM nginx:alpine

RUN rm -rf /usr/share/nginx/html/*

COPY --from=builder /usr/src/app/build /usr/share/nginx/html

# Allow Routers
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
