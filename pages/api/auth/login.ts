import { User } from "@/models/User";
import { dbConnection } from "@/utils/DbConnection";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    // database connection handler 
    await dbConnection()

    // if request method is not post
    if (req.method !== "POST") return res.status(400).json({ error: "Only post requests are allowed." })

    try {
        // if user with the entered email doesn't exist
        const user = await User.findOne({ email: req.body.email })
        if (!user) return res.status(401).json({ error: "Invalid credentials." })

        // if the password is incorrent
        const password = await compare(req.body.password, user.password)
        if (!password) return res.status(401).json({ error: "Invalid credentials." })

        // auth_token
        const payload = {
            user: {
                id: user._id
            }
        }

        const token = sign(payload, process.env.JWT_SECRET!)

        res.status(200).json({ token, success: "User logged in successfully." })
    } catch (error) {
        return res.status(500).json({ error: "Internal server error." })
    }
}

export default handler;