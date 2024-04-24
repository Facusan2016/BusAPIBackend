# Use an official PostgreSQL image as the base image
FROM postgres:latest

RUN apt-get update && \
    apt-get install -y nodejs && \
    apt-get install -y unzip && \
    apt-get install dos2unix 
    
COPY ./db-init-scripts/ /docker-entrypoint-initdb.d/
    
RUN dos2unix /docker-entrypoint-initdb.d/dbInit.sh

# Set environment variables
ENV CLIENT_ID=${CLIENT_ID}
ENV CLIENT_SECRET=${CLIENT_SECRET}

# Expose the PostgreSQL port
EXPOSE 5432
