# FROM mhart/alpine-node:11 AS builder
# WORKDIR /app
# COPY . .
# RUN yarn global add react-scripts
# RUN yarn run build

# FROM mhart/alpine-node
# RUN yarn global add serve
# WORKDIR /app
# COPY --from=builder /app/build .
# CMD ["serve", "-p", "80", "-s", "."]

FROM node:8 as web-build

#Setting the working directory as /app
WORKDIR /app

#Copying package.json to Docker Image
COPY package.json /app

#Installing all dependencies.
RUN npm init
RUN npm install

# Running the dev server.
CMD ["npm", "start"]