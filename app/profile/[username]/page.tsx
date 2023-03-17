"use client"

import { User } from "@/types/User"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import { AiOutlineFileDone } from "react-icons/ai"

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
        <main className="max-w-[600px] mx-auto py-8 px-4">
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
                            <p>Number: {user?.contact_number}</p>
                            <p>From: {user?.city[0].toUpperCase()}{user?.city.slice(1)}</p>
                            <p>Skills: {
                                user?.skills.length! > 0
                                &&
                                user?.skills.map((skill, index) => <span key={index}>{skill}{index !== user?.skills?.length - 1 ? "," : ""} </span>)
                            }</p>
                            <p>Interests: {
                                user?.interests.length! > 0
                                &&
                                user?.interests.map((interest, index) => <span key={index}>{interest}{index !== user?.interests?.length - 1 ? "," : ""} </span>)
                            }</p>
                        </div>
                        {
                            user?.resume
                            &&
                            <div className="flex items-start rounded-[10px] bg-blue-100 p-4 my-8">
                                <AiOutlineFileDone fontSize={64} />
                                <p className="flex flex-col gap-3">
                                    <span className="text-[1.1rem] font-[600]">{user?.fullname}'s resume</span>
                                    <Link href={`${user.resume}`} target="_blank" className="text-sm underline w-fit">View Resume</Link>
                                </p>
                            </div>
                        }
                        <div>{user?.applied_jobs}</div>
                    </section>
            }
        </main>
    )
}

export default Profile