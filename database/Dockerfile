# Use an official PostgreSQL image as the base image
FROM postgres:latest

# Set environment variables
ENV DB_HOST=127.0.0.1
ENV DB_PORT=5432
ENV DB_NAME=bus_app
ENV DB_USER=bus_app_user

# Copy initialization script into the container
COPY dbInitLocal.sh /data/db/

# Set permissions for the script
RUN chmod +x /data/db/dbInitLocal.sh

# Expose the PostgreSQL port
EXPOSE 5432