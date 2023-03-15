import { verify } from "jsonwebtoken"

export const verifyUser = (token: string): any => {
    const data: any = verify(token, process.env.JWT_SECRET!)
    return data.user?.id
}