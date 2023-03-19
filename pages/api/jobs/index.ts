import { Job } from "@/models/Job";
import { dbConnection } from "@/utils/DbConnection";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    // database connection handler
    await dbConnection()

    try {
        const { job_title, city, salaray_range, job_type, experience, createdAt } = req.query
        const searchQuery = {}
        let jobs = await Job.find(searchQuery)

        console.log(job_title, city)

        jobs = jobs.filter(job => {
            if (job_title && city) {
                return job.job_title.toLowerCase().includes(String(job_title).toLowerCase()) && job.city.toLowerCase().includes(String(city).toLowerCase());
            }
            if (job_title && !city) return job.job_title.toLowerCase().includes(String(job_title).toLowerCase());
            if (!job_title && city) return job.city.toLowerCase().includes(String(city).toLowerCase());
            return jobs
        })

        res.status(200).json(jobs.reverse())
    } catch (error) {
        return res.status(500).json(error)
    }
}

export default handler;