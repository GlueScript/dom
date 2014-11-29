FROM ubuntu:latest
MAINTAINER Tim Rodger

# Expose the port
EXPOSE 8780

# Install dependencies
RUN apt-get update -qq && \
    apt-get -y install \
    node \
    npm

# Make the directories
RUN mkdir /home/app 

# Move files into place
COPY src/ /home/app/

# Install dependencies
WORKDIR /home/app

RUN npm install

CMD ["node", "/home/app/index.js"]
