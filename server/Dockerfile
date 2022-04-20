FROM node:alpine
WORKDIR /app
COPY package.json /app/
COPY package-lock.json /app/
COPY . /app
RUN npm install
RUN npm uninstall sqlite3
RUN npm install --save sqlite3
EXPOSE 3001
CMD ["npm", "run", "start"]