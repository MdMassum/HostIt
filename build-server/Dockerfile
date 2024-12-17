# Docker image
FROM ubuntu:focal

# Updates the package list to ensure the latest versions of packages can be installed.
RUN apt-get update

RUN apt-get install -y curl
RUN curl -sL https://deb.nodesource.com/setup_20.x | bash -
# Upgrades all installed packages to the latest versions
RUN apt-get upgrade -y

# Installs Node.js (version 20.x) and its package manager npm.
RUN apt-get install -y nodejs

# install git, a version control system.
RUN apt-get install git -y

WORKDIR /home/app

# copies files from local file to containers /home/app directory
COPY main.sh main.sh
COPY script.js script.js
COPY package*.json .

# Installs Node.js dependencies listed in package.json.
RUN npm install

# Grants execute permissions to the main.sh and script.js files.
RUN chmod +x main.sh
RUN chmod +x script.js

ENTRYPOINT [ "/home/app/main.sh" ]