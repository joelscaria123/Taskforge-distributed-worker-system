import pool from "../config/db.js"


export const getJobs = async(req,res) => {
 
      try{

         const result = await pool.query(
            
              "select * from jobs order by created_at desc"
            )

        return res.status(200).json(result.rows);
        
      }

      catch(error){

         res.status(500).json({
            message: "Failed to Fetch Jobs"
         })
      }
}

export const getJobById = async(req,res) => {
 
      try{

        const {id} = req.params;

        const result = await pool.query(
            
            `Select * from jobs where id=$1`, [id]
        )
         
        if(result.rows.length===0){

            return res.status(404).json({
                message: "Job not Found"
            })
        }

        res.json(result.rows[0]);
      }

      catch(error){

         res.status(500).json({
             message: "Failed to Fetch Jobs"
         })

         console.log("Error in getJobById controller");
      }
}

export const createJob = async(req,res) => {
 
      try{

         const { type, input_file } = req.body;

         if(!type || !input_file){
            res.status(400).json({message: "type or input file are missing"})
         }

         const result = await pool.query(
            `insert into jobs(type, input_file)
            values($1, $2) returning *`,
            [type, input_file]
         )

         res.status(201).json(result.rows[0]);
      }

      catch(error){

         console.log("Error in createJob controller");
         return res.status(500).json({message: "Internal Server Error"});
      }
}


export const uploadImage = async(req,res) => {

    try{

       if(!req.file){

          return res.status(400).json({
             message: "No file uploaded"
          })
       }

       const filePath = req.file.path;

       const result = await pool.query(
         `
         insert into jobs(type, status, input_file)
         values($1, $2, $3)
         returning *
         `,
         ["IMAGE_COMPRESSION", "PENDING", filePath]
       )

       return res.status(201).json({
          message: "Image uploaded successfully",
          job: result.rows[0]
       })
    }

    catch(error){

      console.error("Upload route error:", error);

      return res.status(500).json({
         message: "Failed to upload image"
      })

    }

}