# BUILD

FROM node:14-alpine as builder

WORKDIR /web

COPY package*.json ./

RUN yarn install

COPY . .

RUN yarn build --slient

# SERVE

FROM node:14-alpine

RUN npm install -g serve

WORKDIR /web

COPY --from=builder /web/build .

EXPOSE 80

CMD ["serve", "-p", "80", "-s", "."]