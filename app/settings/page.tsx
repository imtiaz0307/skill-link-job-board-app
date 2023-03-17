"use client"

import { cities } from "@/data/cities"
import { User } from "@/types/User"
import { ChangeEvent, useEffect, useState } from "react"

const Settings = () => {
    const [authToken, setAuthToken] = useState<string>("")
    const [user, setUser] = useState<User | null>(null)
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
                    const { fullname, username, email, contact_number, city } = resData
                    setData({
                        fullname,
                        username,
                        email,
                        contact_number,
                        city
                    })
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


    return (
        <main className="max-w-[700px] mx-auto flex flex-col gap-6 py-16">
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
            <form className="flex gap-4 items-end">
                <div className="flex flex-col gap-2 flex-1">
                    <label className="cursor-pointer text-blue-500 font-[600]" htmlFor="skills">Add Skills</label>
                    <input className="py-2 px-4 bg-transparent border-blue-200 border-2 rounded outline-none" type="text" id="skills" />
                </div>
                <button className="py-2 px-4 bg-blue-500 text-white rounded border-2 border-blue-500" type="submit">Add</button>
            </form>
            <form className="flex gap-4 items-end">
                <div className="flex flex-col gap-2 flex-1">
                    <label className="cursor-pointer text-blue-500 font-[600]" htmlFor="interests">Add Interests</label>
                    <input className="py-2 px-4 bg-transparent border-blue-200 border-2 rounded outline-none" type="text" id="interests" />
                </div>
                <button className="py-2 px-4 bg-blue-500 text-white rounded border-2 border-blue-500" type="submit">Add</button>
            </form>
            <div className="flex justify-end gap-4 w-full mt-8">
                <button className="px-8 py-2 border-blue-500 border-2 rounded text-blue-500">Cancel</button>
                <button className="px-8 py-2 border-blue-500 border-2 text-white bg-blue-500 rounded">Save Changes</button>
            </div>
        </main>
    )
}

export default Settings;