#!/bin/bash
#Database local data.
DB_HOST="127.0.0.1"
DB_PORT="5432"
DB_NAME="bus_app"
DB_USER="bus_app_user"
WORKDIR="/db-data"

#Initializing the tables.

echo "Intializing the tables..."

psql -U "$DB_USER" -d "$DB_NAME" -f "/docker-entrypoint-initdb.d/init.psql"

echo "Copying the .CSV files..."

#Copying the data from the .CSV files.
echo "Copying agency.csv"
psql -U "$DB_USER" -d "$DB_NAME" -c "\COPY agency(agency_id, agency_name, agency_url, agency_timezone, agency_phone, agency_lang) FROM './$WORKDIR/agency.csv' DELIMITER ',' CSV HEADER;"

echo "Copying calendar.csv"
psql -U "$DB_USER" -d "$DB_NAME" -c "\COPY calendar(service_id, monday, tuesday, wednesday, thursday, friday, saturday, sunday, start_date, end_date) FROM './$WORKDIR/calendar.csv' DELIMITER ',' CSV HEADER;"

echo "Copying routes.csv"
psql -U "$DB_USER" -d "$DB_NAME" -c "\COPY route(route_id, agency_id, route_short_name, route_long_name, route_desc, route_type) FROM './$WORKDIR/routes.csv' DELIMITER ',' CSV HEADER;"

echo "Copying shapes.csv"
psql -U "$DB_USER" -d "$DB_NAME" -c "\COPY shape(shape_id, shape_pt_lat, shape_pt_lon, shape_pt_sequence) FROM './$WORKDIR/shapes.csv' DELIMITER ',' CSV HEADER;"

echo "Copying trips.csv"
psql -U "$DB_USER" -d "$DB_NAME" -c "\COPY trip(route_id, service_id, trip_id, trip_headsign, direction_id, block_id, shape_id) FROM './$WORKDIR/trips.csv' DELIMITER ',' CSV HEADER;"

