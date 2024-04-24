#!/bin/bash
#Database local data.
DB_HOST="127.0.0.1"
DB_PORT="5432"
DB_NAME="bus_app"
DB_USER="bus_app_user"
WORKDIR="/db-data"
ACCESS_TOKEN_URL='https://mvdapi-auth.montevideo.gub.uy/auth/realms/pci/protocol/openid-connect/token'
GTFS_URL='https://api.montevideo.gub.uy/api/transportepublico/buses/gtfs/static/latest/google_transit.zip'
CLIENT_ID='c2bf6e48'
CLIENT_SECRET='c223f2e88eb40b19664f2b8ecbbb717d'

#Initializing the tables.

echo "Intializing the tables..."

psql -U "$DB_USER" -d "$DB_NAME" -f "/docker-entrypoint-initdb.d/init.psql"


#Fetch the gtfs information from https://api.montevideo.gub.uy/api/transportepublico/buses/gtfs/static/latest/google_transit.zip

echo "Fetching the gtfs information and adding it to /db-data as a .zip..."

ACCESS_TOKEN_URL=$ACCESS_TOKEN_URL CLIENT_ID=$CLIENT_ID CLIENT_SECRET=$CLIENT_SECRET GTFS_URL=$GTFS_URL node /docker-entrypoint-initdb.d/getGtfsData.js

echo "Unziping data.zip"

unzip /db-data/data.zip -d /db-data

echo "Renaming from .txt to .csv"

cd /db-data

#Converting the .txt to .csv files

for file in *.txt; do
    mv -- "$file" "${file%.txt}.csv"
done

echo "Removing .zip..."

rm /db-data/data.zip

echo "Copying the .CSV files..."

echo "Fixing extra column on trips.csv"

node /docker-entrypoint-initdb.d/deleteLastColumn.js trips.csv

#Copying the data from the .CSV files.
echo "Copying agency.csv"
psql -U "$DB_USER" -d "$DB_NAME" -c "\COPY agency(agency_id, agency_name, agency_url, agency_timezone, agency_phone, agency_lang) FROM '$WORKDIR/agency.csv' DELIMITER ',' CSV HEADER;"

echo "Copying calendar.csv"
psql -U "$DB_USER" -d "$DB_NAME" -c "\COPY calendar(service_id, monday, tuesday, wednesday, thursday, friday, saturday, sunday, start_date, end_date) FROM '$WORKDIR/calendar.csv' DELIMITER ',' CSV HEADER;"

echo "Copying routes.csv"
psql -U "$DB_USER" -d "$DB_NAME" -c "\COPY route(route_id, agency_id, route_short_name, route_long_name, route_desc, route_type) FROM '$WORKDIR/routes.csv' DELIMITER ',' CSV HEADER;"

echo "Copying shapes.csv"
psql -U "$DB_USER" -d "$DB_NAME" -c "\COPY shape(shape_id, shape_pt_lat, shape_pt_lon, shape_pt_sequence) FROM '$WORKDIR/shapes.csv' DELIMITER ',' CSV HEADER;"

echo "Copying trips.csv"
psql -U "$DB_USER" -d "$DB_NAME" -c "\COPY trip(route_id, service_id, trip_id, trip_headsign, direction_id, block_id, shape_id) FROM '$WORKDIR/trips.csv' DELIMITER ',' CSV HEADER;"

