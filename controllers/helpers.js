// Retrieves the first shape ID that matches the route ID.

import client from "../database.js"

export const getShapeIdByRouteId = async(route_id) => {
   //Setting the query configuration.

  if (!route_id) return undefined

  const queryConf = {
    name: 'getShapeIdByRouteId',
    text: `SELECT shape_id FROM trip WHERE route_id=$1 LIMIT 1`,
    values: [route_id]
  }

  try {

    let result = await client.query(queryConf)
    if (result.rowCount == 0) return null
    return result.rows[0].shape_id

  } catch (error) {
    
    console.log(error)
    return null
  }
}

// Function to read CSV file and extract latitudes and longitudes
export const getLatLonArray = (shapesArr) => {
  const latLonArray = shapesArr.map((row) => ({
    lat: row.shape_pt_lat, lng: row.shape_pt_lon
  }));

  return latLonArray;
}