FROM node:20

WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
RUN npx prisma generate
RUN npm run build

#RUN npm rebuild bcrypt --build-from-source

EXPOSE 8080