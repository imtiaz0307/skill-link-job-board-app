import { Job } from "@/models/Job"
import { dbConnection } from "@/utils/DbConnection"
import { NextApiRequest, NextApiResponse } from "next"

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    // database connection handler
    await dbConnection()

    // if request method is not post
    if (req.method !== "POST") return res.status(400).json({ error: "Only post requests are allowed." })

    try {
        // converting the deadline string to date
        req.body.deadline = new Date(req.body.deadline)

        // creating new job
        const job = await Job.create(req.body)
        await job.save()

        res.status(201).json({ success: "Job created successfully." })
    } catch (error) {
        return res.status(500).json({ error: "Internal server error." })
    }
}

export default handler