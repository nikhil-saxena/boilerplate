# Install
FROM node:8.12-alpine as base
COPY . /root/app
WORKDIR /root/app
RUN npm install --production 
ENV NODE_ENV production
RUN npm run build

# Release
