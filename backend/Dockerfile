FROM node:20.11.0

COPY ./ /app/backend

WORKDIR /app/backend

RUN npm install

EXPOSE 3000

CMD [ "npm", "run", "start" ]