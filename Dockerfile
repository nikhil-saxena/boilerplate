# Install
FROM node:8.12-alpine as base
COPY . /root/app
WORKDIR /root/app
RUN npm set progress=true && npm config set depth 0
RUN npm install --no-audit --no-shrinkwrap
RUN npm run build

# Release
FROM base as release
ENV PORT 3000
CMD npm run start
# expose port and define CMD
EXPOSE 3000