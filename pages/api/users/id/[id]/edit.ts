import { User } from "@/models/User"
import { dbConnection } from "@/utils/DbConnection"
import { verifyUser } from "@/utils/verifyUser"
import { NextApiRequest, NextApiResponse } from "next"

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    // database connection hanlder
    await dbConnection()

    // if request method is not put
    if (req.method !== "PUT") return res.status(400).json({ error: "Only put requests are allowed." })

    try {
        // getting user id by user token
        const user_id = verifyUser(req.headers["auth-token"] as string)
        if (!user_id) return res.status(403).json({ error: "Please authenticate using valid token." })

        if (user_id !== req.query.id) return res.status(403).json({ error: "Access denied." })

        // getting user by id and updating it
        await User.findByIdAndUpdate(user_id, {
            $set: req.body
        })

        res.status(200).json({ success: "Profile updated successfully." })
    } catch (error) {
        return res.status(500).json(error)
    }
}

export default handler