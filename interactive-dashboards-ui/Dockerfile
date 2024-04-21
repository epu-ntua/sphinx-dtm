# pull official base image
# !!!! Nu este folosit pentru crearea imaginii pe icom
FROM node:13.12.0-alpine

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install app dependencies
COPY package.json ./
COPY package-lock.json ./
RUN npm install --silent
RUN npm install react-scripts@3.4.1 -g --silent

# add app
COPY . ./
#RUN rm -rf /etc/nginx/conf.d
#COPY conf /etc/nginx
#RUN mkdir vary
#WORKDIR /usr/share/nginx/html/
#COPY env.sh /vary/env.sh
#COPY .env /vary/.env
#
## Add bash
#RUN apk add --no-cache bash
#
## Make our shell script executable
#RUN chmod +x env.sh

# Start Nginx server
#CMD ["/bin/bash", "-c", "/vary/env.sh && npm start"]

# start app
ENTRYPOINT npm start
