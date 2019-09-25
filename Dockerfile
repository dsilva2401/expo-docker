FROM ubuntu:18.04

RUN apt-get update && apt-get upgrade -y
RUN apt-get install nodejs -y
RUN apt-get install curl -y
RUN apt-get install git -y
RUN apt-get install wget -y
RUN apt-get install npm -y
RUN apt-get update && apt-get install --no-install-recommends -y openjdk-8-jdk
RUN npm install -g npm@6.9.0
RUN npm cache clean -f
RUN npm install -g n
RUN n 10.16.0
RUN npm install -g expo-cli
RUN mkdir workspace
WORKDIR workspace
RUN mkdir files
COPY index.js .
RUN npm install shelljs
RUN npm install fs-extra
CMD ["node", "index.js"]