
# Stage 1
FROM node:10-alpine as build-step
RUN mkdir -p /app
WORKDIR /app
COPY package.json /app
RUN npm install
COPY . /app
RUN npm run build --prod

# Stage 2
FROM nginx:1.17.1-alpine
COPY --from=build-step /app /Users/yvesr/own/temp


# docker build -t chess-frontend-docker/chess-app .
# docker save chess-frontend-docker/chess-app:latest -o "../../temp/chess-frontend-docker.tar" chess-frontend-docker/chess-app
