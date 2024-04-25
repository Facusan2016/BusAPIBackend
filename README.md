# Bus API Backend

## About this project

This project aims to create an API that consumes GTFS data from the Public Bus API provided by the "Intendencia of Montevideo", converts the CSV data, and creates tables with that content in a PostgreSQL database within a Docker container.
Detailed instructions for building the database are provided in the `/database` folder.

The database is then connected to a Node.js API, which offers two distinct endpoints:

- /buses

  This endpoint returns data for all available buses as an array of objects. The information is sourced from the `route` table and is formatted as follows:

```json
{
  "ok": true,
  "quantity": 288,
  "data": [
    {
      "route_id": 2300027,
      "agency_id": "STM-MVD",
      "route_short_name": "100",
      "route_long_name": "PZA.ESPAÑA - V.FARRE"
    },
    {
      "route_id": 2600277,
      "agency_id": "STM-MVD",
      "route_short_name": "102",
      "route_long_name": "PLAZA ESPAÑA - GRUTA DE LOURDES."
    },
    ...
  ]
}
```
- /buses/:route_id/shape

  This endpoint returns the coordinates of each bus as an array of coordinates, formatted as follows:

```json
{
  "ok": true,
  "quantity": 301,
  "shape": [
    {
      "lat": -34.90925391,
      "lng": -56.20246759
    },
    {
      "lat": -34.90909525,
      "lng": -56.20309641
    },
    {
      "lat": -34.90886473,
      "lng": -56.2029282
    },
    ...
  ]
}
```
## Installation and Execution
To run this project, Docker must be installed on your local machine. Once installed, execute the following command in the root folder:

```sh
docker compose up --build
```

This command will create two Docker containers within the same network: one for the database and the other for the backend. You can access the backend at http://localhost:3000.

but before doing this, you need to create a .env file in the /database folder that contains two variables:

```.env
CLIENT_ID
CLIENT_SECRET
```

These credentials are utilized to establish the application's connection with the Bus API provided by the "Intendencia of Montevideo", to obtain these credentials you need to follow the steps outlined in the following [link](https://api.montevideo.gub.uy/)

## Usage

This project is designed to be consumed by a frontend application, displaying bus shapes on a map. You can see an example implementation in the following link: [Example Frontend](https://github.com/Facusan2016/BusRoutesFrontend)

## Bugs


- When executing the command to start the containers, the backend container initiates before the database container, leading to a disruption in the connection.

  Temporary solution: **Restart the backend container**.

