FROM node:20-bullseye

WORKDIR /usr/src/app

COPY app/package*.json .
RUN npm install

COPY app .

ENV NODE_ENV=production
EXPOSE 4000

CMD ["npm", "start"]
