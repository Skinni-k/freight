FROM node:lts-alpine

WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .

RUN npm run build

# RUN npm run migration:revert

# RUN npm run migration

CMD ["npm", "run", "test"]
# CMD ["npm", "run", "build"]