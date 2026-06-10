FROM node:20.18.1

WORKDIR /app/backend

COPY backend/package*.json ./
RUN npm ci

WORKDIR /app
COPY . .

WORKDIR /app/backend
RUN npm run build

EXPOSE 3000

CMD ["npm", "test"]
