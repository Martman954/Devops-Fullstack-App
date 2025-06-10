# Use Node.js to build React app
FROM node:20-alpine as build
WORKDIR /app
COPY . ./
COPY package.json package-lock.json ./
RUN npm install
RUN npm run build

# Use Nginx to serve static files
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html

# Optional: Custom nginx config if needed
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
