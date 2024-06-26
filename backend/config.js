import dotenv from 'dotenv';

//This file configures the enviroment variables
//obtained from the .env file.

dotenv.config();

export const PGHOST = process.env.PGHOST || 'host.docker.internal';
export const PGPORT = process.env.PGPORT || 5432;
export const PGDATABASE = process.env.PGDATABASE || 'bus_app';
export const PGUSER = process.env.PGUSER || 'bus_app_user';
export const PGPASSWORD = process.env.PGPASSWORD || 'bus_app_pass';
export const PORT = process.env.PORT || '3000';
export const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:8080'
