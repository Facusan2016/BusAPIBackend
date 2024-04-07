import e from "express";
import pool from './database.js'
import { PORT } from "./config.js";
import { Routes } from "./routes/routes.js";

const app = e()

app.use(e.json())
app.use('/buses', Routes) // Including the routes.

app.listen(PORT, async() => {
  try{
    await pool.connect()
    console.log('Database connection successfully')
    console.log(`Application listening on port ${PORT}`)
  } catch (err) {
    console.error(err)
  }

})

