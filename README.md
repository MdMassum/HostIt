# HostIt

HostIt is a comprehensive hosting management application designed to streamline hosting services and server management. It includes various features to help manage and monitor hosting environments effectively.

## Features

- **API Server:** Provides REST APIs for managing hosting services.
- **Build Server:** Handles Docker image creation, build automation, and deployment to S3.
- **Reverse Proxy:** Manages subdomains and routes requests to S3 bucket static assets.

## Tech Stack

- **Node.js:** Node.js installed. [Learn more about Node.js](https://nodejs.org/)
- **Redis:** Redis is set up for caching and fast data retrieval. [Learn more about Redis](https://redis.io/)
- **Docker:** Docker for containerization. [Learn more about Docker](https://www.docker.com/)
- **AWS ECS & ECR:** AWS services for container orchestration and registry. [Learn more about AWS ECS and ECR](https://aws.amazon.com/ecs/)

## Setup Guide

This project contains the following services and directories:

- `api-server`: HTTP API server for RESTful interactions.
- `build-server`: Docker image build process for deployment to S3.
- `s3-reverse-proxy`: Reverse proxy for routing requests to static assets stored in S3.

### Local Setup

1. **Install Dependencies:**

   Run `npm install` in all three services directories:

   ```bash
   cd api-server
   npm install
   cd ../build-server
   npm install
   cd ../s3-reverse-proxy
   npm install
2. **Build the Docker image for the build-server and push it to your AWS ECR:**
   ```bash
   cd build-server
docker build -t your-ecr-repository:latest .
docker push your-ecr-repository:latest
3. **Configure api-server:**

Set up the api-server with required configurations such as TASK ARN and CLUSTER ARN.

4. **Run Services:**

Start the services by running the following commands in their respective directories:
``` bash
cd api-server
node index.js
cd ../s3-reverse-proxy
node index.js
