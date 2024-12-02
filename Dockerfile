FROM node:20-alpine

RUN mkdir /app
WORKDIR /app

COPY ./package.json /app
COPY ./package-lock.json /app
COPY ./tsconfig.json /app
COPY ./nest-cli.json /app

RUN npm install
RUN npm install -g @nestjs/cli

COPY ./backend /app

EXPOSE 3000

CMD ["npm", "run", "start:docker:local"]