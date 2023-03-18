import { Job } from "@/models/Job";
import { dbConnection } from "@/utils/DbConnection";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    // database connection handler
    await dbConnection()

    const { slug } = req.query;

    try {
        const job = await Job.findOne({ slug })
        if (!job) return res.status(404).json({ error: "No job found." })

        res.status(200).json(job)
    } catch (error) {
        return res.status(500).json(error)
    }
}

export default handler;