"use client"

import { cities } from "@/data/cities"
import { User } from "@/types/User"
import Link from "next/link"
import { ChangeEvent, useEffect, useRef, useState } from "react"
import { AiOutlineCloudUpload, AiOutlineFileDone } from "react-icons/ai"


const Settings = () => {
    const redirectLinkRef = useRef<null | HTMLAnchorElement>(null)
    const [authToken, setAuthToken] = useState<string>("")
    const [user, setUser] = useState<User | null>(null)
    const [skillName, setSkillName] = useState<string>("")
    const [skills, setSkills] = useState<string[]>([])
    const [interestName, setInterestName] = useState<string>("")
    const [interests, setInterests] = useState<string[]>([])
    const [resume, setResume] = useState<String>("")
    const [resumeDetails, setResumeDetails] = useState({
        name: "",
        size: ""
    })
    const [data, setData] = useState({
        fullname: "",
        username: "",
        email: "",
        contact_number: "",
        city: ""
    })

    useEffect(() => {
        if (typeof window !== "undefined") {
            setAuthToken(localStorage.getItem("auth-token")!)

            // getting current user
            fetch('/api/users/me', {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": localStorage.getItem("auth-token")!
                }
            })
                .then(res => res.json())
                .then(resData => {
                    setUser(resData)
                    const { fullname, username, email, contact_number, resume: userResume, city, skills: userSkills, interests: userInterests } = resData
                    setData({
                        fullname,
                        username,
                        email,
                        contact_number,
                        city
                    })
                    setSkills(userSkills)
                    setInterests(userInterests)
                    setResume(userResume)
                })
                .catch(err => console.log(err))
        }
    }, [])


    // input change handler
    const inputChangeHandler = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { id, value } = e.target
        setData(prev => {
            return {
                ...prev,
                [id]: value
            }
        })
    }

    // update profile handler
    const editProfileHandler = async () => {
        const res = await fetch(`/api/users/id/${user?._id}/edit`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "auth-token": authToken
            },
            body: JSON.stringify({ ...data, skills, interests, resume })
        })
        const resData = await res.json()
        if (resData.success) {
            redirectLinkRef.current?.click()
        }
    }


    return (
        <main className="max-w-[700px] mx-auto flex flex-col gap-6 py-16 px-4">
            <h2 className="text-blue-500 text-[2rem] font-[700] text-center mb-12">Update Profile</h2>
            <div className="flex flex-col gap-2">
                <label className="cursor-pointer text-blue-500 font-[600]" htmlFor="fullname">Change Name</label>
                <input className="py-2 px-4 bg-transparent border-blue-200 border-2 rounded outline-none" type="text" id="fullname" value={data.fullname} onChange={inputChangeHandler} />
            </div>
            <div className="flex flex-col gap-2">
                <label className="cursor-pointer text-blue-500 font-[600]" htmlFor="username">Change Username</label>
                <input className="py-2 px-4 bg-transparent border-blue-200 border-2 rounded outline-none" type="text" id="username" value={data.username} onChange={inputChangeHandler} />
            </div>
            <div className="flex flex-col gap-2">
                <label className="cursor-pointer text-blue-500 font-[600]" htmlFor="email">Change Email</label>
                <input className="py-2 px-4 bg-transparent border-blue-200 border-2 rounded outline-none" type="text" id="email" value={data.email} onChange={inputChangeHandler} />
            </div>
            <div className="flex flex-col gap-2">
                <label className="cursor-pointer text-blue-500 font-[600]" htmlFor="contact_number">Change Contact Number</label>
                <input className="py-2 px-4 bg-transparent border-blue-200 border-2 rounded outline-none" type="text" id="contact_number" value={data.contact_number} onChange={inputChangeHandler} />
            </div>
            <div className="flex flex-col gap-2">
                <label className="cursor-pointer text-blue-500 font-[600]" htmlFor="city">Change City</label>
                <select className="py-2 px-4 bg-transparent border-blue-200 border-2 rounded outline-none" id='city' value={data.city} onChange={inputChangeHandler} >
                    {
                        cities.map(city => <option key={city} value={city.includes("Select") ? "" : city.toLowerCase()} >{city}</option>)
                    }
                </select>
            </div>
            <div>
                <form className="flex gap-4 items-end" onSubmit={(e) => {
                    e.preventDefault()
                    if (!skillName) return
                    setSkills(prev => [...prev, skillName])
                    setSkillName("")
                }}>
                    <div className="flex flex-col gap-2 flex-1">
                        <label className="cursor-pointer text-blue-500 font-[600]" htmlFor="skills">Add Skills</label>
                        <input className="py-2 px-4 bg-transparent border-blue-200 border-2 rounded outline-none" type="text" id="skills" value={skillName} onChange={(e) => setSkillName(e.target.value)} />
                    </div>
                    <button className="py-2 px-4 bg-blue-500 text-white rounded border-2 border-blue-500" type="submit">Add</button>
                </form>
                <div className={`${skills.length > 0 && "mt-4 flex flex-wrap gap-2"}`}>
                    {skills.map((skill, index) => <span key={index} className="px-4 py-2 border-blue-200 text-blue-500 border-2 rounded text-sm">{skill}</span>)}
                </div>
            </div>
            <div>
                <form className="flex gap-4 items-end" onSubmit={(e) => {
                    e.preventDefault()
                    if (!interestName) return
                    setInterests(prev => [...prev, interestName])
                    setInterestName("")
                }}>
                    <div className="flex flex-col gap-2 flex-1">
                        <label className="cursor-pointer text-blue-500 font-[600]" htmlFor="interests">Add Interests</label>
                        <input className="py-2 px-4 bg-transparent border-blue-200 border-2 rounded outline-none" type="text" id="interests" value={interestName} onChange={(e) => setInterestName(e.target.value)} />
                    </div>
                    <button className="py-2 px-4 bg-blue-500 text-white rounded border-2 border-blue-500" type="submit">Add</button>
                </form>
                <div className={`${interests.length > 0 && "mt-4 flex flex-wrap gap-2"}`}>
                    {interests.map((interest, index) => <span key={index} className="px-4 py-2 border-blue-200 text-blue-500 border-2 rounded text-sm">{interest}</span>)}
                </div>
            </div>
            <div>
                {
                    resumeDetails.name
                        ?
                        <Link href={`${resume}`} target="_blank" className="flex items-start rounded-[10px] bg-blue-400 p-4 my-8 text-white">
                            <AiOutlineFileDone fontSize={64} color="white" />
                            <p className="flex flex-col gap-3">
                                <span className="text-[1.1rem] font-[600]">{resumeDetails.name}</span>
                                <span className="text-sm">{resumeDetails.size}</span>
                            </p>
                        </Link>
                        :
                        <>
                            <label htmlFor="resume" className="flex flex-col items-center cursor-pointer p-12 bg-blue-200 rounded-[10px] mx-auto w-fit my-8 text-[1.1rem]">
                                <AiOutlineCloudUpload />
                                <p>Upload New Resume</p>
                            </label>
                            <input type="file" accept="application/pdf" id="resume" onChange={async (e) => {
                                const file = e.target.files?.[0]
                                const reader = new FileReader()
                                reader.readAsDataURL(file!)
                                reader.onloadend = () => {
                                    setResumeDetails({
                                        name: file?.name || "",
                                        size: `${(file?.size! / 1024).toFixed(1)}${file?.size! > 1000000 ? "mb" : "kb"}` || ""
                                    })
                                    setResume(reader.result as string)
                                }
                            }} hidden />
                        </>
                }
            </div>
            <div className="flex justify-end gap-4 w-full mt-8">
                <Link href={`/profile/${user?.username}`} className="px-8 py-2 border-blue-200 border-2 rounded text-blue-500">Cancel</Link>
                <button className="px-8 py-2 border-blue-500 border-2 text-white bg-blue-500 rounded" onClick={editProfileHandler}>Save Changes</button>
                <Link href={`/profile/${data?.username}`} hidden ref={redirectLinkRef}></Link>
            </div>
        </main>
    )
}

export default Settings;