"use client"

import { User } from "@/types/User"
import { useEffect, useState } from "react"

type Param = {
    params: {
        username: string
    }
}

const Profile = ({ params }: Param) => {
    const { username } = params
    const [user, setUser] = useState<User | null>(null)
    const [error, setError] = useState<boolean>(false)

    useEffect(() => {
        fetch(`/api/users/${username}`)
            .then(res => res.json())
            .then(data => {
                if (data.error) return setError(true);
                setUser(data)
            })
    }, [])

    return (
        <main className="max-w-[600px] mx-auto py-8">
            {
                error
                    ?
                    <p>No user found</p>
                    :
                    <section>
                        <h2 className="text-[2.5rem] font-[700] leading-none">{user?.fullname}</h2>
                        <div className="my-8 bg-sky-100 rounded-[10px] p-4 flex flex-col gap-4">
                            <p>Username: {user?.username}</p>
                            <p>Email: {user?.email}</p>
                            <p>From: {user?.city}</p>
                            <p>Skills: {user?.skills}</p>
                            <p>Interests: {user?.interests}</p>
                        </div>
                        <div>
                            <p>resume</p>
                        </div>
                        <div>{user?.applied_jobs}</div>
                    </section>
            }
        </main>
    )
}

export default Profile