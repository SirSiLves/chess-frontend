
### STAGE 1: Build ###
FROM node:15-alpine AS build
WORKDIR /usr/src/app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build -- --prod

### STAGE 2: Run ###
FROM nginx:1.17.1-alpine
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build /usr/src/app/dist/chess-app /usr/share/nginx/html


# docker build -t chess-frontend-docker:latest .
# docker save chess-frontend-docker:latest -o "../../temp/chess-frontend-docker.tar" chess-frontend-docker
