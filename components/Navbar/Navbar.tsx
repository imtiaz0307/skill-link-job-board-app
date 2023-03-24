"use client"

import { User } from "@/types/User"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useRef, useState } from "react"
import { HiUserCircle, HiOutlineUserCircle } from "react-icons/hi2"
import { IoExitOutline, IoSettingsOutline } from "react-icons/io5"

const Navbar = () => {
    const pathname = usePathname()
    const [authToken, setAuthToken] = useState<string>("")
    const [showProfileMenu, setShowProfileMenu] = useState<boolean>(false)
    const [showMenu, setShowMenu] = useState<boolean>(false)
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
            if (!localStorage.getItem("auth-token") && pathname?.includes("/jobs/")) {
                window.location.href = "/auth/login"
            }
            if (localStorage.getItem("auth-token") && pathname === "/auth/login" || pathname === "/auth/signup") {
                window.location.href = "/"
            }
        }

        document.addEventListener("click", handlerShowProfileMenu)

        return () => {
            document.removeEventListener("click", handlerShowProfileMenu)
        }
    }, [authToken])

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
        <header className="bg-gradient-to-r from-sky-500 to-indigo-500 flex justify-center sticky top-0 z-50">
            <nav className="flex justify-between items-center lg:px-12 sm:px-8 x-sm:px-2 h-20  text-white max-w-[1300px] w-full">
                <div className="md:hidden x-sm:flex w-[30px] h-[30px] flex-col justify-center gap-1 cursor-pointer" onClick={() => setShowMenu(true)}>
                    <div className="h-[5px] w-full bg-white rounded-[20px]"></div>
                    <div className="h-[5px] w-full bg-white rounded-[20px]"></div>
                    <div className="h-[5px] w-full bg-white rounded-[20px]"></div>
                </div>
                <Link href={'/'} className="sm:text-4xl x-sm:text-[30px] font-bold">
                    SkillLink
                </Link>
                <ul className="flex items-center gap-8">
                    <div className={`flex items-center gap-8 md:static md:flex-row md:bg-transparent md:h-fit x-sm:absolute ${showMenu ? "x-sm:left-0" : "x-sm:left-[-400px]"} x-sm:top-0 x-sm:bg-blue-500 x-sm:flex-col x-sm:h-[100vh] x-sm:min-w-[250px] x-sm:justify-center duration-300 transition-all`}
                        onClick={(e) => {
                            const eventElement = e.target as HTMLElement
                            if (eventElement.tagName === "A") {
                                setShowMenu(false)
                            }
                        }}>
                        <span className="absolute top-[20px] right-[20px] cursor-pointer text-2xl md:hidden" onClick={() => setShowMenu(false)}>&larr;</span>
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
                    </div>
                    <li>
                        {
                            authToken
                                ?
                                <div ref={userIconRef} className="relative">
                                    <HiUserCircle fontSize={36} cursor={"pointer"} />
                                    {
                                        showProfileMenu
                                            ?
                                            <ul className="absolute bg-white top-6 right-0 rounded-[10px] overflow-hidden border-blue-200 border-2"
                                                onClick={(e) => {
                                                    const eventElement = e.target as HTMLElement
                                                    if (eventElement.tagName === "A" || eventElement.parentElement?.tagName === "A") {
                                                        setShowProfileMenu(false)
                                                    }
                                                }}>
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
                                <Link href={"/auth/login"} className="bg-white text-blue-500 font-[600] py-3 sm:px-10 rounded x-sm:px-6 x-sm:text-xs">Login</Link>
                        }
                    </li>
                </ul>
            </nav>
        </header>
    )
}

export default Navbar