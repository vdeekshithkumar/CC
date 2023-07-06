FROM node:16-alpine as builder
WORKDIR /app
COPY . .
RUN find /app
RUN npm i
RUN npm run build

FROM nginx:alpine as production
WORKDIR /frontend
#COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist/cc-ui /usr/share/nginx/html
CMD nginx -g 'daemon off;'
