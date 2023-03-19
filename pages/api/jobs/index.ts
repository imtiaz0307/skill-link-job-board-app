import { Job } from "@/models/Job";
import { dbConnection } from "@/utils/DbConnection";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    // database connection handler
    await dbConnection()

    try {
        // destructuring items from request query
        const { job_title, city } = req.query

        let jobs = await Job.find()

        // job search functionality by job title and city
        jobs = jobs.filter(job => {
            // if user search for specific jobs from specific city
            if (job_title && city) {
                return job.job_title.toLowerCase().includes(String(job_title).toLowerCase()) && job.city.toLowerCase().includes(String(city).toLowerCase());
            }
            // if user only search for jobs titles
            if (job_title && !city) return job.job_title.toLowerCase().includes(String(job_title).toLowerCase());
            // if user only search for jobs from a specific city
            if (!job_title && city) return job.city.toLowerCase().includes(String(city).toLowerCase());
            // if there is no search query
            return jobs
        })

        res.status(200).json(jobs.reverse())
    } catch (error) {
        return res.status(500).json(error)
    }
}

export default handler;