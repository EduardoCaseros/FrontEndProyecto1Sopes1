FROM node:20-alpine as builder

WORKDIR /FRONTENDPROYECTO1SOPES1

COPY package.json ./
COPY package-lock.json ./

RUN npm install

COPY . ./
#React
#EXPOSE 5173

#CMD ["npm","run","dev"]

FROM nginx:1.21-alpine as final

COPY ./nginx/nginx.conf /etc/nginx/nginx.conf
COPY --from=builder /FRONTENDPROYECTO1SOPES1/dist /usr/share/nginx/html

EXPOSE 80

CMD [ "nginx","-g","daemon off;" ]