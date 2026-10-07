import express from 'express';
import dotenv from 'dotenv';
import cors from "cors";
import pool from './config/db.js';
import { createJobsTable } from './db/JobsTable.js';
import jobsRoutes from './routes/jobRutes.js';

dotenv.config({quiet: true});

const PORT = process.env.PORT;
const app = express();


app.use(express.json());

app.use(cors({origin: "http://localhost:3000"}))

app.get("/api/health", (req,res)=> {

    res.status(200).json({ message: "App Health is ok"})
});

app.use("/api/jobs", jobsRoutes);


 async function startServer(){

    try{

        const result = await pool.query("SELECT NOW()");

        console.log("Database Connected Successfully");

        console.log(result.rows[0]);

        createJobsTable();

         app.listen(PORT, () => {

           console.log(`Server running on PORT ${PORT}`)
         });
    }

    catch(error){

        console.error("Error in connecting to the Database", error);
    }

 }

 startServer();




