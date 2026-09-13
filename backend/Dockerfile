FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm ci --omit=dev

COPY . .

ENV NODE_ENV=production
ENV PORT=5000

RUN addgroup --system --gid 1001 nodejs \
    && adduser --system --uid 1001 nodejs

USER nodejs

EXPOSE 5000

CMD ["npm", "start"]