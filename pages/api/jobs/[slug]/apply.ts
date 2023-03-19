import { Job } from "@/models/Job";
import { User } from "@/models/User";
import { dbConnection } from "@/utils/DbConnection";
import { verifyUser } from "@/utils/verifyUser";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    // database connection handler
    await dbConnection()

    // if request method is not put
    if (req.method !== "PUT") return res.status(400).json({ error: "Only put requests are allowed." })

    const { slug } = req.query
    try {
        // getting user id by verifying the user
        const user_id = verifyUser(req.headers?.["auth-token"] as string)
        if (!user_id) return res.status(403).json({ error: "Please authenticate using valid token." })

        // finding user by id and getting the important details from it
        const user = await User.findById(user_id).select("fullname city email contact_number skills resume")

        const job = await Job.findOneAndUpdate({ slug }, {
            $push: {
                applications: user
            }
        })

        await User.findByIdAndUpdate(user_id, {
            $push: {
                applied_jobs: job._id
            }
        })

        res.status(201).json({ success: `${user.fullname} applied to the ${job.job_title} position in ${job.company}.` })
    } catch (error) {
        return res.status(500).json(error)
    }
}

export default handler;