# FROM node:24
# Using a smaller, more secure base image
FROM node:24-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install --production && npm audit fix

COPY . .

EXPOSE 3000

# Adding a non-root user - username: app
RUN addgroup app && adduser -S -G app app
# Switch to the non-root user
USER app

CMD ["npm", "run", "start"]