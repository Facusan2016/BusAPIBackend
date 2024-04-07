import e from "express";
import {
  getBusRoutes,
  getShapeByRouteId
} from '../controllers/controllers.js'

export const Routes = e.Router();

Routes.get('/', getBusRoutes)
Routes.get('/:route_id/shape', getShapeByRouteId)