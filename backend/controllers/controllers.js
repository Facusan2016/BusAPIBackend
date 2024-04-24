import client from '../database.js'
import { getLatLonArray, getShapeIdByRouteId } from './helpers.js'

// Gets all the bus routes and returns a json with the following structure
// {
//   ok: boolean,
//   quantity: number,
//   bus_routes : [
//     {
          // route_id,
          // agency_id,
          // route_short_name,
          // route_long_name,
//     },
//     {
//       ...
//     }
//   ]
// }


export const getBusRoutes = async(req, res) => {

  //Setting the query configuration.

  const queryConf = {
    name: 'getBusLines',
    text: 'SELECT route_id, agency_id, route_short_name, route_long_name FROM route',
  }

  try {

    let result = await client.query(queryConf)

    res.status(200).json(
      {
        ok: true,
        quantity: result.rowCount,
        data: result.rows
      }
    )
    
  } catch (error) {
    
    console.log(error)

    res.status(500).json({
      ok: false,
      error: 'Something failed on server side, check the logs.'
    })
  }

}

// Gets the shape coordinates filtering by route_id
// {
//   ok: boolean,
//   shape : [
//     {
//        shape_pt_lat,
//        shape_pt_lon,
//        shape_pt_sequence
//     },
//     {
//       ...
//     }
//   ]
// }



export const getShapeByRouteId = async(req, res) => {

  // Get the shape_id using route_id
  const shape_id = await getShapeIdByRouteId(req.params.route_id)

  const queryConf = {
    name: 'getShapeByRouteId',
    text: `SELECT * FROM shape WHERE shape_id=$1 ORDER BY shape_pt_sequence ASC`,
    values: [shape_id]
  }

  try {

    let result = await client.query(queryConf)

    res.status(200).json(
      {
        ok: true,
        quantity: result.rowCount,
        shape: getLatLonArray(result.rows)
      }
    )
    
  } catch (error) {
    
    console.log(error)

    res.status(500).json({
      ok: false,
      error: 'Something failed on server side, check the logs.'
    })

  }
}