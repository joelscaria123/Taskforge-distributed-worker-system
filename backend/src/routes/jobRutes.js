
import express from 'express';
import { createJob, getJobById, getJobs, uploadImage } from '../controllers/jobController.js';
import upload from '../config/multer.js';

const router = express.Router();


router.get("/", getJobs);
router.get("/:id", getJobById);
router.post("/", createJob);
router.post("/upload", upload.single("file"), uploadImage)

export default router;