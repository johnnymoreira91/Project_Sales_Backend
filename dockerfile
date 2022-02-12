FROM node:alpine

WORKDIR /usr/app

COPY package*.json ./

RUN yarn install
RUN npx prisma db push

LABEL description="node version 1.0"

EXPOSE 3001

CMD yarn server