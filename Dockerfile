FROM node:16-alpine
# Create app directory.
WORKDIR /usr/src/app
# Install app dependencies.
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+).
COPY package*.json ./
# Start installing dependencies.
RUN npm install
# COPY source code.
COPY . .
# Bind the port to Container.
EXPOSE 3000
# Launch the server.
CMD ["npm", "start"]
