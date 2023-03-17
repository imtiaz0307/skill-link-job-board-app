import { User } from "@/models/User";
import { dbConnection } from "@/utils/DbConnection";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const { username } = req.query;

    // database connection handler
    await dbConnection()

    try {
        const user = await User.findOne({ username }).select("-password")
        if (!user) return res.status(404).json({ error: "No user found." })

        res.status(200).json(user)
    } catch (error) {
        return res.status(500).json(error)
    }
}

export default handler