FROM node:16-alpine
COPY  package-lock.json /var/www
COPY  package.json /var/www
COPY  public /var/www
COPY  src /var/www
WORKDIR /var/www
RUN npm install
EXPOSE 3000
ENTRYPOINT ["npm","start"]
