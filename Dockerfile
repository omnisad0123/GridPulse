FROM node:20.18.1

WORKDIR /app

COPY backend/package*.json ./backend/
WORKDIR /app/backend
RUN npm ci

WORKDIR /app
COPY . .

WORKDIR /app/backend
RUN npm run build

CMD ["npm", "test"]
