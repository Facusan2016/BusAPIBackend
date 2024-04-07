# Use an official PostgreSQL image as the base image
FROM postgres:latest

RUN apt-get update && \
    apt-get install -y nodejs && \
    apt-get install -y unzip && \
    apt-get install dos2unix

COPY ./db-init-scripts/dbInit.sh /docker-entrypoint-initdb.d/dbInit.sh

RUN dos2unix /docker-entrypoint-initdb.d/dbInit.sh

# Set environment variables
ENV DB_HOST=127.0.0.1
ENV DB_PORT=5432
ENV DB_NAME=bus_app
ENV DB_USER=bus_app_user

# Expose the PostgreSQL port
EXPOSE 5432
