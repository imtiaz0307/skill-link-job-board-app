"use client"

import { User } from "@/types/User"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import { HiUserCircle, HiOutlineUserCircle } from "react-icons/hi2"
import { IoExitOutline, IoSettingsOutline } from "react-icons/io5"

const Navbar = () => {
    const [authToken, setAuthToken] = useState<string>("")
    const [showProfileMenu, setShowProfileMenu] = useState<boolean>(false)
    const [user, setUser] = useState<User | null>(null)
    const userIconRef = useRef<HTMLDivElement | null>(null)

    useEffect(() => {
        if (typeof window !== "undefined") {
            setAuthToken(localStorage.getItem("auth-token")!)

            if (localStorage.getItem("auth-token")) {
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
        }

        document.addEventListener("click", handlerShowProfileMenu)

        return () => {
            document.removeEventListener("click", handlerShowProfileMenu)
        }
    }, [])

    const handlerShowProfileMenu = (e: MouseEvent) => {
        if (userIconRef.current && userIconRef.current.contains(e.target as Node)) {
            setShowProfileMenu(true)
        } else {
            setShowProfileMenu(false)
        }
    }

    const handlerLogout = () => {
        localStorage.removeItem("auth-token")
        setAuthToken("")
        setShowProfileMenu(false)
    }
    return (
        <nav className="flex justify-between items-center px-12 h-20 bg-gradient-to-r from-sky-500 to-indigo-500 text-white">
            <Link href={'/'} className="text-4xl  font-bold">
                SkillLink
            </Link>
            <ul className="flex items-center gap-8">
                <li>
                    <Link href={"/"}>Home</Link>
                </li>
                <li>
                    <Link href={"/jobs"}>Jobs</Link>
                </li>
                <li>
                    <Link href={"/resources"}>Resources</Link>
                </li>
                <li>
                    <Link href={"/about"}>About Us</Link>
                </li>
                <li>
                    <Link href={"/contact"}>Contact Us</Link>
                </li>
                <li>
                    {
                        authToken
                            ?
                            <div ref={userIconRef} className="relative">
                                <HiUserCircle fontSize={36} cursor={"pointer"} />
                                {
                                    showProfileMenu
                                        ?
                                        <ul className="absolute bg-white top-6 right-0 rounded-[10px] overflow-hidden border-blue-200 border-2">
                                            <li>
                                                <Link href={`/profile/${user?.username}`} className="py-4 px-4 border-b-blue-200 border-b-2 text-blue-500 flex items-center gap-2">
                                                    <HiOutlineUserCircle fontSize={24} />
                                                    <span>Profile</span>
                                                </Link>
                                            </li>
                                            <li>
                                                <Link href={`/settings`} className="py-4 px-4 border-b-blue-200 border-b-2 text-blue-500 flex items-center gap-2">
                                                    <IoSettingsOutline fontSize={24} />
                                                    <span>Settings</span>
                                                </Link>
                                            </li>
                                            <li>
                                                <div className="py-4 px-4 text-blue-500 flex items-center gap-2 cursor-pointer" onClick={handlerLogout}>
                                                    <IoExitOutline fontSize={24} />
                                                    <span>Logout</span>
                                                </div>
                                            </li>
                                        </ul>
                                        :
                                        null
                                }
                            </div>
                            :
                            <Link href={"/auth/login"} className="bg-white text-blue-500 font-[600] py-3 px-10 rounded">Login</Link>
                    }
                </li>
            </ul>
        </nav>
    )
}

export default Navbar