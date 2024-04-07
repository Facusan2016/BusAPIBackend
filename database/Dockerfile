# Use an official PostgreSQL image as the base image

FROM postgres:latest

RUN apt-get update && \
    apt-get install -y nodejs && \
    apt-get install unzip

# Set environment variables
ENV DB_HOST=127.0.0.1
ENV DB_PORT=5432
ENV DB_NAME=bus_app
ENV DB_USER=bus_app_user

# Expose the PostgreSQL port
EXPOSE 5432