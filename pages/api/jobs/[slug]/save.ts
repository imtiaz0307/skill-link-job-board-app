import { User } from "@/models/User"
import { dbConnection } from "@/utils/DbConnection"
import { verifyUser } from "@/utils/verifyUser"
import { NextApiRequest, NextApiResponse } from "next"

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    // database connection handler
    await dbConnection()

    // if request method is not put
    if (req.method !== "PUT") return res.status(400).json({ error: "Only put requests are allowed." })

    const { slug } = req.query;

    try {
        // getting user id by verifying the user
        const user_id = verifyUser(req.headers?.["auth-token"] as string)
        if (!user_id) return res.status(403).json({ error: "Please authenticate using valid token." })

        // finding user by id
        const user = await User.findById(user_id);

        // checking whether user already have saved the job
        if (user.saved_jobs.includes(slug)) {
            // removing the job slug from user saved jobs
            await User.findByIdAndUpdate(user_id, {
                $pull: {
                    saved_jobs: slug
                }
            })

            return res.status(200).json({ success: `You removed the ${slug} job from your saved items.` })
        } else {
            // adding the job slug to user saved jobs
            await User.findByIdAndUpdate(user_id, {
                $push: {
                    saved_jobs: slug
                }
            })

            return res.status(200).json({ success: `You added the ${slug} job to your saved items.` })
        }
    } catch (error) {
        return res.status(500).json("Internal server error.")
    }
}

export default handler