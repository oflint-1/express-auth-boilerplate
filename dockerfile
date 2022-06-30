FROM node

WORKDIR /app

COPY package.json /app

COPY package-lock.json /app

RUN npm install

RUN npm install -g nodemon

COPY . /app

EXPOSE 3000

CMD ["nodemon", "app.js"]