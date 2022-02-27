FROM node:16

WORKDIR /usr/src/app

COPY --chown=node:node . .

RUN npm ci
RUN npm i -g nodemon

USER node

CMD ["npm","run","dev"]
