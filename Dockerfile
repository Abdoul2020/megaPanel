#FRONTEND
FROM node:alpine AS development
ENV NODE_ENV development
WORKDIR /app
COPY package.json .
COPY yarn.lock .
RUN yarn install
COPY . .
EXPOSE 8082
CMD [ "yarn", "start" ]