"use client";
import { useEffect, useState } from "react";

export default function Home() {

  const [jobs, setJobs] = useState([]);
  const [message, setMessage] = useState("");
  const [file, setFile] = useState(null);

  useEffect(() => {

    async function callApi(){

     try{

         const res = await fetch("http://localhost:5000/api/jobs");

         const data = await res.json();

         console.log(data[0]);
         setJobs(data);

     }

     catch(error){

        console.log("Error in callApi", error);        
     }


  }

    callApi();
    
  }, []);


  async function handleImageUpload(){

     if(!file){
       
        setMessage("Please select an image");
        return;  
     }

     const formData = new FormData();

     formData.append("file", file);

      try{

         const res = await fetch("http://localhost:5000/api/jobs/upload",
            {
               method: "POST",
               body: formData
            }
         )

         const result = await res.json();

         if(!res.ok){

            throw new Error(result.message || "Upload failed")
         }

         setMessage("Image Uploaded Successfully")
         
      }

      catch(error){

         console.error(error);
         setMessage("Upload failed");

      }
  }

  return (
      <div>
      <h1>My Jobs</h1>

      {jobs.map((job) => (
        <div key={job.id}>
          <p>Job #{job.id}</p>
          <p>Type: {job.type}</p>
          <p>Status: {job.status}</p>
        </div>
      ))}


       <div className="p-10">
      <h1 className="text-2xl font-bold mb-5">
        Upload Image
      </h1>

      <input
        type="file"
        accept="image/*"
        onChange={(e) => {
          const selectedFile = e.target.files?.[0];

          if (selectedFile) {
            setFile(selectedFile);
          }
        }}
      />

      <button
        onClick={handleImageUpload}
        className="ml-4 bg-black text-white px-4 py-2 rounded"
      >
        Upload
      </button>

      <p className="mt-5">
        {message}
      </p>
    </div>
    </div>
  );
}
