FROM node:21

EXPOSE 3000
WORKDIR /src

RUN npm install -f npm@latest -g

COPY package.json  ./
RUN npm config set legacy-peer-deps true
RUN npm install

COPY . .

CMD [ "npm","run","start" ]