import { NextApiRequest, NextApiResponse } from "next"
import { dbConnection } from "@/utils/DbConnection"
import { User } from "@/models/User"
import { genSalt, hash } from "bcryptjs"
import { sign } from "jsonwebtoken"


const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    // database coneection handler
    await dbConnection()

    // if request method is not post
    if (req.method !== "POST") return res.status(400).json({ error: "Only post requests are allowed." })

    try {
        // checking whether the username is available
        let user = await User.findOne({ username: req.body.username })
        if (user) return res.status(409).json({ error: "Username taken." })

        // checking whether there is no account with the same email
        user = await User.findOne({ email: req.body.email })
        if (user) return res.status(409).json({ error: "Email belongs to another account." })

        // generating salt and hashing password
        const salt = await genSalt(10)
        req.body.password = await hash(req.body.password, salt)

        // converting date string into date
        req.body.date_of_birth = new Date(req.body.date_of_birth)

        // creating new user
        user = await User.create(req.body)
        await user.save()

        const payload = {
            user: {
                id: user._id
            }
        }

        const token = sign(payload, process.env.JWT_SECRET!)
        res.status(201).json({ token, success: "Account created successfully." })
    } catch (error) {
        res.status(500).json(error)
    }
}

export default handler