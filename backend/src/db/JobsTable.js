import pool from "../config/db.js";

 
export async function createJobsTable(){

    const query = `
      CREATE TABLE IF NOT EXISTS jobs (
      id SERIAL PRIMARY KEY,
      type VARCHAR(100) NOT NULL,
      status VARCHAR(20) NOT NULL DEFAULT 'PENDING',
      input_file TEXT,
      output_file TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;

   await pool.query(query);
   
   console.log("Jobs table ready");

 }