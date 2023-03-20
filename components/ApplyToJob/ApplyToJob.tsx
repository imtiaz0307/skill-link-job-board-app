"use client"

import { User } from "@/types/User"
import Link from "next/link"
import { useEffect, useState } from "react"
import { AiOutlineFileDone } from "react-icons/ai"

const ApplyToJob = ({ slug, setRefresh, refresh }: { slug: string, setRefresh: (prev: any) => void, refresh: Number }) => {
    const [user, setUser] = useState<User | null>(null)
    const [showModal, setShowModal] = useState<boolean>(false)

    useEffect(() => {
        if (typeof window !== "undefined") {

            // getting current user
            fetch('/api/users/me', {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": localStorage.getItem("auth-token")!
                }
            })
                .then(res => res.json())
                .then(data => setUser(data))
                .catch(err => console.log(err))
        }
    }, [refresh])

    // apply to job handler
    const applyToJob = async () => {
        const response = await fetch(`/api/jobs/${slug}/apply`, {
            method: "PUT",
            headers: {
                "auth-token": localStorage.getItem("auth-token")!
            },
            body: JSON.stringify({
                fullname: user?.fullname,
                city: user?.city,
                email: user?.email,
                contact_number: user?.contact_number,
                skills: user?.skills,
                resume: user?.resume
            })
        })
        const data = await response.json()
        if (data.success) {
            setShowModal(false)
            setRefresh((prev: any) => prev + 1)
        }
    }

    // save/unsave job
    const saveUnsaveJobHandler = async () => {
        const response = await fetch(`/api/jobs/${slug}/save`, {
            method: "PUT",
            headers: {
                "auth-token": localStorage.getItem("auth-token")!
            }
        })
        const data = await response.json()
        if (data.success) {
            setRefresh((prev: any) => prev + 1)
        }
    }

    return (
        <>
            {
                user && user?.applied_jobs.includes(slug)
                    ?
                    <p className="text-sm text-blue-500">&#10003; Already applied.</p>
                    :
                    <button className="border-blue-500 border-[1px] bg-blue-500 text-white py-2 px-6 text-sm rounded" onClick={() => setShowModal(true)}>Apply Now</button>
            }
            <button className="border-blue-500 border-[1px] bor text-blue-500 py-2 px-6 text-sm rounded" onClick={saveUnsaveJobHandler}>{user && user?.saved_jobs.includes(slug) ? "Unsave" : "Save"}</button>

            {
                showModal
                &&
                <div className="flex items-center justify-center fixed top-0 left-0 h-[100vh] w-[100vw] bg-black bg-opacity-50">
                    <div className="bg-white p-4 rounded-[10px] ">
                        <h2 className="text-[2.5rem] font-[600] text-blue-500 text-center mb-8">Apply!</h2>
                        <div>
                            <label className="text-sm text-blue-500 font-[600]">Full Name:</label>
                            <h3 className="text-lg font-[500] mb-3 leading-none">{user?.fullname}</h3>
                        </div>
                        <div>
                            <label className="text-sm text-blue-500 font-[600]">City:</label>
                            <h3 className="text-lg font-[500] mb-3 leading-none">{user?.city}</h3>
                        </div>
                        <div>
                            <label className="text-sm text-blue-500 font-[600]">Email:</label>
                            <h3 className="text-lg font-[500] mb-3 leading-none">{user?.email}</h3>
                        </div>
                        <div>
                            <label className="text-sm text-blue-500 font-[600]">Contact Number:</label>
                            <h3 className="text-lg font-[500] mb-3 leading-none">{user?.contact_number}</h3>
                        </div>
                        <div>
                            <label className="text-sm text-blue-500 font-[600]">Skills:</label>
                            <h3 className="text-lg font-[500] mb-3 leading-none">
                                {
                                    user?.skills.length! > 0
                                    &&
                                    user?.skills.map((skill, index) => index !== user.skills.length - 1 ? `${skill}, ` : skill)
                                }
                            </h3>
                        </div>
                        <div>
                            <label className="text-sm text-blue-500 font-[600]">Resume:</label>
                            {
                                user?.resume
                                    ?
                                    <div className="flex items-start rounded-[10px] bg-blue-100 p-4 ">
                                        <AiOutlineFileDone fontSize={64} />
                                        <p className="flex flex-col gap-3">
                                            <span className="text-[1.1rem] font-[600]">{user?.fullname}'s resume</span>
                                            <Link href={`${user?.resume}`} target="_blank" className="text-sm underline w-fit">View Resume</Link>
                                        </p>
                                    </div>
                                    :
                                    <p>You should must have a resume.</p>
                            }
                        </div>
                        <div className="flex items-center justify-end gap-4 mt-6">
                            <button className="border-blue-500 border-[1px] bor text-blue-500 py-2 px-6 text-sm rounded" onClick={() => setShowModal(false)}>Cancel</button>
                            <button className="border-blue-500 border-[1px] bg-blue-500 text-white py-2 px-6 text-sm rounded" onClick={applyToJob}>Apply</button>
                        </div>
                    </div>

                </div>
            }
        </>
    )
}

export default ApplyToJob