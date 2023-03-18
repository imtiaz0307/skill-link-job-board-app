import { Job } from "@/models/Job";
import { dbConnection } from "@/utils/DbConnection";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    // database connection handler
    await dbConnection()

    try {
        const jobs = await Job.find({})

        res.status(200).json(jobs.reverse())
    } catch (error) {
        return res.status(500).json(error)
    }
}

export default handler;