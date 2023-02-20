# BUILD

FROM node:14-alpine as builder

WORKDIR /web

COPY package*.json ./

RUN yarn install

COPY . .

RUN npm run build

# SERVE

FROM node:14-alpine

RUN npm install -g serve

WORKDIR /web

COPY --from=builder /web/build .

EXPOSE 8082

CMD ["serve", "-p", "8082", "-s", "."]