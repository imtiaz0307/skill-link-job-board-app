"use client"

import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'

const Login = () => {
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [error, setError] = useState<string>("")

    const loginHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const res = await fetch('/api/auth/login', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, password })
        })
        const data = await res.json()
        if (data.error) {
            data.error.includes("credentials") && setError(data.error)
            setTimeout(() => setError(""), 3000)
        }
        if (data.success) {
            localStorage.setItem("auth-token", data.token)
            window.location.href = "/"
        }
    }
    return (
        <main className='flex justify-center items-center py-12 px-6'>
            <section className='flex border-blue-200 border-2 rounded-[10px] overflow-hidden w-full max-w-[800px]'>
                <form method='POST' onSubmit={loginHandler} className='flex-[1.2] flex flex-col justify-center p-4 items-center'>
                    <h2 className='text-blue-500 sm:text-[2rem] x-sm:text-[1.5rem] font-[700] text-center mb-12'>Login to your account!</h2>
                    <input type="email" id='email' placeholder='Enter your email address..' className='p-4 border-blue-200 rounded border-2 w-full max-w-[400px] mb-6' value={email} onChange={(e) => setEmail(e.target.value)} />
                    <input type="password" placeholder='Enter your password' className='p-4 border-blue-200 rounded border-2 w-full max-w-[400px]' value={password} onChange={(e) => setPassword(e.target.value)} />
                    {error && <span className='text-sm text-red-500 text-center py-3'>{error}</span>}
                    <button type='submit' className='bg-blue-500 text-white py-4 rounded w-full max-w-[400px] mt-6'>Login</button>
                    <p className='pt-4 text-sm'>Don't have an account? <Link href={"/auth/signup"} className="text-blue-600 underline">Signup.</Link></p>
                </form>
                <div className='flex-1 bg-gradient-to-r from-sky-500 to-indigo-500 rounded-[10px] md:block x-sm:hidden'>
                    <Image draggable="false" src={"/hero.png"} alt="woman" height={1000} width={1000} className="w-full" />
                </div>
            </section>
        </main>
    )
}

export default Login