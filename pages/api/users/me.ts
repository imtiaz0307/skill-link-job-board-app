import { User } from "@/models/User"
import { dbConnection } from "@/utils/DbConnection"
import { verifyUser } from "@/utils/verifyUser"
import { NextApiRequest, NextApiResponse } from "next"

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    // database connection handler
    await dbConnection()

    try {
        // getting user id by verifying the user with token
        const user_id = verifyUser(req.headers["auth-token"] as string)
        if (!user_id) return res.status(403).json({ error: "Please authenticate using valid token." })

        // finding the user by user id
        const user = await User.findById(user_id).select("-password")
        if (!user) return res.status(404).json({ error: "No such user exists." })

        res.status(200).json(user)
    } catch (error) {
        return res.status(500).json(error)
    }
}

export default handler